import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Star, Phone, Crown, CheckCircle2 } from "lucide-react";

interface InstallerCardProps {
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  services: string[];
  isPremium?: boolean;
  certifications?: string[];
  yearsInBusiness?: number;
}

export const InstallerCard = ({
  name,
  location,
  rating,
  reviewCount,
  services,
  isPremium = false,
  certifications = [],
  yearsInBusiness,
}: InstallerCardProps) => {
  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 ${isPremium ? 'ring-2 ring-premium shadow-lg' : ''}`}>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-xl mb-1 truncate group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          </div>
          {isPremium && (
            <Badge variant="premium" className="flex-shrink-0">
              <Crown className="h-3 w-3" />
              Premium
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-semibold">{rating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({reviewCount} reviews)
          </span>
          {yearsInBusiness && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {yearsInBusiness}+ years
              </span>
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <div className="text-sm font-medium mb-2">Services</div>
          <div className="flex flex-wrap gap-1.5">
            {services.map((service, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
          </div>
        </div>

        {certifications.length > 0 && (
          <div>
            <div className="text-sm font-medium mb-2">Certifications</div>
            <div className="space-y-1">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                  <span className="truncate">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Phone className="h-4 w-4" />
          Contact
        </Button>
        <Button size="sm" className="flex-1">
          Get Quote
        </Button>
      </CardFooter>
    </Card>
  );
};