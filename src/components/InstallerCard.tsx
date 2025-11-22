import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buildInstallerPath } from "@/lib/slugify";
import { getTierColor } from "@/lib/tierColors";
import { formatPhoneNumber } from "@/lib/formatters";
import { ShieldCheck, MapPin, Award } from "lucide-react";
import Link from "next/link";

interface InstallerCardProps {
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
  tier?: string | null;
  total_safety_score?: number | null;
}

export const InstallerCard = ({
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
  tier,
  total_safety_score,
}: InstallerCardProps) => {
  const newPath = buildInstallerPath({ id, name, company_name, location_city });

  return (
    <Link to={newPath}>
      <Card className="group relative overflow-hidden transition-all duration-300 border border-border/50 hover:border-border bg-[var(--gradient-card)] hover:bg-[var(--gradient-card-hover)] hover:shadow-[var(--shadow-elegant)] h-full flex flex-col hover:-translate-y-1 cursor-pointer">
        {/* Subtle accent line */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      
      <CardContent className="relative p-6 space-y-4 flex-1 flex flex-col backdrop-blur-sm">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-xl text-foreground leading-tight group-hover:text-primary transition-colors duration-200 flex-1">
              {company_name || name}
            </h3>
            <div className="flex flex-col gap-1">
              {tier && (
                <Badge variant="secondary" className={`${getTierColor(tier)} flex items-center gap-1 font-semibold`}>
                  <Award className="h-3 w-3" />
                  {tier} Tier
                </Badge>
              )}
              {is_verified && (
                <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            {phone && (
              <a 
                href={`tel:${phone.replace(/\D/g, '')}`}
                className="text-primary hover:text-primary/80 hover:underline inline-flex items-center gap-1 transition-colors text-sm"
                aria-label={`Call ${company_name || name}`}
                onClick={(e) => e.stopPropagation()}
              >
                {formatPhoneNumber(phone)}
              </a>
            )}
            {company_website && (
              <a 
                href={company_website.startsWith('http') ? company_website : `https://${company_website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 hover:underline inline-flex items-center gap-1 transition-colors text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                {company_website.replace(/^https?:\/\//, '')}
              </a>
            )}
            {!phone && !company_website && (
              <span className="text-muted-foreground text-sm">Contact info unavailable</span>
            )}
          </div>
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
            {certification_number ? (
              <a
                href={`https://directories.nabcep.org/view/installer/${certification_number}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-primary hover:underline inline-flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                title="Verify Certification on NABCEP.org"
              >
                {`${certification_number.split('-')[0]}-********`}
                <ShieldCheck className="h-3 w-3" />
              </a>
            ) : (
              <span className="text-muted-foreground">Not Available</span>
            )}
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
          <div className="text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="font-medium text-foreground/80">Location:</span> {location_city}, {location_state} {location_zip}
          </div>
        </div>

        <Button 
          className="w-full mt-auto bg-foreground hover:bg-foreground/90 text-background shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all font-medium"
          asChild
        >
          <span>View Details</span>
        </Button>
      </CardContent>
    </Card>
    </Link>
  );
};