#!/bin/bash
docker network create mongo-network
docker run -v /tmp/data:/data/db --network mongo-network  -e MONGO_INITDB_ROOT_USERNAME=JobSewa -e MONGO_INITDB_ROOT_PASSWORD=JobSewa7epic -e MONGO_INITDB_DATABASE=jobsewaDB -p 27017:27017 mongo