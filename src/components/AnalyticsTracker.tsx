import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * AnalyticsTracker Component
 * Automatically tracks page views on route changes
 * Works with Google Analytics consent mode - only tracks when consent is granted
 */
export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if gtag is available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      // Track page view
      (window as any).gtag('event', 'page_view', {
        page_path: pathname + location.search,
        page_title: document.title,
        page_location: window.location.href
      });

      // Debug logging in development
      if (import.meta.env.DEV) {
        console.log('📊 Page view tracked:', pathname);
      }
    }
  }, [location]);

  // This component doesn't render anything
  return null;
}
