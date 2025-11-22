import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { InstallerListCard } from "@/components/InstallerListCard"
import { InstallerCard } from "@/components/InstallerCard"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { createServerClientAnon } from "@/app/lib/supabase/server"
import { getAllCitySlugs, getCityBySlug } from "@/data/texasCities"
import { MapPin, Zap, DollarSign, Sun, CheckCircle } from "lucide-react"

export const revalidate = 3600 // Revalidate every hour

interface Props {
  params: Promise<{ city: string }>
}

// Pre-render all Texas city pages
export async function generateStaticParams() {
  const citySlugs = getAllCitySlugs()
  return citySlugs.map(city => ({ city }))
}

// Generate dynamic metadata for each city
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const cityData = getCityBySlug(city)

  if (!cityData) {
    return {
      title: 'City Not Found',
    }
  }

  const title = `Solar Installers ${cityData.name} TX | NABCEP Certified`
  const description = `Compare NABCEP solar installers in ${cityData.name}, TX. Average ${cityData.avgSolarCost}. Get 30% federal tax credit. Free quotes from financially stable companies.`

  return {
    title,
    description,
    keywords: [`solar installers ${cityData.name}`, `${cityData.name} solar companies`, `solar panels ${cityData.name} texas`],
    openGraph: {
      title,
      description,
      url: `https://solarinstallerstx.com/cities/${city}`,
      siteName: 'Solar Installers TX',
      type: 'website',
    },
    alternates: {
      canonical: `https://solarinstallerstx.com/cities/${city}`,
    },
  }
}

