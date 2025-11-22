import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Set HTTP status code for 404 (through headers in API response if applicable)
    // For client-side rendering, we rely on vercel.json configuration to set proper status
    console.warn(`404 - Not Found: ${location.pathname}`);
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="404 - Page Not Found | SolarInstallersTX"
        description="The page you're looking for doesn't exist. Return to our homepage to find solar installers and information."
        canonicalUrl={`https://solarinstallerstx.com${location.pathname}`}
        robots="noindex, nofollow"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-md">
            <div className="mb-8">
              <h1 className="text-7xl md:text-8xl font-bold text-primary mb-4">404</h1>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Page Not Found</h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Sorry, the page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <p className="text-sm text-muted-foreground">
                Requested URL: <code className="bg-muted px-2 py-1 rounded text-xs break-all">{location.pathname}</code>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => navigate(-1)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
              <Button 
                onClick={() => navigate("/")}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Return Home
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-muted-foreground mb-4">Helpful Links:</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="text-primary hover:underline">Home</a>
                </li>
                <li>
                  <a href="/installers" className="text-primary hover:underline">Find Solar Installers</a>
                </li>
                <li>
                  <a href="/learn" className="text-primary hover:underline">Solar Learning Center</a>
                </li>
                <li>
                  <a href="/contact" className="text-primary hover:underline">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NotFound;
