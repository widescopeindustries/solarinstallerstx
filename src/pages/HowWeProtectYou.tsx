import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, CheckCircle, Search, AlertTriangle, TrendingUp, Award } from "lucide-react";

const HowWeProtectYou = () => {
  return (
    <>
      <SEOHead
        title="How We Protect You - SolarInstallersTX"
        description="Learn how we vet solar installers to protect Texas homeowners from bankruptcies and risks."
        canonicalUrl="https://solarinstallerstx.com/how-we-protect-you"
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">How We Protect You</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Shield className="h-16 w-16 mx-auto mb-4 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                How We Protect You
              </h1>
              <p className="text-xl text-muted-foreground">
                Our comprehensive vetting process ensures you connect with financially stable, qualified solar installers
              </p>
            </div>

            {/* Crisis Context */}
            <Card className="mb-12 bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-3 text-amber-900 dark:text-amber-100">Why We Created This System</h3>
                <p className="text-amber-900 dark:text-amber-100 leading-relaxed">
                  After witnessing over 100 solar companies go bankrupt in 2024 - including major Texas players like Sunnova and Titan Solar - we realized homeowners needed better protection. Traditional solar directories simply list any company that pays, with no verification of financial stability or track record.
                </p>
                <p className="text-amber-900 dark:text-amber-100 leading-relaxed mt-3">
                  We built the Safety Score System to fill this gap and give you the transparency you deserve.
                </p>
              </CardContent>
            </Card>

            {/* Our 5-Step Vetting Process */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center">Our 5-Step Vetting Process</h2>

              <div className="space-y-6">
                {/* Step 1 */}
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-xl">1</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                          <Search className="h-6 w-6 text-primary" />
                          Initial Verification
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Before any installer is listed, we verify:
                        </p>
                        <ul className="grid md:grid-cols-2 gap-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span>Active business registration in Texas</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span>Current contractor license (if required)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span>Active insurance coverage</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span>Physical business address (no P.O. boxes)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span>Minimum 1 year in business</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span>No recent bankruptcy filings</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 2 */}
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-xl">2</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                          <Award className="h-6 w-6 text-primary" />
                          Professional Credentials Check
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          We verify professional qualifications and certifications:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <strong>NABCEP Certification:</strong> Verified directly through nabcep.org database
                              <span className="block text-sm text-muted-foreground mt-1">NABCEP-certified installers have 90% lower failure rates</span>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <strong>State Licensing:</strong> Verify electrical contractor licenses through TDLR
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <strong>Manufacturer Certifications:</strong> Check for brand-specific training
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 3 */}
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-xl">3</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                          <TrendingUp className="h-6 w-6 text-primary" />
                          Financial Stability Analysis
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          This is where we go beyond other directories:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span><strong>Years in business:</strong> Longer track record = higher score</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span><strong>Business name changes:</strong> Flag if company recently rebranded</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span><strong>Ownership transfers:</strong> Monitor for recent changes</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span><strong>Complaint patterns:</strong> Track BBB, Attorney General, and consumer reports</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span><strong>Surety bonds:</strong> Verify active bonding when required</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 4 */}
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-xl">4</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                          <Shield className="h-6 w-6 text-primary" />
                          Safety Score Calculation
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          We assign each installer a 0-100 Safety Score based on:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="border rounded-lg p-4">
                            <strong className="text-primary">30 points</strong>
                            <p className="text-sm">Financial Stability</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <strong className="text-primary">25 points</strong>
                            <p className="text-sm">Professional Credentials</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <strong className="text-primary">25 points</strong>
                            <p className="text-sm">Customer Protection</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <strong className="text-primary">20 points</strong>
                            <p className="text-sm">Track Record</p>
                          </div>
                        </div>
                        <Button asChild variant="outline" className="mt-4">
                          <Link to="/safety-score-explained">Full Safety Score Methodology →</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 5 */}
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-xl">5</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-6 w-6 text-primary" />
                          Ongoing Monitoring
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Unlike competitors, we don't just verify once and forget. We:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span><strong>Quarterly re-verification:</strong> Update licenses, insurance, and business status every 90 days</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span><strong>Complaint monitoring:</strong> Track new complaints across multiple sources</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span><strong>Bankruptcy alerts:</strong> Monitor court filings and business closures</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span><strong>User reports:</strong> Investigate homeowner-submitted issues</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span><strong>Score updates:</strong> Adjust Safety Scores when new information emerges</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Tier System */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Our 3-Tier Rating System</h2>
              <div className="space-y-4">
                <Card className="border-2 border-yellow-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold">🏆 GOLD TIER</h3>
                      <span className="text-sm text-muted-foreground">85-100 points</span>
                    </div>
                    <p className="text-muted-foreground">
                      NABCEP certified + 5+ years in business + excellent financial health + outstanding customer protection
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-400">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold">🥈 SILVER TIER</h3>
                      <span className="text-sm text-muted-foreground">70-84 points</span>
                    </div>
                    <p className="text-muted-foreground">
                      Strong track record + verified & stable + good customer protection (not NABCEP certified)
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-600">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold">🥉 BRONZE TIER</h3>
                      <span className="text-sm text-muted-foreground">60-69 points</span>
                    </div>
                    <p className="text-muted-foreground">
                      Basic requirements met + properly licensed + verified business + building track record
                    </p>
                  </CardContent>
                </Card>

                <p className="text-center text-muted-foreground">
                  <strong>Note:</strong> Installers scoring below 60 are not listed on our platform
                </p>
              </div>
            </div>

            {/* CTA */}
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Browse Safety-Rated Installers</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Every installer on our platform has been pre-screened, verified, and assigned a Safety Score. Find financially stable, qualified professionals for your solar project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link to="/installers">Browse All Installers</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/nabcep-certified">Gold Tier Only</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HowWeProtectYou;
