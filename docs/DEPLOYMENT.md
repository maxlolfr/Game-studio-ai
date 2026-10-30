# Déploiement privé — Game Studio AI

## État
L'application est prête à être **déployée**, mais aucun hébergement n'est créé automatiquement par ce dépôt.

## Conditions obligatoires
- Hébergeur prenant en charge les conteneurs Docker et HTTPS (par exemple Railway, Render ou un VPS)
- Variables d'environnement secrètes :
  - `STUDIO_USER` : identifiant choisi
  - `STUDIO_PASSWORD` : mot de passe aléatoire de **16 caractères minimum** (ne jamais le mettre dans GitHub)
- Port `3000`, route de santé `/health`
- **Volume persistant** monté sur `/data` pour conserver projets et missions (sinon les données seront perdues au redéploiement)
- URL HTTPS obligatoire : l'authentification Basic transmet des identifiants encodés, non chiffrés sans TLS.

## Docker local
```sh
docker build -t game-studio-ai .
docker volume create game-studio-data
docker run --rm -p 127.0.0.1:3000:3000 -e STUDIO_USER=admin -e STUDIO_PASSWORD=replace-with-long-random-secret -v game-studio-data:/data game-studio-ai
```
Ouvrir http://localhost:3000 sur la même machine.

## Important
Le serveur ne contient **aucun agent IA actif**. Il ne faut pas exposer une version sans authentification. L'authentification Basic convient à un prototype privé derrière HTTPS, mais un système de comptes et de sessions sera nécessaire avant une ouverture multi-utilisateurs.
