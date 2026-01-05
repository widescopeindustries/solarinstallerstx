import Link from 'next/link'

export function NewFooter() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Column 1: SolarInstallersTX */}
                    <div>
                        <h3 className="font-bold text-white mb-4">SolarInstallersTX</h3>
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
                                    Press
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Homeowners */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Homeowners</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/installers" className="hover:text-orange-500 transition-colors text-sm">
                                    Homeowners
                                </Link>
                            </li>
                            <li>
                                <Link href="/learn" className="hover:text-orange-500 transition-colors text-sm">
                                    Resources & Guides
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-orange-500 transition-colors text-sm">
                                    Cities & Industry
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-orange-500 transition-colors text-sm">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Resources & Guides */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Resources & Guides</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/faq" className="hover:text-orange-500 transition-colors text-sm">
                                    Cities & Industry
                                </Link>
                            </li>
                            <li>
                                <Link href="/directory" className="hover:text-orange-500 transition-colors text-sm">
                                    Directory
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-orange-500 transition-colors text-sm">
                                    News
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
                        SolarInstallersTX Homepage
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
                    <p className="text-sm text-gray-300">
                        SolarInstallers.com
                    </p>
                </div>
            </div>
        </footer>
    )
}
