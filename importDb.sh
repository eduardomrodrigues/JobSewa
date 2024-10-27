#!/bin/bash

docker run --rm  --network mongo-network -v ./DB/scripts/jobs.json:/data/jobs.json \
  mongo mongoimport --host mongo-db --db jobsewaDB --collection Job --file /data/jobs.json --jsonArray