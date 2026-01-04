import { Metadata } from 'next'
import { LegalLayout } from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy | Solar Installers TX',
  description: 'Privacy policy for SolarInstallersTX.com. Learn how we collect, use, and protect your personal information.',
  openGraph: {
    title: 'Privacy Policy | Solar Installers TX',
    description: 'Privacy policy for SolarInstallersTX.com. Learn how we collect, use, and protect your personal information.',
    type: 'website',
    url: 'https://solarinstallerstx.com/privacy',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Solar Installers TX',
    description: 'Privacy policy for SolarInstallersTX.com.',
  },
  alternates: {
    canonical: 'https://solarinstallerstx.com/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="January 4, 2026">
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly to us, such as when you:</p>
      <ul>
        <li>Request a solar installation quote</li>
        <li>Contact us through our website</li>
        <li>Subscribe to our newsletter</li>
        <li>Use our solar calculator tools</li>
      </ul>

      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-md my-4 border-l-4 border-blue-500">
        <p className="mt-0 mb-0 text-sm">
          <strong>TCPA & Texas SB 140 Consent:</strong> By submitting a quote request, you explicitly agree to receive telephone calls and text messages (SMS) from us and our partner installers, even if your number is on a state or federal Do Not Call list. You understand that consent is not a condition of purchase.
        </p>
      </div>

      <h3>Information Categories</h3>
      <ul>
        <li><strong>Identity Data:</strong> Name, username, or similar identifier.</li>
        <li><strong>Contact Data:</strong> Billing address, delivery address, email address, and telephone numbers.</li>
        <li><strong>Technical Data:</strong> Internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
        <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Connect you with qualified solar installers in your area</li>
        <li>Provide customer support and respond to your requests</li>
        <li>Send you relevant information about solar installations and incentives</li>
        <li>Improve our website and services</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>Information Sharing</h2>
      <p>We may share your information with:</p>
      <ul>
        <li><strong>Solar Installers:</strong> When you request a quote, we share your contact information with NABCEP certified installers in your area so they can provide the requested estimates.</li>
        <li><strong>Service Providers:</strong> Third-party companies that help us operate our website and provide services (e.g., hosting, analytics).</li>
        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
      </ul>

      <h2>Your Privacy Rights</h2>
      <p>Under applicable laws, you have the right to:</p>
      <ul>
        <li>Access your personal information</li>
        <li>Correct inaccurate information</li>
        <li>Request deletion of your information ("Right to be Forgotten")</li>
        <li>Opt-out of marketing communications</li>
        <li>File a complaint with a supervisory authority</li>
      </ul>

      <h2>Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We use SSL encryption for all data transmission and secure servers for storage.
      </p>

      <h2>Cookies and Tracking</h2>
      <p>
        We use cookies and similar tracking technologies to improve your browsing experience, analyze website traffic, and personalize content. You can control cookies through your browser settings.
      </p>

      <h2>Children&apos;s Privacy</h2>
      <p>
        Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.
      </p>
    </LegalLayout>
  )
}
