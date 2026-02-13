import { MetadataRoute } from 'next'
import { createServerClientAnon } from '@/app/lib/supabase/server'
import { getAllCitySlugs } from '@/data/texasCities'
import { blogPosts } from '@/data/blogPosts'
import { buildInstallerPath } from '@/lib/slugify'

// Mark as dynamic to prevent static generation timeout
export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://solarinstallerstx.com'

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/installers`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/quote`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/safety-score-explained`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
{
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/refund`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/directory`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
    ]

    // Learn pages
    const learnPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/learn`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/learn/battery-storage`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/learn/choosing-installer`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/learn/solar-buying-guide-texas`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/learn/solar-financing`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/learn/solar-panel-types`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/learn/texas-incentives`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ]

    // City pages
    const citySlugs = getAllCitySlugs()
    const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
        url: `${baseUrl}/cities/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    // Blog pages
    const blogPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...blogPosts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        })),
    ]

    // Installer pages - fetch ALL installers from database with timeout protection
    let installerPages: MetadataRoute.Sitemap = []
    try {
        const supabase = createServerClientAnon()

        // Use a simpler query with limit to prevent timeout
        const { data: installers, error } = await Promise.race([
            supabase
                .from('installers')
                .select('id, name, company_name, location_city, updated_at')
                .order('is_premium', { ascending: false })
                .order('is_verified', { ascending: false })
                .limit(2000), // Limit to prevent timeout
            new Promise<{ data: null; error: Error }>((_, reject) =>
                setTimeout(() => reject(new Error('Query timeout')), 8000)
            ),
        ])

        if (!error && installers) {
            installerPages = installers.map((installer) => {
                const path = buildInstallerPath({
                    id: installer.id,
                    name: installer.name,
                    company_name: installer.company_name,
                    location_city: installer.location_city,
                })

                return {
                    url: `${baseUrl}${path}`,
                    lastModified: installer.updated_at ? new Date(installer.updated_at) : new Date(),
                    changeFrequency: 'monthly' as const,
                    priority: 0.6,
                }
            })

            console.log(`✅ Sitemap: Added ${installerPages.length} installer pages`)
        } else {
            console.warn('⚠️ Sitemap: Could not fetch installers from database:', error)
        }
    } catch (error) {
        console.error('❌ Sitemap: Error fetching installers:', error)
        // Continue without installer pages rather than fail completely
    }

    // Combine all pages
    const allPages = [
        ...staticPages,
        ...learnPages,
        ...cityPages,
        ...blogPages,
        ...installerPages,
    ]

    console.log(`📊 Sitemap generated with ${allPages.length} total pages`)
    console.log(`   - ${staticPages.length} static pages`)
    console.log(`   - ${learnPages.length} learn pages`)
    console.log(`   - ${cityPages.length} city pages`)
    console.log(`   - ${blogPages.length} blog pages`)
    console.log(`   - ${installerPages.length} installer pages`)

    return allPages
}
