#!/usr/bin/env bash
echo '🥑 [Food Lord] Shutting down last containers'
docker-compose down
echo '🥑 [Food Lord] Building and kicking off the PostgresSQL DB container'
docker-compose up -d foodlord-db
echo '🥑 [Food Lord] Sleeping 5 seconds for letting the DB initializes'
sleep 5
echo '🥑 [Food Lord] Creating DDL Base'
docker run -it --rm --network foodlord foodlord-db psql -h foodlord-db -U postgres postgres -f /tmp/create_ddl_base.sql
echo '🥑 [Food Lord] DDL Base created'
echo '🥑 [Food Lord] Creating DDL Food Lord'
docker run -it --rm --network foodlord foodlord-db psql -h foodlord-db -U foodlord foodlord -f /tmp/create_ddl_foodlord.sql
echo '🥑 [Food Lord] DDL Food Lord created'
echo '🥑 [Food Lord] Building and kicking off the Backend and Frontend containers'
docker-compose up -d foodlord-api-app foodlord-client-app
echo '🥑 [Food Lord] Deployed!'