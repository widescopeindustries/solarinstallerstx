import { useState, Suspense, lazy } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';
const MAP_STYLE = 'mapbox/streets-v12';

const LazyMapComponent = lazy(() =>
  import("@/components/Map").then((module) => ({ default: module.MapComponent }))
);

interface StaticMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  width?: number;
  height?: number;
  installer: any;
}

export const StaticMap = ({
  latitude,
  longitude,
  zoom = 13,
  width = 800,
  height = 300,
  installer
}: StaticMapProps) => {
  const [isInteractive, setIsInteractive] = useState(false);

  if (!MAPBOX_TOKEN) {
    console.error("Mapbox token is not configured.");
    return (
        <div className="flex items-center justify-center h-full bg-muted/40 text-muted-foreground">
            Map configuration error.
        </div>
    );
  }

  const staticImageUrl = `https://api.mapbox.com/styles/v1/${MAP_STYLE}/static/pin-s-l+ff0000(${longitude},${latitude})/${longitude},${latitude},${zoom},0/${width}x${height}@2x?access_token=${MAPBOX_TOKEN}`;

  if (isInteractive) {
    return (
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full bg-muted/40 text-muted-foreground">
            Loading interactive map...
          </div>
        }
      >
        <LazyMapComponent
          installers={[{
            id: installer.id,
            name: installer.name,
            latitude: installer.latitude,
            longitude: installer.longitude,
            location_city: installer.location_city,
            location_state: installer.location_state,
            is_premium: installer.is_premium,
            certification_type: installer.certification_type,
          }]}
        />
      </Suspense>
    );
  }

  return (
    <div className="relative w-full h-full" style={{ height: `${height}px` }}>
      <img
        src={staticImageUrl}
        alt={`Map showing location of ${installer.name}`}
        width={width}
        height={height}
        loading="lazy"
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <Button
          onClick={() => setIsInteractive(true)}
          variant="secondary"
          className="shadow-2xl"
        >
          <MapPin className="w-4 h-4 mr-2" />
          View Interactive Map
        </Button>
      </div>
    </div>
  );
};
