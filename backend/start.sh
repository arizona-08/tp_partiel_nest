#!/bin/sh
# start.sh

echo "Application des migrations Prisma sur la base de données..."
npx prisma migrate deploy

echo "Lancement de l'application..."
npm run start:dev