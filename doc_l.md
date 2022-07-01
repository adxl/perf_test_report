### RAPPORT DE PERFORMANCES 1 (S) : MySchool

Adel Senhadji [adxl](https://github.com/adxl)  
Ayoub Madani-Fouatih [MizuchiOryu](https://github.com/MizuchiOryu)  
Maxime Marchand [ThePiotrow](https://github.com/ThePiotrow)  
Jérémy Jumpertz [jumpertz](https://github.com/jumpert)

4IW2 
28/06/2022

---

## Description de l'application:

L'application est un outil de visualisation de disponibilité et de réservation de billets de train et de bus.
Largement utilisée en France, l'outil est utilisé par des millions de personnes chaque jour.

L'objectif est de réaliser un test de stress afin de connaitre les limites de connexions concurrentes que
l'infrastucture est capable d'absorber avant qu'un service ou qu'un composant ne réponde plus.


## L'architecture:

L'architecture est base sur du Preact, NextJS et du PHP, avec un serveur Envoy et une 
base de données PostgreSQL.

L'application est hébergée sur AWS.

## Exigences du test:

L'utilisation la plus courante de l'application est de voir la disponibilité ou réserver des billets de train
en fonction d'une gare de départ, d'une gare d'arrivée et de dates.  


| Business Transactions | User Load | Response Time (ms) | Transactions per user |
|--------------|:-----------:|:------------:|:------------:|
| Looking for train | _until crash_ | 100 | 7 - 10 |

## Environnement de tests

- CPU : Intel® Core™ i5-10300H @ 2.50GHz × 4 core (8 threads)  -> coef = 0.23
- Mémoire : 16GB | DDR3 -> coef = 0.04
- OS: Debian 11.3 x64 - KDE 4.13

Coefficient proportionnel = 0.08

## Planification des tests

- Métriques surveillées : CPU - RAM - Réseau (response time)
- Critère de réussite : l'application supporte au minimum 95% de la charge totale d'utilisateurs


## Étapes de tests

| Step # | Business Process Name : Product Ordering |
|--------------|:-----------:|
| 1 | Home page |
| 2 | Select departure train station |
| 3 | Select departure date & time |
| 4 | Select return train station |
| 5 | Select return date & time |
| 6 | Change departure to find lower price |
| 7 | Compare and pick train ticket |

Instances de tests: ajout d'utilisateurs jusqu'à la limite de connexions concurrentes