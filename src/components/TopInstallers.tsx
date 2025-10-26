import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShieldCheck, MapPin, Phone, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { generateInstallerSlug } from "@/lib/slugify";

interface TopInstallersProps {
  installers: any[];
  loading: boolean;
}

export const TopInstallers = ({ installers, loading }: TopInstallersProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-6">
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {installers.map((installer) => {
        const installerSlug = generateInstallerSlug(
          installer.company_name,
          installer.name,
          installer.location_city,
          installer.location_state,
          installer.id
        );

        return (
          <Card key={installer.id} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {installer.company_name || installer.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{installer.location_city}, {installer.location_state}</span>
                  </div>
                </div>
                <Badge variant="default" className="bg-primary/10 text-primary">
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
                        key={i}
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
