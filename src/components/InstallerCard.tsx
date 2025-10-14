import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { maskCertificationNumber } from "@/lib/utils";
import { Shield } from "lucide-react";

interface InstallerCardProps {
  name: string;
  certification_type: string;
  certification_number: string;
  certification_expires?: string;
  company_name?: string;
  company_website?: string;
  location_city: string;
  location_state: string;
  location_zip?: string;
  country: string;
}

export const InstallerCard = ({
  name,
  certification_type,
  certification_number,
  certification_expires,
  company_name,
  company_website,
  location_city,
  location_state,
  location_zip,
  country,
}: InstallerCardProps) => {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  
  const formatCertificationType = (type: string) => {
    // Extract the abbreviation if it exists in parentheses
    const match = type.match(/\(([^)]+)\)/);
    return match ? match[1] : type;
  };

  const displayCertNumber = maskCertificationNumber(certification_number, isAuthenticated);

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 border border-primary/10 hover:border-primary/30 bg-gradient-to-br from-card to-card/95 hover:shadow-[0_8px_20px_-5px_hsl(217_91%_35%/0.15),0_0_0_1px_hsl(217_91%_35%/0.05)] h-full flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardContent className="relative p-6 space-y-4 flex-1 flex flex-col">
        <div className="space-y-2">
          <h3 className="font-bold text-xl text-foreground leading-tight group-hover:text-primary transition-colors duration-200">
            {company_name || name}
          </h3>
          {company_website && (
            <a 
              href={company_website.startsWith('http') ? company_website : `https://${company_website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 hover:underline inline-flex items-center gap-1 transition-colors text-sm"
            >
              {company_website.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>

        <div className="space-y-1.5 text-sm pt-2 border-t border-border/50">
          <div className="text-muted-foreground">
            <span className="font-medium text-foreground/80">Certified Professional:</span> {name}
          </div>
          <div className="text-muted-foreground">
            <span className="font-medium text-foreground/80">{certification_type}</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-2">
            <span className="font-medium text-foreground/80">Cert #:</span> 
            <span className="flex items-center gap-1">
              {displayCertNumber}
              {!isAuthenticated && (
                <Shield className="h-3 w-3 text-muted-foreground/60" />
              )}
            </span>
          </div>
          {certification_expires && (
            <div className="text-muted-foreground">
              <span className="font-medium text-foreground/80">Expires:</span> {certification_expires}
            </div>
          )}
        </div>

        <div className="space-y-1.5 text-sm text-muted-foreground pt-2 border-t border-border/50 flex-1">
          <div>
            <span className="font-medium text-foreground/80">Country:</span> {country}
          </div>
          <div>
            <span className="font-medium text-foreground/80">Location:</span> {location_city}, {location_state} {location_zip}
          </div>
        </div>

        <Button className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all group-hover:scale-[1.02]">
          Contact Installer
        </Button>
      </CardContent>
    </Card>
  );
};