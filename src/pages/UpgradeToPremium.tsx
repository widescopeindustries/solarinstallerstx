import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/hooks/use-toast";
import { trackPremiumPlanSelected, trackFormError } from "@/lib/analytics";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const UpgradeToPremium = () => {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const { toast } = useToast();

  const basicFeatures = [
    "Enhanced listing with company details",
    "Verified badge on your profile",
    "Contact information displayed",
    "Basic safety score visible",
    "Search results inclusion"
  ];

  const premiumFeatures = [
    "Everything in Basic, plus:",
    "Featured placement in city pages",
    "Top of search results",
    "Solar Safety Score badge",
    "Priority in installer directory",
    "Enhanced profile visibility",
    "Analytics dashboard access"
  ];

  const enterpriseFeatures = [
    "Everything in Premium, plus:",
    "Homepage featured slot",
    "Priority #1 in all search results",
    "Custom branding options",
    "Dedicated account manager",
    "Monthly performance reports",
    "Lead generation insights",
    "API access for integrations"
  ];

  const handleCheckout = async (priceId: string, tierName: string) => {
    setLoadingTier(tierName);

    try {
      // Debug logging
      console.log('Checkout initiated:', { tierName, priceId });

      // Track analytics
      const tierPrices: Record<string, number> = {
        'Basic': 99,
        'Premium': 199,
        'Enterprise': 399
      };
      trackPremiumPlanSelected(tierName.toLowerCase() as 'basic' | 'premium' | 'enterprise', tierPrices[tierName]);

      // Check if priceId is defined
      if (!priceId || priceId === 'undefined') {
        throw new Error(`Missing price ID for ${tierName} tier. Please contact support.`);
      }

      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe failed to load. Please refresh the page and try again.");
      }

      console.log('Creating checkout session...');

      // Create checkout session via your API
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          tierName
        }),
      });

      console.log('API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(`Server error: ${response.status}. Please try again or contact support.`);
      }

      const session = await response.json();
      console.log('Session created:', session);

      if (session.error) {
        throw new Error(session.error);
      }

      if (!session.id) {
        throw new Error('Invalid session response from server');
      }

      console.log('Redirecting to Stripe checkout...');

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error: any) {
      console.error('Checkout error:', error);

      // Track error
      trackFormError('checkout', tierName, error.message);

      toast({
        title: "Checkout Error",
        description: error.message || "Failed to initiate checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <>
      <SEOHead
        title="Upgrade to Premium | SolarInstallersTX"
        description="Unlock advanced features and boost your visibility with a premium listing on SolarInstallersTX. Choose from Basic, Premium, or Enterprise plans."
        canonicalUrl="https://solarinstallerstx.com/upgrade-to-premium"
      />
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Elevate Your Business with <span className="text-primary">Premium Listing</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stand out from the competition, attract more clients, and showcase your expertise.
            Choose the plan that fits your business goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {/* Basic Tier */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">Basic</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between p-6">
              <div>
                <ul className="space-y-3 mb-6">
                  {basicFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center mt-auto">
                <p className="text-5xl font-bold mb-2">$99</p>
                <p className="text-sm text-muted-foreground mb-4">per month</p>
                <Button
                  className="w-full text-lg py-6"
                  onClick={() => handleCheckout(import.meta.env.VITE_STRIPE_PRICE_BASIC, 'Basic')}
                  disabled={loadingTier === 'Basic'}
                >
                  {loadingTier === 'Basic' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Get Started'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Premium Tier - Most Popular */}
          <Card className="flex flex-col border-2 border-primary shadow-lg relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
              Most Popular
            </div>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-primary">Premium</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between p-6">
              <div>
                <ul className="space-y-3 mb-6">
                  {premiumFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className={index === 0 ? "font-semibold" : ""}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center mt-auto">
                <p className="text-5xl font-bold text-primary mb-2">$199</p>
                <p className="text-sm text-muted-foreground mb-4">per month</p>
                <Button
                  className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
                  onClick={() => handleCheckout(import.meta.env.VITE_STRIPE_PRICE_PREMIUM, 'Premium')}
                  disabled={loadingTier === 'Premium'}
                >
                  {loadingTier === 'Premium' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Upgrade to Premium'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enterprise Tier */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">Enterprise</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between p-6">
              <div>
                <ul className="space-y-3 mb-6">
                  {enterpriseFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className={index === 0 ? "font-semibold" : ""}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center mt-auto">
                <p className="text-5xl font-bold mb-2">$399</p>
                <p className="text-sm text-muted-foreground mb-4">per month</p>
                <Button
                  className="w-full text-lg py-6"
                  onClick={() => handleCheckout(import.meta.env.VITE_STRIPE_PRICE_ENTERPRISE, 'Enterprise')}
                  disabled={loadingTier === 'Enterprise'}
                >
                  {loadingTier === 'Enterprise' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Go Enterprise'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Free Tier Info */}
        <Card className="max-w-3xl mx-auto bg-muted/50">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Free Listing</h3>
            <p className="text-center text-muted-foreground mb-6">
              Already have a free listing? Upgrade anytime to unlock premium features and dramatically increase your visibility.
            </p>
            <div className="flex justify-center">
              <Button asChild variant="outline">
                <Link to="/installers">View All Installers</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trust Signals */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Trusted by 542+ solar installers across Texas
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>✓ Cancel anytime</span>
            <span>✓ No setup fees</span>
            <span>✓ Instant activation</span>
            <span>✓ Secure payment via Stripe</span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UpgradeToPremium;
