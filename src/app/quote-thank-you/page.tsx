import { Metadata } from 'next'
import { CheckCircle, Mail, Phone, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Thank You for Your Quote Request | Solar Installers TX',
  description: 'Your solar quote request has been received. We\'ll connect you with verified installers within 24 hours.',
  robots: 'noindex, nofollow', // Don't index thank you pages
}

export default function QuoteThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-gray-600">
            Your quote request has been received successfully
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">What Happens Next?</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">1. Confirmation Email</h3>
                <p className="text-gray-600">
                  Check your inbox for a confirmation email with your quote request details.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">2. Installer Matching (24 hours)</h3>
                <p className="text-gray-600">
                  We're matching you with 3-5 verified solar installers in your area based on our 100-point safety scoring system.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">3. Installer Contact (24-48 hours)</h3>
                <p className="text-gray-600">
                  Top-rated installers will reach out to schedule free consultations and provide detailed quotes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Important Information
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Keep your phone handy - installers may call or text within 24 hours</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Check your email (including spam folder) for updates</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>You're under no obligation - review all quotes before deciding</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Ask installers about available rebates and financing options</span>
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/installers">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Browse Installers
            </Button>
          </Link>
          <Link href="/safety-score-explained">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Learn About Our Safety Score
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-2">
            Questions? We're here to help!
          </p>
          <p className="text-gray-900 font-semibold">
            Email: <a href="mailto:support@solarinstallerstx.com" className="text-blue-600 hover:underline">support@solarinstallerstx.com</a>
          </p>
        </div>
      </div>
    </main>
  )
}
