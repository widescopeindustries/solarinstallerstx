"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buildInstallerPath } from "@/lib/slugify";
import { getTierColorNoHover } from "@/lib/tierColors";
import { formatPhoneNumber } from "@/lib/formatters";
import { ShieldCheck, Phone, Globe, MapPin, Award, Zap } from "lucide-react";
import Link from "next/link";

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
  tier?: string | null;
  total_safety_score?: number | null;
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
  tier,
  total_safety_score,
}: InstallerListCardProps) => {
  const newPath = buildInstallerPath({ id, name, company_name, location_city });

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border border-border/50 hover:border-border/80">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Company info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Link
                href={newPath}
                className="font-semibold text-foreground hover:text-primary transition-colors truncate"
              >
                {company_name || name}
              </Link>
              {tier && (
                <Badge variant="secondary" className={`text-xs px-2 py-0.5 ${getTierColorNoHover(tier)}`}>
                  <Award className="h-3 w-3 mr-1" />
                  {tier}
                </Badge>
              )}
              {total_safety_score !== undefined && total_safety_score !== null && (
                <Badge variant="outline" className="text-xs px-2 py-0.5 border-green-500/50 text-green-600 dark:text-green-400 font-bold">
                  <Zap className="h-2 w-2 mr-1 fill-current" />
                  {total_safety_score}
                </Badge>
              )}
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
              <Link href={newPath}>
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
