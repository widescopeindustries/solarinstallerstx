import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { FilterBar } from "@/components/FilterBar";
import { InstallerCard } from "@/components/InstallerCard";
import { MapComponent } from "@/components/Map";
import { ImportInstallers } from "@/components/ImportInstallers";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for demonstration
const mockInstallers = [
  {
    id: 1,
    name: "SunPower Texas Solutions",
    location: "Austin, TX",
    rating: 4.9,
    reviewCount: 247,
    services: ["Residential", "Commercial", "Battery Storage"],
    isPremium: true,
    certifications: ["NABCEP Certified", "Tesla Powerwall Certified", "BBB A+ Rating"],
    yearsInBusiness: 12,
  },
  {
    id: 2,
    name: "Lone Star Solar & Electric",
    location: "Houston, TX",
    rating: 4.8,
    reviewCount: 189,
    services: ["Residential", "Maintenance", "Financing"],
    isPremium: true,
    certifications: ["NABCEP Certified", "Licensed & Insured"],
    yearsInBusiness: 15,
  },
  {
    id: 3,
    name: "Texas Green Energy",
    location: "Dallas, TX",
    rating: 4.7,
    reviewCount: 156,
    services: ["Residential", "Commercial", "Solar Panels"],
    isPremium: false,
    certifications: ["NABCEP Certified"],
    yearsInBusiness: 8,
  },
  {
    id: 4,
    name: "Gulf Coast Solar Pros",
    location: "San Antonio, TX",
    rating: 4.9,
    reviewCount: 201,
    services: ["Residential", "Battery Storage", "Maintenance"],
    isPremium: true,
    certifications: ["NABCEP Certified", "Enphase Certified"],
    yearsInBusiness: 10,
  },
  {
    id: 5,
    name: "Solar Solutions DFW",
    location: "Fort Worth, TX",
    rating: 4.6,
    reviewCount: 134,
    services: ["Residential", "Commercial"],
    isPremium: false,
    certifications: ["Licensed & Insured"],
    yearsInBusiness: 6,
  },
  {
    id: 6,
    name: "Panhandle Solar Systems",
    location: "Amarillo, TX",
    rating: 4.8,
    reviewCount: 98,
    services: ["Residential", "Financing", "Maintenance"],
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
    services: ["Residential", "Battery Storage"],
    isPremium: false,
    certifications: ["Licensed & Insured", "Tesla Powerwall Certified"],
    yearsInBusiness: 5,
  },
  {
    id: 8,
    name: "El Paso Solar Experts",
    location: "El Paso, TX",
    rating: 4.9,
    reviewCount: 176,
    services: ["Residential", "Commercial", "Financing"],
    isPremium: true,
    certifications: ["NABCEP Certified", "BBB A+ Rating"],
    yearsInBusiness: 11,
  },
];

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [installers, setInstallers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const fetchInstallers = async () => {
    try {
      const { data, error } = await supabase
        .from('installers')
        .select('*')
        .order('is_premium', { ascending: false })
        .order('name');

      if (error) throw error;
      setInstallers(data || []);
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Error fetching installers:', error);
      }
      toast({
        title: "Error loading installers",
        description: "Unable to load installers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstallers();
  }, []);

  // Filter installers based on active filter and search query
  const filteredInstallers = installers.filter(installer => {
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        installer.company_name?.toLowerCase().includes(query) ||
        installer.name?.toLowerCase().includes(query) ||
        installer.location_city?.toLowerCase().includes(query) ||
        installer.location_state?.toLowerCase().includes(query) ||
        installer.location_zip?.includes(query);
      
      if (!matchesSearch) return false;
    }
    
    // Apply category filter
    if (activeFilter === "all") return true;
    if (activeFilter === "premium") return installer.is_premium;
    if (activeFilter === "pvip") return installer.certification_type?.includes("PVIP");
    if (activeFilter === "pvsi") return installer.certification_type?.includes("PVSI");
    if (activeFilter === "esip") return installer.certification_type?.includes("ESIP");
    return installer.services?.some((service: string) => 
      service.toLowerCase().includes(activeFilter.toLowerCase())
    );
  });

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Top Solar Installers in Texas",
          "description": "Verified NABCEP-certified solar installers across Texas",
          "numberOfItems": filteredInstallers.length,
          "itemListElement": filteredInstallers.slice(0, 10).map((installer, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "LocalBusiness",
              "name": installer.company_name || installer.name,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": installer.location_city,
                "addressRegion": installer.location_state,
                "postalCode": installer.location_zip
              }
            }
          }))
        })}
      </script>
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection onSearch={setSearchQuery} />
        
        {/* How We Vet Installers */}
        <section className="bg-primary/5 border-y border-border py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-card border rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span> How We Vet Installers
              </h2>
              <p className="text-muted-foreground mb-4">
                Every verified installer on SolarInstallersTX undergoes rigorous credential checks to protect Texas consumers:
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>NABCEP certification verification</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>TDLR electrical contractor license</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Liability & workers' comp insurance</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>BBB ratings & business registration</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <a href="/texas-guide" className="text-primary hover:underline font-medium">
                  Learn more about our verification process →
                </a>
              </div>
            </div>
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
              {activeFilter === "all" ? "All Installers" : 
               activeFilter === "premium" ? "Premium Installers" :
               activeFilter === "pvip" ? "PVIP Certified Installers" :
               activeFilter === "pvsi" ? "PVSI Certified Installers" :
               activeFilter === "esip" ? "Energy Storage Certified Installers" :
               `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Installers`}
            </h2>
            <p className="text-muted-foreground">
              {filteredInstallers.length} installer{filteredInstallers.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="flex gap-2">
            <ImportInstallers onImportComplete={fetchInstallers} />
          </div>
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
        ) : viewMode === 'grid' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredInstallers.map((installer) => (
                <InstallerCard 
                  key={installer.id}
                  name={installer.name}
                  certification_type={installer.certification_type || ''}
                  certification_number={installer.certification_number || ''}
                  certification_expires={installer.certification_expires || ''}
                  company_name={installer.company_name || ''}
                  company_website={installer.company_website || ''}
                  phone={installer.phone || ''}
                  location_city={installer.location_city || ''}
                  location_state={installer.location_state || ''}
                  location_zip={installer.location_zip || ''}
                  country={installer.country || 'USA'}
                  is_verified={installer.is_verified || false}
                />
              ))}
            </div>

            {filteredInstallers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No installers found for this filter. Try selecting a different category.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="h-[600px] rounded-lg overflow-hidden border">
            <MapComponent 
              installers={filteredInstallers.map(i => ({
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