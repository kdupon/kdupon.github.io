#!/usr/bin/env bash

# Clean workspace
rm -rf @dist
rm -rf node_modules

# Install dependencies
yarn install

# Run checks
# yarn run lint
# yarn run test

# Build production files
# rm -rf dist
# yarn run package

# git add .

# ISO 8601 UTC timestamp format
# TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
# git commit -m "Automated release $TIMESTAMP"

exit 0
