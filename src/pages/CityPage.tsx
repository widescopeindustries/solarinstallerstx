import { useState, useEffect, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { InstallerListCard } from "@/components/InstallerListCard";
import { InstallerCard } from "@/components/InstallerCard";
import { SolarCalculatorWidget } from "@/components/SolarCalculatorWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Sun, 
  DollarSign, 
  Shield, 
  Star,
  TrendingUp,
  Zap,
  Home,
  Calculator,
  CheckCircle,
  ArrowRight,
  Lightbulb
} from "lucide-react";

const LazyMapComponent = lazy(() =>
  import("@/components/Map").then((module) => ({ default: module.MapComponent }))
);

const CityPage = () => {
  const { city } = useParams<{ city: string }>();
  const [installers, setInstallers] = useState<any[]>([]);
  const [nabcepInstallers, setNabcepInstallers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nabcepLoading, setNabcepLoading] = useState(true);
  const { toast } = useToast();

  // City data mapping
  const cityData: Record<string, any> = {
    'austin': {
      name: 'Austin',
      state: 'Texas',
      population: '978,908',
      avgElectricRate: '0.12',
      avgSolarCost: '$18,500',
      incentives: ['Federal Tax Credit', 'Property Tax Exemption', 'Net Metering'],
      description: 'Austin, the capital of Texas, is a solar-friendly city with abundant sunshine and strong renewable energy policies.'
    },
    'dallas': {
      name: 'Dallas',
      state: 'Texas',
      population: '1,304,379',
      avgElectricRate: '0.11',
      avgSolarCost: '$17,800',
      incentives: ['Federal Tax Credit', 'Property Tax Exemption', 'Oncor Rebates'],
      description: 'Dallas offers excellent solar potential with competitive electricity rates and growing renewable energy adoption.'
    },
    'houston': {
      name: 'Houston',
      state: 'Texas',
      population: '2,304,580',
      avgElectricRate: '0.10',
      avgSolarCost: '$16,900',
      incentives: ['Federal Tax Credit', 'Property Tax Exemption', 'CenterPoint Rebates'],
      description: 'Houston, the energy capital of the world, is embracing solar with competitive rates and strong installer presence.'
    },
    'san-antonio': {
      name: 'San Antonio',
      state: 'Texas',
      population: '1,547,253',
      avgElectricRate: '0.09',
      avgSolarCost: '$16,200',
      incentives: ['Federal Tax Credit', 'Property Tax Exemption', 'CPS Energy Rebates'],
      description: 'San Antonio leads Texas in solar adoption with aggressive renewable energy goals and strong local incentives.'
    },
    'fort-worth': {
      name: 'Fort Worth',
      state: 'Texas',
      population: '918,915',
      avgElectricRate: '0.11',
      avgSolarCost: '$17,500',
      incentives: ['Federal Tax Credit', 'Property Tax Exemption', 'Oncor Rebates'],
      description: 'Fort Worth combines traditional Texas charm with modern solar technology, offering great opportunities for homeowners.'
    }
  };

  const currentCity = cityData[city || ''] || {
    name: city?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'City',
    state: 'Texas',
    population: 'N/A',
    avgElectricRate: '0.11',
    avgSolarCost: '$18,000',
    incentives: ['Federal Tax Credit', 'Property Tax Exemption'],
    description: `Learn about solar installation opportunities in ${city?.replace('-', ' ')}.`
  };

  const fetchInstallers = async () => {
    if (!city) return;
    
    try {
      setLoading(true);
      const cityName = city.replace('-', ' ');
      const { data, error } = await supabase
        .from('installers')
        .select('*')
        .ilike('location_city', `%${cityName}%`)
        .order('is_premium', { ascending: false })
        .order('is_verified', { ascending: false });

      if (error) throw error;
      setInstallers(data || []);
    } catch (error: any) {
      console.error('Error fetching installers:', error);
      toast({
        title: "Error loading installers",
        description: "Unable to load installer data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchNABCEPInstallers = async () => {
    if (!city) return;
    
    try {
      setNabcepLoading(true);
      const cityName = city.replace('-', ' ');
      const { data, error } = await supabase
        .from('installers')
        .select('*')
        .ilike('location_city', `%${cityName}%`)
        .or('certification_type.ilike.%PVIP%,certification_type.ilike.%PVSI%,certification_type.ilike.%PV Installation%,certification_type.ilike.%PV System%')
        .order('is_premium', { ascending: false })
        .limit(6);

      if (error) throw error;
      setNabcepInstallers(data || []);
    } catch (error: any) {
      console.error('Error fetching NABCEP installers:', error);
    } finally {
      setNabcepLoading(false);
    }
  };

  useEffect(() => {
    fetchInstallers();
    fetchNABCEPInstallers();
  }, [city]);

  const cityFaqs = [
    {
      question: "Is solar worth it in Texas?",
      answer: "Absolutely! Texas has abundant sunshine, high electricity rates, and excellent solar incentives. With the 30% federal tax credit, property tax exemptions, and net metering, most Texas homeowners see a 6-8 year payback period with 25+ years of energy savings. Learn more about solar benefits on our education hub."
    },
    {
      question: `How much do solar installers charge in ${currentCity.name}?`,
      answer: `Solar installers in ${currentCity.name} typically charge ${currentCity.avgSolarCost} for a complete residential system (before incentives). After the 30% federal tax credit, your net cost is around ${Math.round(parseFloat(currentCity.avgSolarCost.replace('$', '').replace(',', '')) * 0.7).toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0})}. Get free quotes to compare pricing from NABCEP certified installers.`
    },
    {
      question: "Are there rebates for solar panels in Texas?",
      answer: "Yes! Texas offers multiple solar rebates including the 30% federal tax credit (through 2032), 100% property tax exemption for solar equipment value, net metering credits, and utility-specific rebates. Many Texas utilities like CPS Energy, Oncor, and CenterPoint offer additional cash rebates for solar installations. Check your local utility for current programs."
    },
    {
      question: `What solar incentives are available in ${currentCity.name}?`,
      answer: `${currentCity.name} offers several solar incentives including ${currentCity.incentives.join(', ')}. Combined, these incentives can reduce your total solar costs by 30-40%. Visit our Texas Solar Incentives guide to learn more.`
    },
    {
      question: `How long does solar installation take in ${currentCity.name}?`,
      answer: `Most residential solar installations in ${currentCity.name} take 1-3 days for the physical installation, plus additional time for permits, inspections, and utility interconnection. The entire process typically takes 4-8 weeks from contract to activation.`
    },
    {
      question: `Do I need permits for solar in ${currentCity.name}?`,
      answer: `Yes, ${currentCity.name} requires permits for solar installations. Your NABCEP certified installer will typically handle the permit process, including building permits, electrical permits, and utility interconnection agreements. Requirements vary by system size and local regulations.`
    }
  ];

  const pageTitle = `Solar Installers ${currentCity.name} TX | NABCEP Certified Solar Companies | Free Quotes`;
  const pageDescription = `Find NABCEP certified solar installers in ${currentCity.name}, Texas. Compare free quotes from ${installers.length}+ certified companies. ${currentCity.avgSolarCost} average cost. 30% federal tax credit available.`;
  const pageImage = "https://solarinstallerstx.com/opengraph-image.svg";

  return (
    <>
      <SEOHead 
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={`https://solarinstallerstx.com/cities/${city}`}
        ogImage={pageImage}
        ogType="website"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": cityFaqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": `Solar Installers in ${currentCity.name}, Texas`,
            "description": `NABCEP certified solar installation professionals serving ${currentCity.name}`,
            "numberOfItems": installers.length,
            "itemListElement": installers.slice(0, 10).map((installer, index) => ({
              "@type": "LocalBusiness",
              "position": index + 1,
              "name": installer.company_name || installer.name,
              "description": `${installer.certification_type} solar installer serving ${currentCity.name}, Texas`,
              "image": pageImage,
              "priceRange": "$$-$$$",
              "areaServed": {
                "@type": "City",
                "name": currentCity.name,
                "containedInPlace": {
                  "@type": "State",
                  "name": "Texas",
                  "containedInPlace": {
                    "@type": "Country",
                    "name": "United States"
                  }
                }
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": installer.location_city,
                "addressRegion": installer.location_state,
                "addressCountry": "US"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Solar Installation Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Residential Solar Panel Installation",
                      "description": "Complete solar panel system design and installation for homes"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Commercial Solar Installation",
                      "description": "Large-scale solar solutions for businesses and commercial properties"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Solar Battery Storage",
                      "description": "Energy storage systems for backup power and energy independence"
                    }
                  }
                ]
              }
            }))
          }
        ]}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/cities" className="hover:text-primary transition-colors">
                  Cities
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">{currentCity.name}</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Solar Installers in {currentCity.name}, Texas
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {currentCity.description} Find NABCEP certified solar installation professionals and{" "}
              <Link to="/quote" className="text-primary hover:underline font-semibold">
                get free quotes
              </Link>
              . New to solar?{" "}
              <Link to="/learn" className="text-primary hover:underline font-semibold">
                Learn the basics
              </Link>
              {" "}first.
            </p>
          </div>

          {/* City Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold mb-1">{currentCity.name}</div>
                <div className="text-sm text-muted-foreground">Population: {currentCity.population}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold mb-1">${currentCity.avgElectricRate}</div>
                <div className="text-sm text-muted-foreground">Avg Electric Rate/kWh</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold mb-1">{currentCity.avgSolarCost}</div>
                <div className="text-sm text-muted-foreground">Avg Solar System Cost</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Sun className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold mb-1">{installers.length}</div>
                <div className="text-sm text-muted-foreground">Certified Installers</div>
              </CardContent>
            </Card>
          </div>

          {/* NABCEP Installers Section */}
          {nabcepInstallers.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Top NABCEP Certified Installers in {currentCity.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nabcepInstallers.map((installer) => (
                  <InstallerCard
                    key={installer.id}
                    id={installer.id}
                    name={installer.name}
                    certification_type={installer.certification_type || ""}
                    certification_number={installer.certification_number || ""}
                    certification_expires={installer.certification_expires || ""}
                    company_name={installer.company_name || ""}
                    company_website={installer.company_website || ""}
                    phone={installer.phone || ""}
                    location_city={installer.location_city || ""}
                    location_state={installer.location_state || ""}
                    location_zip={installer.location_zip || ""}
                    country={installer.country || "USA"}
                    is_verified={installer.is_verified || false}
                    is_premium={installer.is_premium || false}
                  />
                ))}
              </div>
            </section>
          )}

          {/* All Installers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">All Solar Installers in {currentCity.name}</h2>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={`city-skeleton-${i}`} className="h-16 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {installers.map((installer) => (
                  <InstallerListCard
                    key={installer.id}
                    id={installer.id}
                    name={installer.name}
                    certification_type={installer.certification_type || ""}
                    certification_number={installer.certification_number || ""}
                    certification_expires={installer.certification_expires || ""}
                    company_name={installer.company_name || ""}
                    company_website={installer.company_website || ""}
                    phone={installer.phone || ""}
                    location_city={installer.location_city || ""}
                    location_state={installer.location_state || ""}
                    location_zip={installer.location_zip || ""}
                    country={installer.country || "USA"}
                    is_verified={installer.is_verified || false}
                    is_premium={installer.is_premium || false}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Map Section */}
          {installers.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Solar Installers Map - {currentCity.name}</h2>
              <Card>
                <CardContent className="p-0">
                  <div className="h-[400px] rounded-lg overflow-hidden">
                    <Suspense 
                      fallback={
                        <div className="flex items-center justify-center h-full bg-muted/40 text-muted-foreground">
                          Loading map...
                        </div>
                      }
                    >
                      <LazyMapComponent
                        installers={installers.slice(0, 20)}
                      />
                    </Suspense>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Solar Incentives */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Solar Incentives in {currentCity.name}</h2>
              <Button asChild variant="outline" size="sm">
                <Link to="/learn">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Learn More About Incentives
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCity.incentives.map((incentive: string, index: number) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="h-6 w-6 text-primary" />
                      <h3 className="font-semibold">{incentive}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {incentive === 'Federal Tax Credit' && '30% federal tax credit on solar system cost through 2032'}
                      {incentive === 'Property Tax Exemption' && 'Solar installations exempt from property tax increases'}
                      {incentive === 'Net Metering' && 'Sell excess solar energy back to the grid for bill credits'}
                      {incentive === 'Oncor Rebates' && 'Utility rebates available for qualifying solar installations'}
                      {incentive === 'CenterPoint Rebates' && 'Local utility rebates for solar system installations'}
                      {incentive === 'CPS Energy Rebates' && 'San Antonio utility rebates for solar customers'}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-muted-foreground mb-4">
                Ready to take advantage of these incentives?{" "}
                <Link to="/quote" className="text-primary hover:underline font-semibold">
                  Request your free solar quote
                </Link>
                {" "}to see how much you can save.
              </p>
            </div>
          </section>

          {/* Solar Calculator Widget */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Estimate Your Solar Savings</h2>
              <p className="text-muted-foreground">
                Calculate how much you could save with solar in {currentCity.name}
              </p>
            </div>
            <SolarCalculatorWidget />
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Solar Installation FAQ - {currentCity.name}</h2>
            <Accordion type="single" collapsible className="w-full">
              {cityFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* CTA Section - Single Primary CTA */}
          <section className="text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Go Solar in {currentCity.name}?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with NABCEP certified solar installers in {currentCity.name}. Compare free quotes, 
              read reviews, and find the perfect solar solution for your home or business.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
              <Link to="/quote">Get My Free Quote</Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              No obligation • Compare multiple quotes • NABCEP certified installers
            </p>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CityPage;
