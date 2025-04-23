module.exports = {
  apps: [
    {
      name: 'car-booking-system',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/var/www/vhosts/doc.nozomi-th.com/httpdocs',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
}; 