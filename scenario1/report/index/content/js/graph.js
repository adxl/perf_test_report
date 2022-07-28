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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 25.0, "series": [{"data": [[3500.0, 1.0]], "isOverall": false, "label": "signin : alaunay3671@myschool.fr", "isController": false}, {"data": [[2100.0, 2.0], [0.0, 14.0], [700.0, 1.0], [800.0, 5.0], [200.0, 1.0], [900.0, 4.0], [1100.0, 4.0], [300.0, 3.0], [1200.0, 1.0], [1400.0, 1.0], [100.0, 9.0], [1600.0, 3.0], [1700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Login-0", "isController": false}, {"data": [[0.0, 24.0], [2300.0, 1.0], [600.0, 6.0], [700.0, 1.0], [1000.0, 1.0], [300.0, 2.0], [1200.0, 3.0], [1300.0, 3.0], [1500.0, 2.0], [400.0, 1.0], [100.0, 1.0], [1700.0, 1.0], [1800.0, 2.0], [500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Login-1", "isController": false}, {"data": [[0.0, 15.0], [300.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "Login-2", "isController": false}, {"data": [[0.0, 15.0], [1300.0, 4.0], [1400.0, 1.0], [700.0, 1.0], [400.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "Login-3", "isController": false}, {"data": [[2100.0, 1.0], [0.0, 5.0], [1100.0, 1.0], [300.0, 1.0], [1400.0, 1.0], [100.0, 10.0], [200.0, 2.0], [2000.0, 4.0]], "isOverall": false, "label": "Login-4", "isController": false}, {"data": [[2500.0, 1.0]], "isOverall": false, "label": "signin : mlesage4961@myschool.fr", "isController": false}, {"data": [[0.0, 17.0], [1200.0, 2.0], [600.0, 1.0], [1300.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "Login-5", "isController": false}, {"data": [[0.0, 16.0], [1200.0, 5.0], [600.0, 1.0], [200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Login-6", "isController": false}, {"data": [[0.0, 15.0], [1200.0, 1.0], [1300.0, 4.0], [700.0, 1.0], [400.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "Login-7", "isController": false}, {"data": [[0.0, 15.0], [300.0, 1.0], [1200.0, 2.0], [1300.0, 3.0], [400.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "Login-8", "isController": false}, {"data": [[0.0, 21.0], [100.0, 4.0]], "isOverall": false, "label": "Login-9", "isController": false}, {"data": [[0.0, 18.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-14", "isController": false}, {"data": [[0.0, 18.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-13", "isController": false}, {"data": [[2800.0, 1.0]], "isOverall": false, "label": "signin : lbousquet1454@myschool.fr", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-10", "isController": false}, {"data": [[4200.0, 1.0]], "isOverall": false, "label": "signin : jsamson2604@myschool.fr", "isController": false}, {"data": [[0.0, 17.0], [100.0, 2.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-12", "isController": false}, {"data": [[0.0, 18.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-11", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [2400.0, 1.0], [2500.0, 6.0], [2600.0, 1.0], [2900.0, 2.0], [3000.0, 1.0], [3100.0, 1.0], [3600.0, 2.0], [3700.0, 2.0], [3900.0, 1.0], [4100.0, 1.0], [4600.0, 1.0], [1100.0, 1.0], [5000.0, 1.0], [1400.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "Login", "isController": false}, {"data": [[3100.0, 1.0]], "isOverall": false, "label": "signin : hdacosta3115@myschool.fr", "isController": false}, {"data": [[4100.0, 1.0], [4300.0, 1.0], [2300.0, 2.0], [4400.0, 1.0], [4500.0, 1.0], [2400.0, 1.0], [2500.0, 1.0], [2600.0, 2.0], [2700.0, 4.0], [3400.0, 2.0], [3500.0, 1.0], [3800.0, 2.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "Login-15", "isController": false}, {"data": [[0.0, 20.0], [100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "Login-10", "isController": false}, {"data": [[2600.0, 1.0]], "isOverall": false, "label": "signin : wlemoine7180@myschool.fr", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "Login-13", "isController": false}, {"data": [[0.0, 22.0], [100.0, 3.0]], "isOverall": false, "label": "Login-14", "isController": false}, {"data": [[0.0, 20.0], [100.0, 5.0]], "isOverall": false, "label": "Login-11", "isController": false}, {"data": [[0.0, 22.0], [100.0, 3.0]], "isOverall": false, "label": "Login-12", "isController": false}, {"data": [[3200.0, 1.0]], "isOverall": false, "label": "signin : pdupuis3453@myschool.fr", "isController": false}, {"data": [[0.0, 19.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks-13", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http://localhost/student/homeworks-11", "isController": false}, {"data": [[0.0, 19.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks-12", "isController": false}, {"data": [[0.0, 19.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks-10", "isController": false}, {"data": [[2900.0, 1.0]], "isOverall": false, "label": "signin : oandre8445@myschool.fr", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "signin : tpottier2194@myschool.fr", "isController": false}, {"data": [[0.0, 18.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-10", "isController": false}, {"data": [[3000.0, 1.0]], "isOverall": false, "label": "signin : aandre6209@myschool.fr", "isController": false}, {"data": [[4300.0, 1.0]], "isOverall": false, "label": "signin : gbertin2570@myschool.fr", "isController": false}, {"data": [[3000.0, 1.0]], "isOverall": false, "label": "signin : cbrun7753@myschool.fr", "isController": false}, {"data": [[3900.0, 1.0]], "isOverall": false, "label": "signin : mguerin9241@myschool.fr", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-13", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-11", "isController": false}, {"data": [[0.0, 17.0], [100.0, 2.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-12", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-7", "isController": false}, {"data": [[0.0, 18.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-4", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-6", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-3", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-9", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-6", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-8", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-5", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-8", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-7", "isController": false}, {"data": [[0.0, 18.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-9", "isController": false}, {"data": [[14000.0, 1.0]], "isOverall": false, "label": "signin : sbarbe5230@myschool.fr", "isController": false}, {"data": [[3100.0, 1.0], [4200.0, 1.0], [17000.0, 1.0], [4500.0, 1.0], [5100.0, 2.0], [5200.0, 3.0], [5300.0, 2.0], [5600.0, 2.0], [5400.0, 1.0], [6100.0, 1.0], [6400.0, 2.0], [6800.0, 1.0], [7200.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[2100.0, 1.0], [1100.0, 2.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [1500.0, 3.0], [800.0, 2.0], [1700.0, 1.0], [900.0, 2.0], [1800.0, 1.0], [1900.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-1", "isController": false}, {"data": [[1300.0, 3.0], [1400.0, 1.0], [1500.0, 1.0], [800.0, 2.0], [1700.0, 2.0], [900.0, 3.0], [1800.0, 2.0], [1000.0, 5.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-0", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-3", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 2.0], [1200.0, 2.0], [2400.0, 1.0], [1300.0, 2.0], [1400.0, 2.0], [1500.0, 1.0], [1600.0, 2.0], [900.0, 3.0], [1000.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-0", "isController": false}, {"data": [[0.0, 18.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-2", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-5", "isController": false}, {"data": [[0.0, 18.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-2", "isController": false}, {"data": [[0.0, 17.0], [100.0, 2.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-4", "isController": false}, {"data": [[2100.0, 2.0], [1100.0, 1.0], [1200.0, 3.0], [1300.0, 1.0], [1400.0, 4.0], [2700.0, 1.0], [1500.0, 1.0], [1900.0, 3.0], [2000.0, 3.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-1", "isController": false}, {"data": [[0.0, 19.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks-8", "isController": false}, {"data": [[0.0, 19.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks-9", "isController": false}, {"data": [[3000.0, 1.0]], "isOverall": false, "label": "signin : opons9926@myschool.fr", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http://localhost/student/homeworks-6", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "signin : aollivier9071@myschool.fr", "isController": false}, {"data": [[0.0, 19.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks-7", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [1200.0, 2.0], [2500.0, 1.0], [1300.0, 2.0], [2600.0, 1.0], [1500.0, 3.0], [1600.0, 1.0], [1700.0, 2.0], [900.0, 1.0], [1800.0, 2.0], [1900.0, 2.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http://localhost/student/homeworks-4", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http://localhost/student/homeworks-5", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http://localhost/student/homeworks-2", "isController": false}, {"data": [[0.0, 19.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks-3", "isController": false}, {"data": [[2200.0, 1.0], [2300.0, 1.0], [2400.0, 2.0], [2800.0, 1.0], [2700.0, 1.0], [2900.0, 1.0], [3300.0, 2.0], [1200.0, 3.0], [1300.0, 2.0], [1500.0, 2.0], [1700.0, 1.0], [1900.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks-0", "isController": false}, {"data": [[0.0, 19.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks-1", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "signin : gmartin3967@myschool.fr", "isController": false}, {"data": [[1600.0, 1.0]], "isOverall": false, "label": "signin : ttessier9584@myschool.fr", "isController": false}, {"data": [[2100.0, 3.0], [2200.0, 1.0], [2900.0, 1.0], [3000.0, 2.0], [3200.0, 1.0], [3300.0, 1.0], [3500.0, 1.0], [3700.0, 1.0], [3600.0, 1.0], [1900.0, 1.0], [3900.0, 1.0], [2000.0, 5.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join", "isController": false}, {"data": [[2800.0, 1.0]], "isOverall": false, "label": "signin : mantoine7614@myschool.fr", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [2400.0, 2.0], [2700.0, 1.0], [2800.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [3400.0, 1.0], [3500.0, 1.0], [1300.0, 3.0], [1400.0, 2.0], [1600.0, 2.0], [1800.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks", "isController": false}, {"data": [[2200.0, 1.0]], "isOverall": false, "label": "signin : nbreton8363@myschool.fr", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-1", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [2400.0, 1.0], [800.0, 1.0], [1100.0, 1.0], [1200.0, 3.0], [1300.0, 1.0], [1400.0, 2.0], [1500.0, 1.0], [1600.0, 2.0], [1700.0, 1.0], [1800.0, 3.0], [2000.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-0", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-3", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-11", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-2", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-10", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-5", "isController": false}, {"data": [[0.0, 16.0], [100.0, 3.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-13", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-4", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-12", "isController": false}, {"data": [[0.0, 18.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-7", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-6", "isController": false}, {"data": [[0.0, 16.0], [100.0, 3.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-14", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-9", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-8", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 17000.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 2.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1369.0, "series": [{"data": [[0.0, 1369.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 138.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 179.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 2.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.65901422E12, "maxY": 9.547044632086847, "series": [{"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-37", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-16", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-35", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-46", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-9", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-28", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-39", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-18", "isController": false}, {"data": [[1.65901422E12, 9.547044632086847]], "isOverall": false, "label": "jp@gc - Ultimate Thread Group", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-41", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-22", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-12", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-20", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-21", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-10", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-43", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.65901422E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 5.0, "minX": 0.0, "maxY": 14044.0, "series": [{"data": [[10.0, 3534.0]], "isOverall": false, "label": "signin : alaunay3671@myschool.fr", "isController": false}, {"data": [[10.0, 3534.0]], "isOverall": false, "label": "signin : alaunay3671@myschool.fr-Aggregated", "isController": false}, {"data": [[0.0, 101.04], [4.0, 1694.0], [2.0, 1696.0], [1.0, 2176.0], [10.0, 987.45], [5.0, 1432.0], [3.0, 1612.0]], "isOverall": false, "label": "Login-0", "isController": false}, {"data": [[4.300000000000001, 617.6999999999999]], "isOverall": false, "label": "Login-0-Aggregated", "isController": false}, {"data": [[0.0, 61.23999999999999], [4.0, 1855.0], [2.0, 1860.0], [1.0, 601.0], [10.0, 965.15], [5.0, 2353.0], [3.0, 2009.0]], "isOverall": false, "label": "Login-1", "isController": false}, {"data": [[4.300000000000001, 590.24]], "isOverall": false, "label": "Login-1-Aggregated", "isController": false}, {"data": [[4.0, 22.0], [2.0, 36.0], [1.0, 22.0], [10.0, 93.85], [5.0, 85.0], [3.0, 57.0]], "isOverall": false, "label": "Login-2", "isController": false}, {"data": [[8.6, 83.96]], "isOverall": false, "label": "Login-2-Aggregated", "isController": false}, {"data": [[4.0, 45.0], [2.0, 110.0], [1.0, 54.0], [10.0, 450.70000000000005], [5.0, 62.0], [3.0, 45.0]], "isOverall": false, "label": "Login-3", "isController": false}, {"data": [[8.6, 373.20000000000005]], "isOverall": false, "label": "Login-3-Aggregated", "isController": false}, {"data": [[4.0, 65.0], [2.0, 111.0], [1.0, 70.0], [10.0, 762.0500000000001], [5.0, 126.0], [3.0, 102.0]], "isOverall": false, "label": "Login-4", "isController": false}, {"data": [[8.6, 628.6]], "isOverall": false, "label": "Login-4-Aggregated", "isController": false}, {"data": [[10.0, 2599.0]], "isOverall": false, "label": "signin : mlesage4961@myschool.fr", "isController": false}, {"data": [[10.0, 2599.0]], "isOverall": false, "label": "signin : mlesage4961@myschool.fr-Aggregated", "isController": false}, {"data": [[4.0, 45.0], [2.0, 86.0], [1.0, 49.0], [10.0, 408.85], [5.0, 48.0], [3.0, 56.0]], "isOverall": false, "label": "Login-5", "isController": false}, {"data": [[8.6, 338.44]], "isOverall": false, "label": "Login-5-Aggregated", "isController": false}, {"data": [[4.0, 46.0], [2.0, 60.0], [1.0, 64.0], [10.0, 406.4], [5.0, 76.0], [3.0, 56.0]], "isOverall": false, "label": "Login-6", "isController": false}, {"data": [[8.6, 337.19999999999993]], "isOverall": false, "label": "Login-6-Aggregated", "isController": false}, {"data": [[4.0, 53.0], [2.0, 73.0], [1.0, 67.0], [10.0, 449.7], [5.0, 60.0], [3.0, 56.0]], "isOverall": false, "label": "Login-7", "isController": false}, {"data": [[8.6, 372.12]], "isOverall": false, "label": "Login-7-Aggregated", "isController": false}, {"data": [[4.0, 56.0], [2.0, 48.0], [1.0, 51.0], [10.0, 430.20000000000005], [5.0, 81.0], [3.0, 62.0]], "isOverall": false, "label": "Login-8", "isController": false}, {"data": [[8.6, 356.0800000000001]], "isOverall": false, "label": "Login-8-Aggregated", "isController": false}, {"data": [[4.0, 40.0], [2.0, 49.0], [1.0, 51.0], [10.0, 75.80000000000001], [5.0, 43.0], [3.0, 63.0]], "isOverall": false, "label": "Login-9", "isController": false}, {"data": [[8.6, 70.48000000000002]], "isOverall": false, "label": "Login-9-Aggregated", "isController": false}, {"data": [[10.0, 40.684210526315795]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-14", "isController": false}, {"data": [[10.0, 40.684210526315795]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-14-Aggregated", "isController": false}, {"data": [[10.0, 40.94736842105263]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-13", "isController": false}, {"data": [[10.0, 40.94736842105263]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-13-Aggregated", "isController": false}, {"data": [[10.0, 2849.0]], "isOverall": false, "label": "signin : lbousquet1454@myschool.fr", "isController": false}, {"data": [[10.0, 2849.0]], "isOverall": false, "label": "signin : lbousquet1454@myschool.fr-Aggregated", "isController": false}, {"data": [[10.0, 39.84210526315789]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-10", "isController": false}, {"data": [[10.0, 39.84210526315789]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-10-Aggregated", "isController": false}, {"data": [[10.0, 4246.0]], "isOverall": false, "label": "signin : jsamson2604@myschool.fr", "isController": false}, {"data": [[10.0, 4246.0]], "isOverall": false, "label": "signin : jsamson2604@myschool.fr-Aggregated", "isController": false}, {"data": [[10.0, 47.84210526315789]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-12", "isController": false}, {"data": [[10.0, 47.84210526315789]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-12-Aggregated", "isController": false}, {"data": [[10.0, 45.05263157894736]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-11", "isController": false}, {"data": [[10.0, 45.05263157894736]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-11-Aggregated", "isController": false}, {"data": [[4.0, 3686.0], [2.0, 3703.0], [1.0, 2907.0], [10.0, 2780.8], [5.0, 3954.0], [3.0, 3755.0]], "isOverall": false, "label": "Login", "isController": false}, {"data": [[8.6, 2944.84]], "isOverall": false, "label": "Login-Aggregated", "isController": false}, {"data": [[10.0, 3124.0]], "isOverall": false, "label": "signin : hdacosta3115@myschool.fr", "isController": false}, {"data": [[10.0, 3124.0]], "isOverall": false, "label": "signin : hdacosta3115@myschool.fr-Aggregated", "isController": false}, {"data": [[8.0, 3895.0], [9.0, 3836.0], [10.0, 3095.6875], [7.0, 4321.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave", "isController": false}, {"data": [[9.68421052631579, 3241.2105263157896]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-Aggregated", "isController": false}, {"data": [[4.0, 6.0], [2.0, 18.0], [1.0, 5.0], [10.0, 41.9], [5.0, 10.0], [3.0, 20.0]], "isOverall": false, "label": "Login-15", "isController": false}, {"data": [[8.6, 35.879999999999995]], "isOverall": false, "label": "Login-15-Aggregated", "isController": false}, {"data": [[4.0, 57.0], [2.0, 51.0], [1.0, 61.0], [10.0, 85.35000000000002], [5.0, 63.0], [3.0, 56.0]], "isOverall": false, "label": "Login-10", "isController": false}, {"data": [[8.6, 79.80000000000003]], "isOverall": false, "label": "Login-10-Aggregated", "isController": false}, {"data": [[10.0, 2662.0]], "isOverall": false, "label": "signin : wlemoine7180@myschool.fr", "isController": false}, {"data": [[10.0, 2662.0]], "isOverall": false, "label": "signin : wlemoine7180@myschool.fr-Aggregated", "isController": false}, {"data": [[4.0, 29.0], [2.0, 16.0], [1.0, 7.0], [10.0, 47.449999999999996], [5.0, 40.0], [3.0, 27.0]], "isOverall": false, "label": "Login-13", "isController": false}, {"data": [[8.6, 42.72]], "isOverall": false, "label": "Login-13-Aggregated", "isController": false}, {"data": [[4.0, 13.0], [2.0, 23.0], [1.0, 10.0], [10.0, 54.199999999999996], [5.0, 21.0], [3.0, 22.0]], "isOverall": false, "label": "Login-14", "isController": false}, {"data": [[8.6, 46.919999999999995]], "isOverall": false, "label": "Login-14-Aggregated", "isController": false}, {"data": [[4.0, 58.0], [2.0, 56.0], [1.0, 61.0], [10.0, 76.75], [5.0, 47.0], [3.0, 61.0]], "isOverall": false, "label": "Login-11", "isController": false}, {"data": [[8.6, 72.72000000000001]], "isOverall": false, "label": "Login-11-Aggregated", "isController": false}, {"data": [[4.0, 80.0], [2.0, 25.0], [1.0, 43.0], [10.0, 82.8], [5.0, 57.0], [3.0, 46.0]], "isOverall": false, "label": "Login-12", "isController": false}, {"data": [[8.6, 76.28]], "isOverall": false, "label": "Login-12-Aggregated", "isController": false}, {"data": [[10.0, 3247.0]], "isOverall": false, "label": "signin : pdupuis3453@myschool.fr", "isController": false}, {"data": [[10.0, 3247.0]], "isOverall": false, "label": "signin : pdupuis3453@myschool.fr-Aggregated", "isController": false}, {"data": [[10.0, 29.94736842105263], [6.0, 11.0]], "isOverall": false, "label": "http://localhost/student/homeworks-13", "isController": false}, {"data": [[9.8, 29.0]], "isOverall": false, "label": "http://localhost/student/homeworks-13-Aggregated", "isController": false}, {"data": [[10.0, 48.73684210526316], [6.0, 69.0]], "isOverall": false, "label": "http://localhost/student/homeworks-11", "isController": false}, {"data": [[9.8, 49.75]], "isOverall": false, "label": "http://localhost/student/homeworks-11-Aggregated", "isController": false}, {"data": [[10.0, 42.57894736842105], [6.0, 5.0]], "isOverall": false, "label": "http://localhost/student/homeworks-12", "isController": false}, {"data": [[9.8, 40.699999999999996]], "isOverall": false, "label": "http://localhost/student/homeworks-12-Aggregated", "isController": false}, {"data": [[10.0, 52.421052631578945], [6.0, 47.0]], "isOverall": false, "label": "http://localhost/student/homeworks-10", "isController": false}, {"data": [[9.8, 52.15]], "isOverall": false, "label": "http://localhost/student/homeworks-10-Aggregated", "isController": false}, {"data": [[10.0, 2920.0]], "isOverall": false, "label": "signin : oandre8445@myschool.fr", "isController": false}, {"data": [[10.0, 2920.0]], "isOverall": false, "label": "signin : oandre8445@myschool.fr-Aggregated", "isController": false}, {"data": [[10.0, 1513.0]], "isOverall": false, "label": "signin : tpottier2194@myschool.fr", "isController": false}, {"data": [[10.0, 1513.0]], "isOverall": false, "label": "signin : tpottier2194@myschool.fr-Aggregated", "isController": false}, {"data": [[10.0, 47.63157894736842]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-10", "isController": false}, {"data": [[10.0, 47.63157894736842]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-10-Aggregated", "isController": false}, {"data": [[10.0, 3081.0]], "isOverall": false, "label": "signin : aandre6209@myschool.fr", "isController": false}, {"data": [[10.0, 3081.0]], "isOverall": false, "label": "signin : aandre6209@myschool.fr-Aggregated", "isController": false}, {"data": [[10.0, 4308.0]], "isOverall": false, "label": "signin : gbertin2570@myschool.fr", "isController": false}, {"data": [[10.0, 4308.0]], "isOverall": false, "label": "signin : gbertin2570@myschool.fr-Aggregated", "isController": false}, {"data": [[10.0, 3036.0]], "isOverall": false, "label": "signin : cbrun7753@myschool.fr", "isController": false}, {"data": [[10.0, 3036.0]], "isOverall": false, "label": "signin : cbrun7753@myschool.fr-Aggregated", "isController": false}, {"data": [[10.0, 3964.0]], "isOverall": false, "label": "signin : mguerin9241@myschool.fr", "isController": false}, {"data": [[10.0, 3964.0]], "isOverall": false, "label": "signin : mguerin9241@myschool.fr-Aggregated", "isController": false}, {"data": [[10.0, 26.473684210526315]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-13", "isController": false}, {"data": [[10.0, 26.473684210526315]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-13-Aggregated", "isController": false}, {"data": [[10.0, 54.21052631578948]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-11", "isController": false}, {"data": [[10.0, 54.21052631578948]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-11-Aggregated", "isController": false}, {"data": [[10.0, 41.94736842105263]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-12", "isController": false}, {"data": [[10.0, 41.94736842105263]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-12-Aggregated", "isController": false}, {"data": [[10.0, 10.526315789473685]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-7", "isController": false}, {"data": [[10.0, 10.526315789473685]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-7-Aggregated", "isController": false}, {"data": [[8.0, 14.0], [9.0, 7.0], [10.0, 35.8125], [7.0, 9.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-4", "isController": false}, {"data": [[9.68421052631579, 31.736842105263158]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-4-Aggregated", "isController": false}, {"data": [[10.0, 19.89473684210526]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-6", "isController": false}, {"data": [[10.0, 19.89473684210526]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-6-Aggregated", "isController": false}, {"data": [[8.0, 22.0], [9.0, 31.0], [10.0, 23.125000000000004], [7.0, 21.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-3", "isController": false}, {"data": [[9.68421052631579, 23.368421052631582]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-3-Aggregated", "isController": false}, {"data": [[10.0, 40.10526315789473]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-9", "isController": false}, {"data": [[10.0, 40.10526315789473]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-9-Aggregated", "isController": false}, {"data": [[8.0, 18.0], [9.0, 15.0], [10.0, 25.562499999999996], [7.0, 20.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-6", "isController": false}, {"data": [[9.68421052631579, 24.31578947368421]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-6-Aggregated", "isController": false}, {"data": [[10.0, 42.1578947368421]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-8", "isController": false}, {"data": [[10.0, 42.1578947368421]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-8-Aggregated", "isController": false}, {"data": [[8.0, 20.0], [9.0, 15.0], [10.0, 25.4375], [7.0, 23.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-5", "isController": false}, {"data": [[9.68421052631579, 24.47368421052632]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-5-Aggregated", "isController": false}, {"data": [[8.0, 20.0], [9.0, 50.0], [10.0, 52.625], [7.0, 50.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-8", "isController": false}, {"data": [[9.68421052631579, 50.63157894736842]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-8-Aggregated", "isController": false}, {"data": [[8.0, 10.0], [9.0, 11.0], [10.0, 15.187500000000002], [7.0, 15.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-7", "isController": false}, {"data": [[9.68421052631579, 14.684210526315791]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-7-Aggregated", "isController": false}, {"data": [[8.0, 41.0], [9.0, 39.0], [10.0, 40.43749999999999], [7.0, 58.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-9", "isController": false}, {"data": [[9.68421052631579, 41.3157894736842]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-9-Aggregated", "isController": false}, {"data": [[10.0, 14044.0]], "isOverall": false, "label": "signin : sbarbe5230@myschool.fr", "isController": false}, {"data": [[10.0, 14044.0]], "isOverall": false, "label": "signin : sbarbe5230@myschool.fr-Aggregated", "isController": false}, {"data": [[10.0, 6189.85]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[10.0, 6189.85]], "isOverall": false, "label": "Transaction Controller-Aggregated", "isController": true}, {"data": [[10.0, 1333.9473684210525]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-1", "isController": false}, {"data": [[10.0, 1333.9473684210525]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-1-Aggregated", "isController": false}, {"data": [[10.0, 1265.6315789473683]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-0", "isController": false}, {"data": [[10.0, 1265.6315789473683]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-0-Aggregated", "isController": false}, {"data": [[10.0, 20.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-3", "isController": false}, {"data": [[10.0, 20.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-3-Aggregated", "isController": false}, {"data": [[8.0, 1643.0], [9.0, 1678.0], [10.0, 1339.875], [7.0, 2113.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-0", "isController": false}, {"data": [[9.68421052631579, 1414.3157894736842]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-0-Aggregated", "isController": false}, {"data": [[10.0, 20.526315789473685]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-2", "isController": false}, {"data": [[10.0, 20.526315789473685]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-2-Aggregated", "isController": false}, {"data": [[10.0, 19.736842105263154]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-5", "isController": false}, {"data": [[10.0, 19.736842105263154]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-5-Aggregated", "isController": false}, {"data": [[8.0, 13.0], [9.0, 5.0], [10.0, 37.75], [7.0, 9.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-2", "isController": false}, {"data": [[9.68421052631579, 33.210526315789465]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-2-Aggregated", "isController": false}, {"data": [[10.0, 28.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-4", "isController": false}, {"data": [[10.0, 28.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-4-Aggregated", "isController": false}, {"data": [[8.0, 2143.0], [9.0, 2085.0], [10.0, 1643.9374999999998], [7.0, 2101.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-1", "isController": false}, {"data": [[9.68421052631579, 1717.4736842105262]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-1-Aggregated", "isController": false}, {"data": [[10.0, 48.78947368421053], [6.0, 40.0]], "isOverall": false, "label": "http://localhost/student/homeworks-8", "isController": false}, {"data": [[9.8, 48.35]], "isOverall": false, "label": "http://localhost/student/homeworks-8-Aggregated", "isController": false}, {"data": [[10.0, 49.94736842105264], [6.0, 71.0]], "isOverall": false, "label": "http://localhost/student/homeworks-9", "isController": false}, {"data": [[9.8, 51.00000000000001]], "isOverall": false, "label": "http://localhost/student/homeworks-9-Aggregated", "isController": false}, {"data": [[10.0, 3039.0]], "isOverall": false, "label": "signin : opons9926@myschool.fr", "isController": false}, {"data": [[10.0, 3039.0]], "isOverall": false, "label": "signin : opons9926@myschool.fr-Aggregated", "isController": false}, {"data": [[10.0, 10.105263157894735], [6.0, 63.0]], "isOverall": false, "label": "http://localhost/student/homeworks-6", "isController": false}, {"data": [[9.8, 12.749999999999998]], "isOverall": false, "label": "http://localhost/student/homeworks-6-Aggregated", "isController": false}, {"data": [[10.0, 1500.0]], "isOverall": false, "label": "signin : aollivier9071@myschool.fr", "isController": false}, {"data": [[10.0, 1500.0]], "isOverall": false, "label": "signin : aollivier9071@myschool.fr-Aggregated", "isController": false}, {"data": [[10.0, 46.31578947368421], [6.0, 50.0]], "isOverall": false, "label": "http://localhost/student/homeworks-7", "isController": false}, {"data": [[9.8, 46.5]], "isOverall": false, "label": "http://localhost/student/homeworks-7-Aggregated", "isController": false}, {"data": [[10.0, 1755.6315789473683]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88", "isController": false}, {"data": [[10.0, 1755.6315789473683]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-Aggregated", "isController": false}, {"data": [[10.0, 19.210526315789476], [6.0, 34.0]], "isOverall": false, "label": "http://localhost/student/homeworks-4", "isController": false}, {"data": [[9.8, 19.950000000000003]], "isOverall": false, "label": "http://localhost/student/homeworks-4-Aggregated", "isController": false}, {"data": [[10.0, 18.57894736842105], [6.0, 17.0]], "isOverall": false, "label": "http://localhost/student/homeworks-5", "isController": false}, {"data": [[9.8, 18.5]], "isOverall": false, "label": "http://localhost/student/homeworks-5-Aggregated", "isController": false}, {"data": [[10.0, 20.894736842105264], [6.0, 17.0]], "isOverall": false, "label": "http://localhost/student/homeworks-2", "isController": false}, {"data": [[9.8, 20.7]], "isOverall": false, "label": "http://localhost/student/homeworks-2-Aggregated", "isController": false}, {"data": [[10.0, 43.210526315789465], [6.0, 12.0]], "isOverall": false, "label": "http://localhost/student/homeworks-3", "isController": false}, {"data": [[9.8, 41.64999999999999]], "isOverall": false, "label": "http://localhost/student/homeworks-3-Aggregated", "isController": false}, {"data": [[10.0, 2092.6842105263154], [6.0, 2019.0]], "isOverall": false, "label": "http://localhost/student/homeworks-0", "isController": false}, {"data": [[9.8, 2088.9999999999995]], "isOverall": false, "label": "http://localhost/student/homeworks-0-Aggregated", "isController": false}, {"data": [[10.0, 39.368421052631575], [6.0, 16.0]], "isOverall": false, "label": "http://localhost/student/homeworks-1", "isController": false}, {"data": [[9.8, 38.199999999999996]], "isOverall": false, "label": "http://localhost/student/homeworks-1-Aggregated", "isController": false}, {"data": [[10.0, 1799.0]], "isOverall": false, "label": "signin : gmartin3967@myschool.fr", "isController": false}, {"data": [[10.0, 1799.0]], "isOverall": false, "label": "signin : gmartin3967@myschool.fr-Aggregated", "isController": false}, {"data": [[10.0, 1623.0]], "isOverall": false, "label": "signin : ttessier9584@myschool.fr", "isController": false}, {"data": [[10.0, 1623.0]], "isOverall": false, "label": "signin : ttessier9584@myschool.fr-Aggregated", "isController": false}, {"data": [[10.0, 2700.736842105263]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join", "isController": false}, {"data": [[10.0, 2700.736842105263]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-Aggregated", "isController": false}, {"data": [[10.0, 2876.0]], "isOverall": false, "label": "signin : mantoine7614@myschool.fr", "isController": false}, {"data": [[10.0, 2876.0]], "isOverall": false, "label": "signin : mantoine7614@myschool.fr-Aggregated", "isController": false}, {"data": [[10.0, 2203.1052631578946], [6.0, 2130.0]], "isOverall": false, "label": "http://localhost/student/homeworks", "isController": false}, {"data": [[9.8, 2199.45]], "isOverall": false, "label": "http://localhost/student/homeworks-Aggregated", "isController": false}, {"data": [[10.0, 2217.0]], "isOverall": false, "label": "signin : nbreton8363@myschool.fr", "isController": false}, {"data": [[10.0, 2217.0]], "isOverall": false, "label": "signin : nbreton8363@myschool.fr-Aggregated", "isController": false}, {"data": [[10.0, 28.42105263157894]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-1", "isController": false}, {"data": [[10.0, 28.42105263157894]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-1-Aggregated", "isController": false}, {"data": [[10.0, 1645.578947368421]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-0", "isController": false}, {"data": [[10.0, 1645.578947368421]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-0-Aggregated", "isController": false}, {"data": [[10.0, 32.68421052631578]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-3", "isController": false}, {"data": [[10.0, 32.68421052631578]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-3-Aggregated", "isController": false}, {"data": [[8.0, 85.0], [9.0, 55.0], [10.0, 45.81250000000001], [7.0, 42.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-11", "isController": false}, {"data": [[9.68421052631579, 48.15789473684211]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-11-Aggregated", "isController": false}, {"data": [[10.0, 20.210526315789476]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-2", "isController": false}, {"data": [[10.0, 20.210526315789476]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-2-Aggregated", "isController": false}, {"data": [[8.0, 26.0], [9.0, 12.0], [10.0, 47.0625], [7.0, 37.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-10", "isController": false}, {"data": [[9.68421052631579, 43.57894736842105]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-10-Aggregated", "isController": false}, {"data": [[10.0, 18.999999999999996]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-5", "isController": false}, {"data": [[10.0, 18.999999999999996]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-5-Aggregated", "isController": false}, {"data": [[8.0, 26.0], [9.0, 14.0], [10.0, 43.25], [7.0, 15.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-13", "isController": false}, {"data": [[9.68421052631579, 39.31578947368421]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-13-Aggregated", "isController": false}, {"data": [[10.0, 21.94736842105263]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-4", "isController": false}, {"data": [[10.0, 21.94736842105263]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-4-Aggregated", "isController": false}, {"data": [[8.0, 83.0], [9.0, 52.0], [10.0, 41.6875], [7.0, 80.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-12", "isController": false}, {"data": [[9.68421052631579, 46.42105263157895]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-12-Aggregated", "isController": false}, {"data": [[10.0, 56.8421052631579]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-7", "isController": false}, {"data": [[10.0, 56.8421052631579]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-7-Aggregated", "isController": false}, {"data": [[10.0, 11.736842105263161]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-6", "isController": false}, {"data": [[10.0, 11.736842105263161]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-6-Aggregated", "isController": false}, {"data": [[8.0, 19.0], [9.0, 20.0], [10.0, 41.687500000000014], [7.0, 20.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-14", "isController": false}, {"data": [[9.68421052631579, 38.21052631578949]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-14-Aggregated", "isController": false}, {"data": [[10.0, 46.84210526315789]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-9", "isController": false}, {"data": [[10.0, 46.84210526315789]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-9-Aggregated", "isController": false}, {"data": [[10.0, 45.57894736842106]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-8", "isController": false}, {"data": [[10.0, 45.57894736842106]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-8-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 30692.966666666667, "minX": 1.65901422E12, "maxY": 1060460.2166666666, "series": [{"data": [[1.65901422E12, 1060460.2166666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.65901422E12, 30692.966666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.65901422E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 10.526315789473685, "minX": 1.65901422E12, "maxY": 14044.0, "series": [{"data": [[1.65901422E12, 3534.0]], "isOverall": false, "label": "signin : alaunay3671@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 617.6999999999999]], "isOverall": false, "label": "Login-0", "isController": false}, {"data": [[1.65901422E12, 590.24]], "isOverall": false, "label": "Login-1", "isController": false}, {"data": [[1.65901422E12, 83.96]], "isOverall": false, "label": "Login-2", "isController": false}, {"data": [[1.65901422E12, 373.20000000000005]], "isOverall": false, "label": "Login-3", "isController": false}, {"data": [[1.65901422E12, 628.6]], "isOverall": false, "label": "Login-4", "isController": false}, {"data": [[1.65901422E12, 2599.0]], "isOverall": false, "label": "signin : mlesage4961@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 338.44]], "isOverall": false, "label": "Login-5", "isController": false}, {"data": [[1.65901422E12, 337.19999999999993]], "isOverall": false, "label": "Login-6", "isController": false}, {"data": [[1.65901422E12, 372.12]], "isOverall": false, "label": "Login-7", "isController": false}, {"data": [[1.65901422E12, 356.0800000000001]], "isOverall": false, "label": "Login-8", "isController": false}, {"data": [[1.65901422E12, 70.48000000000002]], "isOverall": false, "label": "Login-9", "isController": false}, {"data": [[1.65901422E12, 40.684210526315795]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-14", "isController": false}, {"data": [[1.65901422E12, 40.94736842105263]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-13", "isController": false}, {"data": [[1.65901422E12, 2849.0]], "isOverall": false, "label": "signin : lbousquet1454@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 39.84210526315789]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-10", "isController": false}, {"data": [[1.65901422E12, 4246.0]], "isOverall": false, "label": "signin : jsamson2604@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 47.84210526315789]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-12", "isController": false}, {"data": [[1.65901422E12, 45.05263157894736]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-11", "isController": false}, {"data": [[1.65901422E12, 2944.84]], "isOverall": false, "label": "Login", "isController": false}, {"data": [[1.65901422E12, 3124.0]], "isOverall": false, "label": "signin : hdacosta3115@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 3241.2105263157896]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave", "isController": false}, {"data": [[1.65901422E12, 35.879999999999995]], "isOverall": false, "label": "Login-15", "isController": false}, {"data": [[1.65901422E12, 79.80000000000003]], "isOverall": false, "label": "Login-10", "isController": false}, {"data": [[1.65901422E12, 2662.0]], "isOverall": false, "label": "signin : wlemoine7180@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 42.72]], "isOverall": false, "label": "Login-13", "isController": false}, {"data": [[1.65901422E12, 46.919999999999995]], "isOverall": false, "label": "Login-14", "isController": false}, {"data": [[1.65901422E12, 72.72000000000001]], "isOverall": false, "label": "Login-11", "isController": false}, {"data": [[1.65901422E12, 76.28]], "isOverall": false, "label": "Login-12", "isController": false}, {"data": [[1.65901422E12, 3247.0]], "isOverall": false, "label": "signin : pdupuis3453@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 29.0]], "isOverall": false, "label": "http://localhost/student/homeworks-13", "isController": false}, {"data": [[1.65901422E12, 49.75]], "isOverall": false, "label": "http://localhost/student/homeworks-11", "isController": false}, {"data": [[1.65901422E12, 40.699999999999996]], "isOverall": false, "label": "http://localhost/student/homeworks-12", "isController": false}, {"data": [[1.65901422E12, 52.15]], "isOverall": false, "label": "http://localhost/student/homeworks-10", "isController": false}, {"data": [[1.65901422E12, 2920.0]], "isOverall": false, "label": "signin : oandre8445@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 1513.0]], "isOverall": false, "label": "signin : tpottier2194@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 47.63157894736842]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-10", "isController": false}, {"data": [[1.65901422E12, 3081.0]], "isOverall": false, "label": "signin : aandre6209@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 4308.0]], "isOverall": false, "label": "signin : gbertin2570@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 3036.0]], "isOverall": false, "label": "signin : cbrun7753@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 3964.0]], "isOverall": false, "label": "signin : mguerin9241@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 26.473684210526315]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-13", "isController": false}, {"data": [[1.65901422E12, 54.21052631578948]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-11", "isController": false}, {"data": [[1.65901422E12, 41.94736842105263]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-12", "isController": false}, {"data": [[1.65901422E12, 10.526315789473685]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-7", "isController": false}, {"data": [[1.65901422E12, 31.736842105263158]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-4", "isController": false}, {"data": [[1.65901422E12, 19.89473684210526]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-6", "isController": false}, {"data": [[1.65901422E12, 23.368421052631582]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-3", "isController": false}, {"data": [[1.65901422E12, 40.10526315789473]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-9", "isController": false}, {"data": [[1.65901422E12, 24.31578947368421]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-6", "isController": false}, {"data": [[1.65901422E12, 42.1578947368421]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-8", "isController": false}, {"data": [[1.65901422E12, 24.47368421052632]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-5", "isController": false}, {"data": [[1.65901422E12, 50.63157894736842]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-8", "isController": false}, {"data": [[1.65901422E12, 14.684210526315791]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-7", "isController": false}, {"data": [[1.65901422E12, 41.3157894736842]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-9", "isController": false}, {"data": [[1.65901422E12, 14044.0]], "isOverall": false, "label": "signin : sbarbe5230@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 6189.85]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.65901422E12, 1333.9473684210525]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-1", "isController": false}, {"data": [[1.65901422E12, 1265.6315789473683]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-0", "isController": false}, {"data": [[1.65901422E12, 20.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-3", "isController": false}, {"data": [[1.65901422E12, 1414.3157894736842]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-0", "isController": false}, {"data": [[1.65901422E12, 20.526315789473685]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-2", "isController": false}, {"data": [[1.65901422E12, 19.736842105263154]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-5", "isController": false}, {"data": [[1.65901422E12, 33.210526315789465]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-2", "isController": false}, {"data": [[1.65901422E12, 28.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-4", "isController": false}, {"data": [[1.65901422E12, 1717.4736842105262]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-1", "isController": false}, {"data": [[1.65901422E12, 48.35]], "isOverall": false, "label": "http://localhost/student/homeworks-8", "isController": false}, {"data": [[1.65901422E12, 51.00000000000001]], "isOverall": false, "label": "http://localhost/student/homeworks-9", "isController": false}, {"data": [[1.65901422E12, 3039.0]], "isOverall": false, "label": "signin : opons9926@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 12.749999999999998]], "isOverall": false, "label": "http://localhost/student/homeworks-6", "isController": false}, {"data": [[1.65901422E12, 1500.0]], "isOverall": false, "label": "signin : aollivier9071@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 46.5]], "isOverall": false, "label": "http://localhost/student/homeworks-7", "isController": false}, {"data": [[1.65901422E12, 1755.6315789473683]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88", "isController": false}, {"data": [[1.65901422E12, 19.950000000000003]], "isOverall": false, "label": "http://localhost/student/homeworks-4", "isController": false}, {"data": [[1.65901422E12, 18.5]], "isOverall": false, "label": "http://localhost/student/homeworks-5", "isController": false}, {"data": [[1.65901422E12, 20.7]], "isOverall": false, "label": "http://localhost/student/homeworks-2", "isController": false}, {"data": [[1.65901422E12, 41.64999999999999]], "isOverall": false, "label": "http://localhost/student/homeworks-3", "isController": false}, {"data": [[1.65901422E12, 2088.9999999999995]], "isOverall": false, "label": "http://localhost/student/homeworks-0", "isController": false}, {"data": [[1.65901422E12, 38.199999999999996]], "isOverall": false, "label": "http://localhost/student/homeworks-1", "isController": false}, {"data": [[1.65901422E12, 1799.0]], "isOverall": false, "label": "signin : gmartin3967@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 1623.0]], "isOverall": false, "label": "signin : ttessier9584@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 2700.736842105263]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join", "isController": false}, {"data": [[1.65901422E12, 2876.0]], "isOverall": false, "label": "signin : mantoine7614@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 2199.45]], "isOverall": false, "label": "http://localhost/student/homeworks", "isController": false}, {"data": [[1.65901422E12, 2217.0]], "isOverall": false, "label": "signin : nbreton8363@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 28.42105263157894]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-1", "isController": false}, {"data": [[1.65901422E12, 1645.578947368421]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-0", "isController": false}, {"data": [[1.65901422E12, 32.68421052631578]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-3", "isController": false}, {"data": [[1.65901422E12, 48.15789473684211]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-11", "isController": false}, {"data": [[1.65901422E12, 20.210526315789476]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-2", "isController": false}, {"data": [[1.65901422E12, 43.57894736842105]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-10", "isController": false}, {"data": [[1.65901422E12, 18.999999999999996]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-5", "isController": false}, {"data": [[1.65901422E12, 39.31578947368421]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-13", "isController": false}, {"data": [[1.65901422E12, 21.94736842105263]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-4", "isController": false}, {"data": [[1.65901422E12, 46.42105263157895]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-12", "isController": false}, {"data": [[1.65901422E12, 56.8421052631579]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-7", "isController": false}, {"data": [[1.65901422E12, 11.736842105263161]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-6", "isController": false}, {"data": [[1.65901422E12, 38.21052631578949]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-14", "isController": false}, {"data": [[1.65901422E12, 46.84210526315789]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-9", "isController": false}, {"data": [[1.65901422E12, 45.57894736842106]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-8", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.65901422E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.65901422E12, "maxY": 14044.0, "series": [{"data": [[1.65901422E12, 3533.0]], "isOverall": false, "label": "signin : alaunay3671@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 593.74]], "isOverall": false, "label": "Login-0", "isController": false}, {"data": [[1.65901422E12, 587.9399999999998]], "isOverall": false, "label": "Login-1", "isController": false}, {"data": [[1.65901422E12, 48.44]], "isOverall": false, "label": "Login-2", "isController": false}, {"data": [[1.65901422E12, 329.4800000000001]], "isOverall": false, "label": "Login-3", "isController": false}, {"data": [[1.65901422E12, 53.519999999999996]], "isOverall": false, "label": "Login-4", "isController": false}, {"data": [[1.65901422E12, 2599.0]], "isOverall": false, "label": "signin : mlesage4961@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 325.0400000000001]], "isOverall": false, "label": "Login-5", "isController": false}, {"data": [[1.65901422E12, 318.43999999999994]], "isOverall": false, "label": "Login-6", "isController": false}, {"data": [[1.65901422E12, 315.03999999999996]], "isOverall": false, "label": "Login-7", "isController": false}, {"data": [[1.65901422E12, 280.5200000000001]], "isOverall": false, "label": "Login-8", "isController": false}, {"data": [[1.65901422E12, 56.4]], "isOverall": false, "label": "Login-9", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-14", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-13", "isController": false}, {"data": [[1.65901422E12, 2849.0]], "isOverall": false, "label": "signin : lbousquet1454@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-10", "isController": false}, {"data": [[1.65901422E12, 4244.0]], "isOverall": false, "label": "signin : jsamson2604@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-12", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-11", "isController": false}, {"data": [[1.65901422E12, 1133.9599999999998]], "isOverall": false, "label": "Login", "isController": false}, {"data": [[1.65901422E12, 3124.0]], "isOverall": false, "label": "signin : hdacosta3115@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 1414.1052631578948]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave", "isController": false}, {"data": [[1.65901422E12, 35.839999999999996]], "isOverall": false, "label": "Login-15", "isController": false}, {"data": [[1.65901422E12, 64.32000000000001]], "isOverall": false, "label": "Login-10", "isController": false}, {"data": [[1.65901422E12, 2662.0]], "isOverall": false, "label": "signin : wlemoine7180@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 42.72]], "isOverall": false, "label": "Login-13", "isController": false}, {"data": [[1.65901422E12, 46.879999999999995]], "isOverall": false, "label": "Login-14", "isController": false}, {"data": [[1.65901422E12, 72.07999999999998]], "isOverall": false, "label": "Login-11", "isController": false}, {"data": [[1.65901422E12, 54.76]], "isOverall": false, "label": "Login-12", "isController": false}, {"data": [[1.65901422E12, 3247.0]], "isOverall": false, "label": "signin : pdupuis3453@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks-13", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks-11", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks-12", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks-10", "isController": false}, {"data": [[1.65901422E12, 2919.0]], "isOverall": false, "label": "signin : oandre8445@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 1513.0]], "isOverall": false, "label": "signin : tpottier2194@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-10", "isController": false}, {"data": [[1.65901422E12, 3081.0]], "isOverall": false, "label": "signin : aandre6209@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 4308.0]], "isOverall": false, "label": "signin : gbertin2570@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 3036.0]], "isOverall": false, "label": "signin : cbrun7753@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 3963.0]], "isOverall": false, "label": "signin : mguerin9241@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-13", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-11", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-12", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-7", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-4", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-6", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-3", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-9", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-6", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-8", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-5", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-8", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-7", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-9", "isController": false}, {"data": [[1.65901422E12, 14044.0]], "isOverall": false, "label": "signin : sbarbe5230@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 4395.75]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.65901422E12, 1320.7894736842106]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-1", "isController": false}, {"data": [[1.65901422E12, 1265.5263157894738]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-0", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-3", "isController": false}, {"data": [[1.65901422E12, 1414.1052631578948]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-0", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-2", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-5", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-2", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-4", "isController": false}, {"data": [[1.65901422E12, 1705.4736842105265]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-1", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks-8", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks-9", "isController": false}, {"data": [[1.65901422E12, 3039.0]], "isOverall": false, "label": "signin : opons9926@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 2.7]], "isOverall": false, "label": "http://localhost/student/homeworks-6", "isController": false}, {"data": [[1.65901422E12, 1500.0]], "isOverall": false, "label": "signin : aollivier9071@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks-7", "isController": false}, {"data": [[1.65901422E12, 1636.0526315789473]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks-4", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks-5", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks-2", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks-3", "isController": false}, {"data": [[1.65901422E12, 2083.9]], "isOverall": false, "label": "http://localhost/student/homeworks-0", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks-1", "isController": false}, {"data": [[1.65901422E12, 1799.0]], "isOverall": false, "label": "signin : gmartin3967@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 1623.0]], "isOverall": false, "label": "signin : ttessier9584@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 1265.5263157894738]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join", "isController": false}, {"data": [[1.65901422E12, 2876.0]], "isOverall": false, "label": "signin : mantoine7614@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 2083.9]], "isOverall": false, "label": "http://localhost/student/homeworks", "isController": false}, {"data": [[1.65901422E12, 2217.0]], "isOverall": false, "label": "signin : nbreton8363@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-1", "isController": false}, {"data": [[1.65901422E12, 1636.0526315789473]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-0", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-3", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-11", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-2", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-10", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-5", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-13", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-4", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-12", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-7", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-6", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-14", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-9", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-8", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.65901422E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.65901422E12, "maxY": 299.76, "series": [{"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : alaunay3671@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 1.6800000000000002]], "isOverall": false, "label": "Login-0", "isController": false}, {"data": [[1.65901422E12, 21.86]], "isOverall": false, "label": "Login-1", "isController": false}, {"data": [[1.65901422E12, 0.44]], "isOverall": false, "label": "Login-2", "isController": false}, {"data": [[1.65901422E12, 299.76]], "isOverall": false, "label": "Login-3", "isController": false}, {"data": [[1.65901422E12, 1.24]], "isOverall": false, "label": "Login-4", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : mlesage4961@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 293.31999999999994]], "isOverall": false, "label": "Login-5", "isController": false}, {"data": [[1.65901422E12, 298.08000000000015]], "isOverall": false, "label": "Login-6", "isController": false}, {"data": [[1.65901422E12, 297.44000000000005]], "isOverall": false, "label": "Login-7", "isController": false}, {"data": [[1.65901422E12, 259.12]], "isOverall": false, "label": "Login-8", "isController": false}, {"data": [[1.65901422E12, 34.760000000000005]], "isOverall": false, "label": "Login-9", "isController": false}, {"data": [[1.65901422E12, 0.7894736842105262]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-14", "isController": false}, {"data": [[1.65901422E12, 3.0526315789473686]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-13", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : lbousquet1454@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 16.42105263157895]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-10", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : jsamson2604@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 28.31578947368421]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-12", "isController": false}, {"data": [[1.65901422E12, 18.52631578947368]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-11", "isController": false}, {"data": [[1.65901422E12, 2.1199999999999997]], "isOverall": false, "label": "Login", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : hdacosta3115@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave", "isController": false}, {"data": [[1.65901422E12, 0.6799999999999999]], "isOverall": false, "label": "Login-15", "isController": false}, {"data": [[1.65901422E12, 36.32]], "isOverall": false, "label": "Login-10", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : wlemoine7180@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 0.56]], "isOverall": false, "label": "Login-13", "isController": false}, {"data": [[1.65901422E12, 0.48]], "isOverall": false, "label": "Login-14", "isController": false}, {"data": [[1.65901422E12, 44.36]], "isOverall": false, "label": "Login-11", "isController": false}, {"data": [[1.65901422E12, 33.919999999999995]], "isOverall": false, "label": "Login-12", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : pdupuis3453@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 1.05]], "isOverall": false, "label": "http://localhost/student/homeworks-13", "isController": false}, {"data": [[1.65901422E12, 31.95]], "isOverall": false, "label": "http://localhost/student/homeworks-11", "isController": false}, {"data": [[1.65901422E12, 1.9]], "isOverall": false, "label": "http://localhost/student/homeworks-12", "isController": false}, {"data": [[1.65901422E12, 27.000000000000004]], "isOverall": false, "label": "http://localhost/student/homeworks-10", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : oandre8445@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : tpottier2194@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 25.736842105263158]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-10", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : aandre6209@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : gbertin2570@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : cbrun7753@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : mguerin9241@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 0.7894736842105263]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-13", "isController": false}, {"data": [[1.65901422E12, 36.736842105263165]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-11", "isController": false}, {"data": [[1.65901422E12, 1.4210526315789476]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-12", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-7", "isController": false}, {"data": [[1.65901422E12, 0.05263157894736842]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-4", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-6", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-3", "isController": false}, {"data": [[1.65901422E12, 17.684210526315788]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-9", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-6", "isController": false}, {"data": [[1.65901422E12, 22.315789473684212]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-8", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-5", "isController": false}, {"data": [[1.65901422E12, 33.10526315789474]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-8", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-7", "isController": false}, {"data": [[1.65901422E12, 18.42105263157895]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-9", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : sbarbe5230@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 1.9500000000000004]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-1", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-0", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-3", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-0", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-2", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-5", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-2", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-4", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-1", "isController": false}, {"data": [[1.65901422E12, 28.399999999999995]], "isOverall": false, "label": "http://localhost/student/homeworks-8", "isController": false}, {"data": [[1.65901422E12, 28.0]], "isOverall": false, "label": "http://localhost/student/homeworks-9", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : opons9926@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 2.15]], "isOverall": false, "label": "http://localhost/student/homeworks-6", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : aollivier9071@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 28.650000000000002]], "isOverall": false, "label": "http://localhost/student/homeworks-7", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks-4", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks-5", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks-2", "isController": false}, {"data": [[1.65901422E12, 0.049999999999999996]], "isOverall": false, "label": "http://localhost/student/homeworks-3", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks-0", "isController": false}, {"data": [[1.65901422E12, 0.2]], "isOverall": false, "label": "http://localhost/student/homeworks-1", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : gmartin3967@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : ttessier9584@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : mantoine7614@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "signin : nbreton8363@myschool.fr", "isController": false}, {"data": [[1.65901422E12, 0.05263157894736842]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-1", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-0", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-3", "isController": false}, {"data": [[1.65901422E12, 22.68421052631579]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-11", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-2", "isController": false}, {"data": [[1.65901422E12, 24.10526315789474]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-10", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-5", "isController": false}, {"data": [[1.65901422E12, 0.7368421052631579]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-13", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-4", "isController": false}, {"data": [[1.65901422E12, 27.999999999999996]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-12", "isController": false}, {"data": [[1.65901422E12, 39.05263157894736]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-7", "isController": false}, {"data": [[1.65901422E12, 0.0]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-6", "isController": false}, {"data": [[1.65901422E12, 0.42105263157894746]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-14", "isController": false}, {"data": [[1.65901422E12, 24.578947368421055]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-9", "isController": false}, {"data": [[1.65901422E12, 24.736842105263158]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-8", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.65901422E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 3.0, "minX": 1.65901422E12, "maxY": 14044.0, "series": [{"data": [[1.65901422E12, 14044.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.65901422E12, 1549.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.65901422E12, 3705.079999999998]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.65901422E12, 2344.95]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.65901422E12, 3.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.65901422E12, 49.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.65901422E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 21.0, "minX": 1.0, "maxY": 3534.0, "series": [{"data": [[2.0, 2396.0], [32.0, 29.0], [48.0, 1206.0], [3.0, 2956.0], [49.0, 21.0], [59.0, 51.0], [60.0, 39.0], [67.0, 26.5], [72.0, 31.0], [77.0, 26.0], [78.0, 37.0], [5.0, 1643.0], [85.0, 40.0], [91.0, 56.0], [6.0, 1026.5], [105.0, 83.0], [106.0, 71.0], [147.0, 29.0], [149.0, 22.0], [11.0, 988.0], [15.0, 72.5], [1.0, 3534.0], [17.0, 115.0], [18.0, 105.5], [22.0, 63.0], [27.0, 38.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[67.0, 1957.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 149.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 3533.0, "series": [{"data": [[2.0, 2339.5], [32.0, 0.0], [48.0, 1065.5], [3.0, 2956.0], [49.0, 0.0], [59.0, 21.5], [60.0, 0.0], [67.0, 0.0], [72.0, 0.0], [77.0, 0.0], [78.0, 0.0], [5.0, 1643.0], [85.0, 0.0], [91.0, 47.0], [6.0, 1026.5], [105.0, 70.0], [106.0, 57.5], [147.0, 0.0], [149.0, 0.0], [11.0, 988.0], [15.0, 62.0], [1.0, 3533.0], [17.0, 88.0], [18.0, 0.0], [22.0, 49.5], [27.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[67.0, 821.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 149.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 28.133333333333333, "minX": 1.65901422E12, "maxY": 28.133333333333333, "series": [{"data": [[1.65901422E12, 28.133333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.65901422E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.65901422E12, "maxY": 16.65, "series": [{"data": [[1.65901422E12, 10.083333333333334]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.65901422E12, 0.75]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.65901422E12, 0.6333333333333333]], "isOverall": false, "label": "303", "isController": false}, {"data": [[1.65901422E12, 16.65]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: java.net.SocketException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.65901422E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.65901422E12, "maxY": 0.8333333333333334, "series": [{"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-4-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : sbarbe5230@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : cbrun7753@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-11-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-7-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : aandre6209@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/student/homeworks-12-success", "isController": false}, {"data": [[1.65901422E12, 0.4166666666666667]], "isOverall": false, "label": "Login-3-success", "isController": false}, {"data": [[1.65901422E12, 0.4166666666666667]], "isOverall": false, "label": "Login-6-success", "isController": false}, {"data": [[1.65901422E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/student/homeworks-8-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-3-success", "isController": false}, {"data": [[1.65901422E12, 0.4166666666666667]], "isOverall": false, "label": "Login-15-success", "isController": false}, {"data": [[1.65901422E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/student/homeworks-3-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-10-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : alaunay3671@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-8-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-12-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-3-success", "isController": false}, {"data": [[1.65901422E12, 0.4166666666666667]], "isOverall": false, "label": "Login-11-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-5-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-10-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : mantoine7614@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : opons9926@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-1-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-7-success", "isController": false}, {"data": [[1.65901422E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/student/homeworks-11-success", "isController": false}, {"data": [[1.65901422E12, 0.4166666666666667]], "isOverall": false, "label": "Login-2-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : aollivier9071@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-2-success", "isController": false}, {"data": [[1.65901422E12, 0.3333333333333333]], "isOverall": false, "label": "Transaction Controller-success", "isController": true}, {"data": [[1.65901422E12, 0.4166666666666667]], "isOverall": false, "label": "Login-5-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-0-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : lbousquet1454@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/student/homeworks-9-success", "isController": false}, {"data": [[1.65901422E12, 0.4166666666666667]], "isOverall": false, "label": "Login-14-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : gbertin2570@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-9-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-13-success", "isController": false}, {"data": [[1.65901422E12, 0.3]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-14-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-6-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-failure", "isController": false}, {"data": [[1.65901422E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/student/homeworks-2-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-14-failure", "isController": false}, {"data": [[1.65901422E12, 0.4166666666666667]], "isOverall": false, "label": "Login-10-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : jsamson2604@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.4166666666666667]], "isOverall": false, "label": "Login-9-success", "isController": false}, {"data": [[1.65901422E12, 0.3]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-4-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-11-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-6-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-2-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-8-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-10-success", "isController": false}, {"data": [[1.65901422E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/student/homeworks-10-success", "isController": false}, {"data": [[1.65901422E12, 0.8333333333333334]], "isOverall": false, "label": "Login-1-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : ttessier9584@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-9-success", "isController": false}, {"data": [[1.65901422E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/student/homeworks-6-success", "isController": false}, {"data": [[1.65901422E12, 0.4166666666666667]], "isOverall": false, "label": "Login-4-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : gmartin3967@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/student/homeworks-5-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-1-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-1-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-5-success", "isController": false}, {"data": [[1.65901422E12, 0.4166666666666667]], "isOverall": false, "label": "Login-13-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-13-success", "isController": false}, {"data": [[1.65901422E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/student/homeworks-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : pdupuis3453@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.4166666666666667]], "isOverall": false, "label": "Login-8-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : nbreton8363@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-12-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-5-success", "isController": false}, {"data": [[1.65901422E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/student/homeworks-1-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-14-success", "isController": false}, {"data": [[1.65901422E12, 0.4166666666666667]], "isOverall": false, "label": "Login-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : wlemoine7180@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-9-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-3-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-11-success", "isController": false}, {"data": [[1.65901422E12, 0.8333333333333334]], "isOverall": false, "label": "Login-0-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : tpottier2194@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-7-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-12-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : mlesage4961@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-8-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : hdacosta3115@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/student/homeworks-13-success", "isController": false}, {"data": [[1.65901422E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/student/homeworks-7-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-2-success", "isController": false}, {"data": [[1.65901422E12, 0.4166666666666667]], "isOverall": false, "label": "Login-7-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : mguerin9241@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-0-success", "isController": false}, {"data": [[1.65901422E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/student/homeworks-4-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-13-success", "isController": false}, {"data": [[1.65901422E12, 0.016666666666666666]], "isOverall": false, "label": "signin : oandre8445@myschool.fr-success", "isController": false}, {"data": [[1.65901422E12, 0.4166666666666667]], "isOverall": false, "label": "Login-12-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/75b31ee4-8e1c-4901-8718-05b267ce1e88-6-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/leave-0-success", "isController": false}, {"data": [[1.65901422E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/student/homeworks-0-success", "isController": false}, {"data": [[1.65901422E12, 0.31666666666666665]], "isOverall": false, "label": "http://localhost/student/homeworks/groups/9dd8112f-c29e-40ab-b026-4c523e70f92b/join-4-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.65901422E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.65901422E12, "maxY": 28.433333333333334, "series": [{"data": [[1.65901422E12, 28.433333333333334]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.65901422E12, 0.03333333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.65901422E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
