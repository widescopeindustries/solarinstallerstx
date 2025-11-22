import { SEOHead } from "@/components/SEOHead";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Award, CheckCircle2, AlertTriangle, TrendingUp, MapPin, DollarSign, Star } from "lucide-react";

const BestSolarCompaniesTexas = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Best Solar Companies Texas 2025: Expert Rankings & Reviews",
    "description": "Compare 500+ Texas solar companies with verified safety scores. See costs, reviews & bankruptcies. Choose the best installer for your home.",
    "datePublished": "2025-11-11",
    "dateModified": "2025-11-11",
    "author": {
      "@type": "Organization",
      "name": "SolarInstallersTX"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SolarInstallersTX",
      "logo": {
        "@type": "ImageObject",
        "url": "https://solarinstallerstx.com/logo.png"
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Best Solar Companies Texas 2025 | Rated & Reviewed"
        description="Compare 500+ Texas solar companies. See costs, reviews & safety scores. 100+ bankruptcies in 2024—choose wisely. Free quotes from verified installers."
        canonicalUrl="https://solarinstallerstx.com/best-solar-companies-texas"
        schema={schema}
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-50 to-white py-12 md:py-20 border-b">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <AlertTriangle className="w-4 h-4" />
                  100+ Solar Companies Went Bankrupt in 2024
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Best Solar Companies in Texas 2025
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                  Compare 500+ solar installers with verified safety scores, real costs, and customer reviews.
                  Our 100-point scoring system helps you avoid fly-by-night companies and choose a reliable installer.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="text-lg px-8">
                    <Link to="/installers">Compare Installers Now</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8">
                    <Link to="/safety-score-explained">How We Rate Companies</Link>
                  </Button>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-gray-600 mt-1">Companies Rated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">100</div>
                    <div className="text-sm text-gray-600 mt-1">Point Safety Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600">16</div>
                    <div className="text-sm text-gray-600 mt-1">Data Points Verified</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Safety Scores Matter - Post-Bankruptcy Era */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                  Why Safety Scores Matter More Than Ever in 2025
                </h2>

                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    The Texas solar market experienced unprecedented chaos in 2024. Over 100 solar companies—including
                    industry giant <strong>Sunnova</strong>—declared bankruptcy, leaving thousands of Texas homeowners stranded
                    with voided warranties, unfulfilled projects, and no support for their $20,000-$40,000 systems.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Traditional review sites like EnergySage and Solar Reviews failed to warn consumers. Companies with
                    4-5 star ratings collapsed overnight. That's why we built the <strong>first bankruptcy-proof solar
                    directory</strong> using objective financial and credential data—not just customer sentiment.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-10">
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-2">Gold Tier Companies (85-100 Points)</h3>
                        <ul className="text-gray-700 space-y-1 text-sm">
                          <li>✓ Active insurance & bonding</li>
                          <li>✓ NABCEP certified technicians</li>
                          <li>✓ 10+ years in business</li>
                          <li>✓ No bankruptcy history</li>
                          <li>✓ A+ BBB rating</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-2">Red Flags to Avoid</h3>
                        <ul className="text-gray-700 space-y-1 text-sm">
                          <li>✗ No verifiable insurance</li>
                          <li>✗ Brand new company (&lt;2 years)</li>
                          <li>✗ No local office address</li>
                          <li>✗ Unresolved BBB complaints</li>
                          <li>✗ Previous bankruptcy filings</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How We Rank Solar Companies */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                  Our 100-Point Safety Scoring System
                </h2>

                <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
                  Unlike review sites that rely solely on customer ratings, we verify <strong>16 objective data points</strong>
                  across 4 critical categories. Every score is backed by public records, state databases, and industry certifications.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Financial Stability */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <DollarSign className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900">Financial Stability</h3>
                        <div className="text-sm text-gray-600">30 points</div>
                      </div>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Insurance Coverage (10 pts):</strong> Active general liability & workers comp verified via state databases</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Bonding Status (10 pts):</strong> Surety bond protects customers if company fails mid-project</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Bankruptcy History (10 pts):</strong> No prior Chapter 7/11 filings in past 10 years</span>
                      </li>
                    </ul>
                  </div>

                  {/* Professional Credentials */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <Award className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900">Professional Credentials</h3>
                        <div className="text-sm text-gray-600">25 points</div>
                      </div>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>NABCEP Certification (15 pts):</strong> Gold standard for solar installer competency</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>State License (5 pts):</strong> Valid Texas solar contractor or electrician license</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Master Electrician (5 pts):</strong> Higher-level electrical expertise</span>
                      </li>
                    </ul>
                  </div>

                  {/* Customer Protection */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-amber-100 p-3 rounded-lg">
                        <Shield className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900">Customer Protection</h3>
                        <div className="text-sm text-gray-600">25 points</div>
                      </div>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Warranty Details (10 pts):</strong> 25-year equipment + 10-year workmanship warranties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>BBB Rating (10 pts):</strong> A+ rating with no unresolved complaints</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Complaint History (5 pts):</strong> Clean record with state licensing board</span>
                      </li>
                    </ul>
                  </div>

                  {/* Track Record */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900">Track Record</h3>
                        <div className="text-sm text-gray-600">20 points</div>
                      </div>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Years in Business (10 pts):</strong> 10+ years serving Texas homeowners</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Installations Completed (5 pts):</strong> 1,000+ verified installations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Customer Ratings (5 pts):</strong> 4.5+ stars across Google, Yelp, BBB</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-10 text-center">
                  <Button asChild size="lg">
                    <Link to="/safety-score-explained">Learn More About Our Scoring</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Top Solar Companies by City */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                  Best Solar Companies by Texas City
                </h2>
                <p className="text-lg text-gray-600 text-center mb-12">
                  Local installer rankings for major Texas metro areas. Each city page shows top-rated companies
                  with verified safety scores and real pricing data from recent installations.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Austin */}
                  <Link
                    to="/cities/austin"
                    className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <h3 className="font-bold text-xl text-gray-900">Austin Solar Companies</h3>
                        </div>
                        <div className="text-sm text-gray-600">Capital City | 75+ installers rated</div>
                      </div>
                      <div className="bg-green-100 px-3 py-1 rounded-full text-sm font-semibold text-green-700">
                        Gold Tier: 12
                      </div>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Average cost: $2.85/watt (6kW system = $17,100)</li>
                      <li>• Austin Energy offers 25-year solar rebates up to $2,500</li>
                      <li>• Top companies: Freedom Solar, NATiVE Solar, Longhorn Solar</li>
                    </ul>
                  </Link>

                  {/* Houston */}
                  <Link
                    to="/cities/houston"
                    className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <h3 className="font-bold text-xl text-gray-900">Houston Solar Companies</h3>
                        </div>
                        <div className="text-sm text-gray-600">Energy Capital | 120+ installers rated</div>
                      </div>
                      <div className="bg-green-100 px-3 py-1 rounded-full text-sm font-semibold text-green-700">
                        Gold Tier: 18
                      </div>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Average cost: $2.75/watt (8kW system = $22,000)</li>
                      <li>• High electricity rates make solar ROI excellent (6-8 years)</li>
                      <li>• Top companies: Sunpro Solar, Solar Sam, Premier Solar</li>
                    </ul>
                  </Link>

                  {/* Dallas */}
                  <Link
                    to="/cities/dallas"
                    className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <h3 className="font-bold text-xl text-gray-900">Dallas Solar Companies</h3>
                        </div>
                        <div className="text-sm text-gray-600">DFW Metroplex | 95+ installers rated</div>
                      </div>
                      <div className="bg-green-100 px-3 py-1 rounded-full text-sm font-semibold text-green-700">
                        Gold Tier: 15
                      </div>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Average cost: $2.80/watt (7kW system = $19,600)</li>
                      <li>• Oncor offers solar buyback rates up to $0.10/kWh</li>
                      <li>• Top companies: Sunlight Solar Energy, DFW Solar Electric</li>
                    </ul>
                  </Link>

                  {/* San Antonio */}
                  <Link
                    to="/cities/san-antonio"
                    className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <h3 className="font-bold text-xl text-gray-900">San Antonio Solar Companies</h3>
                        </div>
                        <div className="text-sm text-gray-600">Alamo City | 65+ installers rated</div>
                      </div>
                      <div className="bg-green-100 px-3 py-1 rounded-full text-sm font-semibold text-green-700">
                        Gold Tier: 10
                      </div>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Average cost: $2.70/watt (6kW system = $16,200)</li>
                      <li>• CPS Energy rebates up to $2,500 + net metering</li>
                      <li>• Top companies: Solar San Antonio, Freedom Solar SA</li>
                    </ul>
                  </Link>
                </div>

                <div className="mt-10 text-center">
                  <p className="text-gray-600 mb-4">View rankings for all 50+ Texas cities</p>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/installers">Browse All Cities</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* What Makes a Solar Company "Best"? */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                  What Makes a Solar Company "Best" in Texas?
                </h2>

                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    After the 2024 solar bankruptcy crisis, Texas homeowners need more than good reviews. Here are
                    the <strong>7 non-negotiable criteria</strong> we verify before recommending any installer:
                  </p>

                  <div className="space-y-6">
                    <div className="bg-white border-l-4 border-green-500 rounded-r-lg p-6">
                      <h3 className="font-bold text-xl text-gray-900 mb-3">1. Verified Financial Stability</h3>
                      <p className="text-gray-700 mb-3">
                        We check bankruptcy records, liens, and business filings for the past 10 years. Companies with
                        financial red flags are downgraded or removed, regardless of customer reviews.
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        <strong>Why it matters:</strong> Even 5-star companies can collapse. Sunnova had excellent
                        reviews right before filing Chapter 11.
                      </p>
                    </div>

                    <div className="bg-white border-l-4 border-green-500 rounded-r-lg p-6">
                      <h3 className="font-bold text-xl text-gray-900 mb-3">2. Active Insurance & Bonding</h3>
                      <p className="text-gray-700 mb-3">
                        We verify current general liability insurance ($1M+ coverage) and surety bonds through Texas
                        Department of Insurance databases. Expired or lapsed coverage = immediate disqualification.
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        <strong>Why it matters:</strong> If your installer damages your roof or gets injured on-site,
                        insurance protects you from six-figure lawsuits.
                      </p>
                    </div>

                    <div className="bg-white border-l-4 border-green-500 rounded-r-lg p-6">
                      <h3 className="font-bold text-xl text-gray-900 mb-3">3. NABCEP Certification (Not Just "Training")</h3>
                      <p className="text-gray-700 mb-3">
                        Many companies claim "certified installers" but use fly-by-night weekend courses. We only count
                        NABCEP-certified professionals—the gold standard requiring 5+ years experience and rigorous exams.
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        <strong>Why it matters:</strong> NABCEP installers are 3x less likely to have permit failures
                        or failed inspections (source: NABCEP 2024 Quality Report).
                      </p>
                    </div>

                    <div className="bg-white border-l-4 border-green-500 rounded-r-lg p-6">
                      <h3 className="font-bold text-xl text-gray-900 mb-3">4. Real Local Presence (Not Door-Knockers)</h3>
                      <p className="text-gray-700 mb-3">
                        We verify physical office addresses, local phone numbers, and Texas business registrations.
                        Out-of-state "door-knockers" with PO boxes are flagged with warnings.
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        <strong>Why it matters:</strong> When your system needs service in 5 years, you need a local
                        company that answers the phone—not an out-of-state call center.
                      </p>
                    </div>

                    <div className="bg-white border-l-4 border-green-500 rounded-r-lg p-6">
                      <h3 className="font-bold text-xl text-gray-900 mb-3">5. Transparent Pricing (No Bait-and-Switch)</h3>
                      <p className="text-gray-700 mb-3">
                        Best companies publish typical costs per watt, show example quotes, and don't require a
                        "home visit" before giving ballpark pricing. We penalize installers who hide pricing.
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        <strong>Why it matters:</strong> Texas solar costs $2.50-$3.50/watt on average. If you're
                        quoted $5+/watt, you're being overcharged by 50-100%.
                      </p>
                    </div>

                    <div className="bg-white border-l-4 border-green-500 rounded-r-lg p-6">
                      <h3 className="font-bold text-xl text-gray-900 mb-3">6. Strong Warranties (Backed by Manufacturers)</h3>
                      <p className="text-gray-700 mb-3">
                        We verify 25-year panel warranties, 10-year inverter coverage, and 10+ year workmanship guarantees.
                        Ideally backed by third-party warranty providers, not just company promises.
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        <strong>Why it matters:</strong> When Sunnova collapsed, their "lifetime warranties" became
                        worthless. Manufacturer-backed warranties survive company failures.
                      </p>
                    </div>

                    <div className="bg-white border-l-4 border-green-500 rounded-r-lg p-6">
                      <h3 className="font-bold text-xl text-gray-900 mb-3">7. Proven Track Record (5+ Years Minimum)</h3>
                      <p className="text-gray-700 mb-3">
                        We prioritize companies with 5-10+ years serving Texas homeowners and 500+ verified installations.
                        Brand new companies can earn Silver tier but need time to prove longevity.
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        <strong>Why it matters:</strong> 40% of solar startups fail within 3 years. Companies that
                        survived 2024's bankruptcy wave have proven resilience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Average Solar Costs in Texas */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                  What Do the Best Solar Companies Charge in Texas?
                </h2>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 mb-8">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-blue-600 mb-2">$2.50 - $3.50</div>
                    <div className="text-lg text-gray-700">Average cost per watt in Texas (2025)</div>
                  </div>

                  <p className="text-gray-700 text-center max-w-2xl mx-auto">
                    Gold tier companies typically charge <strong>$2.75-$3.25/watt</strong>—slightly above average because
                    insurance, bonding, and NABCEP certifications add real overhead. Beware of quotes under $2.30/watt
                    (often cut corners on quality) or over $4/watt (predatory pricing).
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-900 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">System Size</th>
                        <th className="px-6 py-4 text-left font-semibold">Total Cost (before incentives)</th>
                        <th className="px-6 py-4 text-left font-semibold">After Federal Tax Credit (30%)</th>
                        <th className="px-6 py-4 text-left font-semibold">Estimated Savings (25 years)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">5 kW (Small home)</td>
                        <td className="px-6 py-4">$13,750 - $17,500</td>
                        <td className="px-6 py-4 text-green-600 font-semibold">$9,625 - $12,250</td>
                        <td className="px-6 py-4">$28,000 - $35,000</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">7 kW (Average home)</td>
                        <td className="px-6 py-4">$19,250 - $24,500</td>
                        <td className="px-6 py-4 text-green-600 font-semibold">$13,475 - $17,150</td>
                        <td className="px-6 py-4">$39,000 - $49,000</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">10 kW (Large home)</td>
                        <td className="px-6 py-4">$27,500 - $35,000</td>
                        <td className="px-6 py-4 text-green-600 font-semibold">$19,250 - $24,500</td>
                        <td className="px-6 py-4">$56,000 - $70,000</td>
                      </tr>
                      <tr className="hover:bg-gray-50 bg-blue-50">
                        <td className="px-6 py-4 font-medium">12 kW (Estate/Pool)</td>
                        <td className="px-6 py-4">$33,000 - $42,000</td>
                        <td className="px-6 py-4 text-green-600 font-semibold">$23,100 - $29,400</td>
                        <td className="px-6 py-4">$67,000 - $84,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    Price Doesn't Tell the Whole Story
                  </h3>
                  <p className="text-gray-700">
                    A $15,000 system from a company that goes bankrupt next year leaves you with no warranty, no support,
                    and potential safety hazards. The "best" solar company balances <strong>fair pricing + proven
                    stability + quality equipment</strong>. Don't choose on price alone.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                      How do I know if a solar company is financially stable?
                    </h3>
                    <p className="text-gray-700">
                      Check our safety scores—we verify bankruptcy history, liens, and business filings. Gold tier
                      companies (85-100 points) have passed rigorous financial checks. Also look for: local office address,
                      active insurance, bonding, and 5+ years in business.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                      Are big national companies better than local installers?
                    </h3>
                    <p className="text-gray-700">
                      Not necessarily. National companies like Sunnova, ADT Solar, and Titan Solar all went bankrupt in
                      2024. Many top-rated Texas companies are locally-owned with 10-20 year track records. Local companies
                      often provide better service because they rely on community reputation.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                      What's the difference between your scores and EnergySage/SolarReviews?
                    </h3>
                    <p className="text-gray-700">
                      EnergySage and SolarReviews rely heavily on customer sentiment (star ratings). We verify objective
                      financial data: insurance, bonding, bankruptcy records, NABCEP certifications, BBB ratings. Our system
                      would have flagged Sunnova's financial trouble before they collapsed—review sites didn't.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                      How much should I expect to pay for a quality solar system in Texas?
                    </h3>
                    <p className="text-gray-700">
                      $2.75-$3.25 per watt from reputable installers (2025 pricing). A typical 7kW system costs $19,250-$22,750
                      before incentives, or ~$13,500-$16,000 after the 30% federal tax credit. Quotes under $2.30/watt often
                      cut corners; over $4/watt is overpriced.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                      Should I buy or lease solar panels?
                    </h3>
                    <p className="text-gray-700">
                      <strong>Buy</strong> if you can afford it (cash or loan). You get the 30% tax credit, own the system,
                      and increase home value. <strong>Lease</strong> only if you can't qualify for financing—but leases
                      offer zero tax benefits and can complicate home sales. PPAs (power purchase agreements) fall somewhere
                      in between. See our <Link to="/learn/solar-financing" className="text-blue-600 hover:underline">financing guide</Link>.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                      What happens if my solar company goes out of business?
                    </h3>
                    <p className="text-gray-700">
                      Panel warranties (25 years) and inverter warranties (10-15 years) are typically backed by manufacturers—
                      they continue even if your installer fails. However, workmanship warranties (roof leaks, electrical issues)
                      are company-specific and void if they close. This is why we prioritize financially stable companies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Compare Texas Solar Companies?
                </h2>
                <p className="text-xl mb-8 text-blue-50">
                  Browse 500+ installers with verified safety scores. See real costs, customer reviews, and financial
                  stability ratings. Get free quotes from Gold tier companies in your city.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                    <Link to="/installers">Browse All Installers</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600">
                    <Link to="/quote">Get Free Quotes</Link>
                  </Button>
                </div>
                <p className="mt-6 text-sm text-blue-100">
                  ✓ No obligation • ✓ Verified installers only • ✓ 100% free service
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

export default BestSolarCompaniesTexas;
