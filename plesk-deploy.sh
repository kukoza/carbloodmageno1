#!/bin/bash

# ตั้งค่า Node.js version
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 18

# ติดตั้ง dependencies
npm install

# Build project
NODE_ENV=production npm run build

# สร้างโฟลเดอร์ถ้ายังไม่มี
mkdir -p /var/www/vhosts/doc.nozomi-th.com/httpdocs

# คัดลอกไฟล์ที่จำเป็น
cp -r .next /var/www/vhosts/doc.nozomi-th.com/httpdocs/
cp -r public /var/www/vhosts/doc.nozomi-th.com/httpdocs/
cp -r node_modules /var/www/vhosts/doc.nozomi-th.com/httpdocs/
cp package.json /var/www/vhosts/doc.nozomi-th.com/httpdocs/
cp next.config.mjs /var/www/vhosts/doc.nozomi-th.com/httpdocs/

# สร้าง pm2 config
cat > /var/www/vhosts/doc.nozomi-th.com/httpdocs/ecosystem.config.js << EOL
module.exports = {
  apps: [{
    name: 'car-booking',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOL

# รีสตาร์ท PM2
cd /var/www/vhosts/doc.nozomi-th.com/httpdocs
pm2 delete car-booking || true
pm2 start ecosystem.config.js 