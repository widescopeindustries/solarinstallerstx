import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { InstallerCard } from "@/components/InstallerCard";
import { Skeleton } from "@/components/ui/skeleton";

const CorpusChristiSolar = () => {
  const [installers, setInstallers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCorpusChristiInstallers = async () => {
      try {
        const { data, error } = await supabase
          .from('installers')
          .select('*')
          .ilike('location_city', '%corpus christi%')
          .order('is_premium', { ascending: false });

        if (error) throw error;
        setInstallers(data || []);
      } catch (error) {
        console.error('Error fetching installers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCorpusChristiInstallers();
  }, []);

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Corpus Christi Solar Installers | NABCEP Certified Pros",
          "description": "Find top-rated NABCEP certified solar installers in Corpus Christi TX. Compare residential & commercial solar companies. Free quotes from licensed solar contractors.",
          "url": "https://solarinstallerstx.com/corpus-christi-solar-installers",
          "mainEntity": {
            "@type": "City",
            "name": "Corpus Christi",
            "containedInPlace": {
              "@type": "State",
              "name": "Texas"
            }
          }
        })}
      </script>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* SEO Content */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', visibility: 'hidden' }}>
          <h1>Corpus Christi Solar Installers | NABCEP Certified Pros</h1>
          <h2>Top Solar Companies in Corpus Christi TX</h2>
          <p>Corpus Christi offers excellent solar potential with coastal winds and abundant sunshine. Our directory features only NABCEP certified solar installers serving Corpus Christi, Port Aransas, Rockport, and surrounding Coastal Bend areas.</p>
          
          <h2>Corpus Christi Solar Incentives</h2>
          <h3>AEP Texas Net Metering</h3>
          <p>AEP Texas offers net metering programs for residential solar installations in Corpus Christi, allowing homeowners to sell excess energy back to the grid at retail rates.</p>
          
          <h3>Federal Tax Credit</h3>
          <p>Corpus Christi homeowners can take advantage of the 26% federal solar tax credit, significantly reducing the cost of solar installation.</p>
          
          <h2>Why Choose Corpus Christi Solar Installers?</h2>
          <p>Corpus Christi averages 5.3 peak sun hours daily, making it ideal for solar energy. Our verified installers understand AEP Texas interconnection requirements, city permitting processes, and Corpus Christi's unique coastal climate conditions.</p>
          
          <h2>Corpus Christi Solar Installation Process</h2>
          <p>Professional Corpus Christi solar installers handle AEP Texas interconnection applications, city permits, and system design optimized for Corpus Christi's coastal climate and roof types.</p>
          
          <h2>Customer Reviews</h2>
          <p>"Our Corpus Christi solar installer made the entire process seamless. AEP Texas interconnection was handled professionally, and our electricity bills have dropped by 80%!" - Maria L., Corpus Christi TX</p>
        </div>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">
              Corpus Christi Solar Installers
            </h1>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-muted-foreground mb-6">
                Find NABCEP certified solar installers serving Corpus Christi, TX. Compare top-rated residential and commercial solar companies with verified credentials and customer reviews.
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {installers.map((installer) => (
                  <InstallerCard 
                    key={installer.id}
                    id={installer.id}
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
            )}

            {installers.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No installers found for Corpus Christi. Check back soon as we add more verified solar professionals.
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

export default CorpusChristiSolar;
