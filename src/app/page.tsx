import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Shield, DollarSign, FileText, Zap, CheckCircle, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { HomeQuoteForm } from '@/components/HomeQuoteForm'
import { HomeFAQ } from '@/components/HomeFAQ'

export const metadata: Metadata = {
    title: 'Solar Installers TX | NABCEP Certified Solar Companies in Texas',
    description: 'Slash your TX electric bill by 90%. Connect with NABCEP-certified installers, compare free quotes & maximize savings with the 30% tax credit.',
    keywords: ['solar installers texas', 'solar panels texas', 'texas solar companies', 'NABCEP certified solar', 'solar tax credit texas', 'solar quotes texas', 'best solar installers'],
    openGraph: {
        title: 'Solar Installers TX | Find Verified Solar Companies in Texas',
        description: 'Slash your TX electric bill by 90%. Connect with NABCEP-certified installers, compare free quotes & maximize savings with the 30% tax credit.',
        url: 'https://solarinstallerstx.com',
        type: 'website',
        images: [
            {
                url: 'https://solarinstallerstx.com/opengraph-image',
                width: 1200,
                height: 630,
                alt: 'Solar Installers TX - Find NABCEP Certified Solar Companies',
                type: 'image/png',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Solar Installers TX | NABCEP Certified Solar Companies',
        description: 'Slash your Texas electric bill by up to 90% with top solar installers. Get free quotes today.',
        images: ['https://solarinstallerstx.com/opengraph-image'],
    },
    alternates: {
        canonical: 'https://solarinstallerstx.com',
    },
}

export default function HomePage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section 1: The Problem & Our Mission */}
            <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/5 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Veteran-Owned Badge */}
                        <div className="mb-6 flex justify-center">
                            <span className="inline-flex items-center px-4 py-2 border border-primary/40 rounded-full text-sm">
                                🇺🇸 Veteran-Owned & Operated
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Don't Become a Solar Victim
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
                            The Texas solar industry is broken. Shady sales tactics. Financial insolvency. Voided warranties on $25,000 systems. Homeowners are right to be scared. We're fixing that.
                        </p>

                        {/* Crisis Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
                            <div className="bg-card border border-destructive/20 rounded-lg p-4">
                                <div className="text-2xl font-bold text-destructive mb-1">100+</div>
                                <div className="text-sm text-muted-foreground">Solar Bankruptcies in 2024-2025</div>
                            </div>
                            <div className="bg-card border border-destructive/20 rounded-lg p-4">
                                <div className="text-2xl font-bold text-destructive mb-1">Sunnova</div>
                                <div className="text-sm text-muted-foreground">Chapter 11 - June 2025</div>
                            </div>
                            <div className="bg-card border border-destructive/20 rounded-lg p-4 col-span-2 md:col-span-1">
                                <div className="text-2xl font-bold text-destructive mb-1">Thousands</div>
                                <div className="text-sm text-muted-foreground">Unfinished Projects in Texas</div>
                            </div>
                        </div>

                        <div className="bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500 rounded-lg p-6 mb-12 max-w-3xl mx-auto">
                            <p className="text-amber-900 dark:text-amber-100 text-lg">
                                <strong>This is Texas. Regulations are coming. But we're not waiting.</strong> We're stepping up before the law and taking a stand against shady solar. When you see our badge, you know due diligence has been done.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hero Section 2: Our Solution (Safety Scoring) */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Solar Safety Scored™</h2>
                            <p className="text-lg text-muted-foreground">
                                Our proprietary vetting system protects you from the same mistakes thousands of Texans have made.
                            </p>
                        </div>

                        {/* How It Works - 3 Step Process */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <Card className="text-center p-8">
                                <CardContent className="space-y-4">
                                    <div className="text-4xl font-bold text-primary">1</div>
                                    <Shield className="h-12 w-12 text-primary mx-auto" />
                                    <h3 className="text-xl font-bold">Verified Insurance</h3>
                                    <p className="text-muted-foreground text-sm">
                                        We require current Certificate of Insurance on file. This proves they can cover on-site accidents and protect you.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="text-center p-8">
                                <CardContent className="space-y-4">
                                    <div className="text-4xl font-bold text-primary">2</div>
                                    <CheckCircle className="h-12 w-12 text-primary mx-auto" />
                                    <h3 className="text-xl font-bold">Active Licensing</h3>
                                    <p className="text-muted-foreground text-sm">
                                        We confirm active Texas licenses (TDLR electrical, solar contractor). No shortcuts. No under-the-table work.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="text-center p-8">
                                <CardContent className="space-y-4">
                                    <div className="text-4xl font-bold text-primary">3</div>
                                    <Zap className="h-12 w-12 text-primary mx-auto" />
                                    <h3 className="text-xl font-bold">Financial Health</h3>
                                    <p className="text-muted-foreground text-sm">
                                        We track financial stability and bankruptcy risk. You need to know they'll be around in 25 years to honor warranties.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Differentiation Section */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Not Another EnergySage or SolarReviews Clone</h2>
                            <p className="text-xl text-muted-foreground">
                                We actually verify financial stability. We track bankruptcy risk. We require insurance on file.
                            </p>
                        </div>

                        <Card className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b-2 border-border bg-muted">
                                                <th className="text-left py-4 px-4 font-bold">Feature</th>
                                                <th className="text-center py-4 px-2 font-bold">Other Directories</th>
                                                <th className="text-center py-4 px-2 font-bold text-primary">SolarInstallersTX</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-border">
                                                <td className="py-4 px-4">Financial Stability Verification</td>
                                                <td className="text-center py-4 px-2 text-destructive">❌ Not tracked</td>
                                                <td className="text-center py-4 px-2 text-primary font-semibold">✅ Yes - Tracked Monthly</td>
                                            </tr>
                                            <tr className="border-b border-border bg-muted/30">
                                                <td className="py-4 px-4">Bankruptcy Protection</td>
                                                <td className="text-center py-4 px-2 text-destructive">❌ No</td>
                                                <td className="text-center py-4 px-2 text-primary font-semibold">✅ Health Monitoring</td>
                                            </tr>
                                            <tr className="border-b border-border">
                                                <td className="py-4 px-4">Insurance Verification</td>
                                                <td className="text-center py-4 px-2 text-destructive">❌ Not Required</td>
                                                <td className="text-center py-4 px-2 text-primary font-semibold">✅ Required & Verified</td>
                                            </tr>
                                            <tr className="bg-muted/30">
                                                <td className="py-4 px-4">Proprietary Safety Scoring</td>
                                                <td className="text-center py-4 px-2 text-destructive">❌ No</td>
                                                <td className="text-center py-4 px-2 text-primary font-semibold">✅ 100-Point System</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Transition Section: Now That You Trust Us */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Now that you know what matters to us...</h2>
                        <p className="text-lg text-muted-foreground mb-12">
                            ...and that we're not just another national list, here's what we offer:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 flex flex-col">
                                <CardContent className="space-y-4 flex-1 flex flex-col p-6">
                                    <Shield className="h-12 w-12 text-primary mx-auto" />
                                    <h3 className="text-xl font-bold">Browse Our Vetted Installers</h3>
                                    <p className="text-muted-foreground flex-1">
                                        See the installers we've verified. Compare prices, reviews, and certifications. All with the Solar Safety Scored badge.
                                    </p>
                                    <Button asChild size="lg" className="w-full mt-auto">
                                        <Link href="/installers">Find an Installer</Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 flex flex-col">
                                <CardContent className="space-y-4 flex-1 flex flex-col p-6">
                                    <FileText className="h-12 w-12 text-primary mx-auto" />
                                    <h3 className="text-xl font-bold">Learn About Solar</h3>
                                    <p className="text-muted-foreground flex-1">
                                        Not sure about solar? Get educated. Texas incentives. Cost breakdown. What you need to know before buying.
                                    </p>
                                    <Button asChild size="lg" className="w-full mt-auto">
                                        <Link href="/learn">Learn More</Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 flex flex-col">
                                <CardContent className="space-y-4 flex-1 flex flex-col p-6">
                                    <DollarSign className="h-12 w-12 text-primary mx-auto" />
                                    <h3 className="text-xl font-bold">Get a Free Quote</h3>
                                    <p className="text-muted-foreground flex-1">
                                        Ready to move forward? Tell us your location and budget. We'll connect you with certified installers.
                                    </p>
                                    <Button asChild size="lg" className="w-full mt-auto">
                                        <Link href="/quote">Request Quote</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections - Guides & Articles */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Latest Solar Guides */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Solar Guides for Texas Homeowners</h2>
                            <div className="space-y-4">
                                <Link href="/learn" className="block group">
                                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                                        <div className="grid grid-cols-3">
                                            <div className="col-span-1 bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center">
                                                <Zap className="h-12 w-12 text-green-600" />
                                            </div>
                                            <CardContent className="col-span-2 p-4">
                                                <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
                                                    How Texas Electric Bills Compare to Other States
                                                </h3>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    Discover why Texas homeowners pay more for electricity and how solar can cut your bills by up to 90%.
                                                </p>
                                                <span className="text-sm text-primary font-semibold">Read the Guide →</span>
                                            </CardContent>
                                        </div>
                                    </Card>
                                </Link>

                                <Link href="/learn/choosing-installer" className="block group">
                                    <Card className="p-4 hover:shadow-lg transition-shadow">
                                        <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
                                            How to Choose a Solar Installer in Texas
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Learn the 7 critical questions to ask before signing any solar contract. Protect yourself from scams.
                                        </p>
                                        <span className="text-sm text-primary font-semibold">Read More →</span>
                                    </Card>
                                </Link>

                                <Link href="/learn/solar-buying-guide-texas" className="block group">
                                    <Card className="p-4 hover:shadow-lg transition-shadow">
                                        <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
                                            Complete Texas Solar Buying Guide 2025
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Everything you need to know about solar costs, incentives, and savings in Texas.
                                        </p>
                                        <span className="text-sm text-primary font-semibold">Read More →</span>
                                    </Card>
                                </Link>
                            </div>
                        </div>

                        {/* Popular Articles */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Popular Articles</h2>
                            <div className="space-y-4">
                                <Link href="/blog" className="block group">
                                    <Card className="p-4 hover:shadow-lg transition-shadow">
                                        <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
                                            Why Now is the Best Time for Solar in Texas
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            With the 30% federal tax credit and rising electricity rates, 2025 is an ideal year to go solar.
                                        </p>
                                        <span className="text-sm text-primary font-semibold">Read More →</span>
                                    </Card>
                                </Link>

                                <Link href="/safety-score-explained" className="block group">
                                    <Card className="p-4 hover:shadow-lg transition-shadow">
                                        <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
                                            Understanding the Solar Safety Score System
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            How we verify installer financial health, licensing, and track 16 data points to protect you.
                                        </p>
                                        <span className="text-sm text-primary font-semibold">Read More →</span>
                                    </Card>
                                </Link>

                                <Link href="/faq" className="block group">
                                    <Card className="p-4 hover:shadow-lg transition-shadow">
                                        <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
                                            Solar FAQ: Your Questions Answered
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Answers to the most common questions about going solar in Texas.
                                        </p>
                                        <span className="text-sm text-primary font-semibold">Read More →</span>
                                    </Card>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <HomeFAQ />

            {/* Newsletter Section */}
            <section className="py-16 bg-[#1e3a5f] text-white">
                <div className="container mx-auto px-4">
                    <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md border-white/20">
                        <CardContent className="p-8 text-center">
                            <h2 className="text-3xl font-bold mb-4">Get Texas Solar News</h2>
                            <p className="text-blue-100 mb-6">
                                Insights into Texas solar news, tips, and guides directly to your inbox.
                            </p>
                            <div className="flex gap-2 max-w-md mx-auto">
                                <Input
                                    placeholder="Email Address"
                                    className="bg-white/90 text-gray-900"
                                />
                                <Button className="bg-orange-600 hover:bg-orange-700 px-6">
                                    Subscribe
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </main>
    )
}
