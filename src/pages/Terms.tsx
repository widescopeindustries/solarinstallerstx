import { Header } from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";

const Terms = () => {
  return (
    <>
      <SEOHead
        title="Terms of Service | SolarInstallersTX"
        description="Terms of service for SolarInstallersTX. Read our terms and conditions for using our solar installer directory and services."
        canonicalUrl="https://solarinstallerstx.com/terms"
      />
      <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last Updated: January 15, 2025</p>

        <div className="space-y-6 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using SolarInstallersTX.com ("the Site"), you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Service Description</h2>
            <p>
              SolarInstallersTX.com provides a directory of solar installation professionals in Texas. We connect homeowners 
              with NABCEP-certified and verified solar installers. We are not a solar installation company and do not perform 
              installation services directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Installer Listings</h2>
            <p>
              We verify installer certifications and credentials, but we do not guarantee the quality of work, pricing, or availability 
              of any installer listed on our platform. All business transactions are between you and the installer directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. User Responsibilities</h2>
            <p className="mb-2">As a user of this Site, you agree to:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Provide accurate contact information when requesting quotes</li>
              <li>Verify installer licenses and credentials independently</li>
              <li>Obtain multiple quotes before making installation decisions</li>
              <li>Review all contracts and warranties directly with installers</li>
              <li>Not misuse the Site or attempt to manipulate listings or reviews</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Verification Process</h2>
            <p>
              Installers marked as "Verified" have completed our verification process, which includes confirmation of 
              NABCEP certification, business licensing, and insurance coverage. However, verification status does not 
              constitute an endorsement or guarantee of service quality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Limitation of Liability</h2>
            <p>
              SolarInstallersTX.com is not liable for any damages, losses, or disputes arising from interactions with installers 
              listed on our platform. We are a directory service only and do not warrant the performance, quality, or reliability 
              of any installer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Intellectual Property</h2>
            <p>
              All content on this Site, including text, graphics, logos, and software, is the property of SolarInstallersTX.com 
              and protected by copyright laws. You may not reproduce or distribute Site content without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Privacy</h2>
            <p>
              Your use of the Site is also governed by our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>. 
              By using the Site, you consent to the collection and use of information as described in the Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with 
              an updated "Last Updated" date. Continued use of the Site after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Governing Law</h2>
            <p>
              These Terms of Service are governed by the laws of the State of Texas. Any disputes arising from these terms 
              or use of the Site shall be resolved in the courts of Texas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Contact Information</h2>
            <p>
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-2 space-y-1">
              <p>Email: <a href="mailto:legal@solarinstallerstx.com" className="text-primary hover:underline">legal@solarinstallerstx.com</a></p>
              <p>Phone: <a href="tel:+15125551234" className="text-primary hover:underline">(512) 555-1234</a></p>
            </div>
          </section>
        </div>
      </main>
      </div>
    </>
  );
};

export default Terms;
