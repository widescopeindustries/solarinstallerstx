import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createServerClientAnon } from '@/app/lib/supabase/server'
import { buildInstallerPath } from '@/lib/slugify'
import { CheckCircle2, Copy, ExternalLink, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BadgeCopyButton from './BadgeCopyButton'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const supabase = createServerClientAnon()
  const { data: installer } = await supabase
    .from('installers')
    .select('company_name, name, location_city')
    .eq('id', id)
    .single()

  const name = installer?.company_name || installer?.name || 'Solar Installer'
  return {
    title: `${name} — Verified Badge | SolarInstallersTX.com`,
    robots: { index: false, follow: false },
  }
}

export default async function BadgePage({ params }: Props) {
  const { id } = await params
  const supabase = createServerClientAnon()
  const { data: installer, error } = await supabase
    .from('installers')
    .select('id, company_name, name, location_city, location_state')
    .eq('id', id)
    .single()

  if (error || !installer) notFound()

  const displayName = installer.company_name || installer.name
  const listingPath = buildInstallerPath(installer as any)
  const listingUrl = `https://solarinstallerstx.com${listingPath}`
  const badgeUrl = `https://solarinstallerstx.com/api/badge/${id}`

  const embedCode = `<!-- SolarInstallersTX Verified Badge -->
<a href="${listingUrl}" target="_blank" rel="noopener" title="${displayName} — Verified Texas Solar Installer">
  <img src="${badgeUrl}" alt="Verified Texas Solar Installer | SolarInstallersTX.com" width="240" height="80" style="border:none;display:block;">
</a>`

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16 max-w-2xl">

        {/* Success header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Your badge is ready! 🎉</h1>
          <p className="text-muted-foreground">
            <strong>{displayName}</strong> is now a Verified Installer on SolarInstallersTX.com
          </p>
        </div>

        {/* Live badge preview */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-6 text-center">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-5">Your badge — live preview</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={badgeUrl}
            alt={`Verified Texas Solar Installer — ${displayName}`}
            width={240}
            height={80}
            className="mx-auto rounded-lg shadow-md"
          />
          <p className="text-xs text-muted-foreground mt-4">This badge automatically updates with your listing status</p>
        </div>

        {/* Embed code */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-bold">Add it to your website</h2>
              <p className="text-sm text-muted-foreground">Copy this code and paste it anywhere on your site</p>
            </div>
            <BadgeCopyButton code={embedCode} />
          </div>
          <pre className="bg-slate-950 text-green-400 text-xs rounded-lg p-4 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
            {embedCode}
          </pre>
        </div>

        {/* Instructions */}
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-5 mb-8">
          <h3 className="font-semibold text-amber-900 dark:text-amber-300 mb-3">Where to put it</h3>
          <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-400">
            {[
              'Footer of your website (visible on every page)',
              '"About Us" or "Why Choose Us" section',
              'Contact page near your phone number',
              'Any page where homeowners decide to call you',
            ].map(item => (
              <li key={item} className="flex items-start gap-2">
                <ArrowRight className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* View listing + upgrade */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href={listingPath} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Your Listing
            </Link>
          </Button>
          <Button asChild size="lg" className="w-full">
            <Link href="/upgrade-to-premium">
              Get Priority Placement →
            </Link>
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Questions? Call us at{' '}
          <a href="tel:+16829990953" className="text-primary hover:underline">(682) 999-0953</a>
        </p>
      </main>
    </div>
  )
}
