FROM postgres

COPY ./*.pgsql /docker-entrypoint-initdb.d/
COPY ./init-db.sh /docker-entrypoint-initdb.d/
