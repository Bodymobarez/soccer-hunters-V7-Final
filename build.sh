#!/bin/bash
# Vercel build script to ensure proper dependency resolution

echo "Starting Vercel build process..."
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Install client dependencies
echo "Installing client dependencies..."
cd client
npm install

# Clean any cache
echo "Cleaning cache..."
npm cache clean --force
rm -rf node_modules/.cache

# Build the project
echo "Building client..."
npm run build

echo "Build completed successfully!"
