'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function NewHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <span className="text-2xl">☀️</span>
                            <div className="font-bold text-lg">
                                <span className="text-gray-900">SolarInstallers</span>
                                <span className="text-orange-500">TX</span>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/installers"
                            className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
                        >
                            Find Installers
                        </Link>
                        <Link
                            href="/quote"
                            className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
                        >
                            Get Free Quotes
                        </Link>
                        <Link
                            href="/learn"
                            className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
                        >
                            Solar Learning Center
                        </Link>
                        <Button
                            asChild
                            variant="outline"
                            className="border-orange-500 text-orange-600 hover:bg-orange-50"
                        >
                            <Link href="/upgrade-to-premium">Installer Login</Link>
                        </Button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6 text-gray-900" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-900" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <nav className="flex flex-col gap-4">
                            <Link
                                href="/installers"
                                className="text-gray-700 hover:text-orange-600 font-medium py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Find Installers
                            </Link>
                            <Link
                                href="/quote"
                                className="text-gray-700 hover:text-orange-600 font-medium py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Get Free Quotes
                            </Link>
                            <Link
                                href="/learn"
                                className="text-gray-700 hover:text-orange-600 font-medium py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Solar Learning Center
                            </Link>
                            <Button
                                asChild
                                variant="outline"
                                className="border-orange-500 text-orange-600"
                            >
                                <Link href="/upgrade-to-premium">Installer Login</Link>
                            </Button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}
