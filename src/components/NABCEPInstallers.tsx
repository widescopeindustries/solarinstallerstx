import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone, Award, Shield, CheckCircle } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Link } from "react-router-dom";
import { generateInstallerSlug } from "@/lib/slugify";

interface Installer {
  id: string;
  name: string;
  company_name?: string;
  location_city: string;
  location_state: string;
  certification_type: string;
  certification_number?: string;
  phone?: string;
  company_website?: string;
  is_premium?: boolean;
  rating?: number;
  review_count?: number;
  years_in_business?: number;
  services?: string[];
  certifications?: string[];
}

interface NABCEPInstallersProps {
  installers: Installer[];
  loading?: boolean;
}

export const NABCEPInstallers = ({ installers, loading = false }: NABCEPInstallersProps) => {
  // Show all NABCEP installers, not just 6
  const displayInstallers = installers;

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h2 className="text-4xl font-bold text-foreground">
                NABCEP Certified Solar Installers
              </h2>
              <Award className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Loading certified solar professionals...
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-white rounded-lg border-2 border-gray-100 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">
              NABCEP Certified Solar Installers
            </h2>
            <Award className="h-8 w-8 text-primary" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet Texas's most trusted solar professionals. All installers featured below are 
            <strong className="text-primary"> NABCEP certified</strong>, ensuring the highest 
            quality installations and industry expertise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
              Rigorously Tested & Certified
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Shield className="h-4 w-4 mr-2 text-blue-600" />
              Industry Gold Standard
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Award className="h-4 w-4 mr-2 text-yellow-600" />
              Texas Licensed & Insured
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayInstallers.map((installer) => {
            const installerSlug = generateInstallerSlug(
              installer.company_name,
              installer.name,
              installer.location_city,
              installer.location_state,
              installer.id
            );
            
            return (
              <Card key={installer.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 h-full flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-foreground mb-2">
                        {installer.company_name || installer.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{installer.location_city}, {installer.location_state}</span>
                      </div>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">
                      NABCEP
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  {/* Certification Info */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="h-4 w-4" />
                    <span>{installer.certification_type}</span>
                    {installer.certification_number && (
                      <span className="text-xs">#{installer.certification_number}</span>
                    )}
                  </div>

                  {/* Years in Business */}
                  {installer.years_in_business && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Award className="h-4 w-4" />
                      <span>{installer.years_in_business}+ years in business</span>
                    </div>
                  )}

                  {/* Rating */}
                  {installer.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(installer.rating) ? 'fill-current' : ''}`} 
                          />
                        ))}
                      </div>
                      <span className="font-semibold">{installer.rating}</span>
                      {installer.review_count && (
                        <span className="text-sm text-muted-foreground">
                          ({installer.review_count} reviews)
                        </span>
                      )}
                    </div>
                  )}

                  {/* Services */}
                  {installer.services && installer.services.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2">Services:</h4>
                      <div className="flex flex-wrap gap-1">
                        {installer.services.slice(0, 3).map((service, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {installer.services.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{installer.services.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {installer.certifications && installer.certifications.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2">Certifications:</h4>
                      <div className="space-y-1">
                        {installer.certifications.slice(0, 2).map((cert, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span>{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="pt-4 border-t border-border mt-auto">
                    <div className="flex gap-2">
                      {installer.phone && (
                        <Button size="sm" className="flex-1" asChild>
                          <a href={`tel:${installer.phone.replace(/\D/g, '')}`}>
                            <Phone className="h-4 w-4 mr-2" />
                            Call Now
                          </a>
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <Link to={`/installer/${installerSlug}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Installers CTA */}
        <div className="text-center">
          <div className="bg-white border border-primary/20 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Find Your Perfect Solar Installer?
            </h3>
            <p className="text-muted-foreground mb-6">
              Browse our complete directory of {displayInstallers.length}+ NABCEP certified solar installers 
              across Texas. Compare quotes, read reviews, and find the perfect match for your solar project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold">
                View All Installers
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg font-semibold">
                Get Free Quotes
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              💡 All installers are NABCEP certified and Texas licensed
            </p>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{displayInstallers.length}+</div>
            <div className="text-sm text-muted-foreground">NABCEP Certified Installers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Successful Installations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">25+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};
