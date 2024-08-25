#!/bin/bash

# Read the version from package.json
VERSION=$(jq -r '.version' package.json)

# Define the image name
IMAGE_NAME="vite-local-my"

# Build the Docker image with the version from package.json
docker build -t ${IMAGE_NAME}:${VERSION} .

# Optional: Print the image name and version for confirmation
echo "Built Docker image: ${IMAGE_NAME}:${VERSION}"
