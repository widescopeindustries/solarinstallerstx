import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ryinjghimmyisvttfibi.supabase.co',
        pathname: '/storage/v1/object/**',
      },
      {
        protocol: 'https',
        hostname: 'api.mapbox.com',
        pathname: '/styles/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },



  // Redirects for legacy routes
  async redirects() {
    return [
      {
        source: '/premium',
        destination: '/upgrade-to-premium',
        permanent: true,
      },
      {
        source: '/for-installers',
        destination: '/upgrade-to-premium',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
