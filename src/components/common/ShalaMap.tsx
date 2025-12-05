import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { DivIcon, LatLngBounds } from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExpand,
  faCompress,
  faLocationCrosshairs,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import type { ShalaData } from './ShalaCard';
import 'leaflet/dist/leaflet.css';

interface ShalaMapProps {
  shalas: ShalaData[];
  onShalaSelect?: (shala: ShalaData) => void;
  onNearMe?: (coords: { lat: number; lng: number }) => void;
  className?: string;
}

// Custom shala pin SVG (terracotta/accent color)
const shalaPinSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
  <path d="M12 0C5.4 0 0 5.4 0 12c0 7.2 12 24 12 24s12-16.8 12-24c0-6.6-5.4-12-12-12z" fill="#AA5042"/>
  <circle cx="12" cy="12" r="5" fill="white"/>
</svg>
`;

const shalaIcon = new DivIcon({
  html: shalaPinSvg,
  className: 'shala-marker',
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
});

// User location dot (blue)
const userPinSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <circle cx="12" cy="12" r="10" fill="#2563eb" stroke="white" stroke-width="3"/>
  <circle cx="12" cy="12" r="4" fill="white"/>
</svg>
`;

const userIcon = new DivIcon({
  html: userPinSvg,
  className: 'user-marker',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

// Component to fit bounds to all markers
function FitBounds({ shalas, userLocation }: { shalas: ShalaData[]; userLocation: { lat: number; lng: number } | null }) {
  const map = useMap();

  useEffect(() => {
    if (shalas.length === 0) return;

    const points: [number, number][] = shalas.map((s) => [s.lat, s.lng]);
    if (userLocation) {
      points.push([userLocation.lat, userLocation.lng]);
    }

    const bounds = new LatLngBounds(points);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, shalas, userLocation]);

  return null;
}

// Component to fly to user location
function FlyToLocation({ location }: { location: { lat: number; lng: number } | null }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 10, { duration: 1.5 });
    }
  }, [map, location]);

  return null;
}

// Component to handle map resize when container changes
function MapResizeHandler({ isExpanded }: { isExpanded: boolean }) {
  const map = useMap();

  useEffect(() => {
    // Wait for CSS transition to complete, then invalidate size
    const timeout = setTimeout(() => {
      map.invalidateSize();
    }, 350);

    return () => clearTimeout(timeout);
  }, [map, isExpanded]);

  return null;
}

export default function ShalaMap({
  shalas,
  onShalaSelect,
  onNearMe,
  className = '',
}: ShalaMapProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(coords);
        setIsLocating(false);
        onNearMe?.(coords);
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location permission denied');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location unavailable');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out');
            break;
          default:
            setLocationError('Unable to get location');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div
      className={`shala-map relative w-full transition-all duration-300 ease-in-out ${
        isExpanded ? 'h-[70vh]' : 'h-48 md:h-56'
      } ${className}`}
    >
      {/* Custom styles for Leaflet */}
      <style>{`
        .shala-map .leaflet-container:focus {
          outline: none;
        }
        .shala-map .leaflet-marker-icon:focus,
        .shala-map .leaflet-marker-shadow:focus {
          outline: none;
        }
        .shala-map .shala-marker,
        .shala-map .user-marker {
          background: transparent;
          border: none;
        }
        .shala-map .shala-marker:focus,
        .shala-map .user-marker:focus {
          outline: none;
        }
        .shala-map .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .shala-map .leaflet-popup-tip {
          box-shadow: none;
        }
      `}</style>

      <MapContainer
        center={[20, 10]}
        zoom={2}
        scrollWheelZoom={true}
        className="h-full w-full"
        style={{ background: '#e8e4d9' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds shalas={shalas} userLocation={userLocation} />
        <FlyToLocation location={userLocation} />
        <MapResizeHandler isExpanded={isExpanded} />

        {/* Shala markers */}
        {shalas.map((shala) => (
          <Marker
            key={shala.id}
            position={[shala.lat, shala.lng]}
            icon={shalaIcon}
            eventHandlers={{
              click: () => onShalaSelect?.(shala),
            }}
          >
            <Popup>
              <div className="min-w-[150px]">
                <p className="font-semibold text-gray-900">{shala.name}</p>
                <p className="text-sm text-gray-600">
                  {shala.city}, {shala.country}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* User location marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>Your location</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Controls */}
      <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-2">
        {locationError && (
          <div className="rounded-lg bg-red-100 px-3 py-2 text-xs text-red-700 shadow-md">
            {locationError}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleNearMe}
            disabled={isLocating}
            className="text-heading flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-medium shadow-md transition-all hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50"
            aria-label="Find shalas near me"
          >
            <FontAwesomeIcon
              icon={isLocating ? faSpinner : faLocationCrosshairs}
              className={`h-4 w-4 ${isLocating ? 'animate-spin' : ''}`}
            />
            Near me
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-heading flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-medium shadow-md transition-all hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            aria-label={isExpanded ? 'Collapse map' : 'Expand map'}
          >
            <FontAwesomeIcon
              icon={isExpanded ? faCompress : faExpand}
              className="h-4 w-4"
            />
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>
    </div>
  );
}
