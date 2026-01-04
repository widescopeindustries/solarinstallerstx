import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { InstallersListClient } from "@/components/InstallersListClient"
import { createServerClientAnon } from "@/app/lib/supabase/server"

export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
  const params = await searchParams;
  const hasParams = Object.keys(params).length > 0;

  return {
    title: '539+ Verified Solar Installers in Texas (2025 Safety Scores)',
    description: 'Find the best solar companies in Texas. Compare 539+ verified installers, view proprietary safety scores, and avoid the risk of solar bankruptcy. Get 3 free quotes today.',
    keywords: ['solar installers texas', 'NABCEP certified', 'texas solar companies', 'verified solar installers', 'solar safety scores', 'solar bankruptcy risks'],
    openGraph: {
      title: '539+ Verified Solar Installers in Texas (2025 Safety Scores)',
      description: 'Compare 539+ verified solar companies. NABCEP certified professionals with 100-point safety scores.',
      url: 'https://solarinstallerstx.com/installers',
      siteName: 'Solar Installers TX',
      type: 'website',
    },
    alternates: {
      canonical: 'https://solarinstallerstx.com/installers',
    },
    robots: hasParams ? { index: false, follow: true } : { index: true, follow: true },
  }
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://solarinstallerstx.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Texas Solar Installers",
      "item": "https://solarinstallerstx.com/installers"
    }
  ]
}

export default async function InstallersPage() {
  const supabase = createServerClientAnon()

  // Fetch all installers
  const { data: installers, error } = await supabase
    .from('installers')
    .select('*')
    .order('is_premium', { ascending: false })
    .order('is_verified', { ascending: false })
    .order('created_at', { ascending: false })

  // Fetch NABCEP installers
  const { data: nabcepInstallers, error: nabcepError } = await supabase
    .from('installers')
    .select('*')
    .or('certification_type.ilike.%PVIP%,certification_type.ilike.%PVSI%,certification_type.ilike.%PV Installation%,certification_type.ilike.%PV System%')
    .order('is_premium', { ascending: false })
    .order('is_verified', { ascending: false })

  if (error || nabcepError) {
    console.error('Error fetching installers:', error || nabcepError)
  }

  const allInstallers = installers || []
  const allNabcepInstallers = nabcepInstallers || []

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

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
            <li className="text-foreground font-medium">NABCEP Certified Solar Installers</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            NABCEP Certified Solar Installers in Texas
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse {allInstallers.length}+ certified solar installation professionals across Texas. NABCEP certified installers are featured first, followed by other verified professionals. All installers verified for financial stability and professional credentials.
          </p>
        </div>

        {/* Client-side filtering component */}
        <InstallersListClient
          installers={allInstallers}
          nabcepInstallers={allNabcepInstallers}
        />
      </main>

      <Footer />
    </div>
  )
}
