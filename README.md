# Pour lancer le projet

- Renommer les .env.example en .env et remplir les variables (faire matcher les infos de la bdd dans le .env racine et le .env du dossier backend)

- Lancer la commande `docker compose up --build -d`

## Données de test

**register :** 

```json

{
  "email": "jeremy.caron.labalette@gmail.com",
  "password": "password123",
  "role": "ADMIN",
  "isEmailVerified": true
}
```

**verify email :**

```json
{
  "email": "jeremy.caron.labalette@gmail.com",
  "code": "634358"
}   
```

**login :**

```json
{
  "email": "jeremy.caron.labalette@gmail.com",
  "password": "password123"
}
```

**verify-2fa :**

```json
{
  "email": "jeremy.caron.labalette@gmail.com",
  "code": "634358"
}
```

**Créer une note :**

```json
{
  "title": "Note user 1",
  "content": "Contenu privé du user 1"
}
```

**Modifier une note :**

`id : 1`

```json
{
  "title": "Note user 1111",
  "content": "Contenu privé du user 11111"
}
```

Pour l'admin, il faut modifier le role du user directement dans la db : 

`docker exec -it db sh`

`psql -U postgres -d mydb`

`UPDATE "User" SET role = 'ADMIN' WHERE email = 'jeremy.caron.labalette@gmail.com';`

Et en suite on peut tester les deux routes admin