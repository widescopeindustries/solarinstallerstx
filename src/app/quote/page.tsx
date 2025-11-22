import { Metadata } from 'next'
import { ProgressiveQuoteForm } from '@/components/ProgressiveQuoteForm'

export const metadata: Metadata = {
  title: 'Get Free Solar Quote | Solar Installers TX',
  description: 'Get matched with top-rated solar installers in Texas. Free quotes, no obligation. Compare prices and find the best solar company for your home in under 3 minutes.',
  keywords: ['free solar quote texas', 'solar installation quote', 'texas solar prices', 'solar installer quotes'],
  openGraph: {
    title: 'Get Your Free Solar Quote | Solar Installers TX',
    description: 'Connect with verified solar installers in Texas. Free quotes in 3 minutes. No credit card required.',
    type: 'website',
  },
}

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get Your Free Solar Quote
          </h1>
          <p className="text-xl md:text-2xl mb-2 opacity-90">
            Connect with verified installers in 3 easy steps
          </p>
          <p className="text-lg opacity-80">
            No credit card required • 100% free • Takes less than 3 minutes
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-4">
        <ProgressiveQuoteForm />
      </section>

      {/* Trust Signals Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Solar Installers TX?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Installers</h3>
              <p className="text-gray-600">
                All installers undergo our rigorous 100-point safety scoring system
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Compare multiple quotes to ensure you get the best deal for your solar installation
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Easy</h3>
              <p className="text-gray-600">
                Get matched with top installers in minutes, not days
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Is this really free?</h3>
              <p className="text-gray-600">
                Yes! Our quote service is 100% free with no hidden fees. We connect you with installers who compete for your business.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">How many quotes will I receive?</h3>
              <p className="text-gray-600">
                You'll typically receive 3-5 competitive quotes from verified installers in your area within 24-48 hours.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">What happens after I submit?</h3>
              <p className="text-gray-600">
                We'll match you with qualified installers who will contact you to schedule a free home assessment and provide detailed quotes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Am I obligated to choose an installer?</h3>
              <p className="text-gray-600">
                No! There's zero obligation. Review all quotes, ask questions, and only proceed if you find the right fit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
