/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['doc.nozomi-th.com', '43.229.132.209'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['doc.nozomi-th.com', '43.229.132.209'],
    },
  },
  webpack: (config) => {
    config.externals = [...config.externals, 'bcrypt']
    return config
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://43.229.132.209/:path*',
      },
    ]
  },
  output: 'standalone',
  distDir: '.next',
  trailingSlash: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_API_URL: 'https://doc.nozomi-th.com/api',
    DB_HOST: '43.229.132.209',
    DB_USER: 'rootforbook',
    DB_PASSWORD: '534jj7?cA',
    DB_NAME: 'carbookingsystem',
  },
}

export default nextConfig
