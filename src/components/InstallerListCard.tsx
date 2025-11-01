import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buildInstallerPath } from "@/lib/slugify";
import { ShieldCheck, Phone, Globe, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface InstallerListCardProps {
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
  is_premium?: boolean;
}

export const InstallerListCard = ({
  id,
  name,
  certification_type,
  certification_number,
  certification_expires,
  company_name,
  company_website,
  phone,
  location_city,
  location_state,
  location_zip,
  country,
  is_verified = false,
  is_premium = false,
}: InstallerListCardProps) => {
  const newPath = buildInstallerPath({ id, name, company_name, location_city });
  
  const formatPhoneNumber = (phoneNum: string) => {
    const cleaned = phoneNum.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    if (cleaned.length === 11) {
      return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    return phoneNum;
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border border-border/50 hover:border-border/80">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Company info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Link 
                to={newPath}
                className="font-semibold text-foreground hover:text-primary transition-colors truncate"
              >
                {company_name || name}
              </Link>
              {is_verified && (
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
              {is_premium && (
                <Badge variant="default" className="text-xs px-2 py-0.5 bg-primary/10 text-primary">
                  Premium
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{location_city}, {location_state}</span>
              </div>
              <div className="text-xs">
                {certification_type}
              </div>
            </div>
          </div>

          {/* Right side - Contact info */}
          <div className="flex items-center gap-3 text-sm">
            {phone && (
              <a 
                href={`tel:${phone.replace(/\D/g, '')}`}
                className="flex items-center gap-1 text-primary hover:text-primary/80 hover:underline transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone className="h-3 w-3" />
                <span className="hidden sm:inline">{formatPhoneNumber(phone)}</span>
                <span className="sm:hidden">Call</span>
              </a>
            )}
            
            {company_website && (
              <a 
                href={company_website.startsWith('http') ? company_website : `https://${company_website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:text-primary/80 hover:underline transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="h-3 w-3" />
                <span className="hidden sm:inline">Website</span>
              </a>
            )}
            
            <Button size="sm" variant="outline" asChild>
              <Link to={newPath}>
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
