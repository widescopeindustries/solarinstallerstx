'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { AlertCircle, Home, Search } from 'lucide-react'

export default function InstallerError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Installer page error:', error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
            <Card className="max-w-2xl w-full">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <AlertCircle className="h-16 w-16 text-amber-500" />
                    </div>
                    <CardTitle className="text-2xl">Installer Profile Updating</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center text-muted-foreground">
                        <p className="mb-4">
                            We're currently updating this installer's profile with the latest verification data.
                            This may include new safety scores, license verifications, or insurance updates.
                        </p>
                        <p className="text-sm">
                            Our team verifies every installer to protect Texas homeowners from the risks
                            highlighted by recent solar industry bankruptcies.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild variant="default" size="lg">
                            <Link href="/installers">
                                <Search className="h-5 w-5 mr-2" />
                                Browse All Installers
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/">
                                <Home className="h-5 w-5 mr-2" />
                                Return Home
                            </Link>
                        </Button>
                    </div>

                    <div className="pt-6 border-t">
                        <h3 className="font-semibold text-center mb-4">Why This Happened</h3>
                        <div className="grid gap-3 text-sm">
                            <div className="flex gap-3">
                                <div className="font-semibold text-primary min-w-[120px]">Fresh Data:</div>
                                <div className="text-muted-foreground">
                                    We update installer profiles daily with new safety scores and verification data
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="font-semibold text-primary min-w-[120px]">Protection:</div>
                                <div className="text-muted-foreground">
                                    After 100+ bankruptcies in 2024-2025, we verify every installer's financial health
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="font-semibold text-primary min-w-[120px]">Accuracy:</div>
                                <div className="text-muted-foreground">
                                    License numbers, insurance, and certifications are verified against official sources
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <Button
                            onClick={reset}
                            variant="ghost"
                            className="text-sm"
                        >
                            Try Again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
