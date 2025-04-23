#!/bin/bash

# Install dependencies
npm install

# Build the application
npm run build

# Install PM2 globally if not installed
npm install -g pm2

# Start the application with PM2
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Setup PM2 to start on system boot
pm2 startup 