import { useState, useEffect, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { InstallerListCard } from "@/components/InstallerListCard";
import { InstallerCard } from "@/components/InstallerCard";
import { Pagination } from "@/components/Pagination";
import { FilterBar } from "@/components/FilterBar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Star, MapPin } from "lucide-react";

const ITEMS_PER_PAGE = 24;

const Installers = () => {
  const [installers, setInstallers] = useState<any[]>([]);
  const [nabcepInstallers, setNabcepInstallers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nabcepLoading, setNabcepLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const fetchInstallers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('installers')
        .select('*')
        .order('is_premium', { ascending: false })
        .order('is_verified', { ascending: false })
        .order('created_at', { ascending: false });

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
    try {
      setNabcepLoading(true);
      const { data, error } = await supabase
        .from('installers')
        .select('*')
        .or('certification_type.ilike.%PVIP%,certification_type.ilike.%PVSI%,certification_type.ilike.%PV Installation%,certification_type.ilike.%PV System%')
        .order('is_premium', { ascending: false })
        .order('is_verified', { ascending: false });

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
  }, []);

  // Filter NABCEP installers based on active filter and search
  const filteredNabcepInstallers = nabcepInstallers.filter(installer => {
    const matchesSearch = searchQuery === "" ||
      installer.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.location_city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.certification_type?.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "premium") {
      return matchesSearch && installer.is_premium;
    }
    if (activeFilter === "verified") {
      return matchesSearch && installer.is_verified;
    }

    return matchesSearch;
  });

  // Filter non-NABCEP installers based on active filter and search
  const nonNabcepInstallers = installers.filter(installer => {
    const certType = installer.certification_type?.toLowerCase() || '';
    // Exclude installers with NABCEP certifications (PVIP, PVSI, PV Installation, PV System)
    return !(certType.includes('pvip') || 
             certType.includes('pvsi') || 
             certType.includes('pv installation') || 
             certType.includes('pv system'));
  });

  const filteredNonNabcepInstallers = nonNabcepInstallers.filter(installer => {
    const matchesSearch = searchQuery === "" ||
      installer.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.location_city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.certification_type?.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "nabcep") {
      return false; // Non-NABCEP installers should not show when NABCEP filter is active
    }
    if (activeFilter === "premium") {
      return matchesSearch && installer.is_premium;
    }
    if (activeFilter === "verified") {
      return matchesSearch && installer.is_verified;
    }

    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredNonNabcepInstallers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNonNabcepInstallers = filteredNonNabcepInstallers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <SEOHead
        title="NABCEP Certified Solar Installers Texas | Find Top Rated Solar Companies"
        description="Browse 500+ solar installers in Texas. Featured NABCEP certified professionals first, then other verified installers. Get free quotes from top-rated solar companies."
        canonicalUrl="https://solarinstallerstx.com/installers"
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Solar Installers in Texas",
          "description": "Complete directory of certified solar installation professionals in Texas",
          "numberOfItems": installers.length,
          "itemListElement": [
            ...nabcepInstallers.slice(0, 5).map((installer, index) => ({
              "@type": "LocalBusiness",
              "position": index + 1,
              "name": installer.company_name || installer.name,
              "description": `NABCEP certified solar installer in ${installer.location_city}, Texas`,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": installer.location_city,
                "addressRegion": installer.location_state,
                "addressCountry": "US"
              },
              "serviceType": "Solar Panel Installation",
              "areaServed": installer.location_city
            })),
            ...nonNabcepInstallers.slice(0, 5).map((installer, index) => ({
              "@type": "LocalBusiness",
              "position": index + 6,
              "name": installer.company_name || installer.name,
              "description": `${installer.certification_type} solar installer in ${installer.location_city}, Texas`,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": installer.location_city,
                "addressRegion": installer.location_state,
                "addressCountry": "US"
              },
              "serviceType": "Solar Panel Installation",
              "areaServed": installer.location_city
            }))
          ]
        }}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">Solar Installers</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Solar Installers in Texas
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Browse all certified solar installation professionals in Texas. NABCEP certified installers are featured first, followed by other verified professionals.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{nabcepInstallers.length}</div>
                <div className="text-sm text-muted-foreground">NABCEP Certified</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{filteredNonNabcepInstallers.length}</div>
                <div className="text-sm text-muted-foreground">Other Installers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{installers.length}+</div>
                <div className="text-sm text-muted-foreground">Total Installers</div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Bar */}
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            /* Total results shown when search/advanced filters are active */
            totalResults={filteredNabcepInstallers.length + filteredNonNabcepInstallers.length}
            /* Wire InstantSearch query into our simple search state */
            onSearch={setSearchQuery}
            /* Currently we don’t persist advanced filters; accept and ignore safely */
            onAdvancedFilterChange={() => {}}
            showViewToggle={false}
          />

          {/* Results */}
          <div className="mt-8 space-y-12">
            {/* Show NABCEP section when NABCEP filter is active or when showing all */}
            {(activeFilter === "all" || activeFilter === "nabcep") && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold text-foreground">NABCEP Certified Installers</h2>
                  <Badge variant="default" className="bg-primary/10 text-primary px-3 py-1">
                    {filteredNabcepInstallers.length} Certified
                  </Badge>
                </div>

                {nabcepLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Card key={`nabcep-skeleton-${i}`} className="p-6">
                        <div className="animate-pulse space-y-4">
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-4 bg-muted rounded w-1/2"></div>
                          <div className="h-4 bg-muted rounded w-2/3"></div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : filteredNabcepInstallers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNabcepInstallers.map((installer) => (
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
                ) : activeFilter === "nabcep" ? (
                  <Card className="p-8 text-center">
                    <CardContent>
                      <p className="text-muted-foreground">
                        No NABCEP certified installers found matching your criteria.
                      </p>
                    </CardContent>
                  </Card>
                ) : null}
              </section>
            )}

            {/* Show non-NABCEP section when not filtering by NABCEP only */}
            {activeFilter !== "nabcep" && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Other Solar Installers</h2>
                  <Badge variant="outline" className="px-3 py-1">
                    {filteredNonNabcepInstallers.length} Available
                  </Badge>
                </div>

                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <Skeleton key={`non-nabcep-skeleton-${i}`} className="h-16 w-full rounded-lg" />
                    ))}
                  </div>
                ) : filteredNonNabcepInstallers.length > 0 ? (
                  <>
                    <div className="space-y-3">
                      {paginatedNonNabcepInstallers.map((installer) => (
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

                    {totalPages > 1 && (
                      <div className="mt-8">
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={setCurrentPage}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <Card className="p-8 text-center">
                    <CardContent>
                      <p className="text-muted-foreground">
                        No other installers found matching your criteria.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </section>
            )}

            {/* No Results Message */}
            {((activeFilter === "nabcep" && filteredNabcepInstallers.length === 0) ||
              (activeFilter !== "nabcep" && filteredNonNabcepInstallers.length === 0 && filteredNabcepInstallers.length === 0)) && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No installers found matching your criteria. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Installers;
