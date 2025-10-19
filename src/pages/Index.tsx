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
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { TrustSignals } from "@/components/TrustSignals";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
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
      <SEOHead
        title="Best Solar Installers Texas | SolarInstallersTX | NABCEP Certified"
        description="Find the best NABCEP certified solar installers in Texas. Compare top solar companies and get free quotes!"
        canonicalUrl="https://solarinstallerstx.com"
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Solar Installers TX",
          "description": "Directory of NABCEP certified solar installers in Texas",
          "url": "https://solarinstallerstx.com",
          "logo": "https://solarinstallerstx.com/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-682-999-0953",
            "contactType": "customer service",
            "areaServed": "TX",
            "availableLanguage": "English"
          },
          "areaServed": {
            "@type": "State",
            "name": "Texas"
          },
          "serviceType": "Solar Installation Services",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Solar Installation Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Residential Solar Installation",
                  "description": "NABCEP certified residential solar panel installation"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Service",
                  "name": "Commercial Solar Installation",
                  "description": "NABCEP certified commercial solar panel installation"
                }
              }
            ]
          }
        }}
      />
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

                {/* Solar Cost Comparison Table */}
                <div className="bg-card border rounded-lg p-6 mb-12">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Texas Solar Installation Costs by City</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">City</th>
                          <th className="text-left py-3 px-4 font-semibold">Avg Cost/Watt</th>
                          <th className="text-left py-3 px-4 font-semibold">6kW System</th>
                          <th className="text-left py-3 px-4 font-semibold">Utility Rebates</th>
                          <th className="text-left py-3 px-4 font-semibold">Net Metering</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-4">Austin</td>
                          <td className="py-3 px-4">$2.85</td>
                          <td className="py-3 px-4">$17,100</td>
                          <td className="py-3 px-4">Up to $2,500</td>
                          <td className="py-3 px-4">✅ Yes</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-4">Houston</td>
                          <td className="py-3 px-4">$2.75</td>
                          <td className="py-3 px-4">$16,500</td>
                          <td className="py-3 px-4">Limited</td>
                          <td className="py-3 px-4">✅ Yes</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-4">Dallas</td>
                          <td className="py-3 px-4">$2.90</td>
                          <td className="py-3 px-4">$17,400</td>
                          <td className="py-3 px-4">City Programs</td>
                          <td className="py-3 px-4">✅ Yes</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">San Antonio</td>
                          <td className="py-3 px-4">$2.80</td>
                          <td className="py-3 px-4">$16,800</td>
                          <td className="py-3 px-4">Up to $2,500</td>
                          <td className="py-3 px-4">✅ Yes</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    *Prices before federal tax credit. Actual costs may vary based on system size, roof complexity, and installer.
                  </p>
                </div>

                {/* Solar Panel Types Comparison */}
                <div className="bg-card border rounded-lg p-6 mb-12">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Solar Panel Types: Which is Best for Texas?</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Panel Type</th>
                          <th className="text-left py-3 px-4 font-semibold">Efficiency</th>
                          <th className="text-left py-3 px-4 font-semibold">Cost/Watt</th>
                          <th className="text-left py-3 px-4 font-semibold">Texas Climate</th>
                          <th className="text-left py-3 px-4 font-semibold">Best For</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-4 font-medium">Monocrystalline</td>
                          <td className="py-3 px-4">20-22%</td>
                          <td className="py-3 px-4">$3.00-$3.50</td>
                          <td className="py-3 px-4">✅ Excellent</td>
                          <td className="py-3 px-4">Limited roof space</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-4 font-medium">Polycrystalline</td>
                          <td className="py-3 px-4">15-17%</td>
                          <td className="py-3 px-4">$2.50-$3.00</td>
                          <td className="py-3 px-4">✅ Good</td>
                          <td className="py-3 px-4">Budget-conscious</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-4 font-medium">Thin-Film</td>
                          <td className="py-3 px-4">10-13%</td>
                          <td className="py-3 px-4">$2.00-$2.50</td>
                          <td className="py-3 px-4">⚠️ Heat sensitive</td>
                          <td className="py-3 px-4">Large installations</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium">PERC</td>
                          <td className="py-3 px-4">21-23%</td>
                          <td className="py-3 px-4">$3.20-$3.80</td>
                          <td className="py-3 px-4">✅ Excellent</td>
                          <td className="py-3 px-4">Maximum efficiency</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">
                      💡 <strong>Texas Recommendation:</strong> Monocrystalline panels are ideal for Texas due to high efficiency in hot climates and excellent performance during peak sun hours.
                    </p>
                  </div>
                </div>

                {/* Key Statistics */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-12">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Texas Solar Energy Statistics</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">5.2</div>
                      <div className="text-sm text-muted-foreground">Peak Sun Hours/Day</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">26%</div>
                      <div className="text-sm text-muted-foreground">Federal Tax Credit</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">$15K+</div>
                      <div className="text-sm text-muted-foreground">Property Value Increase</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">80%</div>
                      <div className="text-sm text-muted-foreground">Electricity Bill Reduction</div>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-foreground mb-6">Solar Installation Process</h2>
                
                <div className="mb-8">
                  <OptimizedImage 
                    src="/placeholder.svg" 
                    alt="Professional solar installation team working on residential rooftop solar panel system in Texas"
                    className="w-full h-64 object-cover rounded-lg mb-6"
                    width={800}
                    height={400}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
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
                
                {/* Detailed Installation Process */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg p-6 mb-12">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Complete Solar Installation Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Initial Consultation & Site Assessment (1-2 days)</h4>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                          <li>• Roof condition and structural analysis</li>
                          <li>• Electrical panel capacity evaluation</li>
                          <li>• Shading analysis and optimal panel placement</li>
                          <li>• Energy usage history review</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">System Design & Proposal (3-5 days)</h4>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                          <li>• Custom system sizing and component selection</li>
                          <li>• Financial analysis and ROI projections</li>
                          <li>• Detailed proposal with pricing and timeline</li>
                          <li>• Financing options and incentive applications</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Permits & Approvals (2-4 weeks)</h4>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                          <li>• Building permits from local jurisdiction</li>
                          <li>• Electrical permits and inspections</li>
                          <li>• Utility interconnection application</li>
                          <li>• HOA approval (if applicable)</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Installation (1-3 days)</h4>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                          <li>• Racking system installation</li>
                          <li>• Solar panel mounting and wiring</li>
                          <li>• Inverter and electrical connections</li>
                          <li>• System testing and commissioning</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Final Inspections & Activation (1-2 weeks)</h4>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                          <li>• City building inspection</li>
                          <li>• Electrical inspection</li>
                          <li>• Utility meter installation</li>
                          <li>• System activation and monitoring setup</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Texas Solar Market Overview */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-8 mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-6">Why Texas is America's Solar Powerhouse</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">Solar Energy Leadership</h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">🏆</span>
                          <span><strong>#1 in Solar Potential:</strong> Texas leads the nation with 5.2+ peak sun hours daily</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">📈</span>
                          <span><strong>Rapid Growth:</strong> Solar capacity increased 300% in the last 5 years</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">💰</span>
                          <span><strong>Cost Competitive:</strong> Solar now cheaper than fossil fuels in most areas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">🌱</span>
                          <span><strong>Environmental Impact:</strong> Reducing carbon emissions by millions of tons annually</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">Economic Benefits</h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">💼</span>
                          <span><strong>Job Creation:</strong> 50,000+ solar jobs across Texas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">🏠</span>
                          <span><strong>Property Values:</strong> Homes with solar sell 20% faster</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">⚡</span>
                          <span><strong>Energy Independence:</strong> Reduce reliance on traditional utilities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">🏛️</span>
                          <span><strong>Tax Benefits:</strong> Property tax exemption for solar installations</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Solar Financing Options */}
                <div className="bg-card border rounded-lg p-8 mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-6">Solar Financing Options in Texas</h2>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-4">Cash Purchase</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                        <li>• Lowest total cost over system lifetime</li>
                        <li>• Immediate ownership and tax benefits</li>
                        <li>• No monthly payments or interest</li>
                        <li>• Maximum ROI potential</li>
                      </ul>
                      <div className="text-lg font-bold text-green-600">Best ROI: 15-20 years</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-4">Solar Loans</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                        <li>• $0 down payment options available</li>
                        <li>• Fixed interest rates (3-7%)</li>
                        <li>• Immediate electricity bill savings</li>
                        <li>• Ownership after loan payoff</li>
                      </ul>
                      <div className="text-lg font-bold text-blue-600">Typical Term: 10-20 years</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-4">Solar Leases/PPAs</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                        <li>• No upfront costs</li>
                        <li>• Fixed monthly payments</li>
                        <li>• Maintenance included</li>
                        <li>• Immediate savings on electricity</li>
                      </ul>
                      <div className="text-lg font-bold text-purple-600">Contract: 20-25 years</div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">💡 Financing Recommendation</h3>
                    <p className="text-muted-foreground">
                      <strong>Cash purchase</strong> offers the best long-term value, but <strong>solar loans</strong> with $0 down are popular for immediate savings without large upfront investment. 
                      Avoid leases if you plan to sell your home within 10 years, as they can complicate real estate transactions.
                    </p>
                  </div>
                </div>

                {/* Solar Technology Deep Dive */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg p-8 mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-6">Solar Technology: What's Best for Texas?</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">Panel Technology Comparison</h3>
                      <div className="space-y-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-2">Monocrystalline Silicon</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Highest efficiency (20-22%)</li>
                            <li>• Best performance in hot climates</li>
                            <li>• Longest lifespan (25+ years)</li>
                            <li>• Higher upfront cost</li>
                          </ul>
                        </div>
                        
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-2">Polycrystalline Silicon</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Good efficiency (15-17%)</li>
                            <li>• Lower cost per watt</li>
                            <li>• Slightly less efficient in heat</li>
                            <li>• Good value for money</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">Inverter Technology</h3>
                      <div className="space-y-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-2">String Inverters</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Most cost-effective option</li>
                            <li>• Centralized monitoring</li>
                            <li>• Easy maintenance</li>
                            <li>• Good for unshaded roofs</li>
                          </ul>
                        </div>
                        
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-2">Microinverters</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Panel-level optimization</li>
                            <li>• Better for shaded areas</li>
                            <li>• Individual panel monitoring</li>
                            <li>• Higher upfront cost</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-foreground mb-3">🏆 Texas Climate Recommendation</h3>
                    <p className="text-muted-foreground">
                      For Texas's hot climate and abundant sunshine, <strong>monocrystalline panels with string inverters</strong> offer the best balance of efficiency, 
                      durability, and cost-effectiveness. The high efficiency helps maximize energy production during peak sun hours, while the robust construction 
                      handles Texas's extreme temperatures better than other technologies.
                    </p>
                  </div>
                </div>
                
                {/* Solar Maintenance & Warranties */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-8 mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-6">Solar System Maintenance & Warranties</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">Maintenance Requirements</h3>
                      <div className="space-y-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-2">Regular Maintenance</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Visual inspection for damage or debris</li>
                            <li>• Panel cleaning (2-4 times per year)</li>
                            <li>• Monitoring system performance</li>
                            <li>• Check for shading issues</li>
                          </ul>
                        </div>
                        
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-2">Annual Professional Service</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Electrical connections inspection</li>
                            <li>• Inverter performance check</li>
                            <li>• Mounting system integrity</li>
                            <li>• Warranty compliance verification</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">Warranty Coverage</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-2 font-semibold">Component</th>
                              <th className="text-left py-2 font-semibold">Warranty Period</th>
                              <th className="text-left py-2 font-semibold">Coverage</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-border/50">
                              <td className="py-2">Solar Panels</td>
                              <td className="py-2">25 years</td>
                              <td className="py-2">Performance & defects</td>
                            </tr>
                            <tr className="border-b border-border/50">
                              <td className="py-2">Inverters</td>
                              <td className="py-2">10-25 years</td>
                              <td className="py-2">Manufacturing defects</td>
                            </tr>
                            <tr className="border-b border-border/50">
                              <td className="py-2">Workmanship</td>
                              <td className="py-2">10 years</td>
                              <td className="py-2">Installation quality</td>
                            </tr>
                            <tr className="border-b border-border/50">
                              <td className="py-2">Monitoring</td>
                              <td className="py-2">10-25 years</td>
                              <td className="py-2">System monitoring</td>
                            </tr>
                            <tr>
                              <td className="py-2">Racking</td>
                              <td className="py-2">20 years</td>
                              <td className="py-2">Structural integrity</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-foreground mb-3">🛡️ Texas-Specific Considerations</h3>
                    <p className="text-muted-foreground">
                      Texas's extreme weather (hail, high winds, intense heat) requires robust warranties and regular maintenance. 
                      Look for installers offering <strong>hail damage protection</strong> and <strong>wind load warranties</strong> specifically designed for Texas climate conditions. 
                      Most quality installers provide comprehensive coverage for weather-related damage.
                    </p>
                  </div>
                </div>
                
                {/* Enhanced CTA Section */}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-8 mb-16">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Your Solar Journey?</h2>
                    <p className="text-xl mb-8 opacity-90">
                      Join thousands of Texas homeowners who are saving money and reducing their carbon footprint with solar energy.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <div className="text-3xl mb-3">📞</div>
                        <h3 className="text-lg font-semibold mb-2">Get Free Quotes</h3>
                        <p className="text-sm opacity-90 mb-4">Compare quotes from multiple NABCEP certified installers in your area</p>
                        <Button variant="secondary" className="w-full">
                          Request Quotes Now
                        </Button>
                      </div>
                      
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <div className="text-3xl mb-3">💰</div>
                        <h3 className="text-lg font-semibold mb-2">Calculate Savings</h3>
                        <p className="text-sm opacity-90 mb-4">Use our calculator to see your potential solar savings and ROI</p>
                        <Button variant="secondary" className="w-full">
                          Calculate Now
                        </Button>
                      </div>
                      
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <div className="text-3xl mb-3">🏠</div>
                        <h3 className="text-lg font-semibold mb-2">Find Installers</h3>
                        <p className="text-sm opacity-90 mb-4">Browse our directory of certified solar installers near you</p>
                        <Button variant="secondary" className="w-full">
                          Browse Installers
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Solar Calculator */}
                <SolarCalculator className="mb-16" />

                {/* Interactive Service Area Map */}
                <ServiceAreaMap className="mb-16" />
                
                <div className="mb-8">
                  <OptimizedImage 
                    src="/placeholder.svg" 
                    alt="Map of Texas showing major cities served by NABCEP certified solar installers including Austin, Houston, Dallas, San Antonio"
                    className="w-full h-48 object-cover rounded-lg mb-6"
                    width={800}
                    height={300}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
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
                  <OptimizedImage 
                    src="/placeholder.svg" 
                    alt="Happy Texas homeowners with their newly installed solar panel system showing reduced electricity bills"
                    className="w-full h-48 object-cover rounded-lg mb-6"
                    width={800}
                    height={300}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
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
                    <blockquote className="text-muted-foreground mb-4 italic">
                      "Our NABCEP certified installer made the entire process seamless. From initial consultation to final inspection, everything was handled professionally. Our electricity bills have dropped by 85%!"
                    </blockquote>
                    <div className="font-semibold">- Sarah M., Austin TX</div>
                    <div className="text-sm text-muted-foreground mt-2">
                      <strong>System:</strong> 8.5kW Monocrystalline | <strong>Savings:</strong> $180/month
                    </div>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        ★★★★★
                      </div>
                      <span className="ml-2 font-semibold">5.0</span>
                    </div>
                    <blockquote className="text-muted-foreground mb-4 italic">
                      "The installer's expertise was evident throughout the project. They explained every step, handled all permits, and the system has exceeded our energy production expectations. Highly recommend!"
                    </blockquote>
                    <div className="font-semibold">- Michael R., Houston TX</div>
                    <div className="text-sm text-muted-foreground mt-2">
                      <strong>System:</strong> 12kW Polycrystalline | <strong>Savings:</strong> $220/month
                    </div>
                  </div>
                </div>
                
                {/* Additional Customer Quotes */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex text-yellow-400 mb-3">
                      ★★★★★
                    </div>
                    <blockquote className="text-muted-foreground mb-4 italic text-sm">
                      "Best investment we've made! Our solar system paid for itself in just 6 years with the tax credits and rebates."
                    </blockquote>
                    <div className="font-semibold text-sm">- Jennifer L., Dallas TX</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                    <div className="flex text-yellow-400 mb-3">
                      ★★★★★
                    </div>
                    <blockquote className="text-muted-foreground mb-4 italic text-sm">
                      "The installation team was professional and clean. They finished ahead of schedule and our system has been flawless."
                    </blockquote>
                    <div className="font-semibold text-sm">- Robert K., San Antonio TX</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
                    <div className="flex text-yellow-400 mb-3">
                      ★★★★★
                    </div>
                    <blockquote className="text-muted-foreground mb-4 italic text-sm">
                      "We went from $300/month electric bills to $45. The ROI calculator was spot-on with our actual savings."
                    </blockquote>
                    <div className="font-semibold text-sm">- Maria S., Fort Worth TX</div>
                  </div>
                </div>
                
                {/* Final CTA Section */}
                <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-12 mb-16">
                  <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-6">Don't Wait - Solar Prices Are Rising!</h2>
                    <p className="text-xl mb-8 opacity-90">
                      The federal tax credit decreases to 22% in 2025. Lock in your 26% credit and start saving today!
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <h3 className="text-2xl font-bold mb-4">2024 Benefits</h3>
                        <ul className="space-y-2 text-left">
                          <li className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>26% Federal Tax Credit</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Property Tax Exemption</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Net Metering Programs</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Local Utility Rebates</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <h3 className="text-2xl font-bold mb-4">2025 Changes</h3>
                        <ul className="space-y-2 text-left">
                          <li className="flex items-center gap-2">
                            <span className="text-red-400">✗</span>
                            <span>Tax Credit Drops to 22%</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-red-400">✗</span>
                            <span>Equipment Costs Rising</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-red-400">✗</span>
                            <span>Installation Delays</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-red-400">✗</span>
                            <span>Rebate Programs Ending</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                        Get Free Quotes Today
                      </Button>
                      <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-green-600">
                        Call (682) 999-0953
                      </Button>
                    </div>
                    
                    <p className="text-sm mt-6 opacity-75">
                      ⏰ Limited time offer - Free consultation and quote within 24 hours
                    </p>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-foreground mb-6">Frequently Asked Questions About Solar in Texas</h2>
                
                <div className="space-y-6 mb-12">
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">What makes Texas a great state for solar energy?</h3>
                    <p className="text-muted-foreground mb-4">Texas leads the nation in solar potential with over 250 sunny days annually, averaging 5+ peak sun hours per day. The state's deregulated electricity market allows homeowners to choose competitive solar buyback rates, while the 26% federal tax credit and various utility rebates make solar installations highly cost-effective.</p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm font-medium text-green-800">
                        🌞 <strong>Texas Advantage:</strong> With abundant sunshine and high electricity rates, Texas homeowners typically see 6-8 year payback periods on their solar investments.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Do solar panels work during Texas storms and hurricanes?</h3>
                    <p className="text-muted-foreground mb-4">Yes, modern solar panels are designed to withstand extreme weather conditions. They're tested to handle winds up to 140 mph and hail up to 2 inches in diameter. Many Texas homeowners pair their solar systems with battery storage for backup power during grid outages caused by severe weather.</p>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">What's the difference between net metering and solar buyback programs?</h3>
                    <p className="text-muted-foreground mb-4">Net metering credits you for excess energy at retail rates, while solar buyback programs (common in Texas) may offer different rates. Austin Energy's Value of Solar tariff credits you for ALL energy produced, while other utilities credit only excess energy. Your installer can help you choose the best plan for your situation.</p>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">How do I know if my roof is suitable for solar panels?</h3>
                    <p className="text-muted-foreground mb-4">Most roofs in Texas are suitable for solar, but factors like roof age, orientation, shading, and structural integrity matter. South-facing roofs with minimal shading are ideal, but east/west orientations can also work well. A professional site assessment will determine your roof's solar potential.</p>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">What financing options are available for Texas solar installations?</h3>
                    <p className="text-muted-foreground mb-4">Texas homeowners have several financing options: cash purchase (best ROI), solar loans (often 0% down), solar leases, and power purchase agreements (PPAs). Many installers offer in-house financing, and some Texas utilities provide low-interest solar loans. The federal tax credit applies to all financing methods.</p>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Will solar panels increase my property taxes in Texas?</h3>
                    <p className="text-muted-foreground mb-4">No, Texas offers a property tax exemption for solar installations. This means your property taxes won't increase due to the added value of your solar system, making solar an even better investment for Texas homeowners.</p>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">What happens to my solar system if I move?</h3>
                    <p className="text-muted-foreground mb-4">Solar systems typically increase home value by $15,000-$20,000, making them attractive to buyers. If you have a solar loan, you can pay it off, transfer it to the buyer, or include it in the home sale. Solar leases can often be transferred to new homeowners.</p>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">How do I choose the right solar installer in Texas?</h3>
                    <p className="text-muted-foreground mb-4">Look for NABCEP certified installers with local experience, proper licensing, and strong warranties. Check reviews, ask for references, and get multiple quotes. A reputable installer will handle permits, inspections, and utility interconnection on your behalf.</p>
                  </div>
                </div>
                
                <div className="space-y-6 mb-12">
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">How much does solar installation cost in Texas?</h3>
                    <p className="text-muted-foreground mb-4">Solar installation costs in Texas typically range from $2.50-$3.50 per watt, with average residential systems costing $15,000-$25,000 before incentives. The federal tax credit reduces this by 26%, and many Texas utilities offer additional rebates.</p>
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <p className="text-sm font-medium text-primary">
                        💡 <strong>Pro Tip:</strong> Get quotes from at least 3 NABCEP certified installers to ensure you're getting the best price and quality.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">How long does solar installation take?</h3>
                    <p className="text-muted-foreground mb-4">Most residential solar installations are completed in 1-3 days, but the entire process from contract to activation typically takes 4-8 weeks due to permitting, utility approvals, and inspections.</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-foreground">Timeline Breakdown:</strong>
                        <ul className="mt-2 space-y-1 text-muted-foreground">
                          <li>• Site assessment: 1-2 days</li>
                          <li>• System design: 3-5 days</li>
                          <li>• Permits: 2-4 weeks</li>
                          <li>• Installation: 1-3 days</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-foreground">Final Steps:</strong>
                        <ul className="mt-2 space-y-1 text-muted-foreground">
                          <li>• Inspection: 1-2 weeks</li>
                          <li>• Utility approval: 1-2 weeks</li>
                          <li>• System activation: 1-2 days</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Do I need NABCEP certification to install solar?</h3>
                    <p className="text-muted-foreground mb-4">While not legally required in Texas, NABCEP certification demonstrates installer expertise and is often required for utility rebates and financing programs. It's the industry standard for quality assurance.</p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm font-medium text-green-800">
                        ✅ <strong>Why NABCEP Matters:</strong> Certified installers have passed rigorous exams, maintain continuing education, and follow industry best practices for safety and quality.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">What warranties do solar systems come with?</h3>
                    <p className="text-muted-foreground mb-4">Quality solar systems include 25-year panel warranties, 10-25 year inverter warranties, and 10-year workmanship warranties. NABCEP certified installers typically offer comprehensive warranty coverage.</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 font-semibold">Component</th>
                            <th className="text-left py-2 font-semibold">Warranty Period</th>
                            <th className="text-left py-2 font-semibold">Coverage</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/50">
                            <td className="py-2">Solar Panels</td>
                            <td className="py-2">25 years</td>
                            <td className="py-2">Performance & defects</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">Inverters</td>
                            <td className="py-2">10-25 years</td>
                            <td className="py-2">Manufacturing defects</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">Workmanship</td>
                            <td className="py-2">10 years</td>
                            <td className="py-2">Installation quality</td>
                          </tr>
                          <tr>
                            <td className="py-2">Monitoring</td>
                            <td className="py-2">10-25 years</td>
                            <td className="py-2">System monitoring</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Prominent CTA Section */}
                <div className="bg-gradient-to-r from-primary to-blue-600 rounded-lg p-8 text-center text-white mb-12">
                  <h2 className="text-3xl font-bold mb-4">Ready to Go Solar?</h2>
                  <p className="text-xl mb-6 opacity-90">
                    Get connected with NABCEP certified installers in your area and start saving on your electricity bills today!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3"
                      onClick={() => {
                        const calculatorSection = document.getElementById('solar-calculator');
                        if (calculatorSection) {
                          calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                    >
                      Calculate Your Savings
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3"
                      onClick={() => {
                        const resultsSection = document.getElementById('results-section');
                        if (resultsSection) {
                          resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                    >
                      Find Installers Now
                    </Button>
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
