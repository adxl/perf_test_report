# RAPPORT DE PERFORMANCES 1 (S) : MySchool

Adel Senhadji [adxl](https://github.com/adxl)  
Ayoub Madani-Fouatih [MizuchiOryu](https://github.com/MizuchiOryu)  
Maxime Marchand [ThePiotrow](https://github.com/ThePiotrow)  
Jérémy Jumpertz [jumpertz](https://github.com/jumpert)

4IW2
28/06/2022

---

## Description de l'application

L'application est un extranet d'établissement scolaire permettant la gestion
administrative d'une école

L'objectif est de faciliter la gestion d'un établissement sous 3 angles :

- Administrateur : il peut gérer l'établissement (comptes, salles, cours, filières)
- Professeur : il peut gérer sa classe, affecter des notes, des projets, la présence
- Étudiants : d'accéder à leurs document de cours, planning, notes, projets pédagogique

L'objectif est de réaliser un spike test pour s'assurer que notre application
puisse supporter une charge massive d'utilisateurs en plusieurs courts instants
à interval régulier.

## L'architecture

L'architecture est basé sur du multi-container (Docker), avec un serveur Apache2
et une base de données PostgreSQL.
On utilise Symfony 5.4.9 (PHP 8.0) en back, avec un moteur de templetage Twig et
webpack pour compiler le JavaScript et Sass.

L'application est hébergée sur Heroku.

## Exigences du test

Un cas d'utilisation régulier de notre application est que plusieurs étudiants
se connectent en même temps lorsequ'un professeur crée un projet pédagogique et
que tous les étudiants doivent rejoindre un groupe.

En supposant qu'on gère une école de 1000 étudiants.

| Business Transactions | User Load | Response Time | Transactions per hour |
|-----------------------|:---------:|:-------------:|:---------------------:|
| Access homework page  |      1000 | 1             |                 ~5000 |

## Environnement de tests

| Ressource | Local | Production | Coef. Proportionnel |
|-----------|:-----:|:----------:|:-------------------:|
| CPU       | Intel i7-1065G7 8 Core | 8 Core Shared CPU | 100% |
| RAM       | 16 GB  | 512 MB     | 3200% |
| OS        | Ubuntu 20.04.4 LTS x64 | Linux Container | - |

## Planification des tests

Métriques surveillées : CPU - RAM - Réseau (response time)  
Critère de réussite : l'application doit supporter la charge à laquelle tous
les étudiants doivent rejoindre leur groupe respectif.

## Étapes de tests

| Step # | Business Process Name : Product Ordering |
|--------------|:-----------:|
| 1 | Login |
| 2 | Dashboard |
| 3 | Homeworks |
| 4 | Select homework |
| 5 | Join Group |

Jeu de données : fixtures de 1000 utilisateurs (étudiants)
