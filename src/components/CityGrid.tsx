import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Sun, Zap, TrendingUp } from "lucide-react";

interface City {
  name: string;
  slug: string;
  population: string;
  solarData?: {
    potentialKwh: number;
    avgSystemSize: number;
    installerCount: number;
    growthRate?: number;
  };
}

interface CityGridProps {
  cities: City[];
}

export const CityGrid = ({ cities }: CityGridProps) => {
  // Sort cities by population (descending)
  const sortedCities = [...cities].sort((a, b) => {
    const popA = parseInt(a.population.replace(/,/g, ""));
    const popB = parseInt(b.population.replace(/,/g, ""));
    return popB - popA;
  });

  const formatPopulation = (pop: string) => {
    const num = parseInt(pop.replace(/,/g, ""));
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {sortedCities.map((city) => (
        <Link key={city.slug} to={`/cities/${city.slug}`}>
          <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* City Name and Type Badge */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg leading-tight">
                    {city.name}
                  </h3>
                  {parseInt(city.population.replace(/,/g, "")) > 1000000 && (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 border border-amber-300">
                      Major
                    </Badge>
                  )}
                </div>

                {/* Population */}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  {formatPopulation(city.population)}
                </div>

                {/* Solar Data */}
                {city.solarData && (
                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1.5">
                        <Sun className="w-4 h-4 text-amber-500" />
                        <span>Potential</span>
                      </div>
                      <span className="font-medium">
                        {city.solarData.potentialKwh.toLocaleString()} kWh/yr
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1.5">
                        <Lightning className="w-4 h-4 text-blue-500" />
                        <span>Avg System</span>
                      </div>
                      <span className="font-medium">
                        {city.solarData.avgSystemSize} kW
                      </span>
                    </div>

                    {city.solarData.growthRate && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span>Growth</span>
                        </div>
                        <span className="font-medium">
                          {city.solarData.growthRate}%
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Location Indicator */}
                <div className="absolute bottom-2 right-2">
                  <MapPin className="w-4 h-4 text-muted-foreground/50" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};