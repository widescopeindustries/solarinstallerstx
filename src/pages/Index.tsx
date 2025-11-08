import { useState, useEffect, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
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
import { useToast } from "@/hooks/use-toast";

// Lazy-load below-the-fold sections to reduce initial bundle
const LazyQuoteCTA = lazy(() => import("@/components/QuoteCTA").then(m => ({ default: m.QuoteCTA })));
const LazyTopInstallers = lazy(() => import("@/components/TopInstallers"));

const Index = () => {
  const [topInstallers, setTopInstallers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
      // Dynamically import Supabase client to reduce initial bundle size
      const { supabase } = await import("@/integrations/supabase/client");
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
    // Defer data fetching until after initial render
    const timer = setTimeout(() => {
      fetchTopInstallers();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleQuoteSubmit = async () => {
    if (submitting) return; // Prevent double submission

    setSubmitting(true);
    try {
      // Dynamically import Supabase client to maintain code splitting
      const { supabase } = await import("@/integrations/supabase/client");

      // Validate required fields
      if (!quoteForm.zipCode || !quoteForm.firstName || !quoteForm.lastName || !quoteForm.email || !quoteForm.phone) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }

      // Get user agent and attempt to get IP (will be null in browser for security)
      const userAgent = navigator.userAgent;

      // TCPA Consent text - required for legal compliance
      const tcpaConsentText = `By providing my phone number and clicking "Get Free Quote", I consent to receive calls, text messages, and prerecorded messages from SolarInstallersTX.com and its partner solar installers at the number provided, even if my number is on a Do Not Call list. I understand that consent is not a condition of purchase and I may revoke consent at any time. Message and data rates may apply.`;

      // Insert quote request
      const { data: quoteData, error: quoteError } = await supabase
        .from('quote_requests')
        .insert({
          zip_code: quoteForm.zipCode,
          monthly_bill: quoteForm.monthlyBill,
          first_name: quoteForm.firstName,
          last_name: quoteForm.lastName,
          email: quoteForm.email,
          phone: quoteForm.phone,
          status: 'new',
          source: 'homepage_form',
          user_agent: userAgent,
        })
        .select()
        .single();

      if (quoteError) throw quoteError;

      // Log TCPA consent for legal compliance
      const { error: tcpaError } = await supabase
        .from('tcpa_consent_logs')
        .insert({
          name: `${quoteForm.firstName} ${quoteForm.lastName}`,
          phone: quoteForm.phone,
          email: quoteForm.email,
          consent_version: '1.0',
          consent_text: tcpaConsentText,
          consent_granted: true,
          consent_type: 'opt-in',
          user_agent: userAgent,
          page_url: window.location.href,
          referrer: document.referrer || null,
          lead_source: 'quote_form_homepage',
          quote_request_id: quoteData?.id,
          form_data: {
            zipCode: quoteForm.zipCode,
            monthlyBill: quoteForm.monthlyBill
          }
        });

      if (tcpaError) {
        console.error('TCPA consent logging failed:', tcpaError);
        // Don't fail the submission if TCPA logging fails, but log it
      }

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

    } catch (error: any) {
      console.error('Error submitting quote request:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your quote request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
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
        schema={[
          {
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
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much does solar cost in Texas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The average cost of a residential solar system in Texas ranges from $15,000 to $25,000 before incentives. After applying the 30% federal tax credit, most homeowners pay $10,500 to $17,500. Actual costs depend on system size, equipment quality, roof complexity, and your location. Get free quotes from NABCEP-certified installers to compare pricing for your specific home."
                }
              },
              {
                "@type": "Question",
                "name": "Is solar worth it in Texas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, solar is highly worth it in Texas due to abundant sunshine (averaging 5+ peak sun hours daily), high electricity rates, and excellent incentives. Most Texas homeowners see a 6-8 year payback period with 25+ years of energy savings. The 30% federal tax credit, property tax exemption, and net metering make solar one of the best investments for Texas homeowners."
                }
              },
              {
                "@type": "Question",
                "name": "How do I choose a solar installer in Texas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Choose a solar installer with NABCEP certification, active Texas licensing, strong financial stability, comprehensive insurance and bonding, and verified customer reviews. After 100+ solar bankruptcies in 2024-2025 including Sunnova and Titan Solar, it's critical to verify installer financial health. Our Solar Safety Score System rates installers on 16 data points including financial stability, credentials, and customer protection to help you choose confidently."
                }
              },
              {
                "@type": "Question",
                "name": "What solar incentives are available in Texas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Texas offers several solar incentives: 30% Federal Solar Tax Credit (ITC) through 2032, 100% property tax exemption on solar equipment value, sales tax exemption on solar purchases, net metering programs with most utilities, and utility-specific rebates from providers like CPS Energy, Oncor, and CenterPoint. Combined, these incentives can reduce your total solar investment by 40-50%."
                }
              },
              {
                "@type": "Question",
                "name": "What is the Solar Safety Score System?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our Solar Safety Score System is a 100-point rating that evaluates solar installers on financial stability (30 points), professional credentials (25 points), customer protection (25 points), and track record (20 points). After major bankruptcies like Sunnova in 2025, we verify installer financial health, insurance coverage, bonding status, certifications, warranties, and complaint history to protect Texas homeowners from choosing unstable companies."
                }
              },
              {
                "@type": "Question",
                "name": "How long does solar installation take in Texas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Physical solar installation in Texas takes 1-3 days for most residential systems. The complete process from contract signing to system activation typically takes 4-8 weeks, including site assessment (1 week), permit approval (2-4 weeks), installation (1-3 days), inspection (1 week), and utility interconnection (1-2 weeks). Timeline varies by city permitting office, installer workload, and utility company schedules."
                }
              }
            ]
          }
        ]}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section 1: The Problem & Our Mission */}
          <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/5 py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                {/* Veteran-Owned Badge */}
                <div className="mb-6 flex justify-center">
                  <Badge variant="outline" className="text-sm px-4 py-2 border-primary/40">
                    🇺🇸 Veteran-Owned & Operated
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Don't Become a Solar Victim
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
                  The Texas solar industry is broken. Shady sales tactics. Financial insolvency. Voided warranties on $25,000 systems. Homeowners are right to be scared. We're fixing that.
                </p>

                {/* Crisis Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
                  <div className="bg-card border border-destructive/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-destructive mb-1">100+</div>
                    <div className="text-sm text-muted-foreground">Solar Bankruptcies in 2024-2025</div>
                  </div>
                  <div className="bg-card border border-destructive/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-destructive mb-1">Sunnova</div>
                    <div className="text-sm text-muted-foreground">Chapter 11 - June 2025</div>
                  </div>
                  <div className="bg-card border border-destructive/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-destructive mb-1">Thousands</div>
                    <div className="text-sm text-muted-foreground">Unfinished Projects in Texas</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hero Section 2: Our Solution (Safety Scoring) */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Solar Safety Scored™</h2>
                  <p className="text-lg text-muted-foreground">
                    Our proprietary vetting system protects you from the same mistakes thousands of Texans have made.
                  </p>
                </div>

                {/* How It Works - 3 Step Process */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <Card className="text-center p-8">
                    <CardContent className="space-y-4">
                      <div className="text-4xl font-bold text-primary">1</div>
                      <Shield className="h-12 w-12 text-primary mx-auto" />
                      <h3 className="text-xl font-bold">Verified Insurance</h3>
                      <p className="text-muted-foreground text-sm">
                        We require current Certificate of Insurance on file. This proves they can cover on-site accidents and protect you.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center p-8">
                    <CardContent className="space-y-4">
                      <div className="text-4xl font-bold text-primary">2</div>
                      <CheckCircle className="h-12 w-12 text-primary mx-auto" />
                      <h3 className="text-xl font-bold">Active Licensing</h3>
                      <p className="text-muted-foreground text-sm">
                        We confirm active Texas licenses (TDLR electrical, solar contractor). No shortcuts. No under-the-table work.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center p-8">
                    <CardContent className="space-y-4">
                      <div className="text-4xl font-bold text-primary">3</div>
                      <TrendingUp className="h-12 w-12 text-primary mx-auto" />
                      <h3 className="text-xl font-bold">Financial Health</h3>
                      <p className="text-muted-foreground text-sm">
                        We track financial stability and bankruptcy risk. You need to know they'll be around in 25 years to honor warranties.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* The Badge */}
                <div className="text-center">
                  <p className="text-muted-foreground mb-6">When you see this badge, diligence has been done:</p>
                  <div className="inline-block">
                    <img src="/solar-safety-scored-badge.png" alt="Solar Safety Scored Badge" className="h-48 mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Differentiation Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Not Another EnergySage or SolarReviews Clone</h2>
                  <p className="text-xl text-muted-foreground">
                    We actually verify financial stability. We track bankruptcy risk. We require insurance on file.
                  </p>
                </div>

                <Card>
                  <CardContent className="p-6 md:p-8">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-border">
                            <th className="text-left py-4 px-2 font-bold">Feature</th>
                            <th className="text-center py-4 px-2 font-bold text-muted-foreground">Other Directories</th>
                            <th className="text-center py-4 px-2 font-bold text-primary">SolarInstallersTX</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border">
                            <td className="py-4 px-2">Financial Stability Check</td>
                            <td className="text-center py-4 px-2 text-destructive">❌ No</td>
                            <td className="text-center py-4 px-2 text-primary font-semibold">✅ Yes - Tracked Monthly</td>
                          </tr>
                          <tr className="border-b border-border bg-muted/30">
                            <td className="py-4 px-2">Bankruptcy Protection</td>
                            <td className="text-center py-4 px-2 text-destructive">❌ No</td>
                            <td className="text-center py-4 px-2 text-primary font-semibold">✅ Health Monitoring</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="py-4 px-2">Insurance Verification</td>
                            <td className="text-center py-4 px-2 text-destructive">❌ Not Required</td>
                            <td className="text-center py-4 px-2 text-primary font-semibold">✅ Required & Verified</td>
                          </tr>
                          <tr className="bg-muted/30">
                            <td className="py-4 px-2">Proprietary Safety Scoring</td>
                            <td className="text-center py-4 px-2 text-destructive">❌ No</td>
                            <td className="text-center py-4 px-2 text-primary font-semibold">✅ 100-Point System</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Transition Section: Now That You Trust Us */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Now that you know what matters to us...</h2>
                <p className="text-lg text-muted-foreground mb-12">
                  ...and that we're not just another national list, here's what we offer:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 flex flex-col">
                    <CardContent className="space-y-4 flex-1 flex flex-col">
                      <Users className="h-12 w-12 text-primary mx-auto" />
                      <h3 className="text-xl font-bold">Browse Our Vetted Installers</h3>
                      <p className="text-muted-foreground flex-1">
                        See the installers we've verified. Compare prices, reviews, and certifications. All with the Solar Safety Scored badge.
                      </p>
                      <Button asChild size="lg" className="w-full">
                        <Link to="/installers">Find an Installer</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 flex flex-col">
                    <CardContent className="space-y-4 flex-1 flex flex-col">
                      <Calculator className="h-12 w-12 text-primary mx-auto" />
                      <h3 className="text-xl font-bold">Learn About Solar</h3>
                      <p className="text-muted-foreground flex-1">
                        Not sure about solar? Get educated. Texas incentives. Cost breakdown. What you need to know before buying.
                      </p>
                      <Button asChild size="lg" className="w-full">
                        <Link to="/learn">Learn More</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 flex flex-col">
                    <CardContent className="space-y-4 flex-1 flex flex-col">
                      <Phone className="h-12 w-12 text-primary mx-auto" />
                      <h3 className="text-xl font-bold">Get a Free Quote</h3>
                      <p className="text-muted-foreground flex-1">
                        Ready to move forward? Tell us your location and budget. We'll connect you with certified installers.
                      </p>
                      <Button asChild size="lg" className="w-full">
                        <Link to="/quote">Request Quote</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>


          {/* Top Installers - Social Proof */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-2">Featured Vetted Installers</h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Meet some of the NABCEP-certified installers who have passed our Solar Safety Scored vetting
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
                    
                    <div className="bg-muted/30 p-4 rounded-lg text-xs text-muted-foreground">
                      <p>
                        <strong>TCPA Consent:</strong> By providing your phone number and clicking "Get Free Quote", you consent to receive calls, text messages, and prerecorded messages from SolarInstallersTX.com and its partner solar installers, even if your number is on a Do Not Call list. Consent is not required for purchase and you may revoke it at any time.
                      </p>
                    </div>

                    <Button
                      onClick={handleQuoteSubmit}
                      size="lg"
                      className="w-full"
                      disabled={!quoteForm.zipCode || !quoteForm.firstName || !quoteForm.lastName || !quoteForm.email || !quoteForm.phone || submitting}
                    >
                      {submitting ? "Submitting..." : "Get Free Quote"}
                      {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
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