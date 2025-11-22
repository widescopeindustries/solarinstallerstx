import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PopularPosts } from "@/components/PopularPosts"
import { RelatedGuides } from "@/components/RelatedGuides"
import { QuoteFormSection } from "@/components/QuoteFormSection"
import {
  Shield,
  DollarSign,
  Zap,
  CheckCircle,
  TrendingUp,
  Users,
  Calculator,
  Phone,
} from "lucide-react"

export const metadata: Metadata = {
  title: 'Solar Installers Texas | Certified Companies & Free Quotes',
  description: 'Find certified solar installers in Texas. Get free quotes from NABCEP-certified companies. Save 26% on electricity bills with professional solar installation.',
  keywords: ['solar installers texas', 'solar panels texas', 'texas solar companies', 'solar installation', 'NABCEP certified'],
  openGraph: {
    title: 'Solar Installers TX - Find Verified Solar Companies',
    description: 'Compare top-rated solar installers in Texas with our 100-point safety scoring system',
    url: 'https://solarinstallerstx.com',
    siteName: 'Solar Installers TX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar Installers TX - Find Verified Solar Companies',
    description: 'Compare top-rated solar installers with 100-point safety scores',
  },
  alternates: {
    canonical: 'https://solarinstallerstx.com',
  },
}

const valueProps = [
  {
    icon: Shield,
    title: "NABCEP Certified",
    description: "All installers are certified by the North American Board of Certified Energy Practitioners"
  },
  {
    icon: DollarSign,
    title: "Save 26%",
    description: "Average monthly savings for Texas homeowners who switch to solar"
  },
  {
    icon: Zap,
    title: "Fast Install",
    description: "Most installations completed in 1-3 days with minimal disruption"
  }
]

