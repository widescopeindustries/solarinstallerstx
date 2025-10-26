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
        .ilike('certification_type', '%NABCEP%')
        .order('is_premium', { ascending: false })
        .order('is_verified', { ascending: false })
        .limit(50);

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

  // Filter installers based on active filter and search
  const filteredInstallers = installers.filter(installer => {
    const matchesSearch = searchQuery === "" || 
      installer.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.location_city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.certification_type?.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "nabcep") {
      return matchesSearch && installer.certification_type?.toLowerCase().includes('nabcep');
    }
    if (activeFilter === "premium") {
      return matchesSearch && installer.is_premium;
    }
    if (activeFilter === "verified") {
      return matchesSearch && installer.is_verified;
    }
    
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredInstallers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedInstallers = filteredInstallers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <SEOHead 
        title="NABCEP Certified Solar Installers Texas | Find Top Rated Solar Companies"
        description="Browse 500+ NABCEP certified solar installers in Texas. Get free quotes from verified solar companies. Compare ratings, reviews, and certifications."
        canonicalUrl="https://solarinstallerstx.com/installers"
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "NABCEP Certified Solar Installers in Texas",
          "description": "Complete directory of certified solar installation professionals in Texas",
          "numberOfItems": installers.length,
          "itemListElement": installers.slice(0, 10).map((installer, index) => ({
            "@type": "LocalBusiness",
            "position": index + 1,
            "name": installer.company_name || installer.name,
            "description": `${installer.certification_type} certified solar installer in ${installer.location_city}, Texas`,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": installer.location_city,
              "addressRegion": installer.location_state,
              "addressCountry": "US"
            },
            "serviceType": "Solar Panel Installation",
            "areaServed": installer.location_city
          }))
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
              NABCEP Certified Solar Installers in Texas
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find verified solar installation professionals across Texas. Compare ratings, certifications, and get free quotes from top-rated solar companies.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{installers.length}+</div>
                <div className="text-sm text-muted-foreground">Total Installers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{nabcepInstallers.length}</div>
                <div className="text-sm text-muted-foreground">NABCEP Certified</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Texas Cities</div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Bar */}
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            showViewToggle={false}
          />

          {/* Results */}
          <div className="mt-8">
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={`installers-skeleton-${i}`} className="h-16 w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {paginatedInstallers.map((installer) => (
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

                {filteredInstallers.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      No installers found matching your criteria. Try adjusting your filters.
                    </p>
                  </div>
                )}

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Installers;
