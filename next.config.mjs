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
  distDir: 'dist',
  trailingSlash: true,
  poweredByHeader: false,
}

export default nextConfig
