Docker repo
=

**2Auth is a docker container using nginx and nodejs to protect your internal resources.**

1. Install docker and docker-compose

https://docs.docker.com/engine/installation/
https://docs.docker.com/compose/install/#prerequisites

2. Change working directory

```bash
cd docker\2Auth
```

3. Generate nginx:2auth image from Docker file

```bash
sudo docker build -t nginx:2auth .
```

4. Edit **2Auth/app/config.js** and save changes

5. Edit **2Auth/nginx/default.conf** and save changes

```
auth.yourdomain.com - authorization site
secure.yourdomain.com - private area
```

6. Start docker-compose

```bash
sudo docker-compose up -d
```

**Additional commands

List containers

```bash
docker ps 
```

Attach to nginx container

```bash
docker exec -i -t nginx /bin/bash
```

Attach to nodejs container

```bash
docker exec -i -t nodejs /bin/bash
```