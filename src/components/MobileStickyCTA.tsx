'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Phone, X } from 'lucide-react'
import Link from 'next/link'

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px, but not if dismissed
      if (!isDismissed) {
        setIsVisible(window.scrollY > 300)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-primary shadow-2xl z-50 md:hidden animate-in slide-in-from-bottom duration-300">
      <div className="relative p-4">
        {/* Dismiss button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>

        <div className="space-y-2">
          <p className="text-xs text-center text-gray-600 font-medium">
            Ready to go solar? Get your free quote now!
          </p>
          <Link href="/quote" className="block">
            <Button className="w-full h-12 text-base font-semibold shadow-lg">
              <Phone className="mr-2 h-5 w-5" />
              Get Free Quote
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
