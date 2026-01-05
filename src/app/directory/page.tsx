import { Metadata } from 'next'
import Link from 'next/link'
import { createServerClientAnon } from "@/app/lib/supabase/server"
import { NewHeader } from "@/components/NewHeader"
import { NewFooter } from "@/components/NewFooter"
import { getAllCitySlugs, getCityBySlug } from "@/data/texasCities"
import { buildInstallerPath, generateCitySlug } from "@/lib/slugify"

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: {
        absolute: 'Solar Installers TX Directory | All Cities & Companies'
    },
    description: 'Complete directory of all verified solar installers and cities in Texas. Browse by location or company name.',
    robots: { index: true, follow: true }
}

export default async function DirectoryPage() {
    const supabase = createServerClientAnon()
    const citySlugs = getAllCitySlugs()

    // Fetch all installers
    const { data: installers } = await supabase
        .from('installers')
        .select('id, name, company_name, location_city')
        .order('company_name', { ascending: true })

    const validInstallers = installers || []

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <NewHeader />
            <main className="flex-1 container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8 text-center">Solar Installers TX Directory</h1>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Cities Section */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Browse by City</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
                            {citySlugs.map(slug => {
                                const city = getCityBySlug(slug)
                                return (
                                    <Link
                                        key={slug}
                                        href={`/cities/${slug}`}
                                        className="text-primary hover:underline"
                                    >
                                        {city?.name || slug}
                                    </Link>
                                )
                            })}
                        </div>
                    </section>

                    {/* Installers Section */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Browse All Installers ({validInstallers.length})</h2>
                        <div className="h-[800px] overflow-y-auto pr-4 border rounded-lg p-4">
                            <ul className="space-y-2">
                                {validInstallers.map(installer => {
                                    const path = buildInstallerPath({
                                        id: installer.id,
                                        name: installer.name,
                                        company_name: installer.company_name,
                                        location_city: installer.location_city
                                    })
                                    const displayName = installer.company_name || installer.name

                                    return (
                                        <li key={installer.id}>
                                            <Link
                                                href={path}
                                                className="text-muted-foreground hover:text-primary transition-colors block truncate"
                                            >
                                                {displayName} <span className="text-xs text-muted-foreground/60">({installer.location_city})</span>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </section>
                </div>
            </main>
            <NewFooter />
        </div>
    )
}
