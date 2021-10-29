#!/usr/bin/env bash

IMAGE="api"
TAG="local"

# Remove image to reduce dangling images
docker image rm $IMAGE:$TAG

docker build -f $PWD/.docker/Dockerfile -t $IMAGE:$TAG --force-rm .