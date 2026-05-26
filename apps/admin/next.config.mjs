/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: { remotePatterns: [{ hostname: 'img.clerk.com' }] },
  output: 'standalone',
}

export default nextConfig
