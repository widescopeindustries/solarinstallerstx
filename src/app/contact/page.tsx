import { Metadata } from 'next'
import ContactFormClient from './ContactFormClient'

export const metadata: Metadata = {
  title: 'Contact Solar Installers TX | Get Free Quotes',
  description: 'Contact our team for free solar quotes from NABCEP certified installers in Texas. Get expert guidance on your solar installation project.',
  keywords: ['contact solar installers tx', 'solar quote request', 'texas solar contact'],
  openGraph: {
    title: 'Contact Solar Installers TX',
    description: 'Contact our team for free solar quotes from NABCEP certified installers in Texas.',
    type: 'website',
    url: 'https://solarinstallerstx.com/contact',
    images: [
      {
        url: '/opengraph-image.svg',
        width: 1200,
        height: 630,
        alt: 'Contact Solar Installers TX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Solar Installers TX | Get Free Quotes',
    description: 'Contact our team for free solar quotes from NABCEP certified installers in Texas.',
    images: ['/opengraph-image.svg'],
  },
  alternates: {
    canonical: 'https://solarinstallerstx.com/contact',
  },
}

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get Your Free Solar Quote</h2>
            <p className="text-muted-foreground mb-6">
              Ready to go solar? Contact us to get connected with NABCEP certified installers in your area.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">
                  <a
                    href="mailto:solar@solarinstallerstx.com"
                    className="text-primary hover:underline"
                  >
                    solar@solarinstallerstx.com
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted-foreground">(682) 999-0953</p>
              </div>
            </div>
          </div>
          <ContactFormClient />
        </div>
      </div>
    </main>
  )
}
