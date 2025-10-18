import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { FilterBar } from "@/components/FilterBar";
import { InstallerCard } from "@/components/InstallerCard";
import { MapComponent } from "@/components/Map";
import { Pagination } from "@/components/Pagination";
import { ImportInstallers } from "@/components/ImportInstallers";
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

        {/* Optimized Vetting Section for Keywords */}
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
                <a href="/texas-guide" className="text-primary hover:underline font-medium">
                  Learn more about our NABCEP certified solar installers verification →
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
