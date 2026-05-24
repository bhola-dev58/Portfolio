#!/bin/bash

echo "Stopping and removing all running Docker containers for this project..."
docker compose down --remove-orphans

if [ $? -eq 0 ]; then
    echo "------------------------------------------------"
    echo "SUCCESS: Docker containers stopped successfully"
    echo "------------------------------------------------"
else
    echo "ERROR: Failed to stop Docker containers"
fi
