import { Metadata } from 'next'

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
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1>Refund Policy</h1>
        <p className="text-muted-foreground">Last Updated: January 2025</p>

        <h2>Overview</h2>
        <p>
          This refund policy applies to premium listing subscriptions and services purchased on SolarInstallersTX.com. Our directory listing service for homeowners is free and does not require any payment.
        </p>

        <h2>Premium Installer Listings</h2>
        <p>
          Solar installers who purchase premium listings on our platform are subject to the following refund policy:
        </p>

        <h3>30-Day Money-Back Guarantee</h3>
        <p>
          We offer a 30-day money-back guarantee on all new premium listing subscriptions. If you are not satisfied with your premium listing within the first 30 days, you may request a full refund.
        </p>

        <h4>To qualify for a refund:</h4>
        <ul>
          <li>The refund request must be made within 30 days of the initial purchase date</li>
          <li>You must contact us at solar@solarinstallerstx.com with your refund request</li>
          <li>Your account must be in good standing (no violations of terms of service)</li>
        </ul>

        <h3>Subscription Cancellations</h3>
        <p>
          Premium listing subscriptions are billed on a monthly basis. You may cancel your subscription at any time:
        </p>
        <ul>
          <li>Cancellations take effect at the end of the current billing period</li>
          <li>No refunds are provided for partial months</li>
          <li>Your listing will remain active until the end of the paid period</li>
          <li>No refunds are provided for unused time in a billing cycle</li>
        </ul>

        <h2>Non-Refundable Services</h2>
        <p>
          The following are non-refundable after 30 days:
        </p>
        <ul>
          <li>Monthly subscription fees (after the 30-day guarantee period)</li>
          <li>Setup or onboarding fees (after services have been rendered)</li>
          <li>Custom marketing materials or services (once delivered)</li>
        </ul>

        <h2>Refund Processing</h2>
        <p>
          Approved refunds will be processed within 5-10 business days and credited back to the original payment method used for the purchase.
        </p>

        <h2>Disputes and Chargebacks</h2>
        <p>
          If you have an issue with a charge, please contact us at solar@solarinstallerstx.com before initiating a chargeback. Chargebacks may result in immediate termination of services and may affect your ability to use our platform in the future.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon posting to the website. Your continued use of the service after changes are posted constitutes acceptance of the modified policy.
        </p>

        <h2>Contact Us</h2>
        <p>
          For refund requests or questions about this policy, please contact us:
        </p>
        <p>
          Email: solar@solarinstallerstx.com<br />
          Phone: (682) 999-0953<br />
          Business Hours: Monday-Friday, 9am-5pm CST
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded my-8">
          <h3 className="mt-0">Important Note</h3>
          <p className="mb-0">
            This refund policy applies only to services purchased from SolarInstallersTX.com. For refunds related to solar installation contracts, warranties, or services provided by individual installers listed on our platform, please contact the installer directly. We are not responsible for refunds or disputes related to third-party installer services.
          </p>
        </div>
      </div>
    </main>
  )
}
