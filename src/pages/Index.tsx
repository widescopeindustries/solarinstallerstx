import { useState, useEffect, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";

// Lazy-load below-the-fold sections to reduce initial bundle
const LazyQuoteCTA = lazy(() => import("@/components/QuoteCTA").then(m => ({ default: m.QuoteCTA })));
const LazyAffiliateDisclosure = lazy(() => import("@/components/AffiliateDisclosure").then(m => ({ default: m.AffiliateDisclosure })));
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Shield, 
  DollarSign, 
  Zap, 
  Sun, 
  Star, 
  MapPin, 
  CheckCircle,
  ArrowRight,
  Calculator,
  TrendingUp,
  Award,
  Phone,
  Mail,
  Home,
  Users,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Lazy load components (default exports)
const LazyTopInstallers = lazy(() => import("@/components/TopInstallers"));

const Index = () => {
  const [topInstallers, setTopInstallers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quoteForm, setQuoteForm] = useState({
    zipCode: '',
    monthlyBill: 150,
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const { toast } = useToast();

  const fetchTopInstallers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('installers')
        .select('*')
        .eq('is_premium', true)
        .not('company_name', 'ilike', '%signature%solar%')
        .order('is_verified', { ascending: false })
        .limit(3);

      if (error) throw error;
      setTopInstallers(data || []);
    } catch (error: any) {
      console.error('Error fetching top installers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopInstallers();
  }, []);

  const handleQuoteSubmit = () => {
    // Here you would typically send the data to your backend
    // TODO: Implement backend submission to store quote request
    toast({
      title: "Quote Request Submitted!",
      description: "We'll connect you with certified solar installers in your area within 24 hours.",
    });
    
    // Reset form
    setQuoteForm({
      zipCode: '',
      monthlyBill: 150,
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
  };

  const valueProps = [
    {
      icon: Shield,
      title: "NABCEP Certified",
      description: "All installers are certified by the North American Board of Certified Energy Practitioners"
    },
    {
      icon: DollarSign,
      title: "Save 26%",
      description: "Average monthly savings for Texas homeowners who switch to solar"
    },
    {
      icon: Zap,
      title: "Fast Install",
      description: "Most installations completed in 1-3 days with minimal disruption"
    }
  ];

  const cities = [
    { name: 'Austin', slug: 'austin', population: '978K' },
    { name: 'Dallas', slug: 'dallas', population: '1.3M' },
    { name: 'Houston', slug: 'houston', population: '2.3M' },
    { name: 'San Antonio', slug: 'san-antonio', population: '1.5M' },
    { name: 'Fort Worth', slug: 'fort-worth', population: '919K' },
    { name: 'El Paso', slug: 'el-paso', population: '679K' },
    { name: 'Arlington', slug: 'arlington', population: '394K' },
    { name: 'Corpus Christi', slug: 'corpus-christi', population: '317K' },
    { name: 'Plano', slug: 'plano', population: '285K' },
    { name: 'Lubbock', slug: 'lubbock', population: '258K' },
    { name: 'Laredo', slug: 'laredo', population: '256K' },
    { name: 'Garland', slug: 'garland', population: '246K' },
    { name: 'Frisco', slug: 'frisco', population: '201K' },
    { name: 'McKinney', slug: 'mckinney', population: '199K' },
    { name: 'Killeen', slug: 'killeen', population: '153K' },
    { name: 'Waco', slug: 'waco', population: '138K' }
  ];

  return (
    <>
      <SEOHead 
        title="Solar Installers Texas | NABCEP Certified Solar Companies | Free Quotes"
        description="Find certified solar installers in Texas. Get free quotes from NABCEP-certified companies. Save 26% on electricity bills with professional solar installation."
        canonicalUrl="https://solarinstallerstx.com"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "SolarInstallersTX",
          "description": "Find certified solar installers in Texas",
          "url": "https://solarinstallerstx.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://solarinstallerstx.com/installers?search={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "mainEntity": {
            "@type": "ItemList",
            "name": "Texas Solar Installers",
            "description": "NABCEP certified solar installation professionals in Texas",
            "numberOfItems": 500
          }
        }}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/5 py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Find Certified Solar Installers in Texas
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Connect with NABCEP-certified solar professionals. Get free quotes, compare prices, and save up to 26% on your electricity bills.
                </p>
                
                {/* Monetization CTA - Signature Solar Affiliate */}
                <Suspense fallback={<div className="h-16 mb-4" />}>
                  <LazyQuoteCTA className="mb-4" />
                </Suspense>
                <Suspense fallback={<div className="h-8 mb-8" />}>
                  <LazyAffiliateDisclosure className="mb-8" />
                </Suspense>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link to="/quote">Get Free Quote</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                    <Link to="/installers">Browse Installers</Link>
                  </Button>
                </div>
                
                {/* Trust Signals */}
                <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>500+ Certified Installers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Free Quotes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>No Obligation</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Value Propositions */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {valueProps.map((prop, index) => (
                  <Card key={index} className="text-center p-8 hover:shadow-lg transition-all duration-300">
                    <CardContent className="space-y-4">
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <prop.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">{prop.title}</h3>
                      <p className="text-muted-foreground">{prop.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Top Installers */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Top Rated Solar Installers in Texas</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Featured NABCEP-certified installers with verified reviews and premium listings
                </p>
              </div>
              
              <Suspense fallback={
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={`home-top-skeleton-${i}`} className="p-6">
                      <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                        <div className="h-4 bg-muted rounded w-2/3"></div>
                      </div>
                    </Card>
                  ))}
                </div>
              }>
                <LazyTopInstallers installers={topInstallers} loading={loading} />
              </Suspense>
              
              <div className="text-center mt-8">
                <Button asChild variant="outline" size="lg">
                  <Link to="/installers">View All Installers</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Texas Map */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Solar Installers by City</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Find certified solar installers in major Texas cities. Click on any city to explore local options.
                </p>
              </div>

              {/* City Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
                {cities.map((city) => (
                  <Link key={city.slug} to={`/cities/${city.slug}`}>
                    <Card className="hover:shadow-md transition-all duration-300 cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <h3 className="font-semibold mb-1 text-base">{city.name}</h3>
                        <p className="text-sm text-muted-foreground">{city.population}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Educational Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Why Solar in Texas?</h2>
                <div className="space-y-6 text-base text-muted-foreground">
                  <p>
                    Texas is one of the best states for solar energy in the United States, with abundant sunshine, 
                    competitive electricity rates, and strong renewable energy policies. The Lone Star State receives 
                    an average of 5.2 peak sun hours per day, making it ideal for solar panel installations.
                  </p>
                  <p>
                    Texas homeowners can take advantage of the federal solar tax credit (30% through 2032), property 
                    tax exemptions for solar installations, and net metering programs offered by many utility companies. 
                    With electricity rates averaging $0.11 per kWh and rising, solar provides a stable, long-term 
                    solution for reducing energy costs.
                  </p>
                  <p>
                    The solar industry in Texas has grown rapidly, with over 15,000 MW of installed capacity as of 2024. 
                    This growth has created a competitive market with experienced, certified installers offering 
                    high-quality systems at competitive prices.
                  </p>
                </div>
                <div className="text-center mt-8">
                  <Button asChild variant="outline" size="lg">
                    <Link to="/learn">Learn More About Solar</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Quote Form */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <Card className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">Get Your Free Solar Quote</h2>
                    <p className="text-muted-foreground">
                      Compare quotes from certified solar installers in your area. No obligation, instant results.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          placeholder="75001"
                          value={quoteForm.zipCode}
                          onChange={(e) => setQuoteForm(prev => ({ ...prev, zipCode: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Monthly Electric Bill: ${quoteForm.monthlyBill}</Label>
                        <Slider
                          value={[quoteForm.monthlyBill]}
                          onValueChange={(value) => setQuoteForm(prev => ({ ...prev, monthlyBill: value[0] }))}
                          min={50}
                          max={500}
                          step={10}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>$50</span>
                          <span>$500</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={quoteForm.firstName}
                          onChange={(e) => setQuoteForm(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={quoteForm.lastName}
                          onChange={(e) => setQuoteForm(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={quoteForm.email}
                          onChange={(e) => setQuoteForm(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={quoteForm.phone}
                          onChange={(e) => setQuoteForm(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleQuoteSubmit}
                      size="lg" 
                      className="w-full"
                      disabled={!quoteForm.zipCode || !quoteForm.firstName || !quoteForm.lastName || !quoteForm.email || !quoteForm.phone}
                    >
                      Get Free Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <div className="text-center text-sm text-muted-foreground">
                      <p>✓ Free quotes from certified installers</p>
                      <p>✓ No obligation to purchase</p>
                      <p>✓ Compare multiple options</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;