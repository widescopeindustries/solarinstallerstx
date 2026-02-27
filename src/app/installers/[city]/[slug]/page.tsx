import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { createServerClientAnon } from "@/app/lib/supabase/server"
import { buildInstallerPath } from "@/lib/slugify"
import { ArrowLeft, MapPin, ShieldCheck, CheckCircle2, ExternalLink } from "lucide-react"

export const revalidate = 3600 // Revalidate every hour

interface Props {
    params: Promise<{ city: string; slug: string }>
}

// Find installer helper
async function findInstaller(citySlug: string, installerSlug: string) {
    const supabase = createServerClientAnon()

    // Try to reconstruct city name (replace hyphens with wildcards for broader match)
    const searchCity = `%${citySlug.replace(/-/g, '%')}%`

    // Get all installers that might match this city
    const { data: installers, error } = await supabase
        .from('installers')
        .select('id, name, company_name, location_city, location_state, phone, company_website, is_verified')
        .or(`location_city.ilike.${searchCity},location_city.ilike.${citySlug}`)

    if (error || !installers || installers.length === 0) {
        return { installer: null, related: [] }
    }

    // Find exact match by using buildInstallerPath to match the full URL path
    const expectedPath = `/installers/${citySlug}/${installerSlug}`
    const match = installers.find(installer => {
        const path = buildInstallerPath(installer as any)
        return path === expectedPath
    })

    return {
        installer: match || null,
        related: installers.filter(i => i.id !== match?.id)
    }
}

