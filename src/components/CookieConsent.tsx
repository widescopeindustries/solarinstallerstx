import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    // Enable GA4 tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
    // Disable GA4 tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="container max-w-6xl mx-auto">
        <Card className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">We Value Your Privacy</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, 
                and personalize content. By clicking "Accept All", you consent to our use of cookies. 
                You can manage your preferences in our{" "}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={acceptCookies} size="sm">
                  Accept All Cookies
                </Button>
                <Button onClick={declineCookies} variant="outline" size="sm">
                  Decline Non-Essential
                </Button>
                <Button 
                  onClick={() => setShowBanner(false)} 
                  variant="ghost" 
                  size="sm"
                  className="sm:ml-auto"
                >
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
