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
    <Card className="group relative overflow-hidden transition-all duration-500 border-2 border-secondary/30 hover:border-secondary/60 bg-[var(--gradient-card)] hover:shadow-[0_8px_32px_-8px_hsl(var(--secondary)/0.4),0_0_0_1px_hsl(var(--secondary)/0.2)] h-full flex flex-col hover:-translate-y-1">
      {/* Solar panel grid pattern */}
      <div className="absolute inset-0 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500"
           style={{
             backgroundImage: `
               linear-gradient(to right, hsl(var(--secondary)) 1px, transparent 1px),
               linear-gradient(to bottom, hsl(var(--secondary)) 1px, transparent 1px)
             `,
             backgroundSize: '60px 60px'
           }} />
      
      {/* Solar panel diagonal cells overlay */}
      <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-500"
           style={{
             backgroundImage: `repeating-linear-gradient(
               45deg,
               transparent,
               transparent 58px,
               hsl(var(--secondary) / 0.3) 58px,
               hsl(var(--secondary) / 0.3) 60px
             )`
           }} />
      
      {/* Reflective shine effect */}
      <div className="absolute inset-0 bg-[var(--gradient-solar-shine)] opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
      
      {/* Corner accent like solar panel frame */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent" />
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-secondary/40 via-secondary/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-secondary/40 via-secondary/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-t from-secondary/40 via-secondary/20 to-transparent" />
      
      <CardContent className="relative p-6 space-y-4 flex-1 flex flex-col backdrop-blur-[0.5px]">
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

        <Button className="w-full mt-auto bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-secondary-foreground shadow-[0_4px_12px_-2px_hsl(var(--secondary)/0.3)] hover:shadow-[0_8px_20px_-4px_hsl(var(--secondary)/0.5)] transition-all group-hover:scale-[1.02] font-semibold border border-secondary/20">
          Contact Installer
        </Button>
      </CardContent>
    </Card>
  );
};