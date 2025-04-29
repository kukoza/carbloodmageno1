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
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
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
  },
}

export default nextConfig
