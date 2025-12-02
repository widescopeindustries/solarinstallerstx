import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], display: 'swap', preload: true })

export const metadata: Metadata = {
  title: {
    default: 'Solar Installers TX - Find Verified Solar Companies in Texas',
    template: '%s | Solar Installers TX'
  },
  description: 'Find and compare verified solar installers in Texas. 100-point safety scoring system. Get free quotes from top-rated solar companies.',
  keywords: ['solar installers texas', 'solar panels texas', 'solar companies texas', 'solar installation'],
  authors: [{ name: 'Solar Installers TX' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://solarinstallerstx.com',
    siteName: 'Solar Installers TX',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
