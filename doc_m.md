### RAPPORT DE PERFORMANCES 1 (M) : Brutx

Adel Senhadji [adxl](https://github.com/adxl)  
Ayoub Madani-Fouatih [MizuchiOryu](https://github.com/MizuchiOryu)  
Maxime Marchand [ThePiotrow](https://github.com/ThePiotrow)  
Jérémy Jumpertz [jumpertz](https://github.com/jumpert)

4IW2 
01/07/2022

---

## Description de l'application:

Brutx est un service de streaming video du media Brut.  

La plateforme a pour but de mettre à disposition du contenu vidéo à travers des films, series, courts-métrages et des documentaires.


L'objectif est de réaliser un test de volumes pour vérifié si les performances de l'application sont impactées par le volume de données en base qui a subi une hausse de 200% (valeur estimé a 2TB de volume)  depuis le jour de sa création il y a 2 ans.
On estimera que dans 5 ans, le volume en base est de 8TB.



## L'architecture:

L'architecture est basée sur du micro-service exclusivement sur de Azure en plus de hébergement.

![schema](https://experienceswp.blob.core.windows.net/uploads/2019/04/Archi-4.png)

Pour ce qui est des technologies utilisée le front est fait en React.

## Exigences du test:

L'objectif du test de volume est de :

- Vérifier les performances du système avec des volumes considérable de données dans la base de données (8TB)
- Identifier les problèmes susceptibles de se produire avec une grande quantité de données ainsi que les goulets d'étranglement


| Business Transactions | User Load | Response Time | Transactions per user |
|--------------|:-----------:|:------------:|:------------:|
| Access homepage page | 150 000 | 1 | ~450 |
| Access my_list_movies page | 150 000 | 2 | ~100 |
| Access download_movies page | 150 000 | 2 | ~10 |


## Environnement de tests

Environnement de test :
- CPU : MacBook Pro (13-inch, M1, 2020)
- Mémoire : 16GB
- OS: macOS Monterey 12.2.1

Environnement de production :
- CPU : AMD EPYC 7763 64 cores & 128 Threads
- Mémoire : 64GB
- OS: Red Hat Enterprise Linux 8 RHEL 8.6


## Planification des tests

- Métriques surveillées : 
    - CPU - RAM 
    - Réseau (response time) 
    - Bandwidth
- Critère de réussite : 
    - Le pourcentage du cpu ne dois pas exceder 5% pour un total de 3000 utilisateur simultanée en environnement de test
    - Temps de réponse moyen < 2secondes

- Exemple d'utilisation de metric CPU:
À l'aide des metrics CPU nous allons vérifier si le temps d'indexation reste stable en fonction du nombre de données en base par exemple en production pour 150 0 00 données récupérées 30%sdu cpu est utilisé nous attendons le même résultat pour le double de données récupérées.

## Étapes de tests

| Step # | Business Process Name : Product Ordering |
|--------------|:-----------:|
| 1 | Login |
| 2 | Home |
| 3 | My Movies |
| 4 | Select Movies |

Jeu de donnée :
 - Type de donnée : donnée en base NOSQL
 - Quantité de donnée : 8TB
 - Provenance : Clone de la préproduction

## Execution des tests

| # | Cycle  | Test Run | Time
|--------------|:-----------:|:-----------:|:-----------:|
| 1 | 1 | Volume Test | 2 heure

|  | Test Details |
|--------------|:-----------:|
| **Purpose** | Le premier test est a pour but pour determiné si malgré une grande quantité de donnée en base un utilisateur peut toujours avoir axés a l'interface et ainsi la parcourir. Ce test est conçu pour collecter des mesures de performances sur le temps d'indexiation en base et l'utilisation des ressources système, par rapport aux exigences de performances. |
| **No. of Tests** | 1 (1 tests per cycle) |
| **Duration** | Ramp-up: 50 000 - Steady State: 150 000 - Ramp-down: 90 000 |
| **Scripts** | 1. XXXX - 2. XXXX |
| **Scenario Name** | Volume Test Scenario |
| **User Load / Volume** | 150 000 Vusers (Threads) Load |
| **Entry Criteria** |1. Le code doit etre stable et fonctionnel 2. L'environnement de test doit etre configuré et prêt a l'emploi.3. Le jeu de données de test doit etre disponible .4. Les scripts de test doivent etre stable et fonctionel.
| **Validation Criteria** | 1. Le pourcentage du cpu ne dois pas exceder 5% pour un total de 3000 utilisateur simultanée en environnement de test.2. Temps de réponse moyen < 2secondes |