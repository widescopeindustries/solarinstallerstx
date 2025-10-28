import { Header } from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";

const Privacy = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy | SolarInstallersTX"
        description="Privacy policy for SolarInstallersTX. Learn how we protect your personal information when you use our solar installer directory and services."
        canonicalUrl="https://solarinstallerstx.com/privacy"
      />
      <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                SolarInstallersTX ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">Personal Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Register for an account</li>
                <li>Contact us through our contact form</li>
                <li>Subscribe to our newsletter</li>
                <li>Request information about solar installers</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This information may include your name, email address, phone number, and location.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">Automatically Collected Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                When you visit our website, we automatically collect certain information about your device, including 
                information about your web browser, IP address, time zone, and some of the cookies installed on your device.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Provide and maintain our services</li>
                <li>Connect you with verified solar installers</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you updates and marketing communications (with your consent)</li>
                <li>Improve our website and user experience</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Affiliate Marketing & Monetization</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SolarInstallersTX.com participates in affiliate marketing programs. This means:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Commission Relationships:</strong> We may earn commissions when you click affiliate links or make purchases through our partners (such as Signature Solar and other solar equipment vendors)</li>
                <li><strong>No Additional Cost:</strong> These commissions come at no extra cost to you and do not affect the price you pay</li>
                <li><strong>Editorial Independence:</strong> Our affiliate relationships do not influence our editorial content or installer reviews</li>
                <li><strong>Data Sharing:</strong> When you click affiliate links, our partners may receive information such as your IP address, referral source, and timestamp to track conversions</li>
                <li><strong>Tracking Technologies:</strong> Affiliate programs use cookies and tracking pixels to attribute purchases to our referrals</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                For full transparency, see our <a href="/affiliate-disclosure" className="text-primary hover:underline">Affiliate Disclosure</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Sharing Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>With Solar Installers:</strong> When you request information, we share your contact details with relevant installers</li>
                <li><strong>Affiliate Partners:</strong> When you click affiliate links, conversion data may be shared with partners to track commissions</li>
                <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition of our business</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. 
                However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot 
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices 
                of these external sites and encourage you to read their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">California Privacy Rights (CCPA)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you are a California resident, the California Consumer Privacy Act (CCPA) provides you with specific rights 
                regarding your personal information:
              </p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">Your CCPA Rights</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Right to Know:</strong> You have the right to request information about the categories and specific pieces of personal information we have collected about you in the past 12 months.</li>
                <li><strong>Right to Delete:</strong> You have the right to request deletion of your personal information, subject to certain exceptions.</li>
                <li><strong>Right to Opt-Out:</strong> You have the right to opt-out of the sale of your personal information. We do not sell your personal information.</li>
                <li><strong>Right to Non-Discrimination:</strong> You have the right not to receive discriminatory treatment for exercising your CCPA rights.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Information We Collect</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In the past 12 months, we have collected the following categories of personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Identifiers (name, email address, phone number)</li>
                <li>Internet or network activity (browsing history, search history)</li>
                <li>Geolocation data (city, state)</li>
                <li>Inferences drawn from the above to create a profile about preferences</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">How to Exercise Your Rights</h3>
              <p className="text-muted-foreground leading-relaxed">
                To exercise your CCPA rights, please contact us at privacy@solarinstallerstx.com or call (682) 999-0953. 
                We will respond to your request within 45 days. You may designate an authorized agent to make requests on your behalf.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Lead Generation and Consent</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you submit a request for solar installer quotes through our website, you explicitly consent to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Sharing your contact information with matched NABCEP-certified solar installers in your area</li>
                <li>Being contacted by these installers via phone, email, or text message</li>
                <li>Receiving follow-up communications about solar installation services</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You can withdraw your consent at any time by contacting us or using the unsubscribe link in communications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal 
                information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
                new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>Email:</strong> privacy@solarinstallerstx.com</li>
                <li><strong>Phone:</strong> (555) 123-4567</li>
              </ul>
              <div className="mt-6">
                <a 
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      </div>
    </>
  );
};

export default Privacy;
