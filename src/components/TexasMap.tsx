import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface City {
  name: string;
  slug: string;
  population: string;
}

interface TexasMapProps {
  cities: City[];
}

export const TexasMap = ({ cities }: TexasMapProps) => {
  // This is a simplified representation of Texas cities
  // In a real implementation, you'd use a proper map library like Mapbox or Google Maps
  const cityPositions: Record<string, { x: number; y: number }> = {
    'austin': { x: 35, y: 60 },
    'dallas': { x: 25, y: 45 },
    'houston': { x: 40, y: 35 },
    'san-antonio': { x: 30, y: 50 },
    'fort-worth': { x: 20, y: 45 },
    'el-paso': { x: 5, y: 40 },
    'arlington': { x: 22, y: 47 },
    'corpus-christi': { x: 35, y: 25 },
    'plano': { x: 26, y: 44 },
    'lubbock': { x: 15, y: 30 },
    'laredo': { x: 25, y: 20 },
    'garland': { x: 24, y: 46 }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
      {/* Texas Outline SVG */}
      <svg 
        viewBox="0 0 400 300" 
        className="w-full h-96"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simplified Texas outline */}
        <path
          d="M50 50 L350 50 L350 250 L50 250 Z"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="2"
        />
        
        {/* City markers */}
        {cities.map((city) => {
          const position = cityPositions[city.slug];
          if (!position) return null;
          
          return (
            <g key={city.slug}>
              <circle
                cx={position.x * 4}
                cy={position.y * 3}
                r="8"
                fill="#3b82f6"
                className="hover:fill-blue-600 transition-colors cursor-pointer"
              />
              <text
                x={position.x * 4}
                y={position.y * 3 - 15}
                textAnchor="middle"
                className="text-xs font-medium fill-gray-700"
              >
                {city.name}
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* Interactive overlay */}
      <div className="absolute inset-0">
        {cities.map((city) => {
          const position = cityPositions[city.slug];
          if (!position) return null;
          
          return (
            <Link
              key={city.slug}
              to={`/cities/${city.slug}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer opacity-0 hover:opacity-100"
              style={{
                left: `${(position.x * 4) / 4}%`,
                top: `${(position.y * 3) / 3}%`
              }}
            />
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Major Cities</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Click on any city to find local installers
        </div>
      </div>
    </div>
  );
};

export default TexasMap;
