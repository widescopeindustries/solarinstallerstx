import Link from 'next/link'
import Image from 'next/image'

export function NewFooter() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Column 1: Company */}
                    <div>
                        <div className="inline-block bg-white rounded-lg px-2 py-1 mb-4">
                            <Image
                                src="/logo.png"
                                alt="SolarInstallersTX"
                                width={130}
                                height={36}
                                className="h-9 w-auto object-contain"
                            />
                        </div>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="hover:text-orange-500 transition-colors text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-orange-500 transition-colors text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-orange-500 transition-colors text-sm">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: For Homeowners */}
                    <div>
                        <h3 className="font-bold text-white mb-4">For Homeowners</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/installers" className="hover:text-orange-500 transition-colors text-sm">
                                    Find Installers
                                </Link>
                            </li>
                            <li>
                                <Link href="/quote" className="hover:text-orange-500 transition-colors text-sm">
                                    Get Free Quotes
                                </Link>
                            </li>
                            <li>
                                <Link href="/safety-score-explained" className="hover:text-orange-500 transition-colors text-sm">
                                    Safety Scores
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-orange-500 transition-colors text-sm">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/learn" className="hover:text-orange-500 transition-colors text-sm">
                                    Solar Guides
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-orange-500 transition-colors text-sm">
                                    Blog & News
                                </Link>
                            </li>
                            <li>
                                <Link href="/directory" className="hover:text-orange-500 transition-colors text-sm">
                                    City Directory
                                </Link>
                            </li>
                            <li>
                                <Link href="/upgrade-to-premium" className="hover:text-orange-500 transition-colors text-sm">
                                    For Installers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Get Texas Solar News</h3>
                        <p className="text-sm mb-4">
                            Insights into Texas solar news, tips, and guides directly to your inbox.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-orange-500"
                            />
                            <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded font-semibold text-sm transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-300">
                        &copy; {new Date().getFullYear()} SolarInstallersTX.com. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <Link href="/privacy" className="hover:text-orange-500 transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-orange-500 transition-colors">
                            Terms
                        </Link>
                        <Link href="/refund" className="hover:text-orange-500 transition-colors">
                            Refund Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
