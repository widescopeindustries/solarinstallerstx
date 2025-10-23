import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { InstallerCard } from "@/components/InstallerCard";
import { ArrowLeft } from "lucide-react";

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
      <Header />
      <main className="container mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          NABCEP Certified Solar Installers in Texas
        </h1>
        <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
          Browse our comprehensive directory of top-rated, NABCEP certified solar professionals across Texas.
          NABCEP certification signifies the highest standard of excellence and expertise in the solar industry.
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <Skeleton key={i} className="h-[300px] w-full" />
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
