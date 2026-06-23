# Retro Championship

Plateforme de gestion et de consultation de tournois d'e-sport sur des jeux retro-gaming.

**Démo** : [vps114752.serveur-vps.net](https://vps114752.serveur-vps.net)

---

## Présentation

Retro Championship est une plateforme de gestion et de consultation de tournois d'e-sport sur des jeux rétro (Pac-Man, Tetris, Mario, Pong...). Elle permet aux utilisateurs de créer un compte, de se connecter et de gérer leur profil. Ils peuvent consulter la liste des tournois disponibles, accéder au détail d'un tournoi et les joueurs connectés peuvent s'y inscrire ou se désinscrire. Les admins créent des tournois depuis l'interface. L'application est entièrement responsive et disponible sur mobile.

---

## Stack technique

**Back-end**
- Node.js / Express
- Prisma ORM
- MySQL
- JWT (authentification)
- Zod (validation des données)
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
- ESLint / Prettier / Husky (qualité de code)
- Webhook GitHub (déploiement continu)

---

## Prérequis

- Node.js >= 22
- MySQL
- Docker

---

## Installation et lancement

### Back-end

1. Cloner le dépôt :
```bash
git clone https://github.com/trentycha/retro_championship.git
cd retro_championship
```

2. Installer les dépendances :
```bash
npm install
```

3. Créer un fichier `.env` à la racine :
```env
DATABASE_URL="mysql://utilisateur:motdepasse@localhost:3306/retro_championship"
JWT_SECRET="votre_secret_jwt"
PORT=3000
```

4. Lancer les migrations Prisma :
```bash
npx prisma migrate dev
```

5. Démarrer le serveur :
```bash
npm run dev
```

Le serveur tourne sur `http://localhost:3000`.

### Front-end

1. Aller dans le dossier frontend :
```bash
cd frontend
```

2. Installer les dépendances :
```bash
npm install
```

3. Créer un fichier `.env` dans le dossier `frontend/` :
```env
VITE_API_URL=http://localhost:3000
```

4. Démarrer l'application :
```bash
npm run dev
```

L'application tourne sur `http://localhost:5173`.

### Avec Docker

```bash
docker compose up --build
```

L'application est accessible via Traefik sur `http://app.localhost`.

---

## Tests

### Tests unitaires (Jest)

```bash
npm test
```

### Tests E2E (Playwright)

```bash
cd frontend
npx playwright test
```



## Qualité de code

### Linter

```bash
npm run lint
```

### Formatage

```bash
npm run format:check
```

### Correction automatique

```bash
npm run lint:fix
npm run format
```

---

## Structure du projet
retro_championship/
├── controllers/        # Traitement des requêtes
├── services/           # Logique métier
├── routes/             # Définition des endpoints API
├── middlewares/        # Middlewares (auth JWT)
├── validators/         # Schémas de validation Zod
├── prisma/             # Schéma et migrations Prisma
├── tests/              # Tests unitaires Jest
├── webhook.js          # Serveur webhook Github
├── deploy.sh           # Script de déploiement automatique
├── frontend/           # Application React
│   ├── src/
│   │   ├── components/ # Composants réutilisables
│   │   ├── pages/      # Pages de l'application
│   │   ├── context/    # Contexte d'authentification
│   │   ├── hooks/      # Hooks personnalisés
│   │   └── services/   # Services front-end
│   └── tests-e2e/      # Tests Playwright
├── .github/workflows/  # Pipeline CI GitHub Actions
└── docker-tools/       # Configuration Docker

---

## Auteure

**Charlène Billat** — https://github.com/trentycha
