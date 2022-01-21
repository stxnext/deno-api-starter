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
