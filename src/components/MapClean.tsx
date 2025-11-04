import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import Supercluster from 'supercluster';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface Installer {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  location_city: string;
  location_state: string;
  is_premium?: boolean;
  certification_type: string;
}

interface MapProps {
  installers: Installer[];
  onMarkerClick?: (installerId: string) => void;
}

export const MapComponent = ({ installers, onMarkerClick }: MapProps) => {
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [clusters, setClusters] = useState<any[]>([]);
  const mapRef = useRef<any>(null);

  const validInstallers = useMemo(() => installers.filter(i => i.latitude && i.longitude), [installers]);

  const indexRef = useRef<any>(null);
  useEffect(() => {
    const points = validInstallers.map(i => ({
      type: 'Feature',
      properties: {
        id: i.id,
        name: i.name,
        location_city: i.location_city,
        location_state: i.location_state,
        is_premium: !!i.is_premium,
        certification_type: i.certification_type,
      },
      geometry: { type: 'Point', coordinates: [i.longitude, i.latitude] },
    }));

    const index = new Supercluster({ radius: 60, maxZoom: 16 });
    index.load(points as any);
    indexRef.current = index;
  }, [validInstallers]);

  const updateClusters = useCallback(() => {
    const map = mapRef.current?.getMap?.() || mapRef.current;
    if (!map || !indexRef.current) return;
    const bounds = map.getBounds();
    const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
    const zoom = Math.round(map.getZoom());
    const result = indexRef.current.getClusters(bbox, zoom);
    setClusters(result as any);
  }, []);

  useEffect(() => {
    updateClusters();
  }, [updateClusters, validInstallers]);

  const handleClusterClick = useCallback((cluster: any) => {
    const map = mapRef.current?.getMap?.() || mapRef.current;
    if (!map || !indexRef.current) return;
    const expansionZoom = indexRef.current.getClusterExpansionZoom(cluster.id);
    map.easeTo({ center: [cluster.geometry.coordinates[0], cluster.geometry.coordinates[1]], zoom: expansionZoom });
  }, []);

  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      ref={mapRef}
      initialViewState={{ latitude: 31.0, longitude: -99.0, zoom: 5.25 }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      onMove={() => updateClusters()}
      onLoad={() => updateClusters()}
    >
      <NavigationControl />

      {clusters.map((c) => {
        const [lng, lat] = c.geometry.coordinates;
        if (c.properties && c.properties.cluster) {
          const count = c.properties.point_count;
          return (
            <Marker key={`cluster-${c.id}`} longitude={lng} latitude={lat}>
              <div
                onClick={(e) => { e.stopPropagation(); handleClusterClick(c); }}
                className="flex items-center justify-center rounded-full text-sm font-semibold text-white cursor-pointer"
                style={{
                  width: `${Math.min(40, 20 + (count / 10) * 10)}px`,
                  height: `${Math.min(40, 20 + (count / 10) * 10)}px`,
                  background: 'rgba(59,130,246,0.9)',
                  border: '2px solid white',
                }}
              >
                {count}
              </div>
            </Marker>
          );
        }

        const props = c.properties;
        return (
          <Marker key={props.id} longitude={lng} latitude={lat}>
            <div
              className="cursor-pointer"
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: props.is_premium ? 'linear-gradient(135deg,#f5c156,#f59e0b)' : '#3b82f6',
                border: '2px solid white',
                boxShadow: '0 1px 6px rgba(0,0,0,0.15)',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setPopupInfo({
                  latitude: lat,
                  longitude: lng,
                  name: props.name,
                  location_city: props.location_city,
                  location_state: props.location_state,
                  certification_type: props.certification_type,
                  id: props.id,
                });
                if (onMarkerClick && props.id) onMarkerClick(props.id);
              }}
            />
          </Marker>
        );
      })}

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
}
