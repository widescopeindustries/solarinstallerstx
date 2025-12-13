import { Metadata } from 'next'

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
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last Updated: January 2025</p>

        <h2>Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you:</p>
        <ul>
          <li>Request a solar installation quote</li>
          <li>Contact us through our website</li>
          <li>Subscribe to our newsletter</li>
          <li>Use our solar calculator tools</li>
        </ul>

        <h3>Information Collected:</h3>
        <ul>
          <li>Name and contact information (email, phone number)</li>
          <li>Property location and address</li>
          <li>Energy usage information</li>
          <li>Website usage data and analytics</li>
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
          <li><strong>Solar Installers:</strong> When you request a quote, we share your contact information with NABCEP certified installers in your area</li>
          <li><strong>Service Providers:</strong> Third-party companies that help us operate our website and provide services</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
        </ul>

        <h2>Your Privacy Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt-out of marketing communications</li>
          <li>File a complaint with a supervisory authority</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2>Cookies and Tracking</h2>
        <p>
          We use cookies and similar tracking technologies to improve your browsing experience, analyze website traffic, and personalize content. You can control cookies through your browser settings.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this privacy policy, please contact us at:
        </p>
        <p>
          Email: solar@solarinstallerstx.com<br />
          Phone: (682) 999-0953
        </p>
      </div>
    </main>
  )
}
