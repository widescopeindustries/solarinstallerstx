import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TexasHighwayMapProps {
  className?: string;
  showCities?: boolean;
}

// Texas cities with coordinates for highway map overlay
const TEXAS_CITIES = [
  { name: 'Austin', slug: 'austin', x: 48, y: 58, installerCount: 45 },
  { name: 'Dallas', slug: 'dallas', x: 38, y: 35, installerCount: 52 },
  { name: 'Houston', slug: 'houston', x: 55, y: 75, installerCount: 67 },
  { name: 'San Antonio', slug: 'san-antonio', x: 40, y: 70, installerCount: 38 },
  { name: 'Fort Worth', slug: 'fort-worth', x: 35, y: 38, installerCount: 29 },
  { name: 'El Paso', slug: 'el-paso', x: 15, y: 45, installerCount: 12 },
  { name: 'Arlington', slug: 'arlington', x: 33, y: 40, installerCount: 18 },
  { name: 'Corpus Christi', slug: 'corpus-christi', x: 50, y: 85, installerCount: 15 },
  { name: 'Plano', slug: 'plano', x: 36, y: 32, installerCount: 22 },
  { name: 'Laredo', slug: 'laredo', x: 35, y: 82, installerCount: 8 },
  { name: 'Lubbock', slug: 'lubbock', x: 25, y: 25, installerCount: 14 },
  { name: 'Garland', slug: 'garland', x: 37, y: 35, installerCount: 16 },
  { name: 'Irving', slug: 'irving', x: 34, y: 37, installerCount: 19 },
  { name: 'Amarillo', slug: 'amarillo', x: 22, y: 18, installerCount: 11 },
];

export const TexasHighwayMap: React.FC<TexasHighwayMapProps> = ({
  className = "",
  showCities = true
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Texas Highway Map Background */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden shadow-lg">
        {/* Texas Highway Map Image */}
        <div className="relative w-full h-[400px]">
          <img
            src="/images/texashwy.jpg"
            alt="Texas Highway Map"
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* City markers overlay */}
          {showCities && TEXAS_CITIES.map((city) => (
            <Link
              key={city.slug}
              to={`/cities/${city.slug}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
              style={{
                left: `${city.x}%`,
                top: `${city.y}%`
              }}
            >
              {/* City marker */}
              <div className="relative">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg group-hover:bg-red-600 transition-colors cursor-pointer flex items-center justify-center">
                  <MapPin className="w-2.5 h-2.5 text-white" />
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                  <div className="bg-white px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap border">
                    <div className="font-semibold">{city.name}</div>
                    <div className="text-gray-600">{city.installerCount} Solar Installers</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm border">
          <div className="space-y-2">
            <div className="font-semibold text-sm">Texas Solar Markets</div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Major Cities</span>
            </div>
            <div className="text-xs text-gray-600">
              Click cities to explore local installers
            </div>
          </div>
        </div>

        {/* Highway label */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border">
          <div className="text-xs font-medium text-gray-700">
            Texas Highway Network
          </div>
        </div>
      </div>
    </div>
  );
};

export default TexasHighwayMap;