#!/bin/bash
set -e

echo "=== Prisma Build Setup ==="
echo "Current directory: $(pwd)"
echo "Node version: $(node --version)"
echo "npm version: $(npm --version)"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm ci
fi

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# List what was generated
echo "Checking .prisma/client directory:"
if [ -d ".prisma/client" ]; then
  ls -la .prisma/client/ | head -20
else
  echo ".prisma/client directory not found!"
fi

# Build Next.js
echo "Building Next.js..."
npm run build:next

echo "=== Build Complete ==="
