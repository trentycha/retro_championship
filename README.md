Website deploy on Vercel : https://retro-championship-7jli.vercel.app/


# To-Do List du Projet

## Back-end

| Étape | Tâche | Statut |
|-------|-------|--------|
| **1. Lancement du projet** | | |
| | Lancement du projet : création de la base de données (entités, relations, …) en MySQL | ✅ Terminé |
| | Création des endpoints | ✅ Terminé |
| **2. Configuration initiale** | | |
| | Créer et initialiser le projet | ✅ Terminé |
| | Installation de Prisma | ✅ Terminé |
| | Création du schéma et première migration de la base de données | ✅ Terminé |
| | Mise en place de l'architecture des routes | ✅ Terminé |
| | Tests de routes avec Postman | ✅ Terminé |
| **3. Routes Utilisateurs** | | |
| | Création des routes Utilisateurs : middlewares, routes et controller | ✅ Terminé |
| | Tests des routes Utilisateurs sur Postman | ✅ Terminé |
| | Gestion des autorisations : cryptage de mot de passe, tokens et routes | ✅ Terminé |
| | Gestion des autorisations de rôles : spectateur, joueur, admin | À faire |
| | Incrémenter les statistiques à chaque participation de tournoi, match et tournoi gagné | À faire |
| **4. Routes Tournois** | | |
| | Création des routes Tournois : middlewares, routes et controller | ✅ Terminé |
| | Tests des routes Tournois sur Postman | ✅ Terminé |
| **5. Routes Matchs** | | |
| | Création des routes Matchs : middlewares, routes et controller | ✅ Terminé |
| | Tests des routes Matchs sur Postman | ✅ Terminé |
| **6. Routes Prix** | | |
| | Création des routes Prix : middlewares, routes et controller | ✅ Terminé |
| | Tests des routes Prix sur Postman | ✅ Terminé |
| **7. Routes Chaînes** | | |
| | Création des routes Chaînes : middlewares, routes et controller | ✅ Terminé |
| | Tests des routes Chaînes sur Postman | ✅ Terminé |
| **8. Routes Jeux** | | |
| | Création des routes Jeux : middlewares, routes et controller | ✅ Terminé |
| | Tests des routes Jeux sur Postman | ✅ Terminé |
| **9. Documentation Swagger** | | |
| | Tests des routes avec Swagger | ✅ Terminé |
| | Installation du package Swagger | En cours |
| **10. Ajout de la gestion de document** | | |
| | Configurer Multer | À faire |
| **11. Renforcer la sécurité** | | |
| | Installer des packages pour renforcer la sécurité | À faire |
| **12. Tests automatisés** | | |
| | Tests unitaires avec Jest | À faire |
| | Tests d'intégration des routes | À faire |

---

## Front-end

| Étape | Tâche | Statut |
|-------|-------|--------|
| **1. Design** | | |
| | Création de la maquette sur Figma | ✅ Terminé |
| **2. Initialisation** | | |
| | Initialisation du projet React | ✅ Terminé |
| | Configuration de App.jsx et de index.jsx | ✅ Terminé |
| **3. Composants globaux** | | |
| | Création du Header | ✅ Terminé |
| | Création du Footer | ✅ Terminé |
| **4. Homepage** | | |
| | Création de la Homepage | ✅ Terminé |
| | Création des composants cartes de la Homepage | ✅ Terminé |
| | Ajouter des animations | En cours |
| **5. Authentification** | | |
| | Création de la page de connexion | ✅ Terminé |
| | Configuration du service de connexion et du useContext | ✅ Terminé |
| | Ajouter le bouton logout et géré les boutons du header en fonction de la connexion | ✅ Terminé |
| | Gestion des autorisations sur la page profil | ✅ Terminé |
| **6. Tournois** | | |
| | Création de la page des tournois | ✅ Terminé |
| | Création d'une page de tournoi | À faire |
| **7. Utilisateur** | | |
| | Création du profil utilisateur | ✅ Terminé |
| **8. Responsive** | | |
| | Version mobile | À faire |
| **9. Erreur et loading** | | |
| | Erreur 404 | ✅ Terminé |
| | Loading | ✅ Terminé |