#!/bin/bash
cd /var/www/retro_championship
git pull origin main
npm install
npx prisma generate
cd frontend
npm install
npm run build
cd ..
pm2 restart retro-backend --update-env
echo "Déployé !"