const cities = [
  { name: 'Austin', slug: 'austin', population: '978K' },
  { name: 'Dallas', slug: 'dallas', population: '1.3M' },
  { name: 'Houston', slug: 'houston', population: '2.3M' },
  { name: 'San Antonio', slug: 'san-antonio', population: '1.5M' },
  { name: 'Fort Worth', slug: 'fort-worth', population: '919K' },
  { name: 'El Paso', slug: 'el-paso', population: '679K' },
  { name: 'Arlington', slug: 'arlington', population: '394K' },
  { name: 'Corpus Christi', slug: 'corpus-christi', population: '317K' },
  { name: 'Plano', slug: 'plano', population: '285K' },
  { name: 'Lubbock', slug: 'lubbock', population: '258K' },
  { name: 'Laredo', slug: 'laredo', population: '256K' },
  { name: 'Garland', slug: 'garland', population: '246K' },
  { name: 'Frisco', slug: 'frisco', population: '201K' },
  { name: 'McKinney', slug: 'mckinney', population: '199K' },
  { name: 'Killeen', slug: 'killeen', population: '153K' },
  { name: 'Waco', slug: 'waco', population: '138K' }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section 1: The Problem & Our Mission */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Veteran-Owned Badge */}
              <div className="mb-6 flex justify-center">
                <Badge variant="outline" className="text-sm px-4 py-2 border-primary/40">
                  🇺🇸 Veteran-Owned & Operated
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Don't Become a Solar Victim
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
                The Texas solar industry is broken. Shady sales tactics. Financial insolvency. Voided warranties on $25,000 systems. Homeowners are right to be scared. We're fixing that.
              </p>

              {/* Crisis Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
                <div className="bg-card border border-destructive/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-destructive mb-1">100+</div>
                  <div className="text-sm text-muted-foreground">Solar Bankruptcies in 2024-2025</div>
                </div>
                <div className="bg-card border border-destructive/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-destructive mb-1">Sunnova</div>
                  <div className="text-sm text-muted-foreground">Chapter 11 - June 2025</div>
                </div>
                <div className="bg-card border border-destructive/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-destructive mb-1">Thousands</div>
                  <div className="text-sm text-muted-foreground">Unfinished Projects in Texas</div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500 rounded-lg p-6 mb-8 max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1">
                    <p className="text-amber-900 dark:text-amber-100 text-lg">
                      <strong>This is Texas. Rest Assured that regulations are coming to Set the Solar Industry Straight. But we're not waiting around.</strong> We're front running the lawmakers on this and proactively taking a STAND AGAINST SHADY SOLAR. When you see this Badge, you can know, We started the due diligence for you.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Image
                      src="/solar-safety-scored-badge.png"
                      alt="Solar Safety Scored Badge - Verified Installer Quality Assurance"
                      width={704}
                      height={368}
                      priority
                      className="h-32 md:h-40 w-auto"
                      sizes="(max-width: 768px) 128px, 160px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section 2: Our Solution (Safety Scoring) */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Solar Safety Scored™</h2>
                <p className="text-lg text-muted-foreground">
                  Our proprietary vetting system protects you from the same mistakes thousands of Texans have made.
                </p>
              </div>

              {/* How It Works - 3 Step Process */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card className="text-center p-8">
                  <CardContent className="space-y-4">
                    <div className="text-4xl font-bold text-primary">1</div>
                    <Shield className="h-12 w-12 text-primary mx-auto" />
                    <h3 className="text-xl font-bold">Verified Insurance</h3>
                    <p className="text-muted-foreground text-sm">
                      We require current Certificate of Insurance on file. This proves they can cover on-site accidents and protect you.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center p-8">
                  <CardContent className="space-y-4">
                    <div className="text-4xl font-bold text-primary">2</div>
                    <CheckCircle className="h-12 w-12 text-primary mx-auto" />
                    <h3 className="text-xl font-bold">Active Licensing</h3>
                    <p className="text-muted-foreground text-sm">
                      We confirm active Texas licenses (TDLR electrical, solar contractor). No shortcuts. No under-the-table work.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center p-8">
                  <CardContent className="space-y-4">
                    <div className="text-4xl font-bold text-primary">3</div>
                    <TrendingUp className="h-12 w-12 text-primary mx-auto" />
                    <h3 className="text-xl font-bold">Financial Health</h3>
                    <p className="text-muted-foreground text-sm">
                      We track financial stability and bankruptcy risk. You need to know they'll be around in 25 years to honor warranties.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Differentiation Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Not Another EnergySage or SolarReviews Clone</h2>
                <p className="text-xl text-muted-foreground">
                  We actually verify financial stability. We track bankruptcy risk. We require insurance on file.
                </p>
              </div>

              <Card>
                <CardContent className="p-6 md:p-8">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-border">
                          <th className="text-left py-4 px-2 font-bold">Feature</th>
                          <th className="text-center py-4 px-2 font-bold text-muted-foreground">Other Directories</th>
                          <th className="text-center py-4 px-2 font-bold text-primary">SolarInstallersTX</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border">
                          <td className="py-4 px-2">Financial Stability Check</td>
                          <td className="text-center py-4 px-2 text-destructive">❌ No</td>
                          <td className="text-center py-4 px-2 text-primary font-semibold">✅ Yes - Tracked Monthly</td>
                        </tr>
                        <tr className="border-b border-border bg-muted/30">
                          <td className="py-4 px-2">Bankruptcy Protection</td>
                          <td className="text-center py-4 px-2 text-destructive">❌ No</td>
                          <td className="text-center py-4 px-2 text-primary font-semibold">✅ Health Monitoring</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-4 px-2">Insurance Verification</td>
                          <td className="text-center py-4 px-2 text-destructive">❌ Not Required</td>
                          <td className="text-center py-4 px-2 text-primary font-semibold">✅ Required & Verified</td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="py-4 px-2">Proprietary Safety Scoring</td>
                          <td className="text-center py-4 px-2 text-destructive">❌ No</td>
                          <td className="text-center py-4 px-2 text-primary font-semibold">✅ 100-Point System</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Transition Section: Now That You Trust Us */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Now that you know what matters to us...</h2>
              <p className="text-lg text-muted-foreground mb-12">
                ...and that we're not just another national list, here's what we offer:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    <Users className="h-12 w-12 text-primary mx-auto" />
                    <h3 className="text-xl font-bold">Browse Our Vetted Installers</h3>
                    <p className="text-muted-foreground flex-1">
                      See the installers we've verified. Compare prices, reviews, and certifications. All with the Solar Safety Scored badge.
                    </p>
                    <Button asChild size="lg" className="w-full">
                      <Link href="/installers">Browse Certified Solar Installers</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    <Calculator className="h-12 w-12 text-primary mx-auto" />
                    <h3 className="text-xl font-bold">Learn About Solar</h3>
                    <p className="text-muted-foreground flex-1">
                      Not sure about solar? Get educated. Texas incentives. Cost breakdown. What you need to know before buying.
                    </p>
                    <Button asChild size="lg" className="w-full">
                      <Link href="/learn">Explore Solar Learning Center</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    <Phone className="h-12 w-12 text-primary mx-auto" />
                    <h3 className="text-xl font-bold">Get a Free Quote</h3>
                    <p className="text-muted-foreground flex-1">
                      Ready to move forward? Tell us your location and budget. We'll connect you with certified installers.
                    </p>
                    <Button asChild size="lg" className="w-full">
                      <Link href="/quote">Request Your Free Solar Quote</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Texas Map */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Solar Installers by City</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Find certified solar installers in major Texas cities. Click on any city to explore local options.
              </p>
            </div>

            {/* City Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
              {cities.map((city) => (
                <Link key={city.slug} href={`/cities/${city.slug}`} title={`Find solar installers in ${city.name}, Texas`}>
                  <Card className="hover:shadow-md transition-all duration-300 cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold mb-1 text-base">{city.name} Solar</h3>
                      <p className="text-sm text-muted-foreground">{city.population}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Educational Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Why Solar in Texas?</h2>
              <div className="space-y-6 text-base text-muted-foreground">
                <p>
                  Texas is one of the best states for solar energy in the United States, with abundant sunshine,
                  competitive electricity rates, and strong renewable energy policies. The Lone Star State receives
                  an average of 5.2 peak sun hours per day, making it ideal for solar panel installations.
                </p>
                <p>
                  Texas homeowners can take advantage of the federal solar tax credit (30% through 2032), property
                  tax exemptions for solar installations, and net metering programs offered by many utility companies.
                  With electricity rates averaging $0.11 per kWh and rising, solar provides a stable, long-term
                  solution for reducing energy costs.
                </p>
                <p>
                  The solar industry in Texas has grown rapidly, with over 15,000 MW of installed capacity as of 2024.
                  This growth has created a competitive market with experienced, certified installers offering
                  high-quality systems at competitive prices.
                </p>
              </div>
              <div className="text-center mt-8">
                <Button asChild variant="outline" size="lg">
                  <Link href="/learn">Explore Texas Solar Guides & Resources</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Solar Resources for Texas Homeowners</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Expert guides and latest industry news to help you make informed decisions about solar energy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              <PopularPosts />
              <RelatedGuides limit={6} />
            </div>
          </div>
        </section>

        {/* Quote Form - Client Component */}
        <QuoteFormSection />
      </main>

      <Footer />
    </div>
  )
}
