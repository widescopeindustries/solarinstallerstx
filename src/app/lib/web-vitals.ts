'use client'

import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals'

/**
 * Web Vitals Reporting for Core Web Vitals Monitoring
 *
 * Tracks key performance metrics:
 * - LCP (Largest Contentful Paint): <2.5s is good
 * - TTFB (Time to First Byte): <800ms is good
 * - INP (Interaction to Next Paint): <200ms is good
 */

// Log to console in development, send to analytics in production
function sendToAnalytics(metric: Metric) {
  const { name, value, rating, delta, id } = metric

  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${name}:`, {
      value: `${Math.round(value)}ms`,
      rating,
      delta: `${Math.round(delta)}ms`,
      id,
    })

    // Provide helpful feedback
    if (name === 'LCP') {
      if (value > 4000) {
        console.warn('⚠️ LCP is POOR (>4s). Check image optimization and critical path.')
      } else if (value > 2500) {
        console.warn('⚠️ LCP needs improvement (>2.5s). Consider using priority prop on hero images.')
      } else {
        console.log('✅ LCP is GOOD (<2.5s)')
      }
    }

    if (name === 'CLS') {
      if (value > 0.25) {
        console.warn('⚠️ CLS is POOR (>0.25). Add width/height to all images.')
      } else if (value > 0.1) {
        console.warn('⚠️ CLS needs improvement (>0.1). Check for layout shifts.')
      } else {
        console.log('✅ CLS is GOOD (<0.1)')
      }
    }

    if (name === 'INP') {
      if (value > 500) {
        console.warn(`⚠️ ${name} is POOR (>500ms). Check for blocking JavaScript.`)
      } else if (value > 200) {
        console.warn(`⚠️ ${name} needs improvement (>200ms). Optimize interactions.`)
      } else {
        console.log(`✅ ${name} is GOOD (<200ms)`)
      }
    }
  }

  // In production, send to analytics (e.g., Google Analytics, Vercel Analytics)
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ; (window as any).gtag('event', name, {
        event_category: 'Web Vitals',
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        event_label: id,
        non_interaction: true,
      })
    }

    // Example: Send to custom analytics endpoint
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     metric: name,
    //     value,
    //     rating,
    //     delta,
    //     id,
    //     timestamp: Date.now(),
    //   }),
    // })
  }
}

/**
 * Initialize Web Vitals reporting
 *
 * Call this function in your root layout or app component to start tracking
 * performance metrics automatically.
 */
export function reportWebVitals() {
  try {
    onCLS(sendToAnalytics)
    onFCP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onTTFB(sendToAnalytics)
    onINP(sendToAnalytics)
  } catch (error) {
    console.error('Failed to initialize Web Vitals reporting:', error)
  }
}

/**
 * Get Core Web Vitals thresholds
 */
export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // milliseconds
  CLS: { good: 0.1, needsImprovement: 0.25 }, // score
  FCP: { good: 1800, needsImprovement: 3000 }, // milliseconds
  TTFB: { good: 800, needsImprovement: 1800 }, // milliseconds
  INP: { good: 200, needsImprovement: 500 }, // milliseconds
}

/**
 * Helper function to format metric values
 */
export function formatMetricValue(name: string, value: number): string {
  if (name === 'CLS') {
    return value.toFixed(3)
  }
  return `${Math.round(value)}ms`
}

/**
 * Helper function to get rating color for UI display
 */
export function getRatingColor(rating: 'good' | 'needs-improvement' | 'poor'): string {
  switch (rating) {
    case 'good':
      return 'text-green-600'
    case 'needs-improvement':
      return 'text-yellow-600'
    case 'poor':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}
