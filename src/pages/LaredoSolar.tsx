import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { InstallerCard } from "@/components/InstallerCard";
import { Skeleton } from "@/components/ui/skeleton";

const LaredoSolar = () => {
  const [installers, setInstallers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaredoInstallers = async () => {
      try {
        const { data, error } = await supabase
          .from('installers')
          .select('*')
          .ilike('location_city', '%laredo%')
          .order('is_premium', { ascending: false });

        if (error) throw error;
        setInstallers(data || []);
      } catch (error) {
        console.error('Error fetching installers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaredoInstallers();
  }, []);

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Laredo Solar Installers | NABCEP Certified Pros",
          "description": "Find top-rated NABCEP certified solar installers in Laredo TX. Compare residential & commercial solar companies. Free quotes from licensed solar contractors.",
          "url": "https://solarinstallerstx.com/laredo-solar-installers",
          "mainEntity": {
            "@type": "City",
            "name": "Laredo",
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
          <h1>Laredo Solar Installers | NABCEP Certified Pros</h1>
          <h2>Top Solar Companies in Laredo TX</h2>
          <p>Laredo offers excellent solar potential with abundant sunshine and competitive installation costs. Our directory features only NABCEP certified solar installers serving Laredo, Zapata, Rio Grande City, and surrounding South Texas areas.</p>
          
          <h2>Laredo Solar Incentives</h2>
          <h3>AEP Texas Net Metering</h3>
          <p>AEP Texas offers net metering programs for residential solar installations in Laredo, allowing homeowners to sell excess energy back to the grid at retail rates.</p>
          
          <h3>Federal Tax Credit</h3>
          <p>Laredo homeowners can take advantage of the 26% federal solar tax credit, significantly reducing the cost of solar installation.</p>
          
          <h2>Why Choose Laredo Solar Installers?</h2>
          <p>Laredo averages 5.7 peak sun hours daily, making it one of the best cities in Texas for solar energy. Our verified installers understand AEP Texas interconnection requirements, city permitting processes, and Laredo's unique South Texas climate conditions.</p>
          
          <h2>Laredo Solar Installation Process</h2>
          <p>Professional Laredo solar installers handle AEP Texas interconnection applications, city permits, and system design optimized for Laredo's climate and roof types.</p>
          
          <h2>Customer Reviews</h2>
          <p>"Our Laredo solar installer made the entire process seamless. AEP Texas interconnection was handled professionally, and our electricity bills have dropped by 85%!" - Carlos R., Laredo TX</p>
        </div>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">
              Laredo Solar Installers
            </h1>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-muted-foreground mb-6">
                Find NABCEP certified solar installers serving Laredo, TX. Compare top-rated residential and commercial solar companies with verified credentials and customer reviews.
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
                  No installers found for Laredo. Check back soon as we add more verified solar professionals.
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

export default LaredoSolar;
