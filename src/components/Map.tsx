import * as React from 'react';
import { useState, useMemo } from 'react';
import Map, { 
  Marker, 
  Popup, 
  NavigationControl, 
  FullscreenControl, 
  GeolocateControl,
  ScaleControl
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Sun, MapPin, Star, Phone, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Load from environment variable
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';
const TEXAS_BOUNDS = {
  sw: [-106.6456, 25.8371], // Southwest coordinates of Texas
  ne: [-93.5083, 36.5007]   // Northeast coordinates of Texas
};

interface InstallerInfo {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  location_city: string;
  location_state: string;
  phone?: string;
  company_website?: string;
  is_premium?: boolean;
  certification_type: string;
}

interface MapProps {
  installers: Array<InstallerInfo>;
  onMarkerClick?: (installerId: string) => void;
  searchLocation?: [number, number];
}

export const MapComponent = ({ installers, onMarkerClick, searchLocation }: MapProps) => {
  const [popupInfo, setPopupInfo] = useState<InstallerInfo | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 31.9686,
    longitude: -99.9018,
    zoom: searchLocation ? 10 : 5.5,
    bearing: 0,
    pitch: 45
  });
  
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v12');
  // No ref needed for basic functionality

  // Filter out invalid coordinates and sort by premium status
  const validInstallers = useMemo(
    () => installers
      .filter(i => i.latitude && i.longitude)
      .sort((a, b) => (b.is_premium ? 1 : 0) - (a.is_premium ? 1 : 0)),
    [installers]
  );

  // Custom marker component
  const CustomMarker = ({ installer, onClick }: any) => (
    <div
      className="group relative"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div
        className={`
          cursor-pointer transform transition-all duration-200
          hover:scale-110 hover:-translate-y-1
          w-8 h-8 rounded-full flex items-center justify-center
          ${installer.is_premium 
            ? 'bg-gradient-to-br from-amber-400 to-amber-600 shadow-amber-200/50'
            : 'bg-primary shadow-primary/30'
          }
          border-2 border-white shadow-lg
        `}
      >
        {installer.is_premium ? (
          <Star className="w-4 h-4 text-white" />
        ) : (
          <Sun className="w-4 h-4 text-white" />
        )}
      </div>
      
      {/* Hover tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="bg-white px-3 py-1 rounded-md shadow-lg text-sm whitespace-nowrap">
          {installer.name}
        </div>
      </div>
    </div>
  );

  // Render map markers
  const pins = useMemo(
    () =>
      validInstallers.map((installer) => (
        <Marker
          key={installer.id}
          longitude={installer.longitude}
          latitude={installer.latitude}
        >
          <CustomMarker
            installer={installer}
            onClick={() => {
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
      mapboxApiAccessToken={MAPBOX_TOKEN}
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={newViewport => setViewport(newViewport)}
      mapStyle={mapStyle}
      minZoom={4}
      maxZoom={16}
      reuseMaps
    >
      <>
        <div className="absolute top-2 right-24 bg-white rounded-lg shadow-lg p-2 z-10">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMapStyle('mapbox://styles/mapbox/streets-v12')}
              className={`px-3 py-1 rounded text-sm ${
                mapStyle.includes('streets') ? 'bg-primary text-white' : 'bg-gray-100'
              }`}
            >
              Street
            </button>
            <button
              type="button"
              onClick={() => setMapStyle('mapbox://styles/mapbox/satellite-streets-v12')}
              className={`px-3 py-1 rounded text-sm ${
                mapStyle.includes('satellite') ? 'bg-primary text-white' : 'bg-gray-100'
              }`}
            >
              Satellite
            </button>
          </div>
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <NavigationControl />
          <FullscreenControl />
          <GeolocateControl trackUserLocation />
        </div>

        <div className="absolute bottom-3 right-3">
          <ScaleControl />
        </div>

        {searchLocation && (
          <Marker
            longitude={searchLocation[0]}
            latitude={searchLocation[1]}
          >
            <div className="relative">
              <div className="absolute -inset-3 bg-primary/20 rounded-full animate-ping" />
              <div className="relative w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <MapPin className="h-4 w-4 text-white" />
              </div>
            </div>
          </Marker>
        )}

        {pins}

        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            onClose={() => setPopupInfo(null)}
            closeButton={true}
            closeOnClick={false}
            className="installer-popup"
          >
            <div className="p-4 space-y-3 w-[300px]">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-lg leading-tight">{popupInfo.name}</h3>
                {popupInfo.is_premium && (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200">
                    <Star className="w-3 h-3 mr-1" /> Premium
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  {popupInfo.location_city}, {popupInfo.location_state}
                </div>
                {popupInfo.phone && (
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-1.5 flex-shrink-0 text-muted-foreground" />
                    <a href={`tel:${popupInfo.phone}`} className="hover:text-primary">
                      {popupInfo.phone}
                    </a>
                  </div>
                )}
                {popupInfo.company_website && (
                  <div className="flex items-center text-sm">
                    <Globe className="w-4 h-4 mr-1.5 flex-shrink-0 text-muted-foreground" />
                    <a 
                      href={popupInfo.company_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary truncate"
                    >
                      {new URL(popupInfo.company_website).hostname}
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <Badge variant="outline" className="mb-2">
                  <Shield className="w-3 h-3 mr-1" />
                  {popupInfo.certification_type}
                </Badge>
                <Button 
                  className="w-full mt-2"
                  onClick={() => onMarkerClick?.(popupInfo.id)}
                >
                  View Profile
                </Button>
              </div>
            </div>
          </Popup>
        )}
      </>
    </Map>
  );
}
export default MapComponent;
