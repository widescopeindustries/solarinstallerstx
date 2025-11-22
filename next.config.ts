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

  // Environment variables validation
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  },

  // Redirects for legacy routes
  async redirects() {
    return [
      {
        source: '/premium',
        destination: '/for-installers',
        permanent: true,
      },
      {
        source: '/upgrade-to-premium',
        destination: '/for-installers',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
