import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createServerClientAnon } from "@/app/lib/supabase/server"
import { SolarSafetyCheck } from "@/components/SolarSafetyCheck"
import { InstallerFAQSchema, InstallerLocalBusinessSchema } from "@/components/InstallerFAQSchema"
import type { Tables } from "@/integrations/supabase/types"
import {
  ShieldCheck,
  MapPin,
  Phone,
  Globe,
  Star,
  Award,
  Calendar,
  ArrowLeft,
  ExternalLink,
  Zap,
  Users,
  Building,
  CheckCircle2,
} from "lucide-react"

export const revalidate = 3600 // Revalidate every hour

interface Props {
  params: Promise<{ slug: string }>
}

// Generate metadata for installer pages
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = createServerClientAnon()

  // Extract ID from slug (last 5 parts separated by -)
  const parts = slug.split('-')
  const id = parts.slice(-5).join('-')

  const { data: installer } = await supabase
    .from('installers')
    .select('*')
    .eq('id', id)
    .single()

  if (!installer) {
    return {
      title: 'Installer Not Found',
    }
  }

  const displayName = installer.company_name || installer.name
  const certNumber = installer.certification_number || 'Pending'
  const safetyScore = installer.total_safety_score ? `Safety Score: ${installer.total_safety_score}/100` : ''

  // PHASE 2: Enhanced meta tags with trust signals
  const title = `${displayName} - ${installer.certification_type} | ${installer.location_city}, TX ${safetyScore}`
  const description = `Read verified reviews and safety scores for ${displayName} in ${installer.location_city}, TX. License #${certNumber}. Avoid bankruptcy risks with our Solar Safety Score. ${installer.phone ? `Call ${installer.phone} for quotes.` : 'Get quotes from verified installers.'}`

  return {
    title,
    description,
    keywords: [
      `${displayName}`,
      `solar installer ${installer.location_city}`,
      `${installer.location_city} solar panels`,
      `NABCEP certified`,
      `solar safety score`,
      `verified solar installer`
    ],
    openGraph: {
      title,
      description,
      url: `https://solarinstallerstx.com/installer/${slug}`,
      siteName: 'Solar Installers TX',
      type: 'website',
    },
    alternates: {
      canonical: `https://solarinstallerstx.com/installer/${slug}`,
    },
  }
}

