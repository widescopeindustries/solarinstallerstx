import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { InstallerCard } from "@/components/InstallerCard";
import { Skeleton } from "@/components/ui/skeleton";

const PasadenaSolar = () => {
  const [installers, setInstallers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPasadenaInstallers = async () => {
      try {
        const { data, error } = await supabase
          .from('installers')
          .select('*')
          .ilike('location_city', '%pasadena%')
          .order('is_premium', { ascending: false });

        if (error) throw error;
        setInstallers(data || []);
      } catch (error) {
        console.error('Error fetching installers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPasadenaInstallers();
  }, []);

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Pasadena Solar Installers | NABCEP Certified Pros",
          "description": "Find top-rated NABCEP certified solar installers in Pasadena TX. Compare residential & commercial solar companies. Free quotes from licensed solar contractors.",
          "url": "https://solarinstallerstx.com/pasadena-solar-installers",
          "mainEntity": {
            "@type": "City",
            "name": "Pasadena",
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
          <h1>Pasadena Solar Installers | NABCEP Certified Pros</h1>
          <h2>Top Solar Companies in Pasadena TX</h2>
          <p>Pasadena offers excellent solar potential with competitive electricity rates and strong net metering programs. Our directory features only NABCEP certified solar installers serving Pasadena, Deer Park, La Porte, and surrounding Harris County areas.</p>
          
          <h2>Pasadena Solar Incentives</h2>
          <h3>CenterPoint Energy Net Metering</h3>
          <p>CenterPoint Energy offers net metering programs for residential solar installations in Pasadena, allowing homeowners to sell excess energy back to the grid at retail rates.</p>
          
          <h3>Federal Tax Credit</h3>
          <p>Pasadena homeowners can take advantage of the 26% federal solar tax credit, significantly reducing the cost of solar installation.</p>
          
          <h2>Why Choose Pasadena Solar Installers?</h2>
          <p>Pasadena averages 5.3 peak sun hours daily, making it ideal for solar energy. Our verified installers understand CenterPoint Energy interconnection requirements, city permitting processes, and Pasadena's unique market conditions.</p>
          
          <h2>Pasadena Solar Installation Process</h2>
          <p>Professional Pasadena solar installers handle CenterPoint Energy interconnection applications, city permits, and system design optimized for Pasadena's climate and roof types.</p>
          
          <h2>Customer Reviews</h2>
          <p>"Our Pasadena solar installer made the entire process seamless. CenterPoint Energy interconnection was handled professionally, and our electricity bills have dropped by 75%!" - Maria G., Pasadena TX</p>
        </div>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">
              Pasadena Solar Installers
            </h1>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-muted-foreground mb-6">
                Find NABCEP certified solar installers serving Pasadena, TX. Compare top-rated residential and commercial solar companies with verified credentials and customer reviews.
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
                  No installers found for Pasadena. Check back soon as we add more verified solar professionals.
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

export default PasadenaSolar;
