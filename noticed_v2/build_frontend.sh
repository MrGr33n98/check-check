#!/bin/bash
# Build script for the noticed_v2 admin frontend
set -e
npx tsc -p "$(dirname "$0")/tsconfig.json"
