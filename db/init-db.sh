#!/usr/bin/env bash
set -e

cd  /docker-entrypoint-initdb.d

psql \
    -v ON_ERROR_STOP=1 \
    --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" \
    -f ./bootstrap.pgsql

echo "$0: DB done"

psql \
    -v ON_ERROR_STOP=1 \
    --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" \
    -f ./seed.pgsql

echo "$0: Seeding done"
