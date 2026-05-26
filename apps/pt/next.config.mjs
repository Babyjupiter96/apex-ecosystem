/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'img.clerk.com' },
      { hostname: 'images.unsplash.com' },
    ],
  },
  async headers() {
    return [
      { source: '/(.*)', headers: [
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      ]},
    ]
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  output: 'standalone',
}

export default nextConfig
