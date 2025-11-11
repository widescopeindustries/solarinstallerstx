import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertTriangle, Shield, FileCheck, TrendingUp } from "lucide-react";

const SolarBankruptcies = () => {
  const bankruptcyData = [
    {
      year: "2024",
      companies: [
        { name: "SunPower (Partial)", status: "Chapter 11 Filed", impact: "Warranties still honored through restructuring" },
        { name: "Pink Energy (Power Home Solar)", status: "Bankruptcy Filed", impact: "Left thousands with voided warranties" }
      ]
    },
    {
      year: "2023",
      companies: [
        { name: "Titan Solar Power", status: "Ceased Operations", impact: "Service contracts abandoned" },
        { name: "Solar Mosaic (partial)", status: "Layoffs/Restructuring", impact: "Limited service disruptions" }
      ]
    },
    {
      year: "2022",
      companies: [
        { name: "Momentum Solar (partial)", status: "Scaled Back Operations", impact: "Regional service reductions" }
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title="Solar Company Bankruptcies in Texas - Track Record & Consumer Protection"
        description="Complete guide to solar company bankruptcies in Texas. Learn which companies have failed, how to protect yourself, and what to do if your installer goes bankrupt."
        canonicalUrl="https://solarinstallerstx.com/solar-bankruptcies"
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-2xl p-8 mb-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-12 w-12 text-amber-600 flex-shrink-0" />
                <div>
                  <h1 className="text-4xl font-bold mb-4">Solar Company Bankruptcies in Texas</h1>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    Protect yourself from installer failures. Learn about recent bankruptcies and how to
                    choose financially stable solar companies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Statistics */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-amber-600 mb-2">18%</div>
                    <div className="text-sm text-muted-foreground">
                      Non-certified installers bankruptcy rate (5-year)
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">&lt;2%</div>
                    <div className="text-sm text-muted-foreground">
                      NABCEP-certified installers bankruptcy rate
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-600 mb-2">$250M+</div>
                    <div className="text-sm text-muted-foreground">
                      Lost in Texas homeowner warranties (2020-2024)
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* Recent Bankruptcies Timeline */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6">Recent Solar Company Failures</h2>
            <div className="space-y-6">
              {bankruptcyData.map((yearData) => (
                <Card key={yearData.year}>
                  <CardHeader>
                    <CardTitle className="text-2xl">{yearData.year}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {yearData.companies.map((company, idx) => (
                        <div key={idx} className="border-l-4 border-amber-500 pl-4 py-2">
                          <div className="font-semibold text-lg">{company.name}</div>
                          <div className="text-sm text-amber-600 font-medium">{company.status}</div>
                          <div className="text-sm text-muted-foreground mt-1">{company.impact}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Companies Fail */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6">Why Solar Companies Go Bankrupt</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center text-red-600 font-bold">1</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Aggressive Door-to-Door Sales Model</h3>
                      <p className="text-muted-foreground">
                        Companies with high-pressure sales tactics often overpromise, underdeliver, and burn through cash paying commissions before installations are complete.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center text-red-600 font-bold">2</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Undercapitalization</h3>
                      <p className="text-muted-foreground">
                        Many startups enter the market without sufficient cash reserves to handle warranty claims, installation backlogs, or economic downturns.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center text-red-600 font-bold">3</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Supply Chain Issues</h3>
                      <p className="text-muted-foreground">
                        Panel shortages, tariff changes, and shipping delays in 2021-2023 forced many installers to honor locked-in pricing while costs skyrocketed.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center text-red-600 font-bold">4</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Rising Interest Rates</h3>
                      <p className="text-muted-foreground">
                        Federal rate hikes in 2022-2024 increased financing costs, reducing demand and making solar loans less attractive to homeowners.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center text-red-600 font-bold">5</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Warranty Liability Buildup</h3>
                      <p className="text-muted-foreground">
                        Companies that grow too fast accumulate massive warranty obligations without the service infrastructure or capital to fulfill them long-term.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* How to Protect Yourself */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6">How to Protect Yourself</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Check Financial Stability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Verify bonding and insurance coverage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Check for bankruptcy history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Review BBB rating and complaint history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Ask for proof of workers' comp insurance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-blue-600" />
                    Verify Credentials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>Look for NABCEP certification (industry gold standard)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>Confirm valid Texas electrical license</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>Check years in business (10+ preferred)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>Verify physical Texas office location</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    Monitor Company Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600">✓</span>
                      <span>Research recent news about the company</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600">✓</span>
                      <span>Check for mass layoffs or office closures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600">✓</span>
                      <span>Look for sudden changes in sales tactics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600">✓</span>
                      <span>Monitor social media for customer complaints</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    Red Flags to Avoid
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✗</span>
                      <span>Pressure to sign same-day contracts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✗</span>
                      <span>Too-good-to-be-true pricing claims</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✗</span>
                      <span>No verifiable local office or address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✗</span>
                      <span>Company founded within last 2 years</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* What If Your Installer Goes Bankrupt */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6">What If Your Installer Goes Bankrupt?</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">Immediate Steps</h3>
                    <ol className="space-y-2 text-sm list-decimal list-inside">
                      <li>Document everything: contracts, warranties, payment records, emails</li>
                      <li>Contact your equipment manufacturer directly (panels, inverters often have separate warranties)</li>
                      <li>Check if installer had surety bonds or warranty insurance</li>
                      <li>File complaints with Texas Attorney General and BBB</li>
                      <li>Join any class-action lawsuits if applicable</li>
                    </ol>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">Warranty Options</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <span><strong>Equipment warranties</strong> are usually separate from installer warranties and remain valid</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <span><strong>Workmanship warranties</strong> become void if installer closes - consider third-party warranty providers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <span><strong>Find local solar companies</strong> willing to take over service agreements (may require fee)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">Legal Recourse</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>File as creditor in bankruptcy proceedings (rarely successful for full recovery)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Contact surety bond company if installer was bonded</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Consult consumer protection attorney about potential claims</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Report to Texas Residential Construction Commission if applicable</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">Find Financially Stable Installers</h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Our Safety Score System evaluates financial stability, bonding, insurance, and bankruptcy history.
                    Browse Gold and Silver tier installers with verified credentials.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                      <Link to="/installers">Browse Verified Installers</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link to="/safety-score-explained">Learn About Safety Scores</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Report Section */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-amber-200 dark:border-amber-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 text-amber-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Know of a Solar Company Bankruptcy?</h3>
                    <p className="text-muted-foreground mb-4">
                      Help us keep Texas homeowners safe by reporting installer bankruptcies, unfinished installations,
                      or voided warranties. All reports are confidential.
                    </p>
                    <Button asChild variant="outline">
                      <Link to="/report-bankruptcy">Report an Issue</Link>
                    </Button>
                  </div>
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

export default SolarBankruptcies;
