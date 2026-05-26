import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { remotePatterns: [{ hostname: 'img.clerk.com' }] },
  output: 'standalone',
}

export default nextConfig
