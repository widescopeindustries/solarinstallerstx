import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Shield, DollarSign, FileText, Zap, CheckCircle, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export const metadata: Metadata = {
    title: 'Solar Installers TX | NABCEP Certified Solar Companies in Texas',
    description: 'Slash your Texas electric bill by up to 90% with top solar installers. Connect with NABCEP-certified professionals. Get free quotes and maximize savings with 30% federal tax credit.',
    keywords: ['solar installers texas', 'solar panels texas', 'texas solar companies', 'NABCEP certified solar', 'solar tax credit texas', 'solar quotes texas', 'best solar installers'],
    openGraph: {
        title: 'Solar Installers TX | Find Verified Solar Companies in Texas',
        description: 'Slash your Texas electric bill by up to 90% with top solar installers. Connect with NABCEP-certified professionals and get free quotes.',
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
        <div className="min-h-screen bg-white">
            {/* Hero Section - Navy Blue with House Image */}
            <section className="relative bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8a] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')]"></div>
                </div>

                <div className="container mx-auto px-4 py-16 relative">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Copy */}
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                Slash Your Texas Electric Bill by up to 90% with Top Solar Installers
                            </h1>

                            <p className="text-xl text-blue-100">
                                Connect with NABCEP-certified professionals for free quotes and maximum savings.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-6 text-lg"
                                >
                                    <Link href="/quote">
                                        Get Free Solar Quotes Now
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>

                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold px-8 py-6 text-lg backdrop-blur-sm"
                                >
                                    <Link href="/quote">Calculate Your Savings</Link>
                                </Button>
                            </div>

                            <p className="text-sm text-blue-200">
                                Trusted for a great generation & conversion
                            </p>
                        </div>

                        {/* Right Column - House Image */}
                        <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
                            <Image
                                src="/images/hero-home.png"
                                alt="Modern Texas home with solar panels"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10"></div>
                        </div>
                    </div>

                    {/* Trust Badges Row */}
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                        <div className="flex items-center gap-2 justify-center">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                            <span className="font-semibold">NABCEP Certified</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                            <DollarSign className="h-5 w-5 text-green-400" />
                            <span className="font-semibold">26% Tax Credit</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                            <FileText className="h-5 w-5 text-green-400" />
                            <span className="font-semibold">Free Quotes</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                            <Shield className="h-5 w-5 text-green-400" />
                            <span className="font-semibold">Texas Licensed</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Form Section - Large Card with Image */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <Card className="max-w-6xl mx-auto overflow-hidden shadow-xl">
                        <div className="grid md:grid-cols-2">
                            {/* Left - Image */}
                            <div className="relative h-64 md:h-auto">
                                <Image
                                    src="/images/solar-panels.png"
                                    alt="Solar panel array at sunset"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Right - Form */}
                            <CardContent className="p-8">
                                <h2 className="text-3xl font-bold mb-2">Get Your Free, No-Obligation Solar Quote</h2>
                                <p className="text-gray-600 mb-6">Start saving today with verified installers</p>

                                <form className="space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">ZIP Code</label>
                                            <Input placeholder="ZIP Code" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Monthly Electric Bill</label>
                                            <Input placeholder="$1000" type="number" />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">First Name</label>
                                            <Input placeholder="First Name" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Last Name</label>
                                            <Input placeholder="Last Name" />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Email Address</label>
                                            <Input placeholder="Email Address" type="email" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                                            <Input placeholder="Phone Number" type="tel" />
                                        </div>
                                    </div>

                                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 text-lg">
                                        Get Free Quote
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </form>
                            </CardContent>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Benefits Section - 3 Cards */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">NABCEP Certified Experts</h3>
                            <p className="text-gray-600">
                                NABCEP Certified Experts and professional for free solar quotes.
                            </p>
                        </Card>

                        <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <DollarSign className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Maximize Your Savings (Avg. 26%)</h3>
                            <p className="text-gray-600">
                                Keep your addition to maximize your savings also average (Avg. 26%).
                            </p>
                        </Card>

                        <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="h-8 w-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Quick & Easy Installation</h3>
                            <p className="text-gray-600">
                                Easy with to managed a Installers and Quick & Easy Installation.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Content Sections - Guides & Articles */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Latest Solar Guides */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Latest Solar Guides</h2>
                            <div className="space-y-4">
                                <Link href="/learn" className="block group">
                                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                                        <div className="grid grid-cols-3">
                                            <div className="col-span-1 bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center">
                                                <Zap className="h-12 w-12 text-green-600" />
                                            </div>
                                            <CardContent className="col-span-2 p-4">
                                                <h3 className="font-bold mb-1 group-hover:text-orange-600 transition-colors">
                                                    What Your Texas Electric Bill Would be in Other States?
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    SolarInstallersT TX invents a meticulous texas electric bill vs...
                                                </p>
                                                <span className="text-sm text-orange-600 font-semibold">Read More →</span>
                                            </CardContent>
                                        </div>
                                    </Card>
                                </Link>

                                <Link href="/learn/choosing-installer" className="block group">
                                    <Card className="p-4 hover:shadow-lg transition-shadow">
                                        <h3 className="font-bold mb-1 group-hover:text-orange-600 transition-colors">
                                            How to Hire Solar Installers
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            SolarInstallersT TX taking solar and control to reduces to your CREDS...
                                        </p>
                                        <span className="text-sm text-orange-600 font-semibold">Read More →</span>
                                    </Card>
                                </Link>

                                <Link href="/learn/solar-buying-guide-texas" className="block group">
                                    <Card className="p-4 hover:shadow-lg transition-shadow">
                                        <h3 className="font-bold mb-1 group-hover:text-orange-600 transition-colors">
                                            What is Free Solar Installation
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            SolarInstallersT TX is average of important solar installation...
                                        </p>
                                        <span className="text-sm text-orange-600 font-semibold">Read More →</span>
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
                                        <h3 className="font-bold mb-1 group-hover:text-orange-600 transition-colors">
                                            Why is Slash Your Texas Electric Bill by Solar Today?
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            SolarInstallersT TX is extremely well-structured with clearly-defined...
                                        </p>
                                        <span className="text-sm text-orange-600 font-semibold">Read More →</span>
                                    </Card>
                                </Link>

                                <Link href="/safety-score-explained" className="block group">
                                    <Card className="p-4 hover:shadow-lg transition-shadow">
                                        <h3 className="font-bold mb-1 group-hover:text-orange-600 transition-colors">
                                            The Best Lead-to-calculator to from Solar Installers?
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            SolarInstallersT TX been to an direct and verified and to grow...
                                        </p>
                                        <span className="text-sm text-orange-600 font-semibold">Read More →</span>
                                    </Card>
                                </Link>

                                <Link href="/faq" className="block group">
                                    <Card className="p-4 hover:shadow-lg transition-shadow">
                                        <h3 className="font-bold mb-1 group-hover:text-orange-600 transition-colors">
                                            How to Strategy Your Haves marever on Solar Future?
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            SolarInstallersT TX is collector in system of you solar at a their plans...
                                        </p>
                                        <span className="text-sm text-orange-600 font-semibold">Read More →</span>
                                    </Card>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
                                <Button className="bg-orange-500 hover:bg-orange-600 px-6">
                                    Subscribe
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}
