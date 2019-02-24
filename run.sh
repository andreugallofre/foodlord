#!/usr/bin/env bash
echo '🥑 [Food Lord] Shutting down last containers'
docker-compose down
echo '🥑 [Food Lord] Building and kicking off the Backend containers'
docker-compose up -d --build foodlord-api-app
echo '🥑 [Food Lord] Deployed!'