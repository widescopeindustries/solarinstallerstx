import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { InstallerCard } from "@/components/InstallerCard";
import { Skeleton } from "@/components/ui/skeleton";

const PlanoSolar = () => {
  const [installers, setInstallers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanoInstallers = async () => {
      try {
        const { data, error } = await supabase
          .from('installers')
          .select('*')
          .ilike('location_city', '%plano%')
          .order('is_premium', { ascending: false });

        if (error) throw error;
        setInstallers(data || []);
      } catch (error) {
        console.error('Error fetching installers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanoInstallers();
  }, []);

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Plano Solar Installers | NABCEP Certified Pros",
          "description": "Find top-rated NABCEP certified solar installers in Plano TX. Compare residential & commercial solar companies. Free quotes from licensed solar contractors.",
          "url": "https://solarinstallerstx.com/plano-solar-installers",
          "mainEntity": {
            "@type": "City",
            "name": "Plano",
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
          <h1>Plano Solar Installers | NABCEP Certified Pros</h1>
          <h2>Top Solar Companies in Plano TX</h2>
          <p>Plano offers excellent solar potential with affluent neighborhoods and strong net metering programs. Our directory features only NABCEP certified solar installers serving Plano, Frisco, Allen, and surrounding Collin County areas.</p>
          
          <h2>Plano Solar Incentives</h2>
          <h3>Oncor Net Metering</h3>
          <p>Oncor offers net metering programs for residential solar installations in Plano, allowing homeowners to sell excess energy back to the grid at retail rates.</p>
          
          <h3>Federal Tax Credit</h3>
          <p>Plano homeowners can take advantage of the 26% federal solar tax credit, significantly reducing the cost of solar installation.</p>
          
          <h2>Why Choose Plano Solar Installers?</h2>
          <p>Plano averages 5.2 peak sun hours daily, making it ideal for solar energy. Our verified installers understand Oncor interconnection requirements, city permitting processes, and Plano's unique suburban market conditions.</p>
          
          <h2>Plano Solar Installation Process</h2>
          <p>Professional Plano solar installers handle Oncor interconnection applications, city permits, and system design optimized for Plano's climate and roof types.</p>
          
          <h2>Customer Reviews</h2>
          <p>"Our Plano solar installer made the entire process seamless. Oncor interconnection was handled professionally, and our electricity bills have dropped by 70%!" - David K., Plano TX</p>
        </div>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">
              Plano Solar Installers
            </h1>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-muted-foreground mb-6">
                Find NABCEP certified solar installers serving Plano, TX. Compare top-rated residential and commercial solar companies with verified credentials and customer reviews.
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
                  No installers found for Plano. Check back soon as we add more verified solar professionals.
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

export default PlanoSolar;
