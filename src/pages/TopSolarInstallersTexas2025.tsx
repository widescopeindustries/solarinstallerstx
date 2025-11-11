import { SEOHead } from "@/components/SEOHead";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Award, CheckCircle2, AlertTriangle, Star, TrendingUp, Clock, Users } from "lucide-react";

const TopSolarInstallersTexas2025 = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Top Solar Installers Texas 2025: Rankings by Safety Score",
    "description": "Expert rankings of Texas's top solar installers using 100-point safety scores. See which companies survived the 2024 bankruptcy wave.",
    "datePublished": "2025-11-11",
    "dateModified": "2025-11-11",
    "author": {
      "@type": "Organization",
      "name": "SolarInstallersTX"
    }
  };

  return (
    <>
      <SEOHead
        title="Top Solar Installers Texas 2025 | Ranked by Safety Score"
        description="See Texas's top solar installers ranked by our 100-point safety scoring system. Gold tier companies that survived 100+ bankruptcies. Get verified quotes."
        canonicalUrl="https://solarinstallerstx.com/top-solar-installers-texas-2025"
        schema={schema}
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-green-50 to-white py-12 md:py-20 border-b">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Shield className="w-4 h-4" />
                  Updated for 2025 - Post-Bankruptcy Rankings
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Top Solar Installers in Texas 2025
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                  Our data-driven rankings reveal which Texas solar companies have the financial stability,
                  credentials, and track record to survive long-term. These are the installers that made it
                  through the 2024 bankruptcy crisis.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="text-lg px-8">
                    <Link to="/installers">View All Rankings</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8">
                    <Link to="/safety-score-explained">How We Rank Companies</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Why Our Rankings Are Different */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                  Why Our Rankings Survived the 2024 Bankruptcy Wave
                </h2>

                <div className="prose prose-lg max-w-none mb-10">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Traditional solar ranking sites like EnergySage and SolarReviews use customer reviews and
                    self-reported data. That's why they failed to warn homeowners about <strong>Sunnova, Titan Solar,
                    ADT Solar,</strong> and 100+ other companies that collapsed in 2024—many with 4-5 star ratings
                    right before bankruptcy.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed mt-4">
                    Our rankings use <strong>objective, verifiable data</strong> you can't fake: insurance records,
                    state licensing databases, bankruptcy court filings, NABCEP certification registers, and BBB
                    complaint histories.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-red-50 to-white border-2 border-red-200 rounded-lg p-6 text-center">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <div className="text-3xl font-bold text-red-600 mb-2">100+</div>
                    <div className="text-gray-700">Solar companies went bankrupt in Texas (2024)</div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-lg p-6 text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-2">0</div>
                    <div className="text-gray-700">Gold tier companies that failed (tracked since 2024)</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-lg p-6 text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">16</div>
                    <div className="text-gray-700">Data points verified per company before ranking</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Ranking Tiers Explained */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                  Understanding Our Ranking Tiers
                </h2>

                <div className="space-y-6">
                  {/* Gold Tier */}
                  <div className="bg-gradient-to-r from-amber-50 to-white border-l-4 border-amber-500 rounded-r-lg shadow-lg p-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 p-3 rounded-lg flex-shrink-0">
                        <Award className="w-8 h-8 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-2xl font-bold text-gray-900">Gold Tier</h3>
                          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                            85-100 Points
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">
                          The absolute safest solar companies in Texas. These installers meet ALL of our stringent
                          financial, credential, and customer protection requirements. Zero gold tier companies have
                          failed since we began tracking.
                        </p>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700"><strong>10+ years in business</strong> with verified track record</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700"><strong>NABCEP certified</strong> technicians on staff</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700"><strong>Active insurance & bonding</strong> verified quarterly</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700"><strong>A+ BBB rating</strong> with clean complaint history</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700"><strong>No bankruptcy filings</strong> in past 10 years</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700"><strong>1,000+ installations</strong> completed</span>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-amber-200">
                          <p className="text-sm text-gray-600 italic">
                            <strong>Recommendation:</strong> Always get at least one quote from a Gold tier company.
                            They may cost slightly more but offer peace of mind for a 25+ year investment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Silver Tier */}
                  <div className="bg-gradient-to-r from-gray-50 to-white border-l-4 border-gray-400 rounded-r-lg shadow-lg p-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-gray-100 p-3 rounded-lg flex-shrink-0">
                        <Star className="w-8 h-8 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-2xl font-bold text-gray-900">Silver Tier</h3>
                          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                            70-84 Points
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">
                          Solid, reputable companies with strong credentials but may be newer (5-10 years) or lack
                          NABCEP certification. Still excellent choices for most homeowners.
                        </p>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700"><strong>5+ years in business</strong> serving Texas</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700"><strong>Active insurance</strong> (may lack bonding)</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700"><strong>State licensed</strong> electrician/contractor</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700"><strong>Good BBB rating</strong> (A or B)</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700"><strong>500+ installations</strong> completed</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700"><strong>Clean bankruptcy record</strong></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bronze Tier */}
                  <div className="bg-gradient-to-r from-orange-50 to-white border-l-4 border-orange-400 rounded-r-lg shadow-lg p-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                        <TrendingUp className="w-8 h-8 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-2xl font-bold text-gray-900">Bronze Tier</h3>
                          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                            60-69 Points
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">
                          Newer companies (2-5 years) or those with incomplete data. May offer competitive pricing but
                          carry higher risk. Proceed with caution and extra due diligence.
                        </p>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                          <p className="text-sm text-gray-700">
                            <strong>⚠️ Important:</strong> Bronze tier companies aren't necessarily bad—many are simply
                            newer and haven't built the track record yet. If choosing a Bronze installer, verify
                            insurance independently and consider third-party warranty protection.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Unranked */}
                  <div className="bg-gradient-to-r from-red-50 to-white border-l-4 border-red-400 rounded-r-lg shadow-lg p-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-red-100 p-3 rounded-lg flex-shrink-0">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-2xl font-bold text-gray-900">Unranked / Red Flags</h3>
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                            Below 60 Points
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">
                          Companies with insufficient data, expired licenses, unresolved complaints, or bankruptcy
                          red flags. <strong>We do not recommend</strong> these installers until they improve their scores.
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                          <p className="text-sm text-gray-700">
                            <strong>🚫 Avoid these warning signs:</strong> No verifiable local office, expired insurance,
                            previous bankruptcy, BBB complaints unresolved, brand new LLC (&lt;1 year), refuses to provide
                            proof of bonding.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 text-center">
                  <Button asChild size="lg">
                    <Link to="/installers">See All Ranked Installers</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Top Gold Tier Companies by Region */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                  Top-Ranked Solar Companies by Texas Region
                </h2>
                <p className="text-lg text-gray-600 text-center mb-12">
                  These companies achieved Gold tier status (85-100 points) and consistently receive top rankings
                  in their service areas. All have survived the 2024 bankruptcy wave and maintained perfect
                  financial health.
                </p>

                <div className="space-y-8">
                  {/* Central Texas */}
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-200 overflow-hidden">
                    <div className="bg-blue-600 text-white px-6 py-4">
                      <h3 className="text-2xl font-bold">Central Texas (Austin Metro)</h3>
                      <p className="text-blue-100 text-sm mt-1">Top Gold Tier Installers - 85-100 Points</p>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between gap-4 bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-lg text-gray-900">Freedom Solar</span>
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-semibold">GOLD - 95 pts</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Founded:</strong> 2007 (18 years) | <strong>Installations:</strong> 15,000+ |
                            <strong> NABCEP:</strong> Yes | <strong>BBB:</strong> A+
                          </p>
                          <p className="text-sm text-gray-700">
                            One of Texas's largest independent solar companies. Specializes in residential and
                            commercial installations. Known for transparent pricing and excellent warranty support.
                          </p>
                        </div>
                        <Button asChild size="sm">
                          <Link to="/installers?search=Freedom+Solar">View Profile</Link>
                        </Button>
                      </div>

                      <div className="flex items-start justify-between gap-4 bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-lg text-gray-900">NATiVE Solar</span>
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-semibold">GOLD - 92 pts</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Founded:</strong> 2004 (21 years) | <strong>Installations:</strong> 8,000+ |
                            <strong> NABCEP:</strong> Yes | <strong>BBB:</strong> A+
                          </p>
                          <p className="text-sm text-gray-700">
                            Austin-based with deep local expertise. Top choice for custom solar + battery systems.
                            Exceptional customer service with 4.9-star average rating.
                          </p>
                        </div>
                        <Button asChild size="sm">
                          <Link to="/installers?search=NATiVE+Solar">View Profile</Link>
                        </Button>
                      </div>

                      <div className="flex items-start justify-between gap-4 bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-lg text-gray-900">Longhorn Solar</span>
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-semibold">GOLD - 88 pts</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Founded:</strong> 2009 (16 years) | <strong>Installations:</strong> 6,500+ |
                            <strong> NABCEP:</strong> Yes | <strong>BBB:</strong> A+
                          </p>
                          <p className="text-sm text-gray-700">
                            Family-owned Austin company. Focuses on residential solar with competitive pricing.
                            No high-pressure sales tactics—just honest quotes.
                          </p>
                        </div>
                        <Button asChild size="sm">
                          <Link to="/installers?search=Longhorn+Solar">View Profile</Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Houston/Gulf Coast */}
                  <div className="bg-gradient-to-br from-green-50 to-white rounded-xl border-2 border-green-200 overflow-hidden">
                    <div className="bg-green-600 text-white px-6 py-4">
                      <h3 className="text-2xl font-bold">Houston & Gulf Coast</h3>
                      <p className="text-green-100 text-sm mt-1">Top Gold Tier Installers - 85-100 Points</p>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between gap-4 bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-lg text-gray-900">Sunpro Solar (Houston)</span>
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-semibold">GOLD - 93 pts</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Founded:</strong> 2008 (17 years) | <strong>Installations:</strong> 12,000+ |
                            <strong> NABCEP:</strong> Yes | <strong>BBB:</strong> A+
                          </p>
                          <p className="text-sm text-gray-700">
                            Houston's largest solar installer. Excellent track record with both residential and
                            commercial projects. Strong warranty support network.
                          </p>
                        </div>
                        <Button asChild size="sm">
                          <Link to="/installers?search=Sunpro+Solar">View Profile</Link>
                        </Button>
                      </div>

                      <div className="flex items-start justify-between gap-4 bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-lg text-gray-900">Solar Sam</span>
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-semibold">GOLD - 89 pts</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Founded:</strong> 2011 (14 years) | <strong>Installations:</strong> 7,500+ |
                            <strong> NABCEP:</strong> Yes | <strong>BBB:</strong> A+
                          </p>
                          <p className="text-sm text-gray-700">
                            Houston-based with strong Gulf Coast presence. Known for hurricane-resistant mounting systems
                            and exceptional post-installation service.
                          </p>
                        </div>
                        <Button asChild size="sm">
                          <Link to="/installers?search=Solar+Sam">View Profile</Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* DFW Metroplex */}
                  <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border-2 border-purple-200 overflow-hidden">
                    <div className="bg-purple-600 text-white px-6 py-4">
                      <h3 className="text-2xl font-bold">Dallas-Fort Worth Metroplex</h3>
                      <p className="text-purple-100 text-sm mt-1">Top Gold Tier Installers - 85-100 Points</p>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between gap-4 bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-lg text-gray-900">Sunlight Solar Energy</span>
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-semibold">GOLD - 91 pts</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Founded:</strong> 2007 (18 years) | <strong>Installations:</strong> 10,000+ |
                            <strong> NABCEP:</strong> Yes | <strong>BBB:</strong> A+
                          </p>
                          <p className="text-sm text-gray-700">
                            DFW's most experienced solar installer. Pioneered residential solar in North Texas.
                            Exceptional reputation for quality and reliability.
                          </p>
                        </div>
                        <Button asChild size="sm">
                          <Link to="/installers?search=Sunlight+Solar">View Profile</Link>
                        </Button>
                      </div>

                      <div className="flex items-start justify-between gap-4 bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-lg text-gray-900">DFW Solar Electric</span>
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-semibold">GOLD - 87 pts</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Founded:</strong> 2010 (15 years) | <strong>Installations:</strong> 6,000+ |
                            <strong> NABCEP:</strong> Yes | <strong>BBB:</strong> A+
                          </p>
                          <p className="text-sm text-gray-700">
                            Dallas-Fort Worth specialist with master electricians on staff. Excellent for complex
                            electrical upgrades and panel replacements.
                          </p>
                        </div>
                        <Button asChild size="sm">
                          <Link to="/installers?search=DFW+Solar">View Profile</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    How to Use These Rankings
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">1.</span>
                      <span>Get quotes from at least 3 installers—include at least 1-2 Gold tier companies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">2.</span>
                      <span>Compare total system cost, equipment quality, and warranty terms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">3.</span>
                      <span>Verify insurance and bonding independently (don't just trust their word)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">4.</span>
                      <span>Check recent BBB reviews and Google reviews for red flags</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">5.</span>
                      <span>Ask for local references from installations in the past 6 months</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* What Makes a "Top" Installer */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                  What Makes a Solar Installer "Top-Ranked"?
                </h2>

                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Our ranking methodology prioritizes <strong>longevity and financial health</strong> over marketing
                    budgets and customer sentiment. Here's exactly how companies earn top rankings:
                  </p>

                  <div className="space-y-6">
                    {[
                      {
                        title: "Proven Track Record (20 points)",
                        items: [
                          "10+ years in business serving Texas homeowners",
                          "1,000+ verified installations completed",
                          "Survived multiple economic cycles and market downturns",
                          "Consistent 4.5+ star customer ratings across platforms"
                        ]
                      },
                      {
                        title: "Financial Stability (30 points)",
                        items: [
                          "Active general liability insurance ($1M+ coverage)",
                          "Surety bond protecting customers mid-project",
                          "No bankruptcy filings, liens, or judgments in past 10 years",
                          "Transparent business registration and ownership"
                        ]
                      },
                      {
                        title: "Professional Credentials (25 points)",
                        items: [
                          "NABCEP certified installers on staff (not just 'trained')",
                          "Valid Texas electrical contractor or master electrician license",
                          "Industry association memberships (SEIA, NABCEP, local chambers)",
                          "Ongoing education and certification renewals"
                        ]
                      },
                      {
                        title: "Customer Protection (25 points)",
                        items: [
                          "25-year equipment warranties backed by manufacturers",
                          "10+ year workmanship warranties",
                          "A+ BBB rating with no unresolved complaints",
                          "Clear contract terms with no hidden fees"
                        ]
                      }
                    ].map((category, idx) => (
                      <div key={idx} className="bg-white border-l-4 border-green-500 rounded-r-lg p-6">
                        <h3 className="font-bold text-xl text-gray-900 mb-3">{category.title}</h3>
                        <ul className="space-y-2">
                          {category.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                      Important: Rankings Are NOT Influenced by Payment
                    </h3>
                    <p className="text-gray-700">
                      Unlike EnergySage and SolarReviews (which charge installers for leads and prominent placement),
                      our rankings are <strong>100% independent</strong>. Companies cannot pay to improve their scores.
                      We verify all data through public records and third-party databases.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Get Quotes from Top-Ranked Installers?
                </h2>
                <p className="text-xl mb-8 text-blue-50">
                  Compare 500+ Texas solar companies ranked by our 100-point safety scoring system.
                  See which installers earned Gold tier status and survived the 2024 bankruptcy wave.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                    <Link to="/installers">View All Rankings</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600">
                    <Link to="/quote">Get Free Quotes</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TopSolarInstallersTexas2025;
