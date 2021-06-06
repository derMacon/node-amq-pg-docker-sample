#!/bin/bash

echo 'build supplier-backend'
mvn -f supplier-backend/pom.xml clean package -DskipTests

echo 'start docker compose'
docker-compose up -d --build

