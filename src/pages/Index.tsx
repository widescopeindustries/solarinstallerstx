import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { FilterBar } from "@/components/FilterBar";
import { InstallerCard } from "@/components/InstallerCard";
import { MapComponent } from "@/components/Map";
import { Pagination } from "@/components/Pagination";
import { ImportInstallers } from "@/components/ImportInstallers";
import { SolarCalculator } from "@/components/SolarCalculator";
import { TrustSignals } from "@/components/TrustSignals";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE = 24;

// Mock data for demonstration (updated with keyword-friendly fields)
const mockInstallers = [
  {
    id: 1,
    name: "SunPower Texas Solutions",
    location: "Austin, TX",
    rating: 4.9,
    reviewCount: 247,
    services: ["Residential Solar Installation", "Commercial Solar Systems", "Battery Storage Texas"],
    isPremium: true,
    certifications: ["NABCEP Certified Solar Installers", "Tesla Powerwall Certified", "BBB A+ Rating Texas"],
    yearsInBusiness: 12,
  },
  {
    id: 2,
    name: "Lone Star Solar & Electric",
    location: "Houston, TX",
    rating: 4.8,
    reviewCount: 189,
    services: ["Residential Solar Panels Texas", "Solar Maintenance", "Solar Financing Options"],
    isPremium: true,
    certifications: ["NABCEP Certified", "Licensed Solar Contractors Texas"],
    yearsInBusiness: 15,
  },
  {
    id: 3,
    name: "Texas Green Energy",
    location: "Dallas, TX",
    rating: 4.7,
    reviewCount: 156,
    services: ["Best Solar Installers Residential", "Commercial Solar Energy Texas", "Solar Panels Installation"],
    isPremium: false,
    certifications: ["NABCEP Certified Solar Installers"],
    yearsInBusiness: 8,
  },
  {
    id: 4,
    name: "Gulf Coast Solar Pros",
    location: "San Antonio, TX",
    rating: 4.9,
    reviewCount: 201,
    services: ["Texas Solar Installers Residential", "Battery Storage Systems", "Solar Panel Maintenance"],
    isPremium: true,
    certifications: ["NABCEP Certified", "Enphase Certified Installers"],
    yearsInBusiness: 10,
  },
  {
    id: 5,
    name: "Solar Solutions DFW",
    location: "Fort Worth, TX",
    rating: 4.6,
    reviewCount: 134,
    services: ["Residential Solar Companies", "Commercial Solar Installers Texas"],
    isPremium: false,
    certifications: ["Licensed Solar Contractors"],
    yearsInBusiness: 6,
  },
  {
    id: 6,
    name: "Panhandle Solar Systems",
    location: "Amarillo, TX",
    rating: 4.8,
    reviewCount: 98,
    services: ["Solar Installers Near Me Residential", "Solar Financing Texas", "Maintenance Services"],
    isPremium: false,
    certifications: ["NABCEP Certified"],
    yearsInBusiness: 7,
  },
  {
    id: 7,
    name: "Hill Country Solar Co.",
    location: "San Marcos, TX",
    rating: 4.7,
    reviewCount: 112,
    services: ["Best Residential Solar Texas", "Battery Storage Installers"],
    isPremium: false,
    certifications: ["Licensed Solar Installers", "Tesla Powerwall Certified"],
    yearsInBusiness: 5,
  },
  {
    id: 8,
    name: "El Paso Solar Experts",
    location: "El Paso, TX",
    rating: 4.9,
    reviewCount: 176,
    services: ["Solar Companies Texas Residential", "Commercial Solar Solutions", "Financing for Solar Panels"],
    isPremium: true,
    certifications: ["NABCEP Certified Solar Installers", "BBB A+ Rating"],
    yearsInBusiness: 11,
  },
];

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [installers, setInstallers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const fetchInstallers = async () => {
    try {
      const { data, error } = await supabase
        .from("installers")
        .select("*")
        .order("is_premium", { ascending: false })
        .order("name");

      if (error) throw error;
      setInstallers(data || []);
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error("Error fetching installers:", error);
      }
      toast({
        title: "Error loading best solar installers in Texas",
        description: "Unable to load NABCEP certified solar companies. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstallers();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);

  // Filter installers based on active filter and search query (enhanced for keyword matching)
  const filteredInstallers = installers.filter((installer) => {
    // Apply search filter with keyword expansion
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        installer.company_name?.toLowerCase().includes(query) ||
        installer.name?.toLowerCase().includes(query) ||
        installer.location_city?.toLowerCase().includes(query) ||
        installer.location_state?.toLowerCase().includes(query) ||
        installer.location_zip?.includes(query) ||
        installer.services?.some((service: string) => service.toLowerCase().includes(query));

      if (!matchesSearch) return false;
    }

    // Apply category filter with keyword-aligned logic
    if (activeFilter === "all") return true;
    if (activeFilter === "premium") return installer.is_premium;
    if (activeFilter === "pvip") return installer.certification_type?.includes("PVIP");
    if (activeFilter === "pvsi") return installer.certification_type?.includes("PVSI");
    if (activeFilter === "esip") return installer.certification_type?.includes("ESIP");
    return installer.services?.some((service: string) => service.toLowerCase().includes(activeFilter.toLowerCase()));
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredInstallers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedInstallers = filteredInstallers.slice(startIndex, endIndex);

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Best Solar Installers in Texas",
          description:
            "Top NABCEP certified solar installers and companies across Texas for residential and commercial solar panels installation",
          numberOfItems: filteredInstallers.length,
          itemListElement: filteredInstallers.slice(0, 10).map((installer, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "LocalBusiness",
              name: installer.company_name || installer.name,
              description: `NABCEP certified solar installer in ${installer.location_city}, Texas offering residential solar installation and commercial solar solutions`,
              address: {
                "@type": "PostalAddress",
                addressLocality: installer.location_city,
                addressRegion: installer.location_state,
                postalCode: installer.location_zip,
              },
              url: installer.company_website,
              telephone: installer.phone,
            },
          })),
        })}
      </script>
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection onSearch={setSearchQuery} />
        
        {/* Main Content Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-foreground">
                Top NABCEP Certified Solar Installers in Texas
              </h1>
              
              <div className="prose prose-lg max-w-none text-muted-foreground mb-12">
                <p className="text-xl leading-relaxed mb-6">
                  Texas leads the nation in solar energy potential, and finding the right installer is crucial for maximizing your investment. Our directory features only <strong>NABCEP certified professionals</strong> who have undergone rigorous training and testing to ensure the highest quality installations across Austin, Houston, Dallas, San Antonio, and throughout the Lone Star State.
                </p>
                
                <h2 className="text-3xl font-bold text-foreground mb-6 mt-12">Why Choose NABCEP Certified Solar Installers?</h2>
                
                <p className="mb-6">
                  The <a href="https://www.nabcep.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">North American Board of Certified Energy Practitioners (NABCEP)</a> is the gold standard for solar installation certification. NABCEP certified installers have demonstrated expertise in:
                </p>
                
                <ul className="list-disc pl-6 mb-8 space-y-2">
                  <li><strong>PV Installation Professional (PVIP)</strong> - Comprehensive solar panel installation and system design</li>
                  <li><strong>PV System Inspector (PVSI)</strong> - Quality assurance and system inspection expertise</li>
                  <li><strong>Energy Storage Installation Professional (ESIP)</strong> - Battery storage and backup power systems</li>
                  <li><strong>Solar Heating Installer (SHI)</strong> - Solar thermal and water heating systems</li>
                </ul>
                
                <h2 className="text-3xl font-bold text-foreground mb-6">Texas Solar Installation Benefits</h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4">Financial Advantages</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">💰</span>
                        <span><strong><a href="https://www.energy.gov/eere/solar/homeowners-guide-federal-tax-credit-solar" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">26% Federal Tax Credit</a></strong> - Significant savings on your solar investment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">📈</span>
                        <span><strong>Property Value Increase</strong> - Solar adds $15,000+ to home value on average</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">⚡</span>
                        <span><strong>Net Metering</strong> - Sell excess energy back to the grid</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">🏠</span>
                        <span><strong>No Property Tax Increase</strong> - Texas exempts solar from property taxes</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4">Environmental Impact</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">🌱</span>
                        <span><strong>Clean Energy</strong> - Reduce carbon footprint by 80%</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">☀️</span>
                        <span><strong>Abundant Sunshine</strong> - Texas averages 5+ peak sun hours daily</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">🌍</span>
                        <span><strong>Sustainability</strong> - Contribute to Texas renewable energy goals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">🔋</span>
                        <span><strong>Energy Independence</strong> - Reduce reliance on traditional utilities</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-foreground mb-6">Solar Installation Process</h2>
                
                <div className="mb-8">
                  <img 
                    src="/placeholder.svg" 
                    alt="Professional solar installation team working on residential rooftop solar panel system in Texas"
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                </div>
                
                <div className="bg-card border rounded-lg p-6 mb-8">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">1</div>
                      <h3 className="font-semibold mb-2">Site Assessment</h3>
                      <p className="text-sm text-muted-foreground">Professional evaluation of your roof, electrical system, and energy needs</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">2</div>
                      <h3 className="font-semibold mb-2">System Design</h3>
                      <p className="text-sm text-muted-foreground">Custom solar system design optimized for your property and goals</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">3</div>
                      <h3 className="font-semibold mb-2">Permits & Installation</h3>
                      <p className="text-sm text-muted-foreground">Professional installation with all required permits and inspections</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">4</div>
                      <h3 className="font-semibold mb-2">Activation</h3>
                      <p className="text-sm text-muted-foreground">System activation, monitoring setup, and ongoing support</p>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-foreground mb-6">Major Texas Cities We Serve</h2>
                
                <div className="mb-8">
                  <img 
                    src="/placeholder.svg" 
                    alt="Map of Texas showing major cities served by NABCEP certified solar installers including Austin, Houston, Dallas, San Antonio"
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Austin</h3>
                    <p className="text-muted-foreground mb-3">Texas capital leads in renewable energy adoption with excellent solar incentives and net metering programs.</p>
                    <ul className="text-sm space-y-1">
                      <li>• <a href="https://austinenergy.com/go/renewable-energy/residential/solar" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Austin Energy rebates</a> up to $2,500</li>
                      <li>• Net metering available</li>
                      <li>• 250+ sunny days annually</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Houston</h3>
                    <p className="text-muted-foreground mb-3">Energy capital of the world with growing solar market and competitive installation costs.</p>
                    <ul className="text-sm space-y-1">
                      <li>• CenterPoint Energy interconnection</li>
                      <li>• Strong solar contractor network</li>
                      <li>• High electricity rates drive ROI</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Dallas</h3>
                    <p className="text-muted-foreground mb-3">Major metropolitan area with Oncor utility territory offering streamlined solar interconnection.</p>
                    <ul className="text-sm space-y-1">
                      <li>• Oncor net metering program</li>
                      <li>• Dallas Solar Initiative</li>
                      <li>• Growing commercial solar market</li>
                    </ul>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-foreground mb-6">Customer Testimonials</h2>
                
                <div className="mb-8">
                  <img 
                    src="/placeholder.svg" 
                    alt="Happy Texas homeowners with their newly installed solar panel system showing reduced electricity bills"
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-card border rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        ★★★★★
                      </div>
                      <span className="ml-2 font-semibold">5.0</span>
                    </div>
                    <p className="text-muted-foreground mb-4">"Our NABCEP certified installer made the entire process seamless. From initial consultation to final inspection, everything was handled professionally. Our electricity bills have dropped by 85%!"</p>
                    <div className="font-semibold">- Sarah M., Austin TX</div>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        ★★★★★
                      </div>
                      <span className="ml-2 font-semibold">5.0</span>
                    </div>
                    <p className="text-muted-foreground mb-4">"The installer's expertise was evident throughout the project. They explained every step, handled all permits, and the system has exceeded our energy production expectations. Highly recommend!"</p>
                    <div className="font-semibold">- Michael R., Houston TX</div>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                
                <div className="space-y-6 mb-12">
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">How much does solar installation cost in Texas?</h3>
                    <p className="text-muted-foreground">Solar installation costs in Texas typically range from $2.50-$3.50 per watt, with average residential systems costing $15,000-$25,000 before incentives. The federal tax credit reduces this by 26%, and many Texas utilities offer additional rebates.</p>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">How long does solar installation take?</h3>
                    <p className="text-muted-foreground">Most residential solar installations are completed in 1-3 days, but the entire process from contract to activation typically takes 4-8 weeks due to permitting, utility approvals, and inspections.</p>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Do I need NABCEP certification to install solar?</h3>
                    <p className="text-muted-foreground">While not legally required in Texas, NABCEP certification demonstrates installer expertise and is often required for utility rebates and financing programs. It's the industry standard for quality assurance.</p>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">What warranties do solar systems come with?</h3>
                    <p className="text-muted-foreground">Quality solar systems include 25-year panel warranties, 10-25 year inverter warranties, and 10-year workmanship warranties. NABCEP certified installers typically offer comprehensive warranty coverage.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How We Vet Installers */}
        <section className="bg-primary/5 border-y border-border py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-card border rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span> How We Vet Best Solar Installers in Texas
              </h2>
              <p className="text-muted-foreground mb-4">
                Every verified NABCEP certified solar installer on SolarInstallersTX undergoes rigorous checks for Texas
                solar companies to ensure quality residential solar installation and commercial solar energy services.
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>NABCEP certification verification for solar panels Texas</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>TDLR electrical contractor license for Texas solar installers</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Liability & workers' comp insurance for solar companies</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>BBB ratings & business registration for best solar companies in Texas</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex flex-wrap gap-4">
                  <a href="/texas-guide" className="text-primary hover:underline font-medium">
                    Learn more about our verification process →
                  </a>
                  <a href="/about" className="text-primary hover:underline font-medium">
                    About SolarInstallersTX →
                  </a>
                  <a href="/contact" className="text-primary hover:underline font-medium">
                    Contact Us →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solar Calculator Section */}
        <section id="solar-calculator" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Calculate Your Solar Savings
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get an instant estimate of your solar savings potential with our free calculator
              </p>
            </div>
            <SolarCalculator 
              onGetQuote={(data) => {
                toast({
                  title: "Quote Request Received!",
                  description: `We'll connect you with NABCEP certified installers in your area. Expected savings: $${data.annualSavings.toLocaleString()}/year`,
                });
              }}
            />
          </div>
        </section>

        {/* Trust Signals Section */}
        <section id="testimonials" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Trust SolarInstallersTX?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We only work with the most qualified, certified solar professionals in Texas
              </p>
            </div>
            <TrustSignals />
          </div>
        </section>

      <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <main className="container mx-auto px-4 py-12" role="main" id="results-section">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {activeFilter === "all"
                  ? "Best Solar Installers in Texas"
                  : activeFilter === "premium"
                    ? "Premium NABCEP Certified Solar Companies Texas"
                    : activeFilter === "pvip"
                      ? "PVIP Certified Solar Installers Texas"
                      : activeFilter === "pvsi"
                        ? "PVSI Certified Residential Solar Installers"
                        : activeFilter === "esip"
                          ? "Energy Storage Solar Battery Installers Texas"
                          : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Solar Energy Companies`}
              </h2>
              <p className="text-muted-foreground">
                {filteredInstallers.length} top solar installer{filteredInstallers.length !== 1 ? "s" : ""} found for
                Texas solar panels and installation
              </p>
            </div>
            <div className="flex gap-2">{/* Import functionality moved to Admin page */}</div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-[200px] w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : viewMode === "grid" ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedInstallers.map((installer) => (
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
                  />
                ))}
              </div>

              {filteredInstallers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No best solar companies in Texas found for this filter. Try residential solar installation or other
                    categories.
                  </p>
                </div>
              )}

              {filteredInstallers.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={ITEMS_PER_PAGE}
                  totalItems={filteredInstallers.length}
                />
              )}
            </>
          ) : (
            <div className="h-[600px] rounded-lg overflow-hidden border">
              <MapComponent
                installers={filteredInstallers.map((i) => ({
                  id: i.id,
                  name: i.name,
                  latitude: i.latitude || 0,
                  longitude: i.longitude || 0,
                  location_city: i.location_city,
                  location_state: i.location_state,
                  is_premium: i.is_premium,
                  certification_type: i.certification_type,
                }))}
              />
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
