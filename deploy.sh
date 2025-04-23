#!/bin/bash

# Build the application
npm run build

# Copy files to Plesk directory
cp -r .next /var/www/vhosts/doc.nozomi-th.com/httpdocs/
cp -r public /var/www/vhosts/doc.nozomi-th.com/httpdocs/
cp package.json /var/www/vhosts/doc.nozomi-th.com/httpdocs/
cp package-lock.json /var/www/vhosts/doc.nozomi-th.com/httpdocs/
cp ecosystem.config.js /var/www/vhosts/doc.nozomi-th.com/httpdocs/
cp nginx.conf /var/www/vhosts/doc.nozomi-th.com/httpdocs/

# Install dependencies
cd /var/www/vhosts/doc.nozomi-th.com/httpdocs
npm install --production

# Restart PM2
pm2 restart car-booking-system

# Reload Nginx
nginx -s reload 