### RAPPORT DE PERFORMANCES 1 (S) : MySchool

Adel Senhadji [adxl](https://github.com/adxl)  
Ayoub Madani-Fouatih [MizuchiOryu](https://github.com/MizuchiOryu)  
Maxime Marchand [ThePiotrow](https://github.com/ThePiotrow)  
Jérémy Jumpertz [jumpertz](https://github.com/jumpert)

4IW2 
28/06/2022

---

## Description de l'application:

L'application est un intranet d'établissement scolaire permettant la gestion 
administrative d'une école  

L'objectif est de faciliter la gestion d'un établissement sous 3 angles :

- Administrateur : il peut gérer l'établissement (comptes, salles, cours, filières)  

- Professeur : il peut gérer sa classe, affecter des notes, des projets, la présence  

- Étudiants : d'accéder à leurs document de cours, planning, notes, projets pédagogiques  


L'objectif est de réaliser un test de stress pour s'assurer que notre application
puisse supporter une charge massive d'utilisateurs en un court instant.


## L'architecture:

L'architecture est base sur du micro-service (Docker), avec un serveur Nginx et une 
base de données PostgreSQL.
On utilise Symfony 5.4.9 (PHP 8.0) en back et webpack pour compiler le JS et SCSS.

L'application est hébergée sur Azure.

## Exigences du test:

Un cas d'utilisation régulier de notre application est que plusieurs étudiants se
connectent en même temps (par exemple, lorsequ'un prof crée un projet pédagogique et
que tous les étudiants doivent rejoindre un groupe).  


| Business Transactions | User Load | Response Time | Transactions per user |
|--------------|:-----------:|:------------:|:------------:|
| Access homework page | _until crash_ | 1 | ~10 |

## Environnement de tests

- CPU : Intel® Core™ i7-1065G7 CPU @ 1.30GHz × 8  -> coef = 0.5
- Mémoire : 16GB -> coef = 0.21
- OS: Ubuntu 20.04.4 LTS x64 - GNOME 3.36.8 - X11

Coefficient proportionnel = 0.35

## Planification des tests

- Métriques surveillées : CPU - RAM - Réseau (response time)
- Critère de réussite : l'application supporte au minimum 80% de l'effectif total
de l'établissement


## Étapes de tests

| Step # | Business Process Name : Product Ordering |
|--------------|:-----------:|
| 1 | Login |
| 2 | Dashboard |
| 3 | Homeworks |
| 4 | Select homework |
| 5 | Join Group |


Jeu de données : fixtures mises en place au build, 1000 utilisateurs (étudiants)
