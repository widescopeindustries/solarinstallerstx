import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Sun, Info } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface City {
  name: string;
  slug: string;
  population: string;
  solarData?: {
    potentialKwh: number;
    avgSystemSize: number;
    installerCount: number;
  };
}

interface TexasMapProps {
  cities: City[];
}

// More accurate city coordinates based on real latitude/longitude
const TEXAS_COORDINATES: Record<string, { lat: number; lng: number; x?: number; y?: number }> = {
  'austin': { lat: 30.2672, lng: -97.7431, x: 48.8, y: 58.2 },
  'dallas': { lat: 32.7767, lng: -96.7970, x: 51.2, y: 31.5 },
  'houston': { lat: 29.7604, lng: -95.3698, x: 63.5, y: 62.8 },
  'san-antonio': { lat: 29.4241, lng: -98.4936, x: 46.2, y: 68.5 },
  'fort-worth': { lat: 32.7555, lng: -97.3308, x: 49.8, y: 31.8 },
  'el-paso': { lat: 31.7619, lng: -106.485, x: 8.5, y: 43.2 },
  'arlington': { lat: 32.7357, lng: -97.1081, x: 50.5, y: 32.3 },
  'corpus-christi': { lat: 27.8006, lng: -97.3964, x: 47.8, y: 83.5 },
  'plano': { lat: 33.0198, lng: -96.6989, x: 52.3, y: 28.5 },
  'lubbock': { lat: 33.5779, lng: -101.8552, x: 28.5, y: 22.8 },
  'laredo': { lat: 27.5306, lng: -99.4803, x: 38.2, y: 86.5 },
  'garland': { lat: 32.9126, lng: -96.6389, x: 52.8, y: 30.2 }
};

// Convert lat/lng to SVG coordinates (Mercator-like projection)
function projectToSVG(lat: number, lng: number): { x: number; y: number } {
  // Texas bounds
  const TX_BOUNDS = {
    lat: { min: 25.8371, max: 36.5007 },
    lng: { min: -106.6456, max: -93.5083 }
  };

  const x = ((lng - TX_BOUNDS.lng.min) / (TX_BOUNDS.lng.max - TX_BOUNDS.lng.min)) * 100;
  const y = ((lat - TX_BOUNDS.lat.min) / (TX_BOUNDS.lat.max - TX_BOUNDS.lat.min)) * 100;

  return { x, y };
}

export const TexasMap = ({ cities }: TexasMapProps) => {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    setIsMapLoaded(true);
  }, []);

  return (
    <TooltipProvider>
      <div className={`relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden transition-opacity duration-500 ${isMapLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Texas Map SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-[500px]"
          xmlns="https://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
        >
          {/* State outline with gradient fill */}
          <defs>
            <linearGradient id="texasGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgb(239, 246, 255)', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(236, 253, 245)', stopOpacity: 0.6 }} />
            </linearGradient>
          </defs>

          {/* More accurate Texas outline */}
          <path
            d="M8.5,43.2 L28.5,22.8 L48.8,58.2 L63.5,62.8 L47.8,83.5 L38.2,86.5 L28.5,72.8 L18.2,65.5 L8.5,43.2"
            fill="url(#texasGradient)"
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            className="transition-all duration-300 hover:stroke-primary hover:stroke-[0.75]"
          />

          {/* City markers with animations and tooltips */}
          {cities.map((city) => {
            const coords = TEXAS_COORDINATES[city.slug as keyof typeof TEXAS_COORDINATES];
            if (!coords) return null;

            const { x, y } =
              typeof coords.x === "number" && typeof coords.y === "number"
                ? { x: coords.x, y: coords.y }
                : projectToSVG(coords.lat, coords.lng);

            return (
              <g key={city.slug} className="transition-transform duration-300">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <g
                      className="cursor-pointer transform-gpu"
                      onMouseEnter={() => setHoveredCity(city.slug)}
                      onMouseLeave={() => setHoveredCity(null)}
                    >
                      {/* Pulse animation for hovered city */}
                      {hoveredCity === city.slug && (
                        <circle
                          cx={x}
                          cy={y}
                          r="2"
                          className="animate-ping"
                          fill="hsl(var(--primary))"
                          opacity="0.3"
                        />
                      )}

                      {/* City marker */}
                      <circle
                        cx={x}
                        cy={y}
                        r="1.5"
                        className={`
                          transition-all duration-300
                          ${hoveredCity === city.slug
                            ? 'fill-primary stroke-white stroke-2'
                            : 'fill-primary/80 stroke-white stroke-1'
                          }
                        `}
                      />

                      {/* City label */}
                      <text
                        x={x}
                        y={y - 2}
                        textAnchor="middle"
                        className={`
                          text-[2px] font-medium
                          transition-all duration-300
                          ${hoveredCity === city.slug
                            ? 'fill-primary'
                            : 'fill-foreground'
                          }
                        `}
                      >
                        {city.name}
                      </text>

                      {/* Interactive highlight area */}
                      <circle
                        cx={x}
                        cy={y}
                        r="3"
                        fill="transparent"
                        className="cursor-pointer"
                      />
                    </g>
                  </TooltipTrigger>

                  <TooltipContent side="top" className="p-3 max-w-[200px]">
                    <div className="space-y-2">
                      <div className="font-semibold">{city.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Population: {city.population}
                      </div>
                      {city.solarData && (
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <Sun className="w-3 h-3" />
                            <span>{city.solarData.potentialKwh}kWh/yr</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Info className="w-3 h-3" />
                            <span>{city.solarData.installerCount} Installers</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>

                {/* City link overlay */}
                <Link
                  href={`/cities/${city.slug}`}
                  className={`
                    absolute transform -translate-x-1/2 -translate-y-1/2
                    transition-all duration-300 z-10
                    ${hoveredCity === city.slug ? 'scale-110' : 'scale-100'}
                  `}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-border">
          <div className="space-y-3">
            <div className="font-semibold">Texas Solar Markets</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Sun className="w-4 h-4 text-primary" />
                <span>Major Solar Markets</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Click on any city to explore local installers and solar data
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TexasMap;
