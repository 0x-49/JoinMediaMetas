/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  // Optimize build performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Reduce build output size
  output: 'standalone',
  experimental: {
    optimizeCss: true
  }
}

module.exports = nextConfig
