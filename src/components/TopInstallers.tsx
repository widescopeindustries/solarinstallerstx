import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShieldCheck, MapPin, Phone, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { generateInstallerSlug, generateCitySlug } from "@/lib/slugify";
import { logEvent, trackPremierInstallerLead } from "@/lib/analytics";

interface TopInstallersProps {
  installers: any[];
  loading: boolean;
}

export const TopInstallers = ({ installers, loading }: TopInstallersProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={`top-skeleton-${i}`} className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!installers || installers.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Premier Installer CTA Card */}
        <Card className="md:col-span-3 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Star className="w-8 h-8 text-amber-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Limited PREMIER INSTALLER LISTING Placements Available
                </h3>
                <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                  Showcase your solar installation business to thousands of Texas homeowners actively searching for certified installers.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-amber-200 max-w-lg mx-auto">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    NABCEP Certified Installers Priority
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Join the #1 ranked Texas solar installer directory
                </p>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3"
                    onClick={() => {
                      trackPremierInstallerLead('button_click', 'homepage_featured_section');
                      logEvent('premier_installer_cta_click', {
                        location: 'homepage_featured_section',
                        cta_type: 'email_button'
                      });
                    }}
                  >
                    <a href="mailto:info@solarinstallerstx.com?subject=Premier%20Installer%20Listing%20Inquiry" 
                       className="flex items-center justify-center gap-2 w-full">
                      <Star className="w-4 h-4" />
                      Secure Your Premier Spot Today
                    </a>
                  </Button>
                  
                  <p className="text-xs text-gray-500">
                    Contact: <a 
                      href="mailto:info@solarinstallerstx.com" 
                      className="text-amber-600 hover:underline"
                      onClick={() => {
                        trackPremierInstallerLead('email_click', 'homepage_featured_section');
                        logEvent('premier_installer_email_click', {
                          location: 'homepage_featured_section',
                          cta_type: 'email_link'
                        });
                      }}
                    >
                      info@solarinstallerstx.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Statewide Visibility</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>Premium Placement</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Listings</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {installers.map((installer) => {
        const nameSlug = generateInstallerSlug(installer.company_name, installer.name);
        const citySlug = generateCitySlug(installer.location_city);
        const newPath = `/installers/${citySlug}/${nameSlug}`;

        return (
          <Card key={installer.id} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    <Link to={newPath} className="hover:underline">
                      {installer.company_name || installer.name}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{installer.location_city}, {installer.location_state}</span>
                  </div>
                </div>
                <Badge variant="default" className="bg-primary/15 text-primary border border-primary/20">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              </div>

              {/* Rating */}
              {installer.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={`star-${installer.id}-${i}`}
                        className={`h-4 w-4 ${
                          i < Math.floor(installer.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-sm">{installer.rating}</span>
                  {installer.review_count > 0 && (
                    <span className="text-sm text-muted-foreground">
                      ({installer.review_count} reviews)
                    </span>
                  )}
                </div>
              )}

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                {installer.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <a 
                      href={`tel:${installer.phone.replace(/\D/g, '')}`}
                      className="text-primary hover:underline"
                    >
                      {installer.phone}
                    </a>
                  </div>
                )}
                {installer.company_website && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-primary" />
                    <a 
                      href={installer.company_website.startsWith('http') ? installer.company_website : `https://${installer.company_website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline truncate"
                    >
                      {installer.company_website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>

              {/* Certification */}
              <div className="text-sm text-muted-foreground mb-4">
                <div className="font-medium text-foreground/80 mb-1">Certification:</div>
                <div>{installer.certification_type}</div>
              </div>

              <Button asChild className="w-full">
                <Link to={`/installer/${installerSlug}`}>
                  View Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TopInstallers;
