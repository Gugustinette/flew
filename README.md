# flew
Flew, a discord-like application, but open source

## Lancement

Docker configuration is available so you can run the application with docker compose.
In theory, you can run the application without docker, but it's not recommended.
Here are the 4 services that compose the application :
- `flew-client` : the user interface, using Vue, Pinia, Socket.io and Axios
    - Port : 7760
    - Accessible at [http://localhost:7760](http://localhost:7760)
- `flew-server` : the server, using Express, Socket.io and Mongoose
    - Port : 7761
- `flew-gateway` : the websocket gateway, using Socket.io
    - Port : 7762
- `flew-db` : the database, using MongoDB
    - Port : 27017

In development mode :
```bash
docker compose -f docker/dev/docker-compose.yml up -d
```

In production mode :
```bash
docker compose -f docker/prod/docker-compose.yml up -d
```

If new dependencies were added, you'll need to rebuild the images with the `--build` option :
```bash
# In development mode :
docker compose -f docker/dev/docker-compose.yml up -d --build
# In production mode :
docker compose -f docker/prod/docker-compose.yml up -d --build
```
