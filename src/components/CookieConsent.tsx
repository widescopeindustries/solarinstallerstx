import { useState, useEffect } from "react";
import FocusTrap from "focus-trap-react";
import { X, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');

    if (consent === null) {
      // First-time visitor - show informative banner (tracking already enabled by default)
      setShowBanner(true);
      // Auto-set as accepted since we use opt-out model
      localStorage.setItem('cookie-consent', 'accepted');
    } else if (consent === 'declined') {
      // User previously opted out - respect their choice
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          'analytics_storage': 'denied',
          'ad_storage': 'denied'
        });
        if ((window as any).GA_DEBUG) {
          (window as any).GA_DEBUG.log('User previously opted out, tracking disabled');
        }
      }
    }
    // If accepted, consent is already granted by default in index.html
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);

    // Ensure tracking is enabled (should already be by default)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'denied'
      });
      if ((window as any).GA_DEBUG) {
        (window as any).GA_DEBUG.log('User accepted tracking');
      }
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);

    // Disable tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied'
      });
      if ((window as any).GA_DEBUG) {
        (window as any).GA_DEBUG.log('User opted out of tracking');
      }
    }
  };

  if (!showBanner) return null;

  return (
    <FocusTrap active={showBanner}>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        aria-labelledby="cookie-consent-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-x-0 bottom-0 z-50 p-4">
          <Card className="max-w-lg mx-auto p-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-2xl">
            <div className="flex items-start gap-4">
              <Cookie className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div className="flex-grow">
                <h3 id="cookie-consent-title" className="text-lg font-semibold">Cookie Notice</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We use cookies to enhance your browsing experience and analyze site traffic. You're currently opted in. You can opt out at any time by clicking "Opt Out".
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleAccept} className="flex-shrink-0">
                <X className="w-4 h-4" />
                <span className="sr-only">Close and continue with tracking</span>
              </Button>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" onClick={handleDecline}>Opt Out</Button>
              <Button onClick={handleAccept}>Got It</Button>
            </div>
          </Card>
        </div>
      </div>
    </FocusTrap>
  );
}
