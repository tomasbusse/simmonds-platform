/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Don't fail build on type errors during deployment
    ignoreBuildErrors: true,
  },
  eslint: {
    // Don't fail build on ESLint errors during deployment
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
