import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PhoneNumberFetcher } from "@/components/PhoneNumberFetcher";
import { ImportInstallers } from "@/components/ImportInstallers";
import { SafetyScoreManager } from "@/components/SafetyScoreManager";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <>
        <SEOHead
          title="Admin Dashboard - SolarInstallersTX"
          description="Administrator dashboard for managing installers, safety scores, and platform settings."
          canonicalUrl="https://solarinstallerstx.com/admin"
          robots="noindex, nofollow"
        />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <>
      <SEOHead
        title="Admin Dashboard - SolarInstallersTX"
        description="Manage installers, safety scores, and platform settings."
        canonicalUrl="https://solarinstallerstx.com/admin"
        robots="noindex, nofollow"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="sr-only">Admin Dashboard</h1>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Admin Dashboard
              </CardTitle>
              <CardDescription>
                <h2 className="text-base font-semibold">Administrative Tools</h2>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Welcome to the admin panel. Use the tools below to manage installer data.
              </p>
            </CardContent>
          </Card>

          <SafetyScoreManager />

          <ImportInstallers />

          <PhoneNumberFetcher onComplete={() => {}} />
        </div>
        </main>
      </div>
    </>
  );
};

export default Admin;
