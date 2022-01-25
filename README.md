# Deno starter API

- Added PostgreSQL db driver with ORM => https://deno.land/x/denodb@v1.0.40
- validation to endpoints
- import_maps
- dockerized


## Install

Copy .env.example as .env in root directory.

Run ``./scripts/build-docker-image-local.sh `` to build docker image.


Run ``docker-compose up api`` to run Deno.


Run ``docker-compose up watch`` to run Deno in watch mode.


Tip: For Apple M1 users for Deno watch mode we need to change in Dockerfile:

``FROM denoland/deno:1.15.3``

to this:

``FROM lukechannings/deno:latest``

 and to docker-compose ``platform: linux/amd64``: 

``    
services:
  watch:
    image: api:local
    hostname: api
    platform: linux/amd64
    volumes:
    ...
``


## Migrations

Migrations are in `` migrations `` folder. 

Syntax for class names is like in TypeORM:

File `` 20220124110458-init.ts `` then class should be named `` Init20220124110458 `` :
File `` 20220130024421-fixes_on_post_users.ts `` then class should be named `` Fixes_on_post_users20220130024421 `` :

Files to migration folder we add manually.

"down" method is not supported yet.

Example migration file: 

``
import { Model } from "denodb";

export class Init20220124110458 {

    async up(client: any): Promise<void> {
        await client.queryObject(`SELECT * FROM "migrations"`);
    }

    async down(client: any): Promise<void> {
        await client.queryObject(`SELECT * FROM "migrations"`);
    }
}
``
