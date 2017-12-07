Docker repo

**2Auth is a docker container using nginx and nodejs to protect your internal resources.

1. Generate nginx:2auth image from Docker file

```bash
docker build -t nginx:2auth .
```

2. Edit **app/config.js** and save changes

3. Start docker-compose

```bash
docker-compose up -d
```
