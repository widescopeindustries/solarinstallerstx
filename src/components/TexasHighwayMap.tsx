import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TexasHighwayMapProps {
  className?: string;
  showCities?: boolean;
}

// Texas cities with coordinates for highway map overlay (adjusted for 30% zoom out)
const TEXAS_CITIES = [
  { name: 'Austin', slug: 'austin', x: 49, y: 57.8, installerCount: 45 },
  { name: 'Dallas', slug: 'dallas', x: 42.8, y: 41.8, installerCount: 52 },
  { name: 'Houston', slug: 'houston', x: 52.8, y: 71.8, installerCount: 67 },
  { name: 'San Antonio', slug: 'san-antonio', x: 45.8, y: 67.8, installerCount: 38 },
  { name: 'Fort Worth', slug: 'fort-worth', x: 41.8, y: 43.8, installerCount: 29 },
  { name: 'El Paso', slug: 'el-paso', x: 28.8, y: 51.8, installerCount: 12 },
  { name: 'Arlington', slug: 'arlington', x: 40.8, y: 45.8, installerCount: 18 },
  { name: 'Corpus Christi', slug: 'corpus-christi', x: 49.8, y: 79.8, installerCount: 15 },
  { name: 'Plano', slug: 'plano', x: 43.8, y: 39.8, installerCount: 22 },
  { name: 'Laredo', slug: 'laredo', x: 41.8, y: 77.8, installerCount: 8 },
  { name: 'Lubbock', slug: 'lubbock', x: 34.8, y: 33.8, installerCount: 14 },
  { name: 'Garland', slug: 'garland', x: 44.8, y: 41.8, installerCount: 16 },
  { name: 'Irving', slug: 'irving', x: 41.8, y: 43.8, installerCount: 19 },
  { name: 'Amarillo', slug: 'amarillo', x: 33.8, y: 28.8, installerCount: 11 },
];

export const TexasHighwayMap: React.FC<TexasHighwayMapProps> = ({
  className = "",
  showCities = true
}) => {
  const zoomFactor = 0.7; // 30% zoom out (70% of original size)
  return (
    <div className={`relative ${className}`}>
      {/* Texas Highway Map Background */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden shadow-lg">
        {/* Texas Highway Map Image */}
        <div className="relative w-full h-[400px] overflow-hidden">
          <img
            src="/images/texashwy.jpg"
            alt="Texas Highway Map"
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: `scale(${zoomFactor})`, transformOrigin: 'center' }}
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