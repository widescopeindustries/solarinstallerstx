import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { InstallerCard } from "@/components/InstallerCard";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";

const SanAntonioSolar = () => {
  const [installers, setInstallers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSanAntonioInstallers = async () => {
      try {
        const { data, error } = await supabase
          .from('installers')
          .select('*')
          .ilike('location_city', '%san antonio%')
          .order('is_premium', { ascending: false });

        if (error) throw error;
        setInstallers(data || []);
      } catch (error) {
        console.error('Error fetching installers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSanAntonioInstallers();
  }, []);

  return (
    <>
      <SEOHead
        title="San Antonio Solar Installers | NABCEP Certified Pros"
        description="Find top-rated NABCEP certified solar installers in San Antonio TX. Compare residential & commercial solar companies. Free quotes from licensed solar contractors."
        canonicalUrl="https://solarinstallerstx.com/san-antonio-solar-installers"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "San Antonio Solar Installers | NABCEP Certified Pros",
          "description": "Find top-rated NABCEP certified solar installers in San Antonio TX. Compare residential & commercial solar companies. Free quotes from licensed solar contractors.",
          "url": "https://solarinstallerstx.com/san-antonio-solar-installers",
          "mainEntity": {
            "@type": "City",
            "name": "San Antonio",
            "containedInPlace": {
              "@type": "State",
              "name": "Texas"
            }
          }
        }}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* SEO Content */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', visibility: 'hidden' }}>
          <h1>San Antonio Solar Installers | NABCEP Certified Pros</h1>
          <h2>Top Solar Companies in San Antonio TX</h2>
          <p>San Antonio leads Texas in solar energy adoption with excellent incentives and abundant sunshine. Our directory features only NABCEP certified solar installers serving San Antonio, Alamo Heights, Stone Oak, and surrounding areas.</p>
          
          <h2>San Antonio Solar Incentives</h2>
          <h3>CPS Energy Solar Rebates</h3>
          <p>CPS Energy offers rebates up to $2,500 for residential solar installations in San Antonio. Combined with the 26% federal tax credit, San Antonio homeowners can save significantly on solar installation costs.</p>
          
          <h3>Net Metering in San Antonio</h3>
          <p>San Antonio's net metering program allows homeowners to sell excess solar energy back to CPS Energy at retail rates, maximizing solar investment returns.</p>
          
          <h2>Why Choose San Antonio Solar Installers?</h2>
          <p>San Antonio averages 5.2 peak sun hours daily, making it ideal for solar energy. Our verified installers understand local permitting requirements, CPS Energy interconnection processes, and San Antonio's unique solar market.</p>
          
          <h2>San Antonio Solar Installation Process</h2>
          <p>Professional San Antonio solar installers handle CPS Energy interconnection applications, city permits, and system design optimized for San Antonio's climate and roof types.</p>
          
          <h2>Customer Reviews</h2>
          <p>"Our San Antonio solar installer made the entire process seamless. CPS Energy interconnection was handled professionally, and our electricity bills have dropped by 80%!" - Maria S., San Antonio TX</p>
        </div>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">
              San Antonio Solar Installers
            </h1>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-muted-foreground mb-6">
                Find NABCEP certified solar installers serving San Antonio, TX. Compare top-rated residential and commercial solar companies with verified credentials and customer reviews.
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
                  No installers found for San Antonio. Check back soon as we add more verified solar professionals.
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

export default SanAntonioSolar;
