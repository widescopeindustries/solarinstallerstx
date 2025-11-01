import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const AffiliateDisclosurePage = () => {
  return (
    <>
      <SEOHead
        title="Affiliate Disclosure | SolarInstallersTX"
        description="Learn about SolarInstallersTX's affiliate relationships and how we earn commissions to support our free directory service."
        canonicalUrl="https://solarinstallerstx.com/affiliate-disclosure"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Affiliate Disclosure</h1>
              <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            <Alert className="mb-8 border-amber-500 bg-amber-50">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <AlertDescription className="text-amber-900">
                <strong>Transparency First:</strong> SolarInstallersTX.com participates in affiliate marketing programs. 
                When you click certain links and make purchases, we may receive a commission at no additional cost to you.
              </AlertDescription>
            </Alert>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Our Commitment to You</h2>
                <p className="text-muted-foreground leading-relaxed">
                  SolarInstallersTX.com is committed to providing honest, unbiased information about solar installers 
                  and solar energy solutions in Texas. We believe transparency builds trust, and we want you to understand 
                  exactly how we operate and earn revenue.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">What Are Affiliate Links?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  An affiliate link is a special URL that contains a unique tracking code. When you:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Click an affiliate link on our website</li>
                  <li>Visit the partner's website</li>
                  <li>Make a purchase or complete an action (like requesting a quote)</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  ...we may receive a small commission from the company. This commission comes at <strong>no extra cost to you</strong> 
                  — you pay the same price you would if you visited the company directly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Our Affiliate Partners</h2>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">Current Affiliate Relationships:</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="font-semibold mt-1">•</span>
                        <div>
                          <strong>Signature Solar (Premiere Partner):</strong> We partner with Signature Solar, our premiere installer 
                          and equipment supplier in Texas. They provide both professional solar installation services and high-quality 
                          solar equipment (panels, inverters, batteries, etc.). When you request a quote or make a purchase through our 
                          links, we earn a commission.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-semibold mt-1">•</span>
                        <div>
                          <strong>Solar Installers:</strong> Some installers in our directory may pay referral fees when they receive 
                          qualified leads through our platform. This does NOT affect their ranking or reviews.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-semibold mt-1">•</span>
                        <div>
                          <strong>Service Providers:</strong> We may earn commissions from energy monitoring systems, financing companies, 
                          and other solar-related services we recommend.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Editorial Independence</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our affiliate relationships do NOT influence our editorial content, installer rankings, or reviews. Here's how we maintain independence:
                </p>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold text-xl">✓</span>
                        <div>
                          <strong>Objective Reviews:</strong> All installer reviews and ratings are based on NABCEP certification status, 
                          customer reviews, project history, and verified credentials — NOT affiliate status.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold text-xl">✓</span>
                        <div>
                          <strong>Clear Labeling:</strong> Affiliate links are clearly marked with disclosures like "Affiliate Link" or 
                          with alert banners explaining our commission relationship.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold text-xl">✓</span>
                        <div>
                          <strong>No Pay-to-Play:</strong> Companies cannot pay to improve their ranking or remove negative reviews. 
                          Our directory remains merit-based.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold text-xl">✓</span>
                        <div>
                          <strong>Your Best Interest:</strong> We only recommend products and services we genuinely believe will benefit Texas homeowners.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">FTC Compliance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This disclosure complies with the Federal Trade Commission's (FTC) guidelines concerning the use of endorsements 
                  and testimonials in advertising (16 CFR Part 255). We are required by law to disclose material connections 
                  between our website and the companies we recommend.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">How Commissions Support Our Service</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Affiliate commissions help us:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Maintain a free directory of verified solar installers across Texas</li>
                  <li>Continuously update installer information and certifications</li>
                  <li>Produce educational content about solar energy and incentives</li>
                  <li>Provide free tools like our solar calculator and quote comparison service</li>
                  <li>Keep our website operational with hosting, security, and development costs</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Without affiliate revenue, we would need to charge subscription fees or list installation costs, which would limit access 
                  to solar information for Texas homeowners.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Your Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  When you click affiliate links, our partners may use cookies or tracking pixels to attribute your purchase to our referral. 
                  This data collection is governed by their privacy policies, not ours. However, we only partner with companies that respect 
                  consumer privacy and comply with applicable laws.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  For more information about how we collect and use your data, see our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Questions About Our Affiliate Program?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We're happy to answer any questions about our affiliate relationships, commission structure, or how we maintain editorial independence. 
                  Contact us at <a href="mailto:info@solarinstallerstx.com" className="text-primary hover:underline">info@solarinstallerstx.com</a>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Changes to This Disclosure</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this affiliate disclosure as we add new partners or change our business model. Material changes will be reflected 
                  by updating the "Last updated" date at the top of this page.
                </p>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AffiliateDisclosurePage;
