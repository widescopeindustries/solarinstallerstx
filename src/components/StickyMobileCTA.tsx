"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, X } from "lucide-react"

export function StickyMobileCTA() {
    const [isVisible, setIsVisible] = useState(false)
    const [isDismissed, setIsDismissed] = useState(false)

    useEffect(() => {
        // Show after scrolling a bit or immediately on mobile
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        // Check if mobile (basic check)
        const checkMobile = () => {
            if (window.innerWidth < 768) {
                window.addEventListener('scroll', handleScroll)
                // Initial check
                if (window.scrollY > 100) setIsVisible(true)
            } else {
                setIsVisible(false)
                window.removeEventListener('scroll', handleScroll)
            }
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', checkMobile)
        }
    }, [])

    if (!isVisible || isDismissed) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-md border-t border-border md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] animation-slide-up">
            <div className="flex items-center justify-between gap-4 max-w-sm mx-auto relative">
                <button
                    onClick={() => setIsDismissed(true)}
                    className="absolute -top-3 -right-2 bg-muted rounded-full p-1 text-muted-foreground hover:text-foreground"
                    aria-label="Close"
                >
                    <X className="h-3 w-3" />
                </button>

                <div className="flex flex-col">
                    <span className="font-bold text-foreground text-sm">Get 3 Certified Solar Quotes</span>
                    <span className="text-xs text-muted-foreground">Compare & Save 30%</span>
                </div>

                <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg">
                    <Link href="/quote" className="flex items-center gap-1">
                        See Pricing <ArrowRight className="h-3 w-3" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
