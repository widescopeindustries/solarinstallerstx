import { Metadata } from 'next'
import { LegalLayout } from '@/components/LegalLayout'
import { AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Refund Policy | Solar Installers TX',
  description: 'Refund policy for SolarInstallersTX.com premium listings and services.',
  openGraph: {
    title: 'Refund Policy | Solar Installers TX',
    description: 'Refund policy for SolarInstallersTX.com premium listings and services.',
    type: 'website',
    url: 'https://solarinstallerstx.com/refund',
  },
  twitter: {
    card: 'summary',
    title: 'Refund Policy | Solar Installers TX',
    description: 'Refund policy for SolarInstallersTX.com premium listings.',
  },
  alternates: {
    canonical: 'https://solarinstallerstx.com/refund',
  },
}

export default function RefundPage() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="January 4, 2026">
      <p className="lead text-xl text-muted-foreground">
        We strive for transparency and fairness in all our transactions. Below is our comprehensive refund policy for premium services.
      </p>

      <h2>Overview</h2>
      <p>
        This refund policy applies to premium listing subscriptions and services purchased on SolarInstallersTX.com. <strong>Our directory listing service for homeowners is free and does not require any payment.</strong>
      </p>

      <h2>Premium Installer Listings</h2>
      <p>
        Solar installers who purchase premium listings on our platform are subject to the following refund policy:
      </p>

      <h3>30-Day Money-Back Guarantee</h3>
      <p>
        We offer a <strong>30-day money-back guarantee</strong> on all new premium listing subscriptions. If you are not satisfied with your premium listing within the first 30 days, you may request a full refund.
      </p>

      <h4>To qualify for a refund:</h4>
      <ul>
        <li>The refund request must be made within 30 days of the initial purchase date.</li>
        <li>You must contact us at <strong>info@solarinstallerstx.com</strong> with your refund request.</li>
        <li>Your account must be in good standing (no violations of terms of service).</li>
      </ul>

      <h3>Subscription Cancellations</h3>
      <p>
        Premium listing subscriptions are billed on a monthly basis. You may cancel your subscription at any time:
      </p>
      <ul>
        <li>Cancellations take effect at the end of the current billing period.</li>
        <li>No refunds are provided for partial months (prorated refunds).</li>
        <li>Your listing will remain active until the end of the paid period.</li>
        <li>No refunds are provided for unused time in a billing cycle.</li>
      </ul>

      <h2>Non-Refundable Services</h2>
      <p>
        The following are non-refundable after 30 days:
      </p>
      <ul>
        <li>Monthly subscription fees (after the 30-day guarantee period).</li>
        <li>Setup or onboarding fees (after services have been rendered).</li>
        <li>Custom marketing materials or services (once delivered to the client).</li>
      </ul>

      <h2>Refund Processing</h2>
      <p>
        Approved refunds will be processed within <strong>5-10 business days</strong> and credited back to the original payment method used for the purchase. You will receive a confirmation email once the refund has been initiated.
      </p>

      <h2>Disputes and Chargebacks</h2>
      <p>
        If you have an issue with a charge, please contact us at info@solarinstallerstx.com <em>before</em> initiating a chargeback. Chargebacks without prior communication may result in immediate termination of services and account suspension.
      </p>

      <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 p-6 rounded-md my-8 flex gap-4 items-start">
        <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="mt-0 font-bold text-blue-900 dark:text-blue-100">Important: Installer Services</h3>
          <p className="mb-0 text-blue-800 dark:text-blue-200">
            This refund policy applies <strong>only</strong> to services purchased from SolarInstallersTX.com (such as premium listings). For refunds related to actual solar installation contracts, warranties, or services provided by installers found on our platform, you must contact that installer directly. We are not a party to the installation contract.
          </p>
        </div>
      </div>
    </LegalLayout>
  )
}
