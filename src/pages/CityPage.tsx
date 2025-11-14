import { useState, useEffect, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { ServiceAreaSearch } from "@/components/ServiceAreaSearch";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Skeleton } from "@/components/ui/skeleton";
import { Database } from "@/integrations/supabase/types";

// Lazy load for better code-splitting
const LazyQuoteCTA = lazy(() => import("@/components/QuoteCTA").then(m => ({ default: m.QuoteCTA })));
const LazyAffiliateDisclosure = lazy(() => import("@/components/AffiliateDisclosure").then(m => ({ default: m.AffiliateDisclosure })));
import { InstallerListCard } from "@/components/InstallerListCard";
import { InstallerCard } from "@/components/InstallerCard";
import { SolarCalculatorWidget } from "@/components/SolarCalculatorWidget";
import { LastUpdated } from "@/components/LastUpdated";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { buildInstallerPath } from "@/lib/slugify";
import { logEvent } from "@/lib/analytics";
import { MapPin, Zap, DollarSign, Sun, Lightbulb, CheckCircle, User } from "lucide-react";
import { getCityBySlug } from "@/data/texasCities";

type Installer = Database['public']['Tables']['installers']['Row'];

const CityPage = () => {
  const { city } = useParams<{ city: string }>();
  const [installers, setInstallers] = useState<Installer[]>([]);
  const [nabcepInstallers, setNabcepInstallers] = useState<Installer[]>([]);
  const [loading, setLoading] = useState(true);
  const [nabcepLoading, setNabcepLoading] = useState(true);
  const { toast } = useToast();

  // Get city data from centralized data source
  const currentCity = getCityBySlug(city || '') || {
    name: city?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'City',
    slug: city || '',
    state: 'Texas',
    population: 'N/A',
    avgElectricRate: '0.11',
    avgSolarCost: '$18,000',
    sunHoursPerDay: 5.2,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption'],
    description: `Learn about solar installation opportunities in ${city?.replace('-', ' ')}.`
  };

  // Legacy cityData for backwards compatibility (now uses central data)
  const cityData: Record<string, {
    name: string;
    state: string;
    population: string;
    avgElectricRate: string;
    avgSolarCost: string;
    incentives: string[];
    description: string;
  }> = {
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
    },
    'el-paso': {
      name: 'El Paso',
      state: 'Texas',
      population: '678,815',
      avgElectricRate: '0.10',
      avgSolarCost: '$15,800',
      incentives: ['Federal Tax Credit', 'Property Tax Exemption', 'El Paso Electric Rebates'],
      description: 'El Paso enjoys exceptional solar irradiance with over 300 sunny days per year, making it ideal for solar energy production.'
    },
    'arlington': {
      name: 'Arlington',
      state: 'Texas',
      population: '394,266',
      avgElectricRate: '0.11',
      avgSolarCost: '$17,600',
      incentives: ['Federal Tax Credit', 'Property Tax Exemption', 'Oncor Rebates'],
      description: 'Arlington homeowners benefit from competitive solar pricing and strong net metering policies in the DFW metroplex.'
    },
    'corpus-christi': {
      name: 'Corpus Christi',
      state: 'Texas',
      population: '317,863',
      avgElectricRate: '0.10',
      avgSolarCost: '$16,400',
      incentives: ['Federal Tax Credit', 'Property Tax Exemption', 'AEP Rebates'],
      description: 'Corpus Christi\'s coastal location provides consistent solar production with excellent ROI for Gulf Coast homeowners.'
    },
    'plano': {
      name: 'Plano',
      state: 'Texas',
      population: '285,494',
      avgElectricRate: '0.11',
      avgSolarCost: '$17,900',
      incentives: ['Federal Tax Credit', 'Property Tax Exemption', 'Oncor Rebates'],
      description: 'Plano leads North Texas suburbs in solar adoption with affluent homeowners investing in renewable energy systems.'
    },
    'lubbock': {
      name: 'Lubbock',
      state: 'Texas',
      population: '257,141',
      avgElectricRate: '0.10',
      avgSolarCost: '$16,100',
      incentives: ['Federal Tax Credit', 'Property Tax Exemption', 'LP&L Rebates'],
      description: 'Lubbock\'s high-plains climate and abundant sunshine make it one of Texas\'s premier locations for solar energy.'
    },
    'laredo': {
      name: 'Laredo',
      state: 'Texas',
      population: '255,205',
      avgElectricRate: '0.09',
      avgSolarCost: '$15,900',
      incentives: ['Federal Tax Credit', 'Property Tax Exemption', 'AEP Rebates'],
      description: 'Laredo\'s border location offers excellent solar potential with some of the lowest electricity rates in South Texas.'
    },
    'frisco': {
      name: 'Frisco',
      state: 'Texas',
      population: '200,509',
      avgElectricRate: '0.11',
      avgSolarCost: '$18,200',
      incentives: ['Federal Tax Credit', 'Property Tax Exemption', 'Oncor Rebates'],
      description: 'Fast-growing Frisco features modern homes with excellent solar potential and strong homeowner adoption rates.'
    },
    'mckinney': {
      name: 'McKinney',
      state: 'Texas',
      population: '199,177',
      avgElectricRate: '0.11',
      avgSolarCost: '$18,100',
      incentives: ['Federal Tax Credit', 'Property Tax Exemption', 'Oncor Rebates'],
      description: 'McKinney\'s family-friendly community embraces solar with modern infrastructure and competitive installer pricing.'
    },
    'killeen': {
      name: 'Killeen',
      state: 'Texas',
      population: '153,095',
      avgElectricRate: '0.10',
      avgSolarCost: '$16,800',
      incentives: ['Federal Tax Credit', 'Property Tax Exemption', 'Oncor Rebates'],
      description: 'Killeen and Fort Hood area homeowners enjoy strong military community support for renewable energy adoption.'
    },
    'waco': {
      name: 'Waco',
      state: 'Texas',
      population: '138,486',
      avgElectricRate: '0.10',
      avgSolarCost: '$16,500',
      incentives: ['Federal Tax Credit', 'Property Tax Exemption', 'Texas New Mexico Power Rebates'],
      description: 'Central Texas location provides Waco with excellent solar exposure and growing installer competition for better pricing.'
    }
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
    } catch (error) {
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
    } catch (error) {
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

  const pageTitle = `Solar Installers ${currentCity.name} TX | NABCEP Certified`;
  const pageDescription = `Compare ${installers.length} NABCEP solar installers in ${currentCity.name}, TX. Average ${currentCity.avgSolarCost}. Get 30% federal tax credit. Free quotes today.`;
  const pageImage = "https://solarinstallerstx.com/opengraph-image.svg";

  const handleQuoteRequest = (matchingInstallers: Installer[]) => {
    // Track the quote request event
    logEvent('city_page_quote_request', {
      city: currentCity.name,
      installers: matchingInstallers.length
    });

    // You can implement the quote request logic here
    toast({
      title: "Quote Request Received",
      description: "We'll connect you with these installers shortly.",
    });
  };

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={`https://solarinstallerstx.com/cities/${city}`}
        ogImage={pageImage}
        ogType="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://solarinstallerstx.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Installers",
              "item": "https://solarinstallerstx.com/installers"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": currentCity.name,
              "item": `https://solarinstallerstx.com/cities/${city}`
            }
          ]
        }}
        // Note: Additional schemas are injected via prerender-city-schemas.ts post-build script
        // to ensure Google crawlers see static HTML with real installer data.
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
                <Link to="/installers" className="hover:text-primary transition-colors">
                  Installers
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">{currentCity.name}</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Trusted Solar Installers in {currentCity.name}, Texas - Safety Rated
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find financially stable, NABCEP-certified solar installers in {currentCity.name}. After 100+ bankruptcies in 2024-2025, we verify installer financial health so you don't get stuck with a broken system. {" "}
              <Link to="/quote" className="text-primary hover:underline font-semibold">
                Get your free {currentCity.name} solar quote
              </Link>
              {" "}or{" "}
              <Link to="/safety-score-explained" className="text-primary hover:underline font-semibold">
                understand our proprietary Safety Score System
              </Link>
              .
            </p>
            <div className="mt-4 flex justify-center">
              <LastUpdated />
            </div>
          </div>

          {/* Trust Stats for City */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">{installers.length}</div>
                <div className="text-sm text-muted-foreground">Verified Installers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">{nabcepInstallers.length}</div>
                <div className="text-sm text-muted-foreground">NABCEP Certified (Gold)</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">8.2</div>
                <div className="text-sm text-muted-foreground">Avg Safety Score</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Financial Stability Verified</div>
              </CardContent>
            </Card>
          </div>

          {/* City-Specific Bankruptcy Warning */}
          <Card className="bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500 mb-8 max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="text-amber-600 dark:text-amber-400 mt-1">⚠️</div>
                <div>
                  <h2 className="text-lg font-bold mb-2 text-amber-900 dark:text-amber-100">
                    Solar Installer Bankruptcies Affecting {currentCity.name}
                  </h2>
                  <p className="text-amber-900 dark:text-amber-100 leading-relaxed">
                    <strong>Sunnova Energy</strong> (Houston-based) filed Chapter 11 in June 2025 with $8.5B in debt, affecting thousands of Texas homeowners including {currentCity.name} residents. <strong>Titan Solar</strong> abruptly shut down in June 2024. If you signed contracts with either company, <Link to="/sunnova-help" className="underline font-semibold">get help recovering from solar company bankruptcy</Link>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monetization CTA - Premium Listing Signup */}
          <Suspense fallback={<div className="h-32 bg-muted animate-pulse rounded-lg mb-4" />}>
            <LazyQuoteCTA className="mb-4" />
          </Suspense>
          <Suspense fallback={<div className="h-12 bg-muted animate-pulse rounded-lg mb-12" />}>
            <LazyAffiliateDisclosure className="mb-12" />
          </Suspense>

          {/* Service Area Search */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Find Installers in Your Area</h2>
              <p className="text-muted-foreground">
                Enter your address to find certified solar installers that service your location
              </p>
            </div>
            <ServiceAreaSearch 
              installers={installers} 
              onRequestQuote={handleQuoteRequest}
            />
          </section>

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

          {/* Map Section - Removed for performance */}
          {/* {installers.length > 0 && (
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
          )} */}

          {/* Solar Incentives */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Solar Incentives in {currentCity.name}</h2>
              <Button asChild variant="outline" size="sm">
                <Link to="/learn/texas-incentives">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Complete Texas Incentive Guide
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
                  Get your personalized {currentCity.name} solar quote today
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

          {/* Package 1: Local SEO Content Blocks */}

          {/* City-Specific Statistics */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Solar Energy Statistics for {currentCity.name}</h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-muted-foreground leading-relaxed">
                  {currentCity.name} receives abundant sunlight year-round, making it an ideal location for solar energy production.
                  The average energy rate from local utility providers is approximately ${currentCity.avgElectricRate}/kWh,
                  with many homeowners seeing significant savings by switching to solar.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  <strong className="text-foreground">Note:</strong> This section will be populated with unique local data including:
                  average sunlight days, current average energy rates from {currentCity.name}'s utility provider,
                  and local solar adoption statistics specific to this market.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Local Incentives & Rebates */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{currentCity.name} Specific Solar Incentives & Rebates</h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-muted-foreground leading-relaxed">
                  Beyond the federal tax credit and Texas state property tax exemption, {currentCity.name} offers
                  additional local incentives and rebates through municipal programs and local utility companies.
                </p>
                <div className="mt-6 p-6 bg-muted/50 rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-3">Currently Available Local Programs:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {currentCity.incentives.map((incentive: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{incentive}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  <strong className="text-foreground">Coming soon:</strong> Detailed information about specific programs,
                  tax breaks, and rebates offered by the city of {currentCity.name} or local utility companies,
                  separate from the general Texas and Federal incentives listed above.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Local Permitting Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">What to Know About Solar Permitting in {currentCity.name}</h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-muted-foreground leading-relaxed">
                  Installing solar panels in {currentCity.name} requires proper permits and inspections to ensure your system
                  meets local building codes and electrical standards. The good news is that NABCEP-certified installers listed
                  on this site handle the entire permitting process for you.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Building Permit</h3>
                      <p className="text-muted-foreground text-sm">
                        Required for structural modifications and equipment installation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Electrical Permit</h3>
                      <p className="text-muted-foreground text-sm">
                        Covers all electrical work and grid connection requirements
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Utility Interconnection</h3>
                      <p className="text-muted-foreground text-sm">
                        Agreement with your local utility to connect your solar system to the grid
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mt-6">
                  <strong className="text-foreground">Note:</strong> This section will be updated with a brief overview
                  of the specific solar permitting process in {currentCity.name}, including typical timelines, fees,
                  and links to official city resources.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Local Trust Signals - Testimonials */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Hear from {currentCity.name} Homeowners</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">[Homeowner Name]</p>
                        <p className="text-sm text-muted-foreground">{currentCity.name}, TX</p>
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground italic border-l-4 border-primary pl-4">
                    "Testimonial quote from a local homeowner about their solar installation experience
                    in {currentCity.name}. This will showcase real experiences from Texas residents."
                  </blockquote>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">[Homeowner Name]</p>
                        <p className="text-sm text-muted-foreground">{currentCity.name}, TX</p>
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground italic border-l-4 border-primary pl-4">
                    "Another testimonial from a satisfied solar customer in {currentCity.name},
                    highlighting the benefits and installer service quality they experienced."
                  </blockquote>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">[Homeowner Name]</p>
                        <p className="text-sm text-muted-foreground">{currentCity.name}, TX</p>
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground italic border-l-4 border-primary pl-4">
                    "Third testimonial showcasing positive outcomes, energy savings, and the smooth
                    installation process for homeowners in {currentCity.name}."
                  </blockquote>
                </CardContent>
              </Card>
            </div>
            <div className="mt-6 text-center">
              <p className="text-muted-foreground mb-4">
                Ready to join these satisfied homeowners?{" "}
                <Link to="/quote" className="text-primary hover:underline font-semibold">
                  Request your free {currentCity.name} solar installation quote
                </Link>
              </p>
            </div>
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
              read verified reviews, and find the perfect solar solution for your home or business.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
              <Link to="/quote">Get My Free {currentCity.name} Solar Quote</Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              No obligation • Compare multiple certified installers • NABCEP certified & verified
            </p>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CityPage;
