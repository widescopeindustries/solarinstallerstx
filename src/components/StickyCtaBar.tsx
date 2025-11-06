import { useState, useEffect } from 'react';
import { Phone, MessageSquare, Calculator, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { trackPhoneClicked, trackEvent } from '@/lib/analytics';

export const StickyCtaBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px down
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't show on quote page or checkout pages
  const hideOnPages = ['/quote', '/upgrade-to-premium', '/admin'];
  const shouldHide = hideOnPages.some(page => location.pathname.startsWith(page));

  if (shouldHide || isDismissed) return null;

  const handlePhoneClick = () => {
    trackPhoneClicked('(682) 999-0953', 'sticky_cta_bar');
    trackEvent('button_clicked', {
      button_name: 'sticky_cta_phone',
      location: 'sticky_bar'
    });
  };

  const handleQuoteClick = () => {
    trackEvent('button_clicked', {
      button_name: 'sticky_cta_quote',
      location: 'sticky_bar'
    });
    navigate('/quote');
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('stickyCtaDismissed', 'true');
    trackEvent('sticky_cta_dismissed');
  };

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 transform transition-transform duration-300 ease-in-out',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      {/* Desktop Version */}
      <div className="hidden md:block bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              <span className="font-semibold">Ready to save on your electric bill?</span>
              <span className="text-sm opacity-90">Get a free quote in 2 minutes</span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-primary hover:bg-white/90"
                onClick={handleQuoteClick}
              >
                <Calculator className="h-4 w-4 mr-2" />
                Get Free Quote
              </Button>

              <a
                href="tel:6829990953"
                onClick={handlePhoneClick}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent text-white border-white hover:bg-white/10"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  (682) 999-0953
                </Button>
              </a>

              <button
                onClick={handleDismiss}
                className="p-1 hover:bg-white/10 rounded transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span className="text-sm font-semibold">Get Your Free Quote</span>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/10 rounded transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              className="bg-white text-primary hover:bg-white/90 w-full"
              onClick={handleQuoteClick}
            >
              <Calculator className="h-4 w-4 mr-1" />
              Quote
            </Button>

            <a
              href="tel:6829990953"
              onClick={handlePhoneClick}
              className="w-full"
            >
              <Button
                size="sm"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10 w-full"
              >
                <Phone className="h-4 w-4 mr-1" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
