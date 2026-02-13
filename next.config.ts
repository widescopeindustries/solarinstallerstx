import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-context-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-label',
      '@radix-ui/react-menubar',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group',
      '@radix-ui/react-tooltip',
      'recharts',
      'date-fns',
    ],
  },

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
      {
        source: '/texas-solar-incentives-2025',
        destination: '/learn/texas-incentives',
        permanent: true,
      },
      {
        source: '/texas-solar-incentives',
        destination: '/learn/texas-incentives',
        permanent: true,
      },
      {
        source: '/texas-guide',
        destination: '/learn/solar-buying-guide-texas',
        permanent: true,
      },
      {
        source: '/sunnova-help',
        destination: '/blog/texas-solar-bankruptcies-2024-2025',
        permanent: true,
      },
      {
        source: '/how-we-protect-you',
        destination: '/safety-score-explained',
        permanent: true,
      },
      {
        source: '/nabcep-certified-installers',
        destination: '/installers',
        permanent: true,
      },
      {
        source: '/sitemap',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/report-bankruptcy',
        destination: '/contact',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
