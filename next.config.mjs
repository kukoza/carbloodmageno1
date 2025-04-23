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
  basePath: '',
  assetPrefix: '',
  output: 'standalone',
  distDir: '.next',
  trailingSlash: true,
}

export default nextConfig
