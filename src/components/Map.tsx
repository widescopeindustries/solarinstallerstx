import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibW9seW5kb24iLCJhIjoiY21ncHU0cDFvMjNqeDJqcTk4OXRyajZxeSJ9.CQpaubrrZsUItptmw7J_1g';

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

export const Map = ({ installers, onMarkerClick }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-99.9018, 31.9686], // Texas center
      zoom: 5.5,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add markers for installers with coordinates
    installers.forEach(installer => {
      if (installer.latitude && installer.longitude) {
        const el = document.createElement('div');
        el.className = installer.is_premium ? 'premium-marker' : 'marker';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';
        el.style.background = installer.is_premium 
          ? 'linear-gradient(135deg, hsl(var(--premium)), hsl(var(--accent)))'
          : 'hsl(var(--primary))';
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';

        const marker = new mapboxgl.Marker(el)
          .setLngLat([installer.longitude, installer.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div style="padding: 8px;">
                <h3 style="font-weight: bold; margin-bottom: 4px;">${installer.name}</h3>
                <p style="font-size: 12px; color: #666;">${installer.location_city}, ${installer.location_state}</p>
                <p style="font-size: 11px; color: #888;">${installer.certification_type}</p>
              </div>`
            )
          )
          .addTo(map.current!);

        el.addEventListener('click', () => {
          if (onMarkerClick) {
            onMarkerClick(installer.id);
          }
        });

        markers.current.push(marker);
      }
    });

    // Fit bounds to show all markers if there are any
    if (installers.length > 0) {
      const validInstallers = installers.filter(i => i.latitude && i.longitude);
      if (validInstallers.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        validInstallers.forEach(installer => {
          bounds.extend([installer.longitude, installer.latitude]);
        });
        map.current.fitBounds(bounds, { padding: 50, maxZoom: 10 });
      }
    }
  }, [installers, onMarkerClick]);

  return <div ref={mapContainer} className="w-full h-full rounded-lg" />;
};
