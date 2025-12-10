import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { NewHeader } from '@/components/NewHeader'
import { NewFooter } from '@/components/NewFooter'


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
