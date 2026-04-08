#!/bin/bash

# Port number used in docker-compose.yml
PORT=8082

echo "Cleaning up any existing containers for this project..."
docker compose down --remove-orphans 2>/dev/null

echo "Force freeing port $PORT..."
sudo fuser -k -KILL ${PORT}/tcp 2>/dev/null
sleep 1

echo "Starting Docker Compose..."
docker compose up --build -d

if [ $? -eq 0 ]; then
    echo "------------------------------------------------"
    echo "SUCCESS! App is running at http://localhost:${PORT}"
    echo "------------------------------------------------"
else
    echo "ERROR: Docker failed to start on port ${PORT}."
fi
