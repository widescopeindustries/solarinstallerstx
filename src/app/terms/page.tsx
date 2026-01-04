import { Metadata } from 'next'
import { LegalLayout } from '@/components/LegalLayout'

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
    <LegalLayout title="Terms of Service" lastUpdated="January 4, 2025">
      <h2>Agreement to Terms</h2>
      <p>
        By accessing or using SolarInstallersTX.com ("the Site"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
      </p>

      <h2>Use License</h2>
      <p>
        Permission is granted to temporarily access the materials (information or software) on SolarInstallersTX.com for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
      </p>

      <h3>Under this license, you may not:</h3>
      <ul>
        <li>Modify or copy the materials;</li>
        <li>Use the materials for any commercial purpose or public display;</li>
        <li>Attempt to decompile or reverse engineer any software on the site;</li>
        <li>Remove any copyright or proprietary notations;</li>
        <li>Transfer the materials to another person or mirror the materials on any other server.</li>
      </ul>

      <h2>Disclaimer</h2>
      <p>
        The materials on SolarInstallersTX.com are provided on an &apos;as is&apos; basis. SolarInstallersTX.com makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
      </p>

      <h2>Installer Listings and Relationship</h2>
      <p>
        SolarInstallersTX.com provides a directory of solar installers for informational purposes only. We act as a connector between homeowners and installers.
      </p>
      <ul>
        <li><strong>We do not:</strong> Guarantee the accuracy of installer information, endorse specific installers, guarantee the quality of installations, or act as an agent for any installer.</li>
        <li><strong>We are not:</strong> A solar installer, a contractor, or a party to any contract between you and an installer.</li>
      </ul>

      <h2>Safety Score System</h2>
      <p>
        Our Safety Score System is an analytical tool based on publicly available information and self-reported data. While we strive for accuracy, determining financial stability is complex. The score is an opinion, not a statement of fact or financial guarantee. Users should conduct their own due diligence before selecting an installer.
      </p>

      <h2>User Responsibilities</h2>
      <p>When requesting quotes or contacting installers through our platform, you agree to:</p>
      <ul>
        <li>Provide accurate and truthful information about your property and energy usage;</li>
        <li>Conduct your own research and due diligence on any installer you choose to hire;</li>
        <li>Verify installer credentials, licenses, and insurance independently;</li>
        <li>Review and understand all contracts before signing.</li>
      </ul>

      <h2>Limitations of Liability</h2>
      <p>
        In no event shall SolarInstallersTX.com or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SolarInstallersTX.com, even if SolarInstallersTX.com has been notified orally or in writing of the possibility of such damage.
      </p>

      <h2>Accuracy of Materials</h2>
      <p>
        The materials appearing on SolarInstallersTX.com could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials at any time without notice.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms and conditions are governed by and construed in accordance with the laws of the State of Texas, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
      </p>
    </LegalLayout>
  )
}
