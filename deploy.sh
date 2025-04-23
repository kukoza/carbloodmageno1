#!/bin/bash

# Build the application
npm run build

# สร้างโฟลเดอร์ปลายทาง (ถ้ายังไม่มี)
mkdir -p "C:\inetpub\vhosts\doc.nozomi-th.com\httpdocs"

# คัดลอกไฟล์ทั้งหมดไปยังโฟลเดอร์ปลายทาง
cp -r dist/* "C:\inetpub\vhosts\doc.nozomi-th.com\httpdocs\"
cp -r public/* "C:\inetpub\vhosts\doc.nozomi-th.com\httpdocs\public\"
cp package.json "C:\inetpub\vhosts\doc.nozomi-th.com\httpdocs\"
cp web.config "C:\inetpub\vhosts\doc.nozomi-th.com\httpdocs\"
cp server.js "C:\inetpub\vhosts\doc.nozomi-th.com\httpdocs\"

# ติดตั้ง dependencies
cd "C:\inetpub\vhosts\doc.nozomi-th.com\httpdocs"
npm install --production

# รีสตาร์ท IIS
iisreset 