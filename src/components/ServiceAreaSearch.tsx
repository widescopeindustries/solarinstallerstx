import { useState, useEffect, useMemo } from 'react';
import { MapPin, Star, Phone, Mail, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddressSearch } from '@/components/AddressSearch';
import { MapComponent } from './Map';
import { logEvent } from "@/lib/analytics";

interface Installer {
  id: string;
  name: string;
  certification_type: string;
  location_city: string;
  location_state: string;
  service_radius: number;
  latitude: number;
  longitude: number;
  rating?: number;
  review_count?: number;
  is_premium?: boolean;
}

interface SearchResult {
  address: string;
  coordinates: [number, number];
  city: string;
  state: string;
  zipCode: string;
}

interface ServiceAreaSearchProps {
  installers: Installer[];
  onRequestQuote?: (installers: Installer[]) => void;
}

export const ServiceAreaSearch = ({ installers, onRequestQuote }: ServiceAreaSearchProps) => {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [matchingInstallers, setMatchingInstallers] = useState<Installer[]>([]);

  // Calculate matching installers when search result changes
  useEffect(() => {
    if (!searchResult) return;

    const matches = installers.filter(installer => {
      // Calculate distance between search location and installer
      const distance = calculateDistance(
        searchResult.coordinates[1],
        searchResult.coordinates[0],
        installer.latitude,
        installer.longitude
      );

      // Check if within service radius (default to 50 miles if not specified)
      return distance <= (installer.service_radius || 50);
    });

    setMatchingInstallers(matches);

    // Track number of matches found
    logEvent('service_area_matches', {
      location: searchResult.city,
      matches: matches.length
    });
  }, [searchResult, installers]);

  // Sort installers by premium status and rating
  const sortedInstallers = useMemo(() => {
    return [...matchingInstallers].sort((a, b) => {
      if (a.is_premium && !b.is_premium) return -1;
      if (!a.is_premium && b.is_premium) return 1;
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [matchingInstallers]);

  return (
    <div className="space-y-6">
      <AddressSearch
        onSearchResult={setSearchResult}
        className="max-w-2xl mx-auto"
      />

      {searchResult && (
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              {matchingInstallers.length} Installers Service Your Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {sortedInstallers.map(installer => (
                  <Card key={installer.id} className="relative overflow-hidden">
                    {installer.is_premium && (
                      <Badge variant="premium" className="absolute top-2 right-2">
                        Premium
                      </Badge>
                    )}
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{installer.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{installer.location_city}, {installer.location_state}</span>
                      </div>
                      {installer.rating && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(installer.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm">
                            {installer.rating} ({installer.review_count} reviews)
                          </span>
                        </div>
                      )}
                      <Badge variant="outline" className="mb-4">
                        {installer.certification_type}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="h-[500px] relative rounded-lg overflow-hidden">
                <MapComponent
                  installers={matchingInstallers}
                  searchLocation={searchResult.coordinates}
                />
              </div>
            </div>

            {matchingInstallers.length > 0 && (
              <div className="mt-6 text-center">
                <Button
                  size="lg"
                  onClick={() => {
                    onRequestQuote?.(matchingInstallers);
                    logEvent('request_quote_from_search', {
                      installers: matchingInstallers.length,
                      location: searchResult.city
                    });
                  }}
                >
                  Get Quotes from These Installers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Haversine formula to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}