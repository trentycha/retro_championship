# **Retro Championship**

Une plateforme de gestion et de consultation de tournois d'e-sport sur des jeux retro-gaming.

**Démo** : https://retro-championship-7jli.vercel.app

**CI** : https://github.com/trentycha/retro_championship/actions/workflows/ci.yml/badge.svg



## **Présentation**

Retro Championship est une plateforme de gestion et de consultation de tournois d'e-sport sur des jeux rétro (Pac-Man, Tetris, Mario, Pong...). Elle permet aux utilisateurs de créer un compte, de se connecter et de gérer leur profil. Ils peuvent consulter la liste des tournois disponibles, accéder au détail d'un tournoi et s'y inscrire ou se désinscrire. Les admins peuvent créer des tournois ou en supprimer. Lorsque deux joueurs s'inscrivent à un même tournoi, un match est automatiquement généré. L'application est entièrement responsive et disponible sur mobile.


## **Stack technique**

**Back-end**
- Node.js / Express
- Prisma ORM
- MySQL
- JWT (authentification)
- Zod (validation)
- Jest (tests unitaires)

**Front-end**
- React / Vite
- Tailwind CSS
- React Router
- Playwright (tests E2E)

**DevOps**
- Docker
- GitHub Actions
- VPS Debian / Caddy / PM2 (déploiement)
- ESLint / Prettier / Husky
- Webhook GitHub



## **Prérequis**

- Node.js >= 22
- MySQL
- Docker



## **Installation et lancement**

### **Back-end**

**1. Cloner le dépôt :**

*git clone https://github.com/trentycha/retro_championship.git
cd retro_championship*


**2. Installer les dépendances :**

*npm install*


**3. Créer un fichier `.env` à la racine :**

*DATABASE_URL="mysql://utilisateur:motdepasse@localhost:3306/retro_championship"
JWT_SECRET="votre_secret_jwt"*


**4. Lancer les migrations Prisma :**

*npx prisma migrate dev*


**5. Démarrer le serveur :**

*npm run dev*

---
**Le serveur tourne sur `http://localhost:3000`**

### **Front-end**

**1. Aller dans le dossier frontend :**

*cd frontend*


**2. Installer les dépendances :**

*npm install*


**3. Créer un fichier `.env` dans le dossier `frontend/` :**

*VITE_API_URL=http://localhost:3000*


**4. Démarrer l'application :**

*npm run dev*

---
**L'application tourne sur `http://localhost:5173`**

### **Avec Docker**

*docker compose up --build*


##  **Tests**

### **Tests unitaires (Jest)**

*npm test*


### **Tests E2E (Playwright)**


*cd frontend
npx playwright test*




## **Qualité de code**

### **Linter**


*npm run lint*


### **Formatage**


*npm run format:check*





## **Structure du projet**
retro_championship/
├── controllers/
├── services/
├── routes/
├── middlewares/
├── validators/
├── prisma/
├── tests/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── services/
│   └── tests-e2e/
├── .github/workflows/
└── docker-tools/ 



## **Auteure**

**Charlene Billat** — https://github.com/trentycha