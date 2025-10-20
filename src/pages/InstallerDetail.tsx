import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapComponent } from "@/components/Map";
import { useAuth } from "@/contexts/AuthContext";
import { maskCertificationNumber } from "@/lib/utils";
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Globe, 
  Mail, 
  Star,
  Award,
  Calendar,
  ArrowLeft
} from "lucide-react";

const InstallerDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [installer, setInstaller] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const isAuthenticated = !!user;

  useEffect(() => {
    const fetchInstaller = async () => {
      if (!slug) return;

      try {
        // Extract UUID from slug (last 5 segments: 8-4-4-4-12 format)
        const parts = slug.split('-');
        const id = parts.slice(-5).join('-');

        const { data, error } = await supabase
          .from('installers')
          .select('*, is_premium')
          .eq('id', id)
          .single();

        if (error) throw error;
        setInstaller(data);
      } catch (error: any) {
        console.error('Error fetching installer:', error);
        toast({
          title: "Error loading installer",
          description: "Unable to load installer details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInstaller();
  }, [slug, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
            <div>
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!installer) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to all installers
          </Link>
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Installer Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The installer you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/">View All Installers</Link>
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const displayName = installer.company_name || installer.name;
  const displayCertNumber = maskCertificationNumber(installer.certification_number, isAuthenticated);
  const locationString = `${installer.location_city}, ${installer.location_state}${installer.location_zip ? ' ' + installer.location_zip : ''}`;

  // Generate page title and description for SEO
  const pageTitle = `${displayName} - NABCEP Certified Solar Installers in ${installer.location_city}, ${installer.location_state} | SolarInstallersTX`;

  const pageDescription = `Contact ${displayName}, a verified ${installer.certification_type} solar installer serving ${installer.location_city}, ${installer.location_state}. ${installer.phone ? `Call ${installer.phone}` : 'Get a quote today'}.`;

  return (
    <>
      {/* SEO Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="business.business" />
      
      {/* Schema.org LocalBusiness JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": displayName,
          "image": `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&size=200`,
          "description": pageDescription,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": installer.location_city,
            "addressRegion": installer.location_state,
            "postalCode": installer.location_zip || "",
            "addressCountry": installer.country || "US"
          },
          ...(installer.phone && { "telephone": installer.phone }),
          ...(installer.company_website && { "url": installer.company_website }),
          ...(installer.rating && {
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": installer.rating,
              "reviewCount": installer.review_count || 0
            }
          }),
          "geo": installer.latitude && installer.longitude ? {
            "@type": "GeoCoordinates",
            "latitude": installer.latitude,
            "longitude": installer.longitude
          } : undefined,
          "priceRange": "$$"
        })}
      </script>

      <div className="min-h-screen bg-background">
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
              <li className="text-foreground font-medium">{displayName}</li>
            </ol>
          </nav>

          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to all installers
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{displayName}</h1>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{locationString}</span>
                      </div>
                    </div>
                    {installer.is_verified && (
                      <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1">
                        <ShieldCheck className="h-4 w-4" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  {/* Rating */}
                  {installer.rating && (
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(installer.rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold">{installer.rating}</span>
                      {installer.review_count > 0 && (
                        <span className="text-muted-foreground">
                          ({installer.review_count} reviews)
                        </span>
                      )}
                    </div>
                  )}

                  {/* Contact Buttons (always show basic) */}
                  <div className="flex flex-wrap gap-3">
                    {installer.phone && (
                      <Button asChild size="lg">
                        <a href={`tel:${installer.phone.replace(/\D/g, '')}`}>
                          <Phone className="h-4 w-4 mr-2" />
                          Call Now
                        </a>
                      </Button>
                    )}
                    {installer.company_website && (
                      <Button asChild variant="outline" size="lg">
                        <a
                          href={installer.company_website.startsWith('http') ? installer.company_website : `https://${installer.company_website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Visit Website
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Conditional Premium Content or Upsell */}
              {installer.is_premium ? (
                <>
                  {/* Certification Details */}
                  <Card>
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Award className="h-6 w-6 text-primary" />
                        Certification Details
                      </h2>
                      <div className="grid gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Certified Professional</div>
                          <div className="font-medium">{installer.name}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Certification Type</div>
                          <div className="font-medium">{installer.certification_type}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Certification Number</div>
                          <div className="font-medium font-mono">{displayCertNumber}</div>
                          {!isAuthenticated && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Sign in to view full certification number
                            </div>
                          )}
                        </div>
                        {installer.certification_expires && (
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Expiration Date</div>
                            <div className="font-medium flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {installer.certification_expires}
                            </div>
                          </div>
                        )}
                        {installer.years_in_business && (
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Years in Business</div>
                            <div className="font-medium">{installer.years_in_business} years</div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Services */}
                  {installer.services && installer.services.length > 0 && (
                    <Card>
                      <CardContent className="p-8">
                        <h2 className="text-2xl font-bold mb-4">Services Offered</h2>
                        <div className="flex flex-wrap gap-2">
                          {installer.services.map((service: string, index: number) => (
                            <Badge key={index} variant="secondary">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                <Card className="bg-yellow-50 border-yellow-200 text-yellow-800 p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">Unlock Full Business Profile</h2>
                  <p className="text-lg mb-6">
                    This is a basic listing. Upgrade to a premium account to showcase your full profile with:
                  </p>
                  <ul className="list-disc list-inside text-left mx-auto max-w-sm mb-6 space-y-2">
                    <li>Full Certification Details (unmasked)</li>
                    <li>List of Services Offered</li>
                    <li>Projects & Testimonials</li>
                    <li>Enhanced SEO Optimization</li>
                  </ul>
                  <Button asChild size="lg" className="bg-yellow-700 hover:bg-yellow-800 text-white">
                    <Link to="/upgrade-to-premium">Upgrade to Premium - $20.99/month</Link>
                  </Button>
                </Card>
              )}
            </div>

            {/* Sidebar (always show basic contact) */}
            <div className="space-y-6">
              {/* Map (show only if premium) */}
              {installer.is_premium && installer.latitude && installer.longitude && (
                <Card>
                  <CardContent className="p-0">
                    <div className="h-[300px] rounded-lg overflow-hidden">
                      <MapComponent
                        installers={[{
                          id: installer.id,
                          name: installer.name,
                          latitude: installer.latitude,
                          longitude: installer.longitude,
                          location_city: installer.location_city,
                          location_state: installer.location_state,
                          is_premium: installer.is_premium,
                          certification_type: installer.certification_type,
                        }]}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Contact Info Card (always show) */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    {installer.phone && (
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <div className="text-sm text-muted-foreground">Phone</div>
                          <a
                            href={`tel:${installer.phone.replace(/\D/g, '')}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {installer.phone}
                          </a>
                        </div>
                      </div>
                    )}
                    {installer.company_website && (
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <div className="text-sm text-muted-foreground">Website</div>
                          <a
                            href={installer.company_website.startsWith('http') ? installer.company_website : `https://${installer.company_website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:text-primary transition-colors break-all"
                          >
                            {installer.company_website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">Location</div>
                        <div className="font-medium">{locationString}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Premium Badge (show only if premium) */}
              {installer.is_premium && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      <h3 className="font-bold">Premium Listing</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This installer has a verified premium listing with enhanced visibility.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default InstallerDetail;
