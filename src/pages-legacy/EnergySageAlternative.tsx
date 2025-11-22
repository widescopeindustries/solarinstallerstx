import { SEOHead } from "@/components/SEOHead";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, DollarSign, CheckCircle2, XCircle, AlertTriangle, Award, TrendingDown } from "lucide-react";

const EnergySageAlternative = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ComparisonTable",
    "name": "EnergySage Alternative Comparison",
    "description": "Comparison of SolarInstallersTX vs EnergySage for finding Texas solar companies"
  };

  return (
    <>
      <SEOHead
        title="EnergySage Alternative Texas | Independent Solar Directory"
        description="Looking for an EnergySage alternative? SolarInstallersTX uses 100-point safety scores instead of paid listings. No installer commissions. Compare 500+ Texas solar companies."
        canonicalUrl="https://solarinstallerstx.com/energysage-alternative"
        schema={schema}
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-50 to-white py-12 md:py-20 border-b">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Shield className="w-4 h-4" />
                  100% Independent - No Paid Listings
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  A Better Alternative to EnergySage for Texas Solar
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                  EnergySage charges installers for leads and prominent placement. We rank companies by verified
                  safety scores—not who pays the most. After 100+ solar bankruptcies in 2024, you need objective data.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="text-lg px-8">
                    <Link to="/installers">Browse Safety-Scored Companies</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8">
                    <Link to="/safety-score-explained">How Safety Scores Work</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* The Problem with EnergySage */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                  Why EnergySage Failed Texas Homeowners in 2024
                </h2>

                <div className="prose prose-lg max-w-none mb-10">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    EnergySage is a lead generation platform that charges solar installers $200-$500 per homeowner lead.
                    Their business model creates inherent conflicts of interest: installers who pay more get better
                    placement, and EnergySage can't afford to remove paying customers even when red flags emerge.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed mt-4">
                    In 2024, when <strong>Sunnova, Titan Solar, ADT Solar,</strong> and 100+ other companies collapsed,
                    EnergySage's rankings showed no warning signs. Many of these companies had "Top Solar Companies"
                    badges and 4-5 star ratings right before filing bankruptcy.
                  </p>
                </div>

                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8">
                  <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    EnergySage's Business Model Creates These Problems
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Installers Pay for Placement</div>
                        <div className="text-gray-700 text-sm">
                          Companies pay $200-$500 per lead. Top bidders get priority placement. This means you see
                          installers willing to pay the most—not necessarily the best or most stable.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Financial Conflicts of Interest</div>
                        <div className="text-gray-700 text-sm">
                          EnergySage earns revenue when installers close sales. They have financial incentive to
                          keep paying customers listed, even when warning signs appear.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">No Financial Verification</div>
                        <div className="text-gray-700 text-sm">
                          EnergySage doesn't verify insurance, bonding, or check bankruptcy records. They rely on
                          self-reported data and customer reviews—which can be manipulated.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">National Focus, Not Texas-Specific</div>
                        <div className="text-gray-700 text-sm">
                          EnergySage covers all 50 states. They don't track Texas-specific licensing, CPS Energy rebates,
                          Austin Energy programs, or local installer reputations in Texas communities.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Out-of-State Door-Knockers</div>
                        <div className="text-gray-700 text-sm">
                          Many EnergySage "partners" are national sales companies with no Texas offices. When they
                          close or go bankrupt, your warranty becomes worthless and you have nobody to call.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Side-by-Side Comparison */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                  SolarInstallersTX vs EnergySage
                </h2>
                <p className="text-lg text-gray-600 text-center mb-12">
                  See the difference between a paid lead platform and an independent safety-focused directory
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-900 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold w-1/3">Feature</th>
                        <th className="px-6 py-4 text-center font-semibold w-1/3 bg-green-700">
                          <div className="flex items-center justify-center gap-2">
                            <Shield className="w-5 h-5" />
                            SolarInstallersTX
                          </div>
                        </th>
                        <th className="px-6 py-4 text-center font-semibold w-1/3 bg-gray-700">EnergySage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 font-medium">Business Model</td>
                        <td className="px-6 py-4 text-center bg-green-50">
                          <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
                            <CheckCircle2 className="w-5 h-5" />
                            100% Free Directory
                          </div>
                          <div className="text-xs text-gray-600 mt-1">No installer commissions</div>
                        </td>
                        <td className="px-6 py-4 text-center bg-red-50">
                          <div className="flex items-center justify-center gap-2 text-red-700 font-semibold">
                            <DollarSign className="w-5 h-5" />
                            Lead Generation
                          </div>
                          <div className="text-xs text-gray-600 mt-1">$200-$500 per lead</div>
                        </td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 font-medium">Financial Verification</td>
                        <td className="px-6 py-4 text-center bg-green-50">
                          <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
                            <CheckCircle2 className="w-5 h-5" />
                            Verified via State DBs
                          </div>
                          <div className="text-xs text-gray-600 mt-1">Insurance, bonding, bankruptcy records</div>
                        </td>
                        <td className="px-6 py-4 text-center bg-red-50">
                          <div className="flex items-center justify-center gap-2 text-red-700 font-semibold">
                            <XCircle className="w-5 h-5" />
                            Self-Reported Only
                          </div>
                          <div className="text-xs text-gray-600 mt-1">No independent verification</div>
                        </td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 font-medium">Ranking Methodology</td>
                        <td className="px-6 py-4 text-center bg-green-50">
                          <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
                            <CheckCircle2 className="w-5 h-5" />
                            100-Point Safety Score
                          </div>
                          <div className="text-xs text-gray-600 mt-1">16 objective data points</div>
                        </td>
                        <td className="px-6 py-4 text-center bg-red-50">
                          <div className="flex items-center justify-center gap-2 text-red-700 font-semibold">
                            <DollarSign className="w-5 h-5" />
                            Who Pays Most
                          </div>
                          <div className="text-xs text-gray-600 mt-1">Boosted by payment tier</div>
                        </td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 font-medium">Bankruptcy Tracking</td>
                        <td className="px-6 py-4 text-center bg-green-50">
                          <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
                            <CheckCircle2 className="w-5 h-5" />
                            Quarterly Checks
                          </div>
                          <div className="text-xs text-gray-600 mt-1">Public court filing monitoring</div>
                        </td>
                        <td className="px-6 py-4 text-center bg-red-50">
                          <div className="flex items-center justify-center gap-2 text-red-700 font-semibold">
                            <XCircle className="w-5 h-5" />
                            Reactive Only
                          </div>
                          <div className="text-xs text-gray-600 mt-1">Remove after bankruptcy</div>
                        </td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 font-medium">NABCEP Verification</td>
                        <td className="px-6 py-4 text-center bg-green-50">
                          <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
                            <CheckCircle2 className="w-5 h-5" />
                            Verified via NABCEP DB
                          </div>
                          <div className="text-xs text-gray-600 mt-1">Cross-check certification numbers</div>
                        </td>
                        <td className="px-6 py-4 text-center bg-red-50">
                          <div className="flex items-center justify-center gap-2 text-red-700 font-semibold">
                            <XCircle className="w-5 h-5" />
                            Self-Reported
                          </div>
                          <div className="text-xs text-gray-600 mt-1">No independent check</div>
                        </td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 font-medium">Texas-Specific Focus</td>
                        <td className="px-6 py-4 text-center bg-green-50">
                          <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
                            <CheckCircle2 className="w-5 h-5" />
                            Texas Only
                          </div>
                          <div className="text-xs text-gray-600 mt-1">Local incentives, regulations, installers</div>
                        </td>
                        <td className="px-6 py-4 text-center bg-red-50">
                          <div className="flex items-center justify-center gap-2 text-red-700 font-semibold">
                            <XCircle className="w-5 h-5" />
                            50 States
                          </div>
                          <div className="text-xs text-gray-600 mt-1">Generic national platform</div>
                        </td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 font-medium">Installer Independence</td>
                        <td className="px-6 py-4 text-center bg-green-50">
                          <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
                            <CheckCircle2 className="w-5 h-5" />
                            100% Independent
                          </div>
                          <div className="text-xs text-gray-600 mt-1">No financial relationships</div>
                        </td>
                        <td className="px-6 py-4 text-center bg-red-50">
                          <div className="flex items-center justify-center gap-2 text-red-700 font-semibold">
                            <DollarSign className="w-5 h-5" />
                            Revenue from Installers
                          </div>
                          <div className="text-xs text-gray-600 mt-1">Conflict of interest</div>
                        </td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 font-medium">Cost to Homeowners</td>
                        <td className="px-6 py-4 text-center bg-green-50">
                          <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
                            <CheckCircle2 className="w-5 h-5" />
                            100% Free Forever
                          </div>
                          <div className="text-xs text-gray-600 mt-1">No hidden fees</div>
                        </td>
                        <td className="px-6 py-4 text-center bg-amber-50">
                          <div className="flex items-center justify-center gap-2 text-amber-700 font-semibold">
                            <AlertTriangle className="w-5 h-5" />
                            "Free" But...
                          </div>
                          <div className="text-xs text-gray-600 mt-1">$200-500 lead cost passed to you in higher quotes</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* What We Do Differently */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                  How SolarInstallersTX Protects Texas Homeowners
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-lg p-6">
                    <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">100% Independent Rankings</h3>
                    <p className="text-gray-700 mb-4">
                      We don't accept payment from installers. Ever. Our safety scores are based purely on public
                      records, state databases, and third-party certifications. Companies can't pay to improve rankings.
                    </p>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>No lead generation commissions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>No "featured placement" fees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>No affiliate kickbacks</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-lg p-6">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">Verified Financial Data</h3>
                    <p className="text-gray-700 mb-4">
                      We verify all 16 data points through public databases: Texas Department of Insurance for bonding,
                      NABCEP registries for certifications, BBB for complaint history, bankruptcy courts for filings.
                    </p>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Quarterly insurance verification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Monthly bankruptcy checks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Real-time NABCEP registry checks</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-lg p-6">
                    <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <TrendingDown className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">Proactive Red Flag Monitoring</h3>
                    <p className="text-gray-700 mb-4">
                      Unlike EnergySage (reactive—removes after bankruptcy), we monitor financial health continuously.
                      When red flags appear (expired insurance, liens, BBB complaints), scores drop immediately.
                    </p>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>Automated bankruptcy court monitoring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>Lien & judgment tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>BBB complaint escalation alerts</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-lg p-6">
                    <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">Texas-Only Focus</h3>
                    <p className="text-gray-700 mb-4">
                      We only cover Texas, so we know the market intimately: local incentives (Austin Energy, CPS Energy),
                      state regulations, TDLR licensing, and which companies are actually local vs out-of-state door-knockers.
                    </p>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>50+ Texas city-specific pages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>Local utility rebate tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>Texas licensing verification (TDLR)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Who SolarInstallersTX Is For */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                  Who Should Use SolarInstallersTX Instead of EnergySage?
                </h2>

                <div className="space-y-6">
                  <div className="bg-white border-l-4 border-green-500 rounded-r-lg p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Texas Homeowners Serious About Safety</h3>
                    <p className="text-gray-700">
                      If you're investing $20,000-$40,000 in a 25-year solar system, you need to know your installer
                      will still be around in 5-10 years for warranty support. Our safety scores prioritize financial
                      stability over sales hype.
                    </p>
                  </div>

                  <div className="bg-white border-l-4 border-green-500 rounded-r-lg p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">People Burned by Sunnova or Similar Bankruptcies</h3>
                    <p className="text-gray-700">
                      If you (or someone you know) lost warranty coverage when Sunnova, Titan Solar, or ADT Solar
                      collapsed, you understand why financial verification matters. We track bankruptcy risk proactively.
                    </p>
                  </div>

                  <div className="bg-white border-l-4 border-green-500 rounded-r-lg p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Shoppers Who Want Truly Independent Recommendations</h3>
                    <p className="text-gray-700">
                      EnergySage makes money when installers close sales. We don't. That means we can recommend the
                      safest companies—even if they're smaller or don't pay for leads.
                    </p>
                  </div>

                  <div className="bg-white border-l-4 border-green-500 rounded-r-lg p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">DIY Researchers Who Verify Everything</h3>
                    <p className="text-gray-700">
                      If you're the type to check BBB ratings, look up NABCEP certifications, and verify insurance—
                      we've already done that legwork. Our safety scores aggregate the exact data you'd research manually.
                    </p>
                  </div>

                  <div className="bg-white border-l-4 border-green-500 rounded-r-lg p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Anyone Comparing Quotes from Multiple Sources</h3>
                    <p className="text-gray-700">
                      Use SolarInstallersTX alongside EnergySage, SolarReviews, or local referrals. Cross-check company
                      safety scores before signing. If a company scores below 70 points, dig deeper or get a second opinion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-gradient-to-br from-green-600 to-green-800 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Try the EnergySage Alternative Built for Texas
                </h2>
                <p className="text-xl mb-8 text-green-50">
                  Browse 500+ Texas solar companies ranked by our 100-point safety scoring system. No paid listings.
                  No installer commissions. Just objective data to help you choose wisely.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                    <Link to="/installers">Browse Safety-Scored Companies</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600">
                    <Link to="/safety-score-explained">Learn About Safety Scores</Link>
                  </Button>
                </div>
                <p className="mt-6 text-sm text-green-100">
                  ✓ 100% free • ✓ No installer payments • ✓ Texas-only focus
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default EnergySageAlternative;