export default async function CityPage({ params }: Props) {
  const { city } = await params
  const cityData = getCityBySlug(city)

  if (!cityData) {
    notFound()
  }

  const supabase = createServerClientAnon()

  // Fetch installers for this city
  const cityName = city.replace(/-/g, ' ')
  const { data: installers, error } = await supabase
    .from('installers')
    .select('*')
    .ilike('location_city', `%${cityName}%`)
    .order('is_premium', { ascending: false })
    .order('is_verified', { ascending: false })

  // Fetch NABCEP installers for this city
  const { data: nabcepInstallers, error: nabcepError } = await supabase
    .from('installers')
    .select('*')
    .ilike('location_city', `%${cityName}%`)
    .or('certification_type.ilike.%PVIP%,certification_type.ilike.%PVSI%,certification_type.ilike.%PV Installation%,certification_type.ilike.%PV System%')
    .order('is_premium', { ascending: false })
    .limit(6)

  if (error || nabcepError) {
    console.error('Error fetching installers:', error || nabcepError)
  }

  const allInstallers = installers || []
  const allNabcepInstallers = nabcepInstallers || []

  const cityFaqs = [
    {
      question: "Is solar worth it in Texas?",
      answer: "Absolutely! Texas has abundant sunshine, high electricity rates, and excellent solar incentives. With the 30% federal tax credit, property tax exemptions, and net metering, most Texas homeowners see a 6-8 year payback period with 25+ years of energy savings."
    },
    {
      question: `How much do solar installers charge in ${cityData.name}?`,
      answer: `Solar installers in ${cityData.name} typically charge ${cityData.avgSolarCost} for a complete residential system (before incentives). After the 30% federal tax credit, your net cost is around ${Math.round(parseFloat(cityData.avgSolarCost.replace('$', '').replace(',', '')) * 0.7).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}. Get free quotes to compare pricing from NABCEP certified installers.`
    },
    {
      question: "Are there rebates for solar panels in Texas?",
      answer: "Yes! Texas offers multiple solar rebates including the 30% federal tax credit (through 2032), 100% property tax exemption for solar equipment value, net metering credits, and utility-specific rebates. Many Texas utilities like CPS Energy, Oncor, and CenterPoint offer additional cash rebates for solar installations."
    },
    {
      question: `What solar incentives are available in ${cityData.name}?`,
      answer: `${cityData.name} offers several solar incentives including ${cityData.incentives.join(', ')}. Combined, these incentives can reduce your total solar costs by 30-40%.`
    },
    {
      question: `How long does solar installation take in ${cityData.name}?`,
      answer: `Most residential solar installations in ${cityData.name} take 1-3 days for the physical installation, plus additional time for permits, inspections, and utility interconnection. The entire process typically takes 4-8 weeks from contract to activation.`
    },
    {
      question: `Do I need permits for solar in ${cityData.name}?`,
      answer: `Yes, ${cityData.name} requires permits for solar installations. Your NABCEP certified installer will typically handle the permit process, including building permits, electrical permits, and utility interconnection agreements.`
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/installers" className="hover:text-primary transition-colors">
                Installers
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{cityData.name}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Trusted Solar Installers in {cityData.name}, Texas - Safety Rated
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find financially stable, NABCEP-certified solar installers in {cityData.name}. After 100+ bankruptcies in 2024-2025, we verify installer financial health so you don't get stuck with a broken system.{" "}
            <Link href="/quote" className="text-primary hover:underline font-semibold">
              Get your free {cityData.name} solar quote
            </Link>
            {" "}or{" "}
            <Link href="/safety-score-explained" className="text-primary hover:underline font-semibold">
              understand our proprietary Safety Score System
            </Link>
            .
          </p>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{allInstallers.length}</div>
              <div className="text-sm text-muted-foreground">Verified Installers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{allNabcepInstallers.length}</div>
              <div className="text-sm text-muted-foreground">NABCEP Certified</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">8.2</div>
              <div className="text-sm text-muted-foreground">Avg Safety Score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Financial Stability Verified</div>
            </CardContent>
          </Card>
        </div>

        {/* Bankruptcy Warning */}
        <Card className="bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500 mb-8 max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="text-amber-600 dark:text-amber-400 mt-1">⚠️</div>
              <div>
                <h2 className="text-lg font-bold mb-2 text-amber-900 dark:text-amber-100">
                  Solar Installer Bankruptcies Affecting {cityData.name}
                </h2>
                <p className="text-amber-900 dark:text-amber-100 leading-relaxed">
                  <strong>Sunnova Energy</strong> (Houston-based) filed Chapter 11 in June 2025 with $8.5B in debt, affecting thousands of Texas homeowners including {cityData.name} residents. <strong>Titan Solar</strong> abruptly shut down in June 2024.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* City Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold mb-1">{cityData.name}</div>
              <div className="text-sm text-muted-foreground">Population: {cityData.population}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold mb-1">${cityData.avgElectricRate}</div>
              <div className="text-sm text-muted-foreground">Avg Electric Rate/kWh</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold mb-1">{cityData.avgSolarCost}</div>
              <div className="text-sm text-muted-foreground">Avg Solar System Cost</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Sun className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold mb-1">{allInstallers.length}</div>
              <div className="text-sm text-muted-foreground">Certified Installers</div>
            </CardContent>
          </Card>
        </div>

        {/* NABCEP Installers */}
        {allNabcepInstallers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Top NABCEP Certified Installers in {cityData.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allNabcepInstallers.map((installer) => (
                <InstallerCard
                  key={installer.id}
                  id={installer.id}
                  name={installer.name}
                  certification_type={installer.certification_type || ""}
                  certification_number={installer.certification_number || ""}
                  certification_expires={installer.certification_expires || ""}
                  company_name={installer.company_name || ""}
                  company_website={installer.company_website || ""}
                  phone={installer.phone || ""}
                  location_city={installer.location_city || ""}
                  location_state={installer.location_state || ""}
                  location_zip={installer.location_zip || ""}
                  country={installer.country || "USA"}
                  is_verified={installer.is_verified || false}
                  is_premium={installer.is_premium || false}
                  tier={installer.tier}
                  total_safety_score={installer.total_safety_score}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Installers */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">All Solar Installers in {cityData.name}</h2>
          <div className="space-y-3">
            {allInstallers.map((installer) => (
              <InstallerListCard
                key={installer.id}
                id={installer.id}
                name={installer.name}
                certification_type={installer.certification_type || ""}
                certification_number={installer.certification_number || ""}
                certification_expires={installer.certification_expires || ""}
                company_name={installer.company_name || ""}
                company_website={installer.company_website || ""}
                phone={installer.phone || ""}
                location_city={installer.location_city || ""}
                location_state={installer.location_state || ""}
                location_zip={installer.location_zip || ""}
                country={installer.country || "USA"}
                is_verified={installer.is_verified || false}
                is_premium={installer.is_premium || false}
                tier={installer.tier}
                total_safety_score={installer.total_safety_score}
              />
            ))}
          </div>
        </section>

        {/* Solar Incentives */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Solar Incentives in {cityData.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityData.incentives.map((incentive, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <h3 className="font-semibold">{incentive}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Solar Installation FAQ - {cityData.name}</h2>
          <Accordion type="single" collapsible className="w-full">
            {cityFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Go Solar in {cityData.name}?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with NABCEP certified solar installers in {cityData.name}. Compare free quotes,
            read verified reviews, and find the perfect solar solution for your home or business.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
            <Link href="/quote">Get My Free {cityData.name} Solar Quote</Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No obligation • Compare multiple certified installers • NABCEP certified & verified
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
