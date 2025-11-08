import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { InstallerCard } from "@/components/InstallerCard";
import { ArrowLeft, Award, Shield, TrendingUp, CheckCircle } from "lucide-react";

interface Installer {
  id: string;
  name: string;
  certification_type: string;
  certification_number: string;
  certification_expires?: string;
  company_name?: string;
  company_website?: string;
  phone?: string;
  location_city: string;
  location_state: string;
  location_zip?: string;
  country: string;
  is_verified?: boolean;
}

const NABCEPCertifiedInstallers = () => {
  const [installers, setInstallers] = useState<Installer[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNABCEPInstallers = async () => {
      try {
        const { data, error } = await supabase
          .from("installers")
          .select("*")
          .not("certification_type", "is", null) // Ensure certification_type is not null
          .or("certification_type.ilike.%PV%,certification_type.ilike.%NABCEP%") // Filter for PV or NABCEP certifications
          .order("company_name", { ascending: true }); // Order by company name

        if (error) throw error;
        setInstallers(data || []);
      } catch (error: any) {
        console.error("Error fetching NABCEP installers:", error);
        toast({
          title: "Error loading installers",
          description: "Unable to load NABCEP certified installers. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNABCEPInstallers();
  }, [toast]);

  return (
    <>
      <SEOHead
        title="NABCEP Certified Installers Texas - Gold Tier"
        description="Browse NABCEP certified solar installers in Texas. Financially stable professionals with lower risk."
        canonicalUrl="https://solarinstallerstx.com/nabcep-certified-installers"
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">NABCEP Certified (Gold Tier)</li>
          </ol>
        </nav>

        {/* Gold Tier Hero */}
        <div className="text-center mb-8">
          <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-lg px-6 py-2 mb-4">
            🏆 GOLD TIER INSTALLERS
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            NABCEP Certified Solar Installers in Texas
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            The highest tier of solar installers in Texas. NABCEP certification + financial stability verification + safety score 85+. These installers have <strong>90% lower bankruptcy rates</strong> than non-certified competitors.
          </p>
        </div>

        {/* Trust Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-1">{installers.length}</div>
              <div className="text-sm text-muted-foreground">NABCEP Certified</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-1">&lt;2%</div>
              <div className="text-sm text-muted-foreground">Failure Rate</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-1">85+</div>
              <div className="text-sm text-muted-foreground">Safety Score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Financially Verified</div>
            </CardContent>
          </Card>
        </div>

        {/* Why NABCEP Matters */}
        <Card className="mb-8 max-w-4xl mx-auto bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <Award className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-blue-900 dark:text-blue-100">
                  Why NABCEP Certification Matters More Than Ever
                </h2>
                <p className="text-blue-800 dark:text-blue-200 leading-relaxed mb-4">
                  After 100+ solar companies went bankrupt in 2024 (including major Texas players like Sunnova and Titan Solar), NABCEP certification has become the clearest indicator of installer quality and financial stability.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-1">Financial Stability</h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">NABCEP installers have &lt;2% bankruptcy rate vs 18% for non-certified</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-1">Proven Expertise</h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">2+ years experience + rigorous exam + continuing education</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-1">Better Outcomes</h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">Higher quality installations, better warranties, superior customer service</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-blue-200 dark:border-blue-900">
              <Button asChild variant="outline">
                <Link to="/blog/nabcep-certification-texas-solar">Learn More About NABCEP Certification →</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-6 text-center">All {installers.length} Gold Tier Installers</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <Skeleton key={`nabcep-list-skeleton-${i}`} className="h-[300px] w-full" />
            ))}
          </div>
        ) : installers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {installers.map((installer) => (
              <InstallerCard key={installer.id} {...installer} />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <CardContent>
              <h2 className="text-2xl font-bold mb-4">No NABCEP Certified Installers Found</h2>
              <p className="text-muted-foreground">
                We couldn't find any NABCEP certified installers matching your criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </>
  );
};

export default NABCEPCertifiedInstallers;