// Generate metadata
export async function generateMetadata({ params, searchParams }: Props & { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
    const { city, slug } = await params
    const sParams = await searchParams
    const hasParams = Object.keys(sParams).length > 0
    const { installer } = await findInstaller(city, slug)

    if (!installer) {
        return {
            title: 'Installer Not Found',
        }
    }

    const displayName = installer.company_name || installer.name
    const title = `${displayName} | Solar Installer in ${installer.location_city}, TX`
    const description = `${displayName} is a solar installer in ${installer.location_city}, TX listed on SolarInstallersTX.com. Claim your free Verified Installer Badge to get priority placement and leads.`

    return {
        title,
        description,
        keywords: [
            `${displayName}`,
            `solar installer ${installer.location_city}`,
            `${installer.location_city} solar company`,
            `${installer.location_city} TX solar panels`,
        ],
        openGraph: {
            title,
            description,
            url: `https://solarinstallerstx.com/installers/${city.toLowerCase()}/${slug.toLowerCase()}`,
            siteName: 'Solar Installers TX',
            type: 'website',
            images: [
                {
                    url: 'https://solarinstallerstx.com/opengraph-image',
                    width: 1200,
                    height: 630,
                    alt: title,
                    type: 'image/png',
                },
            ],
        },
        alternates: {
            canonical: `https://solarinstallerstx.com/installers/${city.toLowerCase()}/${slug.toLowerCase()}`,
        },
        robots: hasParams || !installer.is_verified
            ? { index: false, follow: true }
            : { index: true, follow: true },
    }
}

export default async function InstallerDetailPage({ params }: Props) {
    const { city, slug } = await params
    const { installer } = await findInstaller(city, slug)

    if (!installer) {
        notFound()
    }

    const displayName = installer.company_name || installer.name

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-12 max-w-2xl">

                {/* Breadcrumb */}
                <nav className="mb-6 text-sm" aria-label="Breadcrumb">
                    <ol className="flex items-center gap-2 text-muted-foreground flex-wrap">
                        <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                        <li>/</li>
                        <li><Link href="/installers" className="hover:text-primary transition-colors">Installers</Link></li>
                        <li>/</li>
                        <li><Link href={`/cities/${city}`} className="hover:text-primary transition-colors capitalize">{city.replace(/-/g, ' ')}</Link></li>
                        <li>/</li>
                        <li className="text-foreground font-medium">{displayName}</li>
                    </ol>
                </nav>

                <Link href="/installers" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm">
                    <ArrowLeft className="h-4 w-4" />
                    Back to all installers
                </Link>

                {/* Main Card */}
                <div className="mt-4 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">

                    {/* Sun icon */}
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                        <span className="text-3xl">☀️</span>
                    </div>

                    {/* Company name */}
                    <h1 className="text-3xl font-bold tracking-tight mb-2">{displayName}</h1>

                    {/* Location */}
                    <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-6">
                        <MapPin className="h-4 w-4" />
                        <span>{installer.location_city}, TX</span>
                    </div>

                    {installer.is_verified ? (
                        /* ── VERIFIED STATE ─────────────────────────────── */
                        <>
                            {/* Verified pill */}
                            <div className="inline-flex items-center gap-2 rounded-full border border-green-400 bg-green-50 dark:bg-green-900/20 dark:border-green-700 px-4 py-1.5 text-sm font-semibold text-green-700 dark:text-green-400 mb-6">
                                <CheckCircle2 className="h-4 w-4" />
                                Verified Installer
                            </div>

                            <div className="border-t border-border mb-8" />

                            {/* Live badge preview */}
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Your verified badge</p>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`https://solarinstallerstx.com/api/badge/${installer.id}`}
                                alt={`Verified Texas Solar Installer — ${displayName}`}
                                width={240}
                                height={80}
                                className="mx-auto rounded-lg shadow-md mb-2"
                            />
                            <p className="text-xs text-muted-foreground mb-8">This badge is live and can be embedded on your website</p>

                            {/* Contact info */}
                            {(installer.phone || installer.company_website) && (
                                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                                    {installer.phone && (
                                        <a
                                            href={`tel:${installer.phone.replace(/\D/g, '')}`}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:border-primary transition-colors"
                                        >
                                            📞 {installer.phone}
                                        </a>
                                    )}
                                    {installer.company_website && (
                                        <a
                                            href={installer.company_website.startsWith('http') ? installer.company_website : `https://${installer.company_website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:border-primary transition-colors"
                                        >
                                            <ExternalLink className="h-3.5 w-3.5" />
                                            Visit Website
                                        </a>
                                    )}
                                </div>
                            )}

                            <div className="border-t border-border mb-8" />

                            {/* Embed code teaser */}
                            <h2 className="text-base font-semibold mb-2">Add the badge to your website</h2>
                            <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
                                Copy this snippet and paste it anywhere on your site — footer, About page, or contact page.
                            </p>
                            <pre className="bg-slate-950 text-green-400 text-xs rounded-lg p-4 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed text-left mb-6">{`<!-- SolarInstallersTX Verified Badge -->
<a href="https://solarinstallerstx.com/installers/${city}/${slug}" target="_blank">
  <img src="https://solarinstallerstx.com/api/badge/${installer.id}" width="240" height="80" alt="Verified Texas Solar Installer" style="border:none">
</a>`}</pre>

                            <Button asChild size="lg" className="w-full sm:w-auto">
                                <Link href={`/badges/${installer.id}`}>
                                    <ShieldCheck className="h-4 w-4 mr-2" />
                                    Get Full Embed Code &amp; Badge Page
                                </Link>
                            </Button>
                        </>
                    ) : (
                        /* ── UNCLAIMED STATE ─────────────────────────────── */
                        <>
                            <div className="border-t border-border mb-8" />

                            {/* Unclaimed pill */}
                            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700 px-4 py-1.5 text-sm font-medium text-amber-800 dark:text-amber-300 mb-6">
                                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                                This listing is unclaimed
                            </div>

                            <h2 className="text-xl font-semibold mb-2">Is this your business?</h2>
                            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                                Claim your free <strong>Verified Installer Badge</strong> and get priority placement in {installer.location_city}. No cost, no credit card — takes 2 minutes.
                            </p>

                            <Button asChild size="lg" className="w-full sm:w-auto text-base px-8">
                                <Link href={`/claim-your-listing?company=${encodeURIComponent(displayName)}&city=${encodeURIComponent(installer.location_city)}`}>
                                    <ShieldCheck className="h-5 w-5 mr-2" />
                                    Claim Your Verified Badge — Free
                                </Link>
                            </Button>

                            <div className="border-t border-border mt-10 mb-8" />

                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-5">What&apos;s included — free</h3>
                            <ul className="space-y-3 text-sm text-left max-w-xs mx-auto">
                                {[
                                    'Verified badge widget for your website',
                                    'Priority placement in your city',
                                    'Lead contact form on your listing',
                                    'Your logo, photos & full description',
                                    'Direct quote requests from homeowners',
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>

                {/* Back link */}
                <div className="mt-8 text-center">
                    <Link href={`/cities/${city}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        View all solar installers in {installer.location_city} →
                    </Link>
                </div>

            </main>
        </div>
    )
}
