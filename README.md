This is a small project using MUI, Next.js and Websocket to fetch and display data, while it is able to recieve real data update from nest.js backend

## Run this frontend on docker container
1. Prepare the backend server, see [here](https://github.com/Benchen997/job-server) for more details
2. Build the docker image using following command
```bash
docker-compose up --build
```
After the build process, the frontend will be running on `http://localhost:5200`
