'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/contexts/AuthContext'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { MobileStickyCTA } from '@/components/MobileStickyCTA'
import { FloatingShareBar } from '@/components/FloatingShareBar'
import { CookieConsent } from '@/components/CookieConsent'
import { AnalyticsTracker } from '@/components/AnalyticsTracker'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
      },
    },
  }))

  // Web Vitals reporting disabled for now - can be enabled in production

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
