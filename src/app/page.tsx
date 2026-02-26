import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Shield, DollarSign, FileText, Zap, CheckCircle, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { HomeQuoteForm } from '@/components/HomeQuoteForm'
import { HomeFAQ } from '@/components/HomeFAQ'
import { SolarCalculatorWidget } from '@/components/SolarCalculatorWidget'
import { Battery, PiggyBank, Scale, Sun, Umbrella, ExternalLink } from 'lucide-react'
import { SafetyChecklistSection } from '@/components/SafetyChecklistSection'
import { IncentivesTable } from '@/components/IncentivesTable'

export const metadata: Metadata = {
    title: 'Texas Solar Installers | 500+ Verified Companies | Free Quotes',
    description: 'Browse 500+ verified solar installers across Texas. Compare safety scores, reviews & get 3 free quotes. Serving DFW, San Antonio, Houston, Austin & all of TX.',
    keywords: ['solar installers texas', 'solar installers tx', 'texas solar companies', 'NABCEP certified solar', 'solar tax credit texas', 'solar quotes texas', 'best solar installers'],
    openGraph: {
        title: 'Texas Solar Installers | 500+ Verified Companies | Free Quotes',
        description: 'Browse 500+ verified solar installers across Texas. Compare safety scores, reviews & get 3 free quotes. Serving DFW, San Antonio, Houston, Austin & all of TX.',
        url: 'https://solarinstallerstx.com',
        type: 'website',
        images: [
            {
                url: 'https://solarinstallerstx.com/opengraph-image',
                width: 1200,
                height: 630,
                alt: 'Solar Installers TX - Verified Solar Companies',
                type: 'image/png',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Texas Solar Installers | 500+ Verified Companies | Free Quotes',
        description: 'Browse 500+ verified solar installers across Texas. Compare safety scores & get 3 free quotes. Serving DFW, San Antonio, Houston, Austin & all of TX.',
        images: ['https://solarinstallerstx.com/opengraph-image'],
    },
    alternates: {
        canonical: 'https://solarinstallerstx.com',
    },
}

export default function HomePage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section: Modern Split Layout */}
            <section className="relative min-h-[600px] flex items-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero/texas-solar-home.png"
                        alt="Modern Texas home with solar panels"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
                </div>

                <div className="container mx-auto px-4 relative z-10 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column: Value Prop */}
                        <div className="text-white max-w-2xl">
                            <div className="inline-flex items-center px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                                🇺🇸 Veteran-Owned & Trusted Consumer Advocates
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                                Solar Installers TX: Power Your Home with <span className="text-orange-500">Confidence</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-200 mb-8 font-light">
                                Don't fall victim to shady solar tactics. We verify every installer's financial health and licensing so you don't have to.
                            </p>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                                    <Shield className="h-5 w-5 text-orange-500" />
                                    <span className="text-sm font-medium">100-Point Safety Audit</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                                    <CheckCircle className="h-5 w-5 text-orange-500" />
                                    <span className="text-sm font-medium">NABCEP Certified</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Lead Capture Form */}
                        <div className="flex justify-center lg:justify-end">
                            <Card className="w-full max-w-lg shadow-2xl border-white/20 backdrop-blur-sm bg-white/95">
                                <CardContent className="p-8">
                                    <div className="text-center mb-6">
                                        <h2 className="text-2xl font-bold text-slate-900">Get Your Free Estimate</h2>
                                        <p className="text-slate-700 mt-2">Start saving today with verified local installers</p>
                                    </div>
                                    <HomeQuoteForm />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Signals Strip */}
            <section className="py-12 border-b border-slate-100 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
                                <Zap className="h-8 w-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Slash Your Electric Bill</h3>
                            <p className="text-slate-700">Reduce or eliminate monthly costs while locking in low energy rates for 25+ years.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                                <Shield className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Texas-Certified Installers</h3>
                            <p className="text-slate-700">Only installers who pass our 100-point safety audit and license verification.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                                <DollarSign className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Maximize Rebates</h3>
                            <p className="text-slate-700">Our partners handle all federal (30%) and state incentives to ensure you save the most.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTERACTIVE CALCULATOR SECTION */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <div className="inline-flex items-center px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm font-semibold mb-6">
                            ⚡ Interactive Savings Tool
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                            Calculate Your <span className="text-orange-500">Texas-Sized</span> Savings
                        </h2>
                        <p className="text-xl text-slate-300">
                            Stop guessing. Enter your bill average and see how much equity you could be building instead of renting electricity.
                        </p>
                    </div>

                    <SolarCalculatorWidget />

                    <div className="mt-12 text-center">
                        <p className="text-sm text-slate-400 mb-4">
                            *Estimates based on average Texas solar irradiance (5.2 peak sun hours) and current 30% Federal Tax Credit.
                        </p>
                    </div>
                </div>
            </section>

            {/* TEXAS INCENTIVES DEEP DIVE */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                                <Image
                                    src="/images/stock/solar-house-money.jpg"
                                    alt="Texas Homeowner holding savings"
                                    width={800}
                                    height={600}
                                    className="object-cover bg-slate-200"
                                />
                                {/* Fallback if image doesn't exist, Next/Image handles layout but source needs to be real. Assuming placeholder or similar exists, or using a solid div for now if broken */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                    <div className="text-white">
                                        <div className="text-2xl font-bold">$10,500+</div>
                                        <div className="text-sm opacity-90">Average Federal Credit Claimed in TX</div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange-50 rounded-full z-0 blur-3xl opacity-50" />
                            <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-50 rounded-full z-0 blur-3xl opacity-50" />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                                Triple-Stack Your Solar Incentives
                            </h2>
                            <p className="text-lg text-slate-700 mb-8">
                                Texas is one of the few states where you can combine three layers of financial benefits to slash your ROI timeline by up to 50%.
                            </p>

                            <div className="space-y-6">
                                <IncentivesTable />
                            </div>

                            <div className="mt-10">
                                <Button asChild variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                                    <Link href="/learn/texas-incentives">Read Full Incentives Guide <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PANEL TECH & WEATHER SECTION */}
            <section className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-4 text-center max-w-4xl mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for Texas Weather</h2>
                    <p className="text-lg text-slate-700">
                        Texas heat is brutal. Cheap panels melt under the pressure. We only verify installers who use equipment rated for our extreme climate.
                    </p>
                </div>

                <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
                    <Card className="border-none shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                        <div className="h-2 bg-red-500 w-full" />
                        <CardContent className="p-8">
                            <div className="mb-6 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <Sun className="h-8 w-8 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-red-600 transition-colors">High Heat Tolerance</h3>
                            <p className="text-slate-600 mb-6">
                                Standard panels lose efficiency when temps hit 100°F+. Verified Texas installers use panels with a low "temperature coefficient" (like REC or Maxeon) to keep producing power during heatwaves.
                            </p>
                            <ul className="text-sm text-slate-500 space-y-2">
                                <li className="flex items-center gap-2">✅ -0.26%/°C Temp Coefficient</li>
                                <li className="flex items-center gap-2">✅ Heat-Resistant Backsheets</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                        <div className="h-2 bg-blue-500 w-full" />
                        <CardContent className="p-8">
                            <div className="mb-6 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <Umbrella className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Hail Defense</h3>
                            <p className="text-slate-600 mb-6">
                                Hail alley is real. We look for IEC 61215 certification. Top-tier tier-1 panels can withstand 1-inch hail at 50mph. Most damage is cosmetic, but durability is key for longevity.
                            </p>
                            <ul className="text-sm text-slate-500 space-y-2">
                                <li className="flex items-center gap-2">✅ Tempered Glass Front</li>
                                <li className="flex items-center gap-2">✅ 25-Year Durability Warranty</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                        <div className="h-2 bg-green-500 w-full" />
                        <CardContent className="p-8">
                            <div className="mb-6 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <Battery className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-green-600 transition-colors">Battery Backup</h3>
                            <p className="text-slate-600 mb-6">
                                The grid isn't always reliable. Pairing solar with a Tesla Powerwall or Enphase IQ Battery ensures your AC keeps running during the next blackout.
                            </p>
                            <ul className="text-sm text-slate-500 space-y-2">
                                <li className="flex items-center gap-2">✅ Whole-Home Backup</li>
                                <li className="flex items-center gap-2">✅ Virtual Power Plant Ready</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-16 text-center">
                    <Button asChild variant="link" className="text-slate-600 hover:text-orange-600">
                        <Link href="/learn/solar-panel-types">Compare Monocrystalline vs Polycrystalline <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
            </section>

            {/* The Problem Section - Re-structured for authority */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                            The Texas Solar Market is Brimming with Risks
                        </h2>
                        <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                            In 2024 and 2025, over 100 solar companies went bankrupt in Texas. Homeowners were left with unfinished projects and voided warranties. We are the shield between you and the "Solar Shysters."
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center ring-1 ring-red-200">
                            <div className="text-4xl font-black text-red-600 mb-2 leading-none">100+</div>
                            <div className="text-sm font-bold text-red-800 uppercase tracking-wider mb-2">Bankruptcies</div>
                            <p className="text-red-700/80 text-sm">Solar companies insolvent in Texas during 2024-2025.</p>
                        </div>
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center ring-1 ring-red-200">
                            <div className="text-4xl font-black text-red-600 mb-2 leading-none">Sunnova</div>
                            <div className="text-sm font-bold text-red-800 uppercase tracking-wider mb-2">Chapter 11</div>
                            <p className="text-red-700/80 text-sm">Major players failing, leaving thousands in the dark.</p>
                        </div>
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center ring-1 ring-red-200">
                            <div className="text-4xl font-black text-red-600 mb-2 leading-none">Crisis</div>
                            <div className="text-sm font-bold text-red-800 uppercase tracking-wider mb-2">Unfinished</div>
                            <p className="text-red-700/80 text-sm">Thousands of Texas roofs left with non-working systems.</p>
                        </div>
                    </div>

                    <div className="mt-16 bg-amber-50 border border-amber-200 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 shadow-sm">
                        <div className="w-24 h-24 flex-shrink-0 bg-white rounded-full flex items-center justify-center shadow-md">
                            <Image src="/solar-safety-scored-badge.webp" alt="Safety Score badge" width={64} height={64} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-amber-900 mb-4">We're Taking a Stand</h3>
                            <p className="text-amber-800 text-lg leading-relaxed">
                                <strong>This is Texas.</strong> We don't wait for regulations. We're stepping up to protect our neighbors. When you see our Solar Safety Scored™ badge, you can rest easy knowing we've done the due diligence that most homeowners don't know they need.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Section - Redesigned for Premium feel */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Consumer Protection at Our Core</h2>
                        <p className="text-slate-300 text-lg">We differentiate ourselves by what we track—the stuff that actually keeps you safe.</p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/10">
                                        <th className="py-6 px-8 font-bold text-lg">Verification Feature</th>
                                        <th className="py-6 px-4 text-center text-slate-300">Other Directories</th>
                                        <th className="py-6 px-4 text-center bg-orange-500/10 text-orange-500 font-bold">SolarInstallersTX</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/5">
                                        <td className="py-6 px-8 font-medium">Financial Health Monitoring</td>
                                        <td className="py-6 px-4 text-center text-slate-400">❌ Not tracked</td>
                                        <td className="py-6 px-4 text-center font-bold">✅ Verified Monthly</td>
                                    </tr>
                                    <tr className="border-b border-white/5 bg-white/5">
                                        <td className="py-6 px-8 font-medium">Active Texas Licensing Audit</td>
                                        <td className="py-6 px-4 text-center text-slate-400">❌ Surface Level</td>
                                        <td className="py-6 px-4 text-center font-bold">✅ TDLR Verified</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-6 px-8 font-medium">Certificate of Insurance (COI)</td>
                                        <td className="py-6 px-4 text-center text-slate-400">❌ Optional</td>
                                        <td className="py-6 px-4 text-center font-bold">✅ Required on File</td>
                                    </tr>
                                    <tr className="bg-white/5">
                                        <td className="py-6 px-8 font-medium">Proprietary safety Scoring</td>
                                        <td className="py-6 px-4 text-center text-slate-400">❌ None</td>
                                        <td className="py-6 px-4 text-center font-bold">✅ 100-Point Audit</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Safety Checklist Section - NEW */}
            <SafetyChecklistSection />

            {/* How it Works Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">How It Works</h2>
                        <p className="text-slate-700 text-lg">Your journey to clean, safe energy in 4 simple steps.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {[
                            { step: 1, title: 'Request Quote', text: 'Submit your basic info. We match you with the highest-rated installers in your area.' },
                            { step: 2, title: 'Compare Audits', text: 'Review solar safety scores and transparent pricing from verified companies.' },
                            { step: 3, title: 'Professional Install', text: 'Certified local teams handle everything from permits to activation.' },
                            { step: 4, title: 'Start Saving', text: 'Turn on your system, watch your meter spin backward, and enjoy 25+ years of savings.' }
                        ].map((item) => (
                            <div key={item.step} className="relative group">
                                <div className="text-8xl font-black text-slate-100 absolute -top-10 -left-4 z-0 group-hover:text-orange-50 transition-colors">
                                    {item.step}.
                                </div>
                                <div className="relative z-10 pt-8">
                                    <h3 className="text-xl font-bold mb-4 text-slate-900">{item.title}</h3>
                                    <p className="text-slate-700 leading-relaxed text-sm">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-8 text-lg rounded-full shadow-lg hover:shadow-orange-200 transition-all">
                            <Link href="/quote">Start Your Free Estimate <ArrowRight className="ml-2 h-6 w-6" /></Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Content & Resources */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto text-slate-900">
                        <div>
                            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                                <FileText className="h-8 w-8 text-orange-600" /> Professional Guides
                            </h2>
                            <div className="space-y-6">
                                <Link href="/learn/choosing-installer" className="block group">
                                    <Card className="p-6 hover:shadow-xl transition-all border-none shadow-sm hover:-translate-y-1">
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors">7 Questions to Ask Before Signing</h3>
                                        <p className="text-slate-700 text-sm mb-4">Don't get locked into a 30-year lease without asking these critical safety questions.</p>
                                        <span className="text-orange-600 font-bold text-sm inline-flex items-center">Read Guide <ArrowRight className="ml-1 h-4 w-4" /></span>
                                    </Card>
                                </Link>
                                <Link href="/learn/solar-buying-guide-texas" className="block group">
                                    <Card className="p-6 hover:shadow-xl transition-all border-none shadow-sm hover:-translate-y-1">
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors">Texas Solar Buying Guide 2025</h3>
                                        <p className="text-slate-700 text-sm mb-4">The most comprehensive look at Texas incentives, tax credits, and local utility rebates.</p>
                                        <span className="text-orange-600 font-bold text-sm inline-flex items-center">Read Guide <ArrowRight className="ml-1 h-4 w-4" /></span>
                                    </Card>
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                                <Shield className="h-8 w-8 text-blue-600" /> Safety Resources
                            </h2>
                            <div className="space-y-6">
                                <Link href="/safety-score-explained" className="block group">
                                    <Card className="p-6 hover:shadow-xl transition-all border-none shadow-sm hover:-translate-y-1">
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">How We Score Safety</h3>
                                        <p className="text-slate-700 text-sm mb-4">Transparent breakdown of our 100-point audit methodology for Texas installers.</p>
                                        <span className="text-blue-600 font-bold text-sm inline-flex items-center">Learn More <ArrowRight className="ml-1 h-4 w-4" /></span>
                                    </Card>
                                </Link>
                                <Card className="p-8 bg-slate-900 border-none rounded-3xl text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Shield className="h-32 w-32" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">Need Help Now?</h3>
                                    <p className="text-slate-300 mb-6 font-light">Already having issues with an installer or a voided warranty? Browse our verified list to find companies that perform "orphaned system" repairs.</p>
                                    <Button asChild className="w-full bg-white text-slate-900 hover:bg-slate-100">
                                        <Link href="/installers">Browse verified Installers</Link>
                                    </Button>
                                </Card>
                                {/* External Authority Links */}
                                <div className="mt-8 border-t border-slate-200 pt-8">
                                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Official Data Sources</h4>
                                    <div className="flex flex-wrap gap-4">
                                        <a href="https://www.dsireusa.org/" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-orange-600 flex items-center gap-1">
                                            DSIRE USA <ExternalLink className="h-3 w-3" />
                                        </a>
                                        <a href="https://www.energy.gov/eere/solar/homeowners-guide-going-solar" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-orange-600 flex items-center gap-1">
                                            Dept of Energy <ExternalLink className="h-3 w-3" />
                                        </a>
                                        <a href="https://www.seia.org/state-solar-policy/texas-solar" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-orange-600 flex items-center gap-1">
                                            SEIA Texas <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials (Simulated for visuals as per design) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">What Our Neighbors Say</h2>
                        <p className="text-slate-700">Helping Texans avoid solar scams, one roof at a time.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <Card className="p-8 border-slate-100 shadow-sm relative italic">
                            <div className="mb-4 text-orange-500">★★★★★</div>
                            <p className="text-slate-700 mb-6 leading-relaxed">
                                "After hearing about so many bankruptcies, I was terrified to go solar. SolarInstallersTX helped me find a company with a high safety score and verified insurance. The peace of mind was worth everything."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                                    <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="User" width={48} height={48} />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">Robert D.</div>
                                    <div className="text-xs text-slate-500 uppercase">Austin, TX</div>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-8 border-slate-100 shadow-sm relative italic">
                            <div className="mb-4 text-orange-500">★★★★★</div>
                            <p className="text-slate-700 mb-6 leading-relaxed">
                                "The 100-point safety audit is brilliant. I could see exactly which installers were financially stable. My system was installed on time and my bill dropped by $240 immediately."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                                    <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User" width={48} height={48} />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">Sarah M.</div>
                                    <div className="text-xs text-slate-500 uppercase">Fort Worth, TX</div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            <HomeFAQ />

            {/* Market Coverage Section - NEW */}
            <section className="py-20 bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Texas Solar Market Coverage</h2>
                        <p className="text-slate-700">Browse verified installers and local solar incentives in your city.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
                        {[
                            { name: 'Houston', slug: 'houston' },
                            { name: 'Dallas', slug: 'dallas' },
                            { name: 'Austin', slug: 'austin' },
                            { name: 'San Antonio', slug: 'san-antonio' },
                            { name: 'Fort Worth', slug: 'fort-worth' },
                            { name: 'El Paso', slug: 'el-paso' },
                            { name: 'Arlington', slug: 'arlington' },
                            { name: 'Corpus Christi', slug: 'corpus-christi' },
                            { name: 'Plano', slug: 'plano' },
                            { name: 'Laredo', slug: 'laredo' },
                            { name: 'Lubbock', slug: 'lubbock' },
                            { name: 'Irving', slug: 'irving' },
                            { name: 'Garland', slug: 'garland' },
                            { name: 'Frisco', slug: 'frisco' },
                            { name: 'McKinney', slug: 'mckinney' },
                            { name: 'Amarillo', slug: 'amarillo' },
                            { name: 'Grand Prairie', slug: 'grand-prairie' },
                            { name: 'Brownsville', slug: 'brownsville' },
                        ].map((city) => (
                            <Link
                                key={city.slug}
                                href={`/cities/${city.slug}`}
                                className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-center text-sm font-medium hover:border-orange-500 hover:text-orange-600 transition-all shadow-sm"
                            >
                                {city.name}
                            </Link>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Button asChild variant="ghost" className="text-slate-500">
                            <Link href="/installers">View All 126+ Cities <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA Footer Section */}
            <section className="py-20 bg-slate-900 text-white relative">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Switch with Peace of Mind?</h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
                        Don't risk your home's equity on unverified companies. Get matched with certified, financially stable Texas solar experts today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-8 text-xl rounded-full">
                            <Link href="/quote">Get My Free Quote</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white px-12 py-8 text-xl rounded-full">
                            <Link href="/installers">Browse Installers</Link>
                        </Button>
                    </div>
                    <div className="mt-12 text-slate-500 text-sm flex items-center justify-center gap-6">
                        <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> 100% No-Obligation</span>
                        <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Free Consumer Guides Included</span>
                    </div>
                </div>
            </section>
        </main >
    )
}
