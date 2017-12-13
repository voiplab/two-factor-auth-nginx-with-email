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
2. Generate nginx:2auth image from Docker file

```bash
docker build -t nginx:2auth .
```

2. Edit **2Auth/app/config.js** and save changes

2. Edit **2Auth/nginx/default.conf** and save changes

```
auth.yourdomain.com - authorization site
secure.yourdomain.com - private area
```

3. Start docker-compose

```bash
docker-compose up -d
```