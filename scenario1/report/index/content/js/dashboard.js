/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.88151658767772, "KoPercent": 0.11848341232227488};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.84192037470726, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "signin : alaunay3671@myschool.fr"], "isController": false}, {"data": [0.71, 500, 1500, "Login-0"], "isController": false}, {"data": [0.71, 500, 1500, "Login-1"], "isController": false}, {"data": [1.0, 500, 1500, "Login-2"], "isController": false}, {"data": [0.88, 500, 1500, "Login-3"], "isController": false}, {"data": [0.76, 500, 1500, "Login-4"], "isController": false}, {"data": [0.0, 500, 1500, "signin : mlesage4961@myschool.fr"], "isController": false}, {"data": [0.88, 500, 1500, "Login-5"], "isController": false}, {"data": [0.88, 500, 1500, "Login-6"], "isController": false}, {"data": [0.88, 500, 1500, "Login-7"], "isController": false}, {"data": [0.9, 500, 1500, "Login-8"], "isController": false}, {"data": [1.0, 500, 1500, "Login-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-14"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-13"], "isController": false}, {"data": [0.0, 500, 1500, "signin : lbousquet1454@myschool.fr"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-10"], "isController": false}, {"data": [0.0, 500, 1500, "signin : jsamson2604@myschool.fr"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-12"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-11"], "isController": false}, {"data": [0.04, 500, 1500, "Login"], "isController": false}, {"data": [0.0, 500, 1500, "signin : hdacosta3115@myschool.fr"], "isController": false}, {"data": [0.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave"], "isController": false}, {"data": [1.0, 500, 1500, "Login-15"], "isController": false}, {"data": [1.0, 500, 1500, "Login-10"], "isController": false}, {"data": [0.0, 500, 1500, "signin : wlemoine7180@myschool.fr"], "isController": false}, {"data": [1.0, 500, 1500, "Login-13"], "isController": false}, {"data": [1.0, 500, 1500, "Login-14"], "isController": false}, {"data": [1.0, 500, 1500, "Login-11"], "isController": false}, {"data": [1.0, 500, 1500, "Login-12"], "isController": false}, {"data": [0.0, 500, 1500, "signin : pdupuis3453@myschool.fr"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks-13"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks-11"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks-12"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks-10"], "isController": false}, {"data": [0.0, 500, 1500, "signin : oandre8445@myschool.fr"], "isController": false}, {"data": [0.0, 500, 1500, "signin : tpottier2194@myschool.fr"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-10"], "isController": false}, {"data": [0.0, 500, 1500, "signin : aandre6209@myschool.fr"], "isController": false}, {"data": [0.0, 500, 1500, "signin : gbertin2570@myschool.fr"], "isController": false}, {"data": [0.0, 500, 1500, "signin : cbrun7753@myschool.fr"], "isController": false}, {"data": [0.0, 500, 1500, "signin : mguerin9241@myschool.fr"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-13"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-11"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-12"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-6"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-3"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-6"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-5"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-9"], "isController": false}, {"data": [0.0, 500, 1500, "signin : sbarbe5230@myschool.fr"], "isController": false}, {"data": [0.0, 500, 1500, "Transaction Controller"], "isController": true}, {"data": [0.3157894736842105, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-1"], "isController": false}, {"data": [0.3684210526315789, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-0"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-3"], "isController": false}, {"data": [0.34210526315789475, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-0"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-5"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-4"], "isController": false}, {"data": [0.23684210526315788, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-1"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks-9"], "isController": false}, {"data": [0.0, 500, 1500, "signin : opons9926@myschool.fr"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks-6"], "isController": false}, {"data": [0.5, 500, 1500, "signin : aollivier9071@myschool.fr"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks-7"], "isController": false}, {"data": [0.13157894736842105, 500, 1500, "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks-5"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks-3"], "isController": false}, {"data": [0.15, 500, 1500, "http://localhost/student/homeworks-0"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks-1"], "isController": false}, {"data": [0.0, 500, 1500, "signin : gmartin3967@myschool.fr"], "isController": false}, {"data": [0.0, 500, 1500, "signin : ttessier9584@myschool.fr"], "isController": false}, {"data": [0.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join"], "isController": false}, {"data": [0.0, 500, 1500, "signin : mantoine7614@myschool.fr"], "isController": false}, {"data": [0.125, 500, 1500, "http://localhost/student/homeworks"], "isController": false}, {"data": [0.0, 500, 1500, "signin : nbreton8363@myschool.fr"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-1"], "isController": false}, {"data": [0.21052631578947367, 500, 1500, "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-0"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-3"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-11"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-10"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-5"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-13"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-12"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-6"], "isController": false}, {"data": [0.9473684210526315, 500, 1500, "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-14"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-8"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1688, 2, 0.11848341232227488, 403.94845971564, 3, 14044, 49.0, 1551.3000000000031, 2349.8499999999995, 3722.9599999999964, 45.31421975248986, 1668.0449067223028, 48.27832851802636], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["signin : alaunay3671@myschool.fr", 1, 0, 0.0, 3534.0, 3534, 3534, 3534.0, 3534.0, 3534.0, 3534.0, 0.2829654782116582, 0.358404516836446, 0.259477132852292], "isController": false}, {"data": ["Login-0", 50, 0, 0.0, 617.6999999999999, 18, 2176, 326.0, 1685.8, 1929.6499999999983, 2176.0, 1.3457863429601915, 145.9455347650257, 0.48035635581245123], "isController": false}, {"data": ["Login-1", 50, 0, 0.0, 590.24, 36, 2353, 238.0, 1694.8999999999996, 1927.0499999999993, 2353.0, 1.4260859644619377, 44.63813402890676, 0.8042623481218448], "isController": false}, {"data": ["Login-2", 25, 0, 0.0, 83.96, 9, 313, 84.0, 155.60000000000005, 269.19999999999993, 313.0, 0.7304388476596739, 78.87241584431426, 0.2931741859259043], "isController": false}, {"data": ["Login-3", 25, 0, 0.0, 373.20000000000005, 44, 1411, 69.0, 1382.4, 1403.5, 1411.0, 0.7297565532138479, 60.64054609507268, 0.2715207488031992], "isController": false}, {"data": ["Login-4", 25, 0, 0.0, 628.6, 65, 2101, 170.0, 2094.8, 2099.5, 2101.0, 0.7294371662824964, 160.29452963156126, 0.5634617173139205], "isController": false}, {"data": ["signin : mlesage4961@myschool.fr", 1, 0, 0.0, 2599.0, 2599, 2599, 2599.0, 2599.0, 2599.0, 2599.0, 0.38476337052712584, 0.487341886302424, 0.35733395055790684], "isController": false}, {"data": ["Login-5", 25, 0, 0.0, 338.44, 45, 1360, 64.0, 1332.4, 1352.8, 1360.0, 0.729884386313208, 8.285328229008524, 0.2630149790523181], "isController": false}, {"data": ["Login-6", 25, 0, 0.0, 337.19999999999993, 46, 1293, 70.0, 1289.8, 1292.4, 1293.0, 0.7295648875010944, 12.194221116526103, 0.26646217570840747], "isController": false}, {"data": ["Login-7", 25, 0, 0.0, 372.12, 53, 1383, 73.0, 1361.4, 1376.7, 1383.0, 0.7295010213014298, 51.891801320396844, 0.24934116939013712], "isController": false}, {"data": ["Login-8", 25, 0, 0.0, 356.0800000000001, 48, 1376, 92.0, 1327.6000000000001, 1364.8999999999999, 1376.0, 0.7309086656531399, 60.669130894778384, 0.2698080816571161], "isController": false}, {"data": ["Login-9", 25, 0, 0.0, 70.48000000000002, 19, 187, 55.0, 143.60000000000002, 175.59999999999997, 187.0, 0.7575528014302597, 67.04519844095634, 0.27150574035635283], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-14", 19, 0, 0.0, 40.684210526315795, 3, 111, 39.0, 91.0, 111.0, 111.0, 1.033901071992164, 0.18275009182673996, 0.6714298953855363], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-13", 19, 0, 0.0, 40.94736842105263, 5, 128, 32.0, 97.0, 128.0, 128.0, 1.033901071992164, 0.1817404228111226, 0.6805169165260925], "isController": false}, {"data": ["signin : lbousquet1454@myschool.fr", 1, 0, 0.0, 2849.0, 2849, 2849, 2849.0, 2849.0, 2849.0, 2849.0, 0.351000351000351, 0.444577593015093, 0.3390032686907687], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-10", 19, 0, 0.0, 39.84210526315789, 15, 78, 41.0, 67.0, 78.0, 78.0, 1.0334511830296436, 0.6428793003807451, 0.6448977597225999], "isController": false}, {"data": ["signin : jsamson2604@myschool.fr", 1, 0, 0.0, 4246.0, 4246, 4246, 4246.0, 4246.0, 4246.0, 4246.0, 0.23551577955723035, 0.29830465438059345, 0.22102603921337727], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-12", 19, 0, 0.0, 47.84210526315789, 14, 112, 51.0, 108.0, 112.0, 112.0, 1.0340698813540872, 0.36555986040056604, 0.6069101549744205], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-11", 19, 0, 0.0, 45.05263157894736, 14, 105, 41.0, 78.0, 105.0, 105.0, 1.0327770832200902, 0.641451391531228, 0.6475028197532207], "isController": false}, {"data": ["Login", 25, 0, 0.0, 2944.84, 1161, 5020, 2641.0, 4337.200000000001, 4904.799999999999, 5020.0, 0.6711229228745537, 616.0475347977236, 4.4986208423934935], "isController": false}, {"data": ["signin : hdacosta3115@myschool.fr", 1, 0, 0.0, 3124.0, 3124, 3124, 3124.0, 3124.0, 3124.0, 3124.0, 0.3201024327784891, 0.40544224151728553, 0.2991582306338028], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave", 19, 1, 5.2631578947368425, 3241.2105263157896, 2343, 4552, 2796.0, 4401.0, 4552.0, 4552.0, 0.8402618078896161, 58.44423384154432, 8.113691706837079], "isController": false}, {"data": ["Login-15", 25, 0, 0.0, 35.879999999999995, 5, 86, 31.0, 80.0, 84.19999999999999, 86.0, 0.7633820880026871, 1.9263469876942807, 0.31310593453235214], "isController": false}, {"data": ["Login-10", 25, 0, 0.0, 79.80000000000003, 48, 208, 61.0, 136.60000000000005, 190.89999999999998, 208.0, 0.7586102260658474, 67.41852052040662, 0.26892139849795177], "isController": false}, {"data": ["signin : wlemoine7180@myschool.fr", 1, 0, 0.0, 2662.0, 2662, 2662, 2662.0, 2662.0, 2662.0, 2662.0, 0.3756574004507889, 0.47580825037565744, 0.3448417543200601], "isController": false}, {"data": ["Login-13", 25, 0, 0.0, 42.72, 7, 94, 36.0, 84.60000000000001, 91.89999999999999, 94.0, 0.7633121641426478, 1.1315506495786516, 0.31158641075354176], "isController": false}, {"data": ["Login-14", 25, 0, 0.0, 46.919999999999995, 8, 127, 45.0, 106.00000000000001, 121.6, 127.0, 0.7633587786259541, 4.872375954198473, 0.3041507633587786], "isController": false}, {"data": ["Login-11", 25, 0, 0.0, 72.72000000000001, 46, 166, 61.0, 129.60000000000002, 157.59999999999997, 166.0, 0.7599477155971669, 3.8902792237894035, 0.272364073851719], "isController": false}, {"data": ["Login-12", 25, 0, 0.0, 76.28, 25, 172, 80.0, 115.40000000000005, 158.79999999999995, 172.0, 0.7613362974693181, 55.02831695191399, 0.2765792018150257], "isController": false}, {"data": ["signin : pdupuis3453@myschool.fr", 1, 0, 0.0, 3247.0, 3247, 3247, 3247.0, 3247.0, 3247.0, 3247.0, 0.3079765937788728, 0.3900836348937481, 0.28722426470588236], "isController": false}, {"data": ["http://localhost/student/homeworks-13", 20, 0, 0.0, 29.0, 5, 113, 22.0, 60.30000000000004, 110.44999999999996, 113.0, 0.75125835774923, 0.13279078393809632, 0.4863370755390279], "isController": false}, {"data": ["http://localhost/student/homeworks-11", 20, 0, 0.0, 49.75, 14, 95, 53.0, 84.60000000000001, 94.5, 95.0, 0.7498219172946425, 0.26507376373111385, 0.4400810276309377], "isController": false}, {"data": ["http://localhost/student/homeworks-12", 20, 0, 0.0, 40.699999999999996, 5, 107, 31.0, 74.7, 105.39999999999998, 107.0, 0.7512865782652793, 0.13206209383569364, 0.49295844915668086], "isController": false}, {"data": ["http://localhost/student/homeworks-10", 20, 0, 0.0, 52.15, 17, 116, 48.5, 88.4, 114.64999999999998, 116.0, 0.750778933143136, 0.46630410300686964, 0.4721695634220504], "isController": false}, {"data": ["signin : oandre8445@myschool.fr", 1, 0, 0.0, 2920.0, 2920, 2920, 2920.0, 2920.0, 2920.0, 2920.0, 0.3424657534246575, 0.433767658390411, 0.3170483732876712], "isController": false}, {"data": ["signin : tpottier2194@myschool.fr", 1, 0, 0.0, 1513.0, 1513, 1513, 1513.0, 1513.0, 1513.0, 1513.0, 0.6609385327164573, 0.8371457782551224, 0.6086572620621282], "isController": false}, {"data": ["http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-10", 19, 0, 0.0, 47.63157894736842, 17, 103, 46.0, 84.0, 103.0, 103.0, 1.1168586879849518, 0.6936739507406536, 0.7002180446155655], "isController": false}, {"data": ["signin : aandre6209@myschool.fr", 1, 0, 0.0, 3081.0, 3081, 3081, 3081.0, 3081.0, 3081.0, 3081.0, 0.32456994482310936, 0.41110079925348914, 0.30745395163907824], "isController": false}, {"data": ["signin : gbertin2570@myschool.fr", 1, 0, 0.0, 4308.0, 4308, 4308, 4308.0, 4308.0, 4308.0, 4308.0, 0.23212627669452182, 0.29401150475858867, 0.2173916985840297], "isController": false}, {"data": ["signin : cbrun7753@myschool.fr", 1, 0, 0.0, 3036.0, 3036, 3036, 3036.0, 3036.0, 3036.0, 3036.0, 0.32938076416337286, 0.41719419054677204, 0.3123327363306983], "isController": false}, {"data": ["signin : mguerin9241@myschool.fr", 1, 0, 0.0, 3964.0, 3964, 3964, 3964.0, 3964.0, 3964.0, 3964.0, 0.2522704339051463, 0.31952612575681133, 0.23798167885973764], "isController": false}, {"data": ["http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-13", 19, 0, 0.0, 26.473684210526315, 4, 75, 19.0, 73.0, 75.0, 75.0, 1.1177785621837864, 0.19757609351100128, 0.7222816654900576], "isController": false}, {"data": ["http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-11", 19, 0, 0.0, 54.21052631578948, 16, 91, 56.0, 82.0, 91.0, 91.0, 1.1152852782343272, 0.3942707721883071, 0.6545766134949518], "isController": false}, {"data": ["http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-12", 19, 0, 0.0, 41.94736842105263, 6, 128, 30.0, 104.0, 128.0, 128.0, 1.1179758752574287, 0.19651919682259486, 0.732235124301265], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-7", 19, 0, 0.0, 10.526315789473685, 6, 19, 9.0, 17.0, 19.0, 19.0, 1.0339573356552025, 0.3200824955104484, 0.565339131203744], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-4", 19, 0, 0.0, 31.736842105263158, 5, 127, 16.0, 89.0, 127.0, 127.0, 0.9443809334459964, 0.16784895496794075, 0.61698324655798], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-6", 19, 0, 0.0, 19.89473684210526, 14, 42, 17.0, 33.0, 42.0, 42.0, 1.033901071992164, 0.3634808456222452, 0.6078207474016434], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-3", 19, 0, 0.0, 23.368421052631582, 11, 97, 18.0, 33.0, 97.0, 97.0, 0.9438179921514083, 0.9398886512095772, 0.5898862450946302], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-9", 19, 0, 0.0, 40.10526315789473, 14, 83, 39.0, 78.0, 83.0, 83.0, 1.032103862241295, 1.027541725514694, 0.6319620328371992], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-6", 19, 0, 0.0, 24.31578947368421, 15, 88, 20.0, 44.0, 88.0, 88.0, 0.9438648782911078, 0.3318274962742176, 0.5548893132141083], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-8", 19, 0, 0.0, 42.1578947368421, 14, 95, 47.0, 86.0, 95.0, 95.0, 1.0317115551694178, 0.3637716523675065, 0.6115712050662467], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-5", 19, 0, 0.0, 24.47368421052632, 13, 89, 21.0, 33.0, 89.0, 89.0, 0.9436773616767656, 0.5861121113539287, 0.5934845907420284], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-8", 19, 0, 0.0, 50.63157894736842, 14, 98, 52.0, 80.0, 98.0, 98.0, 0.9428344581183009, 0.3323859759577213, 0.558887222732235], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-7", 19, 0, 0.0, 14.684210526315791, 6, 82, 10.0, 19.0, 82.0, 82.0, 0.9440993788819875, 0.29226513975155277, 0.516207298136646], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-9", 19, 0, 0.0, 41.3157894736842, 13, 102, 41.0, 71.0, 102.0, 102.0, 0.9425538247842048, 0.9399377728445282, 0.5771301251364223], "isController": false}, {"data": ["signin : sbarbe5230@myschool.fr", 1, 0, 0.0, 14044.0, 14044, 14044, 14044.0, 14044.0, 14044.0, 14044.0, 0.07120478496154942, 0.09018809188977499, 0.06445980044859015], "isController": false}, {"data": ["Transaction Controller", 20, 0, 0.0, 6189.85, 3191, 17077, 5416.0, 7981.9000000000015, 16626.09999999999, 17077.0, 0.6002581109877247, 551.6089496608541, 4.586493676655961], "isController": true}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-1", 19, 0, 0.0, 1333.9473684210525, 849, 2138, 1254.0, 1973.0, 2138.0, 2138.0, 0.9893256964332204, 62.64837851470972, 1.010580740692528], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-0", 19, 0, 0.0, 1265.6315789473683, 875, 1886, 1036.0, 1872.0, 1886.0, 1886.0, 1.0379110674095926, 1.4494265882770676, 0.6392520724079537], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-3", 19, 0, 0.0, 20.0, 13, 38, 19.0, 30.0, 38.0, 38.0, 1.0334511830296436, 1.0289362081860212, 0.6459069893935273], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-0", 19, 0, 0.0, 1414.3157894736842, 936, 2403, 1377.0, 2113.0, 2403.0, 2403.0, 0.9311899627524015, 1.3031203287345619, 0.577446900730249], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-2", 19, 0, 0.0, 20.526315789473685, 3, 114, 10.0, 65.0, 114.0, 114.0, 1.034520309267124, 0.183869820592399, 0.6758731317379941], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-5", 19, 0, 0.0, 19.736842105263154, 12, 53, 18.0, 24.0, 53.0, 53.0, 1.0337885630338974, 0.6420796153218347, 0.650156088470537], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-2", 19, 0, 0.0, 33.210526315789465, 5, 173, 22.0, 89.0, 173.0, 173.0, 0.9443809334459964, 0.16784895496794075, 0.61698324655798], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-4", 19, 0, 0.0, 28.0, 4, 116, 13.0, 100.0, 116.0, 116.0, 1.034295046271094, 0.183829783614589, 0.6757259628470331], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-1", 19, 0, 0.0, 1717.4736842105262, 1185, 2760, 1593.0, 2143.0, 2760.0, 2760.0, 0.8850794242325429, 54.95357882156333, 0.9066878086132203], "isController": false}, {"data": ["http://localhost/student/homeworks-8", 20, 0, 0.0, 48.35, 18, 126, 45.0, 68.9, 123.14999999999996, 126.0, 0.7504972043979137, 0.7475655746932343, 0.4595329562084881], "isController": false}, {"data": ["http://localhost/student/homeworks-9", 20, 0, 0.0, 51.00000000000001, 14, 131, 52.0, 75.9, 128.24999999999994, 131.0, 0.7498781448014697, 0.46647693187357053, 0.4694061433767013], "isController": false}, {"data": ["signin : opons9926@myschool.fr", 1, 0, 0.0, 3039.0, 3039, 3039, 3039.0, 3039.0, 3039.0, 3039.0, 0.3290556103981573, 0.41678235027969723, 0.2975639601842711], "isController": false}, {"data": ["http://localhost/student/homeworks-6", 20, 0, 0.0, 12.749999999999998, 7, 63, 10.0, 17.400000000000013, 60.74999999999997, 63.0, 0.7498500299940013, 2.8871056843318836, 0.4466147786067786], "isController": false}, {"data": ["signin : aollivier9071@myschool.fr", 1, 0, 0.0, 1500.0, 1500, 1500, 1500.0, 1500.0, 1500.0, 1500.0, 0.6666666666666666, 0.8444010416666666, 0.6412760416666666], "isController": false}, {"data": ["http://localhost/student/homeworks-7", 20, 0, 0.0, 46.5, 17, 118, 50.5, 73.10000000000002, 115.79999999999997, 118.0, 0.7500750075007501, 0.2644307399489949, 0.44462454057905787], "isController": false}, {"data": ["http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88", 19, 0, 0.0, 1755.6315789473683, 926, 2612, 1773.0, 2525.0, 2612.0, 2612.0, 1.017948031074203, 69.073445452719, 8.793143500535763], "isController": false}, {"data": ["http://localhost/student/homeworks-4", 20, 0, 0.0, 19.950000000000003, 13, 34, 19.0, 27.0, 33.64999999999999, 34.0, 0.7506380423359856, 0.46621659660711606, 0.47354704623930344], "isController": false}, {"data": ["http://localhost/student/homeworks-5", 20, 0, 0.0, 18.5, 15, 28, 17.0, 25.900000000000002, 27.9, 28.0, 0.7511172869643594, 0.26406467119840765, 0.44157481128178167], "isController": false}, {"data": ["http://localhost/student/homeworks-2", 20, 0, 0.0, 20.7, 14, 50, 18.0, 26.900000000000002, 48.84999999999998, 50.0, 0.7511454968827461, 0.7477712104709682, 0.46946593555171634], "isController": false}, {"data": ["http://localhost/student/homeworks-3", 20, 0, 0.0, 41.64999999999999, 5, 168, 23.5, 97.00000000000003, 164.49999999999994, 168.0, 0.7512865782652793, 0.13352945043386802, 0.4892900576612449], "isController": false}, {"data": ["http://localhost/student/homeworks-0", 20, 0, 0.0, 2088.9999999999995, 1233, 3356, 1985.0, 3279.7000000000007, 3354.05, 3356.0, 0.711490572749911, 43.316261728477414, 0.6823083422269655], "isController": false}, {"data": ["http://localhost/student/homeworks-1", 20, 0, 0.0, 38.199999999999996, 7, 168, 25.5, 97.7, 164.49999999999994, 168.0, 0.7511737089201878, 0.1335093896713615, 0.4892165492957746], "isController": false}, {"data": ["signin : gmartin3967@myschool.fr", 1, 0, 0.0, 1799.0, 1799, 1799, 1799.0, 1799.0, 1799.0, 1799.0, 0.5558643690939411, 0.7040586784324625, 0.5303510630906059], "isController": false}, {"data": ["signin : ttessier9584@myschool.fr", 1, 0, 0.0, 1623.0, 1623, 1623, 1623.0, 1623.0, 1623.0, 1623.0, 0.6161429451632779, 0.7804076170671596, 0.5824476278496611], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join", 19, 0, 0.0, 2700.736842105263, 1937, 3921, 2241.0, 3719.0, 3921.0, 3921.0, 0.9363295880149812, 66.15310990784545, 9.066650342499507], "isController": false}, {"data": ["signin : mantoine7614@myschool.fr", 1, 0, 0.0, 2876.0, 2876, 2876, 2876.0, 2876.0, 2876.0, 2876.0, 0.3477051460361613, 0.4404038812586926, 0.33480202538247567], "isController": false}, {"data": ["http://localhost/student/homeworks", 20, 0, 0.0, 2199.45, 1311, 3571, 2074.5, 3395.8000000000006, 3564.0, 3571.0, 0.7086921087133695, 49.858427677970305, 6.414563290634634], "isController": false}, {"data": ["signin : nbreton8363@myschool.fr", 1, 0, 0.0, 2217.0, 2217, 2217, 2217.0, 2217.0, 2217.0, 2217.0, 0.4510599909788002, 0.5713132893549842, 0.4347619248985115], "isController": false}, {"data": ["http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-1", 19, 0, 0.0, 28.42105263157894, 6, 69, 24.0, 61.0, 69.0, 69.0, 1.1169900058788949, 0.19852752057613166, 0.7261353615520282], "isController": false}, {"data": ["http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-0", 19, 0, 0.0, 1645.578947368421, 852, 2421, 1664.0, 2399.0, 2421.0, 2421.0, 1.0227150392937883, 63.329799527667134, 0.6190117343093983], "isController": false}, {"data": ["http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-3", 19, 0, 0.0, 32.68421052631578, 5, 94, 26.0, 60.0, 94.0, 94.0, 1.1173184357541899, 0.19858589385474862, 0.726348867980006], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-11", 19, 0, 0.0, 48.15789473684211, 14, 85, 42.0, 79.0, 85.0, 85.0, 0.9428812465882587, 0.5856176492481763, 0.5911423440524044], "isController": false}, {"data": ["http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-2", 19, 0, 0.0, 20.210526315789476, 12, 35, 20.0, 27.0, 35.0, 35.0, 1.116530528295234, 1.111996918522654, 0.6978315801845214], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-10", 19, 0, 0.0, 43.57894736842105, 12, 77, 41.0, 72.0, 77.0, 77.0, 0.9431620749565649, 0.5867131267063788, 0.5885552401340283], "isController": false}, {"data": ["http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-5", 19, 0, 0.0, 18.999999999999996, 15, 29, 17.0, 28.0, 29.0, 29.0, 1.116727400963912, 0.39259947690137537, 0.6565135697072999], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-13", 19, 0, 0.0, 39.31578947368421, 6, 136, 23.0, 117.0, 136.0, 136.0, 0.9443809334459964, 0.16600446095730403, 0.6215944815845718], "isController": false}, {"data": ["http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-4", 19, 0, 0.0, 21.94736842105263, 13, 41, 22.0, 30.0, 41.0, 41.0, 1.116530528295234, 0.6934701328083681, 0.7021930275606746], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-12", 19, 0, 0.0, 46.42105263157895, 15, 83, 51.0, 80.0, 83.0, 83.0, 0.9411997820379452, 0.33272882919700797, 0.552403387700005], "isController": false}, {"data": ["http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-7", 19, 0, 0.0, 56.8421052631579, 18, 105, 59.0, 89.0, 105.0, 105.0, 1.1145002346316284, 0.3929621509854529, 0.660646135177147], "isController": false}, {"data": ["http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-6", 19, 0, 0.0, 11.736842105263161, 6, 29, 9.0, 20.0, 29.0, 29.0, 1.117121354656632, 0.34582760686147695, 0.6108109051622767], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-14", 19, 1, 5.2631578947368425, 38.21052631578949, 7, 128, 20.0, 104.0, 128.0, 128.0, 0.9440055646643811, 0.2933520581805535, 0.5807846735728127], "isController": false}, {"data": ["http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-9", 19, 0, 0.0, 46.84210526315789, 15, 88, 46.0, 72.0, 88.0, 88.0, 1.1148272017837235, 0.6935009057971014, 0.6956783026755853], "isController": false}, {"data": ["http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-8", 19, 0, 0.0, 45.57894736842106, 12, 91, 45.0, 70.0, 91.0, 91.0, 1.1159403265593797, 1.1124988987430988, 0.683295492922589], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, 50.0, 0.05924170616113744], "isController": false}, {"data": ["Assertion failed", 1, 50.0, 0.05924170616113744], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1688, 2, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "Assertion failed", 1, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave", 19, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-14", 19, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
