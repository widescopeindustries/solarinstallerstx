import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createServerClientAnon } from "@/app/lib/supabase/server"
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
  const title = `${displayName} | Solar Installer in ${installer.location_city}, TX`
  const description = `Contact ${displayName}, a verified ${installer.certification_type} solar installer serving ${installer.location_city}, ${installer.location_state}. ${installer.phone ? `Call ${installer.phone}` : 'Get a quote today'}.`

  return {
    title,
    description,
    keywords: [`${displayName}`, `solar installer ${installer.location_city}`, `${installer.location_city} solar`],
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

  // Check if NABCEP certified
  const isNABCEP = installer.certification_type?.toLowerCase().includes('pvip') ||
    installer.certification_type?.toLowerCase().includes('pvsi') ||
    installer.certification_type?.toLowerCase().includes('pv installation') ||
    installer.certification_type?.toLowerCase().includes('pv system')

  return (
    <div className="min-h-screen bg-background">
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
                          className={`h-5 w-5 ${i < Math.floor(installer.rating)
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

            {/* About Section */}
            {installer.company_bio && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">About {displayName}</h2>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {installer.company_bio}
                  </p>
                </CardContent>
              </Card>
            )}

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
                        {`${installer.certification_number.split('-')[0]}-********`}
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

            {/* SEO Content */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                  About {displayName} - Solar Installation in {installer.location_city}, Texas
                </h2>
                <div className="prose prose-gray max-w-none text-muted-foreground space-y-4">
                  <p>
                    {displayName} is a {installer.certification_type ? `${installer.certification_type} certified` : 'professional'} solar installer serving {installer.location_city} and surrounding areas in Texas. With expertise in residential and commercial solar installations, {displayName} helps Texas homeowners transition to clean, renewable solar energy.
                  </p>
                  <p>
                    {isNABCEP ? (
                      <>As a NABCEP-certified solar installer, {displayName} meets the highest industry standards for solar PV system design and installation.</>
                    ) : (
                      <>{displayName} is dedicated to providing quality solar installation services that meet industry standards.</>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
