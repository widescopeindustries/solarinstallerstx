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
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (consentType: 'accepted' | 'declined') => {
    localStorage.setItem('cookie-consent', consentType);
    setShowBanner(false);
    
    const consentValue = consentType === 'accepted' ? 'granted' : 'denied';
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: consentValue
      });
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
                <h3 id="cookie-consent-title" className="text-lg font-semibold">We value your privacy</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We use cookies to enhance your browsing experience and analyze site traffic. By clicking "Accept", you consent to our use of cookies.
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleConsent('declined')} className="flex-shrink-0">
                <X className="w-4 h-4" />
                <span className="sr-only">Close cookie consent banner</span>
              </Button>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" onClick={() => handleConsent('declined')}>Decline</Button>
              <Button onClick={() => handleConsent('accepted')}>Accept</Button>
            </div>
          </Card>
        </div>
      </div>
    </FocusTrap>
  );
}
