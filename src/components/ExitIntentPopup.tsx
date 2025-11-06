import { useState, useEffect } from 'react';
import { X, Zap, DollarSign, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/lib/analytics';

export const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const popupShown = sessionStorage.getItem('exitPopupShown');
    if (popupShown) {
      setHasShown(true);
      return;
    }

    let mouseLeaveTimeout: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is moving toward the top of the page
      if (e.clientY <= 0 && !hasShown && !isVisible) {
        mouseLeaveTimeout = setTimeout(() => {
          setIsVisible(true);
          setHasShown(true);
          sessionStorage.setItem('exitPopupShown', 'true');
          trackEvent('exit_intent_shown');
        }, 200);
      }
    };

    const handleMouseEnter = () => {
      clearTimeout(mouseLeaveTimeout);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(mouseLeaveTimeout);
    };
  }, [hasShown, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    trackEvent('exit_intent_closed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!email || !zipCode) {
        toast({
          title: 'Missing Information',
          description: 'Please enter your email and ZIP code.',
          variant: 'destructive'
        });
        setIsSubmitting(false);
        return;
      }

      // Store email lead in database
      const { error } = await supabase
        .from('quote_requests')
        .insert([{
          email,
          zip_code: zipCode,
          source: 'exit_intent_popup',
          user_agent: navigator.userAgent
        }]);

      if (error) throw error;

      trackEvent('exit_intent_submitted', {
        email,
        zip_code: zipCode
      });

      toast({
        title: 'Success!',
        description: 'Check your email for exclusive solar savings information.',
      });

      setIsVisible(false);

      // Redirect to quote page with pre-filled zip code
      navigate(`/quote?zip=${zipCode}`);
    } catch (error) {
      console.error('Error submitting exit intent form:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetQuote = () => {
    setIsVisible(false);
    trackEvent('exit_intent_get_quote_clicked');
    navigate('/quote');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 animate-in fade-in"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="relative w-full max-w-2xl bg-background animate-in zoom-in-95 duration-200">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-2">
                Wait! Don't Leave Money on the Table
              </h2>
              <p className="text-lg text-muted-foreground">
                Texas homeowners save an average of <span className="font-bold text-primary">$1,440/year</span> with solar
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
                <DollarSign className="h-8 w-8 text-primary mb-2" />
                <div className="font-bold text-sm">$0 Down Options</div>
                <div className="text-xs text-muted-foreground">No upfront costs</div>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
                <Clock className="h-8 w-8 text-primary mb-2" />
                <div className="font-bold text-sm">2-Minute Quote</div>
                <div className="text-xs text-muted-foreground">Fast & easy</div>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
                <Shield className="h-8 w-8 text-primary mb-2" />
                <div className="font-bold text-sm">Certified Installers</div>
                <div className="text-xs text-muted-foreground">NABCEP vetted</div>
              </div>
            </div>

            {/* Quick Lead Capture Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="popup-email">Email Address</Label>
                  <Input
                    id="popup-email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="popup-zip">ZIP Code</Label>
                  <Input
                    id="popup-zip"
                    type="text"
                    placeholder="75001"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    maxLength={5}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  className="flex-1 text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Get My Free Savings Report'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 text-lg py-6"
                  onClick={handleGetQuote}
                >
                  Get Full Quote
                </Button>
              </div>
            </form>

            <p className="text-xs text-center text-muted-foreground">
              100% free, no obligation. We respect your privacy.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};
