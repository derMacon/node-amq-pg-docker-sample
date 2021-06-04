#!/bin/bash

docker build -t node-consumer:try3 .
cd ../
docker stop node-consumer
docker rm node-consumer
docker-compose up -d node-consumer
docker logs node-consumer -f