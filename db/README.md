# Food Lord: DB

## Requirements

1. docker-compose

## Usage

To run the server, please execute the following from the root directory:

1. Run Startup server as a docker container

    ```bash
    docker-compose up -d
    ```

2. Run init scripts

    ```bash
    docker run -it --rm --network foodlord foodlord-db psql -h foodlord-db -U postgres postgres -f /tmp/create_ddl_base.sql
    docker run -it --rm --network foodlord foodlord-db psql -h foodlord-db -U foodlord foodlord -f /tmp/create_ddl_foodlord.sql
    ```