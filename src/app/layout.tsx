import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Providers } from './providers'
import { NewHeader } from '@/components/NewHeader'
import { NewFooter } from '@/components/NewFooter'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1e3a5f',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://solarinstallerstx.com'),
  title: {
    default: 'Solar Installers TX - Find Verified Solar Companies in Texas',
    template: '%s | Solar Installers TX'
  },
  description: 'Find and compare verified solar installers in Texas. 100-point safety scoring system. Get free quotes from top-rated solar companies.',
  keywords: ['solar installers texas', 'solar panels texas', 'solar companies texas', 'solar installation', 'NABCEP certified', 'Texas solar', 'solar quotes'],
  authors: [{ name: 'Solar Installers TX' }],
  creator: 'Solar Installers TX',
  publisher: 'Widescope Industries LLC',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://solarinstallerstx.com',
    siteName: 'Solar Installers TX',
    title: 'Solar Installers TX - Find Verified Solar Companies in Texas',
    description: 'Find and compare verified solar installers in Texas. 100-point safety scoring system. Get free quotes from top-rated solar companies.',
    images: [
      {
        url: 'https://solarinstallerstx.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Solar Installers TX - Find Verified Solar Companies in Texas',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar Installers TX - Find Verified Solar Companies in Texas',
    description: 'Find and compare verified solar installers in Texas. 100-point safety scoring system. Get free quotes from top-rated solar companies.',
    images: ['https://solarinstallerstx.com/opengraph-image'],
    creator: '@solarinstallerstx',
  },
  // Note: Add Google Search Console verification when available
  // verification: {
  //   google: 'your-actual-verification-code',
  // },
  category: 'business',
  classification: 'Solar Energy Directory',
}

// Organization and WebSite schemas for SEO
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://solarinstallerstx.com/#organization',
  name: 'Solar Installers TX',
  alternateName: 'SolarInstallersTX',
  url: 'https://solarinstallerstx.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://solarinstallerstx.com/opengraph-image',
    width: 1200,
    height: 630,
  },
  description: 'Texas-based directory of verified solar installers with 100-point safety scoring system',
  email: 'solar@solarinstallerstx.com',
  telephone: '(682) 999-0953',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'State',
    name: 'Texas',
    sameAs: 'https://en.wikipedia.org/wiki/Texas',
  },
  sameAs: [
    'https://www.facebook.com/solarinstallerstx',
    'https://twitter.com/solarinstallerstx',
  ],
  foundingDate: '2024',
  founder: {
    '@type': 'Organization',
    name: 'Widescope Industries LLC',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://solarinstallerstx.com/#website',
  url: 'https://solarinstallerstx.com',
  name: 'Solar Installers TX',
  description: 'Find and compare verified solar installers in Texas with our 100-point safety scoring system',
  publisher: {
    '@id': 'https://solarinstallerstx.com/#organization',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://solarinstallerstx.com/installers?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'en-US',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <Providers>
          <NewHeader />
          {children}
          <NewFooter />
        </Providers>
      </body>
    </html>
  )
}
