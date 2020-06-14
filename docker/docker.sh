#!/usr/bin/env bash
# .env should contain docker username and password with auth for internal-api docker repo
touch -a .env && set -o allexport; source ./.env; set +o allexport
docker build --tag lbry/commander:$TRAVIS_BRANCH ./
echo "$DOCKER_PASSWORD" | docker login --username "$DOCKER_USERNAME" --password-stdin
docker push lbry/commander:$TRAVIS_BRANCH