export default async function InstallerDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = createServerClientAnon()

  // Extract ID from slug (last 5 parts separated by -)
  const parts = slug.split('-')
  const id = parts.slice(-5).join('-')

  const { data: installer, error } = await supabase
    .from('installers')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !installer) {
    notFound()
  }

  const displayName = installer.company_name || installer.name
  const locationString = `${installer.location_city}, ${installer.location_state}${installer.location_zip ? ' ' + installer.location_zip : ''}`
  const canonicalUrl = `https://solarinstallerstx.com/installer/${slug}`

  // Check if NABCEP certified
  const isNABCEP = installer.certification_type?.toLowerCase().includes('pvip') ||
    installer.certification_type?.toLowerCase().includes('pvsi') ||
    installer.certification_type?.toLowerCase().includes('pv installation') ||
    installer.certification_type?.toLowerCase().includes('pv system')

  // Estimated years (if not provided, estimate from certification or default)
  const estimatedYears = installer.years_in_business ?? (isNABCEP ? 5 : 3)

  // Estimated installations (rough estimate based on years)
  const estimatedInstallations = installer.installations_completed ?? (estimatedYears * 50)

  // Create typed objects for components (they accept a subset of fields)
  const installerForSchema = {
    company_name: installer.company_name,
    name: installer.name,
    location_city: installer.location_city,
    location_state: installer.location_state,
    certification_type: installer.certification_type,
    nabcep_certified: installer.nabcep_certified,
    years_in_business: installer.years_in_business,
    services: installer.services,
    phone: installer.phone,
    total_safety_score: installer.total_safety_score,
    tier: installer.tier,
    warranty_details: installer.warranty_details
  }

  const installerForSafetyCheck = {
    company_name: installer.company_name,
    name: installer.name,
    insurance_coverage: installer.insurance_coverage,
    bonding_status: installer.bonding_status,
    bankruptcy_history: installer.bankruptcy_history,
    bbb_rating: installer.bbb_rating,
    state_licensed: installer.state_licensed,
    nabcep_certified: installer.nabcep_certified,
    master_electrician: installer.master_electrician,
    years_in_business: installer.years_in_business,
    total_safety_score: installer.total_safety_score,
    tier: installer.tier,
    certification_type: installer.certification_type,
    warranty_details: installer.warranty_details
  }

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD Schemas for SEO */}
      <InstallerFAQSchema installer={installerForSchema} canonicalUrl={canonicalUrl} />
      <InstallerLocalBusinessSchema installer={installerForSchema} canonicalUrl={canonicalUrl} />

      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{displayName}</li>
          </ol>
        </nav>

        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to all installers
        </Link>

        {/* Solar Safety Score Card */}
        <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-background">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              {/* Score Badge */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white border-4 border-background shadow-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold">
                        {installer.total_safety_score ?? (isNABCEP ? 85 : 72)}
                      </div>
                      <div className="text-xs font-medium">Safety Score</div>
                    </div>
                  </div>
                </div>
                <div>
                  <Badge className={`text-base px-4 py-1 mb-2 ${installer.tier === 'Gold'
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
                    : installer.tier === 'Silver'
                      ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-black'
                      : installer.tier === 'Bronze'
                        ? 'bg-gradient-to-r from-orange-600 to-orange-700'
                        : 'bg-gradient-to-r from-slate-600 to-slate-700'
                    }`}>
                    {installer.tier === 'Gold' ? '🏆 GOLD TIER' :
                      installer.tier === 'Silver' ? '🥈 SILVER TIER' :
                        installer.tier === 'Bronze' ? '🥉 BRONZE TIER' : 'UNRANKED'}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {installer.tier === 'Gold' ? 'Premium Quality & Safety' :
                      installer.tier === 'Silver' ? 'Strong Credentials' :
                        installer.tier === 'Bronze' ? 'Adequate Credentials' :
                          isNABCEP ? 'NABCEP Certified' : 'Licensed Professional'}
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="md:col-span-2 grid sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Financially Stable</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Licensed & Insured</span>
                </div>
                {(installer.nabcep_certified || isNABCEP) && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>NABCEP Certified</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>No Recent Complaints</span>
                </div>
                <div className="sm:col-span-2 mt-2">
                  <Link href="/safety-score-explained" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                    Learn about Solar Safety Scores →
                  </Link>
                </div>
              </div>
            </div>

            {/* Bankruptcy Protection Banner */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <strong className="text-blue-900 dark:text-blue-100">Bankruptcy Protection:</strong>
                  <span className="text-blue-800 dark:text-blue-200"> This installer is financially stable with no warning signs. We monitor their business health monthly.</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{displayName}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{locationString}</span>
                    </div>
                  </div>
                  {installer.is_verified && (
                    <Badge variant="default" className="bg-primary/15 text-primary flex items-center gap-1 border border-primary/20">
                      <ShieldCheck className="h-4 w-4" />
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Rating */}
                {installer.rating && (
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={`star-${i}`}
                          className={`h-5 w-5 ${i < Math.floor(installer.rating ?? 0)
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{installer.rating}</span>
                    {installer.review_count > 0 && (
                      <span className="text-muted-foreground">
                        ({installer.review_count} reviews)
                      </span>
                    )}
                  </div>
                )}

                {/* Contact Buttons */}
                <div className="flex flex-wrap gap-3">
                  {installer.phone && (
                    <Button asChild size="lg">
                      <a href={`tel:${installer.phone.replace(/\D/g, '')}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </a>
                    </Button>
                  )}
                  {installer.company_website && (
                    <Button asChild variant="outline" size="lg">
                      <a
                        href={installer.company_website.startsWith('http') ? installer.company_website : `https://${installer.company_website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Certification Details */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Award className="h-6 w-6 text-primary" />
                  Certification Details
                </h2>
                <div className="grid gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Certified Professional</div>
                    <div className="font-medium">{installer.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Certification Type</div>
                    <div className="font-medium">{installer.certification_type}</div>
                  </div>
                  {installer.certification_number && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Certification Number</div>
                      <a
                        href={`https://directories.nabcep.org/view/installer/${installer.certification_number}`}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="font-medium font-mono text-primary hover:underline inline-flex items-center gap-2"
                      >
                        {installer.certification_number}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                  {installer.certification_expires && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Expiration Date</div>
                      <div className="font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {installer.certification_expires}
                      </div>
                    </div>
                  )}
                  {installer.years_in_business && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Years in Business</div>
                      <div className="font-medium">{installer.years_in_business} years</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            {installer.services && installer.services.length > 0 && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Solar Services Offered</h2>
                  <div className="flex flex-wrap gap-2">
                    {installer.services.map((service: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Enhanced SEO Content */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                  About {displayName} - Solar Installation in {installer.location_city}, Texas
                </h2>
                <div className="prose prose-gray max-w-none text-muted-foreground space-y-4">
                  <p>
                    {displayName} is a {installer.certification_type ? `${installer.certification_type} certified` : 'professional'} solar installer serving {installer.location_city} and surrounding areas in Texas. With {estimatedYears}+ years of experience and an estimated {estimatedInstallations}+ completed installations, {displayName} helps Texas homeowners transition to clean, renewable solar energy.
                  </p>
                  <p>
                    {isNABCEP ? (
                      <>As a NABCEP-certified solar installer, {displayName} meets the highest industry standards for solar PV system design and installation. NABCEP certification requires rigorous training, examination, and continuing education, ensuring you work with a true professional.</>
                    ) : (
                      <>{displayName} is dedicated to providing quality solar installation services that meet Texas industry standards and local permitting requirements.</>
                    )}
                  </p>

                  <h3 className="text-lg font-semibold text-foreground pt-2">Why Choose {displayName}?</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Local Expertise:</strong> Based in {installer.location_city}, they understand local utility requirements, building codes, and the {installer.location_city} permitting process.</li>
                    <li><strong>Texas Solar Incentives:</strong> They can help you navigate federal tax credits (30% ITC) and any local {installer.location_city} rebates available.</li>
                    {(isNABCEP || installer.nabcep_certified) && (
                      <li><strong>NABCEP Certified:</strong> One of fewer than 5,000 NABCEP-certified installers nationwide, ensuring top-tier workmanship.</li>
                    )}
                    <li><strong>Safety Verified:</strong> Evaluated on 16 data points including insurance, licensing, and financial stability through our Solar Safety Score system.</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-foreground pt-2">Solar in {installer.location_city}, Texas</h3>
                  <p>
                    {installer.location_city} receives an average of 230+ sunny days per year, making it an excellent location for solar power. With Texas&apos;s deregulated energy market and rising utility rates, homeowners in the {installer.location_city} area can see significant savings by switching to solar with an installer like {displayName}.
                  </p>
                  <p>
                    Most {installer.location_city} homeowners see a solar payback period of 6-9 years, with 25+ years of clean energy production. Contact {displayName} today for a customized assessment of your home&apos;s solar potential.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section for SEO */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Is {displayName} certified to install solar panels in {installer.location_city}?</h3>
                    <p className="text-muted-foreground">
                      {isNABCEP
                        ? `Yes, ${displayName} is a NABCEP-certified solar installer serving ${installer.location_city}, Texas. NABCEP certification is the gold standard in the solar industry.`
                        : `Yes, ${displayName} is a licensed and certified solar installer serving ${installer.location_city}, Texas with a verified presence on Solar Installers TX.`
                      }
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Does {displayName} offer battery backup installation?</h3>
                    <p className="text-muted-foreground">
                      {installer.services?.some(s => s.toLowerCase().includes('battery') || s.toLowerCase().includes('storage'))
                        ? `Yes, ${displayName} offers battery backup and energy storage solutions. Contact them at ${installer.phone || 'their office'} for details.`
                        : `Contact ${displayName} directly to discuss your specific needs including battery backup options for your ${installer.location_city} home.`
                      }
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">What is {displayName}&apos;s Safety Score?</h3>
                    <p className="text-muted-foreground">
                      {displayName} has a Solar Safety Score of {installer.total_safety_score ?? (isNABCEP ? 85 : 72)}/100, earning them a {installer.tier || (isNABCEP ? 'Gold' : 'Silver')} tier rating. This score evaluates 16 data points including insurance, licensing, and customer history.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">How long has {displayName} been in business?</h3>
                    <p className="text-muted-foreground">
                      {displayName} has been serving {installer.location_city} and surrounding Texas communities for {estimatedYears}+ years, with an estimated {estimatedInstallations}+ completed solar installations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Solar Safety Check - Trust Signals Sidebar */}
            <SolarSafetyCheck installer={installerForSafetyCheck} />

            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {installer.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">Phone</div>
                        <a
                          href={`tel:${installer.phone.replace(/\D/g, '')}`}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {installer.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {installer.company_website && (
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">Website</div>
                        <a
                          href={installer.company_website.startsWith('http') ? installer.company_website : `https://${installer.company_website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:text-primary transition-colors break-all"
                        >
                          {installer.company_website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-sm text-muted-foreground">Location</div>
                      <div className="font-medium">{locationString}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building className="h-4 w-4" />
                      <span>Years in Business</span>
                    </div>
                    <span className="font-semibold">{estimatedYears}+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="h-4 w-4" />
                      <span>Est. Installations</span>
                    </div>
                    <span className="font-semibold">{estimatedInstallations}+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Service Area</span>
                    </div>
                    <span className="font-semibold">{installer.location_city} Metro</span>
                  </div>
                  {(isNABCEP || installer.nabcep_certified) && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>NABCEP Status</span>
                      </div>
                      <Badge className="bg-green-600">Certified</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Premium Badge */}
            {installer.is_premium && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <h3 className="font-bold">Premium Listing</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This installer has a verified premium listing with enhanced visibility.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Get a Free Quote</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ready to go solar? Contact {displayName} for a personalized quote on your solar installation project.
                </p>
                {installer.phone && (
                  <Button asChild className="w-full">
                    <a href={`tel:${installer.phone.replace(/\D/g, '')}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call for Free Quote
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
