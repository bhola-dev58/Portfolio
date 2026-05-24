#!/bin/bash

# Port numbers used in docker-compose.yml
FRONTEND_PORT=8082
BACKEND_PORT=5000

echo "Cleaning up any existing containers for this project..."
docker compose down --remove-orphans 2>/dev/null

echo "Force freeing ports $FRONTEND_PORT and $BACKEND_PORT..."
sudo fuser -k -KILL ${FRONTEND_PORT}/tcp 2>/dev/null
sudo fuser -k -KILL ${BACKEND_PORT}/tcp 2>/dev/null
sleep 1

echo "Starting Docker Compose..."
docker compose up --build -d

if [ $? -eq 0 ]; then
    echo "------------------------------------------------"
    echo "SUCCESS! App is running at http://localhost:${FRONTEND_PORT}"
    echo "------------------------------------------------"
else
    echo "ERROR: Docker failed to start on port ${FRONTEND_PORT}."
fi
