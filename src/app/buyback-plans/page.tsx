import { Metadata } from 'next'
import { BuybackComparisonTable } from '@/components/BuybackComparisonTable'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Zap, Battery, AlertTriangle, Check } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Best Solar Buyback Plans Texas 2026 | 1:1 Net Metering Guide',
    description: 'Compare the best solar buyback plans in Texas for 2026. Find 1:1 net metering, avoided cost rates, and the best electricity plans for solar owners in Oncor and CenterPoint areas.',
    keywords: ['solar buyback plans Texas', 'net metering Texas 2026', 'solar electricity plans', 'Almika Solar', 'Gexa Energy solar', 'Octopus Energy buyback'],
}

export default function BuybackPlansPage() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-6xl">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                    Best Solar Buyback Plans in Texas (2026)
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Stop giving your power away for free. We've tracked 50+ electricity plans to find the ones that actually pay you for your excess solar energy.
                </p>
            </div>

            {/* Critical Warning / Context */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-12 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-4">
                    <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold text-amber-800 mb-2">2026 Market Update: The "Free Nights" Trap</h3>
                        <p className="text-amber-700">
                            Many Retail Electric Providers (REPs) have heavily modified their solar plans this year.
                            <strong> Warning:</strong> Many "Free Nights" plans now offer <em>zero</em> buyback credits for solar exports.
                            If you don't have a battery, avoiding these plans is critical.
                        </p>
                    </div>
                </div>
            </div>

            {/* The Comparison Table */}
            <section className="mb-16">
                <BuybackComparisonTable />
            </section>

            {/* Educational Content */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div>
                    <h2 className="text-3xl font-bold mb-6">How to Choose the Right Plan</h2>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <Zap className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">If You Have Solar Only (No Battery)</h3>
                                <p className="text-muted-foreground">
                                    You need a <strong>1:1 Net Metering</strong> style plan (like Almika or Chariot). You export most of your power during the day. If the plan pays you "wholesale rate" (3¢) for exports but charges you retail (14¢) for imports, you will lose money.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                <Battery className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">If You Have a Battery (Powerwall, etc.)</h3>
                                <p className="text-muted-foreground">
                                    You can take advantage of <strong>Real-Time / Wholesale</strong> plans (like Octopus or Gexa). Store your solar power during the day, and only export when prices spike on the grid (sometimes up to $5.00/kWh!).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-muted/30 p-8 rounded-xl border border-muted">
                    <h3 className="text-2xl font-bold mb-4">Did You Know?</h3>
                    <p className="mb-6 text-muted-foreground">
                        In Texas, you have the power to switch electricity providers, but choosing the wrong one can cost you hundreds of dollars a year.
                    </p>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-green-600" />
                            <span>We verify these rates monthly</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-green-600" />
                            <span>We filter out "gimmick" plans</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-green-600" />
                            <span>Our network includes 500+ installers</span>
                        </li>
                    </ul>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h4 className="font-bold mb-2">Need an Installer?</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Don't have solar yet? Get quotes from installers who understand these buyback plans.
                        </p>
                        <Button asChild className="w-full">
                            <Link href="/quote">Get 3 Free Quotes <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}
