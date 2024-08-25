#!/bin/bash

VERSION=$(jq -r '.version' package.json)
IMAGE_NAME="local/vite-local-my"

docker build -t ${IMAGE_NAME}:${VERSION} .

echo "Built Docker image: ${IMAGE_NAME}:${VERSION}"
