import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Shield, Award, FileCheck, TrendingUp, AlertTriangle } from "lucide-react";

const SafetyScoreExplained = () => {
  return (
    <>
      <SEOHead
        title="Safety Score System Explained | Protecting You from Solar Bankruptcies"
        description="Learn how our Safety Score System protects Texas homeowners from solar installer bankruptcies. We verify financial stability, track NABCEP certifications, and monitor warning signs."
        canonicalUrl="https://solarinstallerstx.com/safety-score-explained"
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
              <li className="text-foreground font-medium">Safety Score Explained</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                How Our Safety Score Works
              </h1>
              <p className="text-xl text-muted-foreground">
                After Sunnova's bankruptcy left thousands of Texas homeowners stranded in 2025, we created the Safety Score System to help you identify stable, reliable solar installers.
              </p>
            </div>

            {/* Crisis Context */}
            <Card className="bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500 mb-12">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-amber-900 dark:text-amber-100">Why This Matters</h3>
                    <p className="text-amber-900 dark:text-amber-100 leading-relaxed mb-4">
                      Companies like <strong>Titan Solar</strong> and <strong>Sunnova</strong> took homeowner deposits then went bankrupt, leaving projects unfinished and warranties worthless. Over 100 solar companies failed in 2024 alone.
                    </p>
                    <p className="text-amber-900 dark:text-amber-100 leading-relaxed">
                      Our Safety Score System helps you avoid becoming the next victim by identifying financially stable, trustworthy installers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* The 100-Point System */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">The 100-Point Safety Score System</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Every installer on SolarInstallersTX is rated on 4 critical factors:
              </p>

              {/* Factor 1 */}
              <Card className="mb-6">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <Shield className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold mb-2">1. Financial Stability (30 points max)</h3>
                      <p className="text-muted-foreground mb-4">
                        <strong>Why it matters:</strong> Companies like Titan Solar and Sunnova took homeowner deposits then went bankrupt, leaving projects unfinished.
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-12">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Years in business (up to 10 pts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Verified insurance & bonding (5 pts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Business registration status (5 pts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>No bankruptcy filings (10 pts)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Factor 2 */}
              <Card className="mb-6">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <Award className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold mb-2">2. Professional Credentials (25 points max)</h3>
                      <p className="text-muted-foreground mb-4">
                        <strong>Why it matters:</strong> NABCEP-certified professionals have proven expertise and adhere to strict ethical standards.
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-12">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">⭐</span>
                      <span><strong>NABCEP certification (15 pts)</strong> - GOLD TIER requirement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>State licensing (5 pts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Master Electrician on staff (5 pts)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Factor 3 */}
              <Card className="mb-6">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <FileCheck className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold mb-2">3. Customer Protection (25 points max)</h3>
                      <p className="text-muted-foreground mb-4">
                        <strong>Why it matters:</strong> When installers disappear, your warranty becomes worthless.
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-12">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Warranty length & terms (up to 10 pts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Response time commitments (5 pts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Complaint resolution history (5 pts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Insurance coverage verification (5 pts)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Factor 4 */}
              <Card className="mb-6">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <TrendingUp className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold mb-2">4. Track Record (20 points max)</h3>
                      <p className="text-muted-foreground mb-4">
                        <strong>Why it matters:</strong> Experienced installers with proven track records are less likely to fail.
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-12">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Number of completed installations (up to 10 pts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Customer reviews & ratings (up to 5 pts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Project completion rate (3 pts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Average timeline accuracy (2 pts)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Tier Levels */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Tier Levels</h2>

              <div className="space-y-4">
                {/* Gold Tier */}
                <Card className="border-2 border-yellow-500">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-lg px-4 py-1">
                        🏆 GOLD TIER (85-100 points)
                      </Badge>
                    </div>
                    <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                      <li>✓ NABCEP certified</li>
                      <li>✓ 5+ years in business</li>
                      <li>✓ Excellent financial health</li>
                      <li>✓ Outstanding customer protection</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Silver Tier */}
                <Card className="border-2 border-gray-400">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-gradient-to-r from-gray-400 to-gray-500 text-black text-lg px-4 py-1">
                        🥈 SILVER TIER (70-84 points)
                      </Badge>
                    </div>
                    <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                      <li>✓ Strong track record</li>
                      <li>✓ Verified & stable</li>
                      <li>✓ Good customer protection</li>
                      <li>○ Not NABCEP certified</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Bronze Tier */}
                <Card className="border-2 border-orange-600">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-gradient-to-r from-orange-600 to-orange-700 text-white text-lg px-4 py-1">
                        🥉 BRONZE TIER (60-69 points)
                      </Badge>
                    </div>
                    <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                      <li>✓ Basic requirements met</li>
                      <li>✓ Properly licensed</li>
                      <li>✓ Verified business</li>
                      <li>○ Building track record</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Below 60 */}
                <Card className="border-2 border-destructive">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="destructive" className="text-lg px-4 py-1">
                        ❌ Below 60 = Not Listed
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">
                      Installers scoring below 60 do not meet our minimum standards for financial stability, credentials, or customer protection.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Red Flags */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Red Flags We Check</h2>
              <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <span className="text-destructive mt-1">✗</span>
                      <span>Recent bankruptcy filings</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-destructive mt-1">✗</span>
                      <span>Lapsed licensing or insurance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-destructive mt-1">✗</span>
                      <span>Pattern of customer complaints</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-destructive mt-1">✗</span>
                      <span>Business address changes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-destructive mt-1">✗</span>
                      <span>Ownership transfers</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-destructive mt-1">✗</span>
                      <span>Legal actions pending</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Updates & Reporting */}
            <div className="mb-12">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Updated Monthly</h3>
                    <p className="text-muted-foreground">
                      We re-verify all installers quarterly and update Safety Scores when new information becomes available.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Report Issues</h3>
                    <p className="text-muted-foreground mb-4">
                      If you experience problems with a listed installer, we'll investigate and update their score accordingly.
                    </p>
                    <Button asChild variant="outline">
                      <Link to="/report-bankruptcy">Report an Issue</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* CTA Section */}
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Find Safety-Rated Installers Near You</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Browse installers with verified financial stability, NABCEP certification, and high safety scores. Protect your investment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link to="/installers">View All Installers</Link>
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

export default SafetyScoreExplained;
