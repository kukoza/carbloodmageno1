module.exports = {
  apps: [{
    name: 'car-booking',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
} 