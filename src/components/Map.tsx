import { useState, useMemo, useCallback } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibW9seW5kb24iLCJhIjoiY21ncHU0cDFvMjNqeDJqcTk4OXRyajZxeSJ9.CQpaubrrZsUItptmw7J_1g';

interface MapProps {
  installers: Array<{
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    location_city: string;
    location_state: string;
    is_premium?: boolean;
    certification_type: string;
  }>;
  onMarkerClick?: (installerId: string) => void;
}

export const MapComponent = ({ installers, onMarkerClick }: MapProps) => {
  const [popupInfo, setPopupInfo] = useState<any>(null);

  const validInstallers = useMemo(
    () => installers.filter(i => i.latitude && i.longitude),
    [installers]
  );

  const pins = useMemo(
    () =>
      validInstallers.map((installer) => (
        <Marker
          key={installer.id}
          longitude={installer.longitude}
          latitude={installer.latitude}
        >
          <div
            className="cursor-pointer"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: installer.is_premium 
                ? 'linear-gradient(135deg, hsl(var(--premium)), hsl(var(--accent)))'
                : 'hsl(var(--primary))',
              border: '3px solid white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => {
              e.stopPropagation();
              setPopupInfo(installer);
              if (onMarkerClick) {
                onMarkerClick(installer.id);
              }
            }}
          />
        </Marker>
      )),
    [validInstallers, onMarkerClick]
  );

  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        latitude: 31.9686,
        longitude: -99.9018,
        zoom: 5.5,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/light-v11"
    >
      <NavigationControl />
      {pins}

      {popupInfo && (
        <Popup
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          onClose={() => setPopupInfo(null)}
          closeButton={true}
          closeOnClick={false}
        >
          <div className="p-2">
            <h3 className="font-bold mb-1">{popupInfo.name}</h3>
            <p className="text-sm text-muted-foreground">
              {popupInfo.location_city}, {popupInfo.location_state}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {popupInfo.certification_type}
            </p>
          </div>
        </Popup>
      )}
    </Map>
  );
};
