import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Solar Installers TX',
  description: 'Terms of service for SolarInstallersTX.com. Read our terms and conditions for using our platform.',
  openGraph: {
    title: 'Terms of Service | Solar Installers TX',
    description: 'Terms of service for SolarInstallersTX.com. Read our terms and conditions for using our platform.',
    type: 'website',
    url: 'https://solarinstallerstx.com/terms',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service | Solar Installers TX',
    description: 'Terms of service for SolarInstallersTX.com.',
  },
  alternates: {
    canonical: 'https://solarinstallerstx.com/terms',
  },
}

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground">Last Updated: January 2025</p>

        <h2>Agreement to Terms</h2>
        <p>
          By accessing or using SolarInstallersTX.com, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
        </p>

        <h2>Use License</h2>
        <p>
          Permission is granted to temporarily access the materials (information or software) on SolarInstallersTX.com for personal, non-commercial transitory viewing only.
        </p>

        <h3>You may not:</h3>
        <ul>
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose or public display</li>
          <li>Attempt to decompile or reverse engineer any software on the site</li>
          <li>Remove any copyright or proprietary notations</li>
          <li>Transfer the materials to another person or mirror the materials on any other server</li>
        </ul>

        <h2>Disclaimer</h2>
        <p>
          The materials on SolarInstallersTX.com are provided on an &apos;as is&apos; basis. SolarInstallersTX.com makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>

        <h2>Installer Listings</h2>
        <p>
          SolarInstallersTX.com provides a directory of solar installers for informational purposes only. We do not:
        </p>
        <ul>
          <li>Guarantee the accuracy of installer information</li>
          <li>Endorse or recommend specific installers</li>
          <li>Guarantee the quality or outcome of any installation</li>
          <li>Act as an agent or representative of any installer</li>
        </ul>

        <h2>Safety Score System</h2>
        <p>
          Our Safety Score System is based on publicly available information and self-reported data. While we strive for accuracy, we cannot guarantee the completeness or accuracy of all safety scores. Users should conduct their own due diligence before selecting an installer.
        </p>

        <h2>User Responsibilities</h2>
        <p>When requesting quotes or contacting installers through our platform, you agree to:</p>
        <ul>
          <li>Provide accurate and truthful information</li>
          <li>Conduct your own research and due diligence</li>
          <li>Verify installer credentials and licenses independently</li>
          <li>Review and understand all contracts before signing</li>
        </ul>

        <h2>Limitations</h2>
        <p>
          In no event shall SolarInstallersTX.com or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SolarInstallersTX.com.
        </p>

        <h2>Accuracy of Materials</h2>
        <p>
          The materials appearing on SolarInstallersTX.com could include technical, typographical, or photographic errors. SolarInstallersTX.com does not warrant that any of the materials on its website are accurate, complete, or current.
        </p>

        <h2>Links</h2>
        <p>
          SolarInstallersTX.com has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by SolarInstallersTX.com of the site.
        </p>

        <h2>Modifications</h2>
        <p>
          SolarInstallersTX.com may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these terms of service.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of Texas, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </p>

        <h2>Contact Information</h2>
        <p>
          Questions about the Terms of Service should be sent to us at:
        </p>
        <p>
          Email: solar@solarinstallerstx.com<br />
          Phone: (682) 999-0953
        </p>
      </div>
    </main>
  )
}
