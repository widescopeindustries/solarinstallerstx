import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  const formatCertificationType = (type: string) => {
    // Extract the abbreviation if it exists in parentheses
    const match = type.match(/\(([^)]+)\)/);
    return match ? match[1] : type;
  };

  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/20 bg-card">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-foreground leading-tight">
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
          <div className="text-muted-foreground">
            <span className="font-medium text-foreground/80">Cert #:</span> {certification_number}
          </div>
          {certification_expires && (
            <div className="text-muted-foreground">
              <span className="font-medium text-foreground/80">Expires:</span> {certification_expires}
            </div>
          )}
        </div>

        <div className="space-y-1.5 text-sm text-muted-foreground pt-2 border-t border-border/50">
          <div>
            <span className="font-medium text-foreground/80">Country:</span> {country}
          </div>
          <div>
            <span className="font-medium text-foreground/80">Location:</span> {location_city}, {location_state} {location_zip}
          </div>
        </div>

        <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all">
          Contact
        </Button>
      </CardContent>
    </Card>
  );
};