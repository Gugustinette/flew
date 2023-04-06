# flew
Flew, a discord-like application, but open source

## Lancement

La configuration Docker permet de lancer l'application en mode développement ou en mode production, sans avoir à faire de configuration manuelle.
En principe, les 4 services suivants sont lancés :
- `flew-client` : l'interface web, utilisant Vue, Pinia, Axios et Socket.io
    - Port : 7760
    - Donc accessible à l'adresse [http://localhost:7760](http://localhost:7760)
- `flew-server` : le serveur, utilisant Express, Socket.io et Mongoose
    - Port : 7761
- `flew-gateway` : le serveur de websocket, utilisant Socket.io
    - Port : 7762
- `flew-db` : la base de données MongoDB
    - Port : 27017

En mode développement :
```bash
docker compose -f docker/dev/docker-compose.yml up -d
```

En mode production :
```bash
docker compose -f docker/prod/docker-compose.yml up -d
```

Si de nouvelles dépendances sont ajoutées, il faut rebuild les images en lançant avec l'option `--build` :
```bash
# En mode développement :
docker compose -f docker/dev/docker-compose.yml up -d --build
# En mode production :
docker compose -f docker/prod/docker-compose.yml up -d --build
```
