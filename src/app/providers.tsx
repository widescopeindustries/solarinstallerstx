'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/contexts/AuthContext'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { useState } from 'react'
import dynamic from 'next/dynamic'

// Lazy load non-critical components - don't block initial render
const MobileStickyCTA = dynamic(() => import('@/components/MobileStickyCTA').then(mod => ({ default: mod.MobileStickyCTA })), { ssr: false })
const FloatingShareBar = dynamic(() => import('@/components/FloatingShareBar').then(mod => ({ default: mod.FloatingShareBar })), { ssr: false })
const CookieConsent = dynamic(() => import('@/components/CookieConsent').then(mod => ({ default: mod.CookieConsent })), { ssr: false })
const AnalyticsTracker = dynamic(() => import('@/components/AnalyticsTracker').then(mod => ({ default: mod.AnalyticsTracker })), { ssr: false })

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <AnalyticsTracker />
          <MobileStickyCTA />
          <FloatingShareBar />
          <CookieConsent />
          {children}
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
