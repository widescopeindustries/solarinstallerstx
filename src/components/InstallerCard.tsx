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
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6 space-y-3">
        <h3 className="font-bold text-lg">
          {name}
        </h3>

        <div className="space-y-1 text-sm">
          <div className="font-medium">
            {certification_type}
          </div>
          <div className="text-muted-foreground">
            Cert #: {certification_number}
          </div>
          {certification_expires && (
            <div className="text-muted-foreground">
              Expires: {certification_expires}
            </div>
          )}
        </div>

        {company_name && (
          <div className="space-y-1 text-sm">
            <div>{company_name}</div>
            {company_website && (
              <a 
                href={company_website.startsWith('http') ? company_website : `https://${company_website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 hover:underline block"
              >
                {company_website.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        )}

        <div className="space-y-1 text-sm text-muted-foreground">
          <div>Country: {country}</div>
          <div>
            Location: {location_city}, {location_state} {location_zip}
          </div>
        </div>

        <Button className="w-full bg-orange-600 hover:bg-orange-700">
          Contact
        </Button>
      </CardContent>
    </Card>
  );
};