import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default Leaflet marker icons in Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Distinct red marker for the drop-off pin
const dropIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapClickHandler = ({ onSelectDrop }) => {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      let addressLabel = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();
        if (data?.display_name) {
          addressLabel = data.display_name.split(',').slice(0, 3).join(', ');
        }
      } catch {
        // Fallback to raw coordinates if offline or rate-limited
      }

      onSelectDrop({ lat, lng, address: addressLabel });
    },
  });
  return null;
};

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 13);
      // Force Leaflet to recalculate container dimensions inside a MUI Dialog
      setTimeout(() => map.invalidateSize(), 250);
    }
  }, [lat, lng, map]);
  return null;
};

export const DropLocationMapPicker = ({ stationCoords, stationName, dropPoint, onSelectDrop }) => {
  const centerLat = stationCoords?.lat || 28.6415;
  const centerLng = stationCoords?.lng || 77.2208;

  return (
    <Box>
      <Typography variant="caption" color="text.secondary" display="block" mb={1}>
        Click anywhere on the map to pin your drop-off location (Blue = Station, Red = Drop-off):
      </Typography>
      <Box sx={{ height: 280, width: '100%', borderRadius: 2, overflow: 'hidden', border: '1px solid #d0d7de' }}>
        <MapContainer
          center={[centerLat, centerLng]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RecenterMap lat={centerLat} lng={centerLng} />
          <MapClickHandler onSelectDrop={onSelectDrop} />

          {/* Station Marker (Blue) */}
          <Marker position={[centerLat, centerLng]}>
            <Popup><strong>Pickup:</strong> {stationName}</Popup>
          </Marker>

          {/* Drop-off Marker (Red) + Connecting Route Line */}
          {dropPoint && (
            <>
              <Marker position={[dropPoint.lat, dropPoint.lng]} icon={dropIcon}>
                <Popup><strong>Drop-off:</strong> {dropPoint.address}</Popup>
              </Marker>
              <Polyline
                positions={[
                  [centerLat, centerLng],
                  [dropPoint.lat, dropPoint.lng]
                ]}
                pathOptions={{ color: '#1a365d', dashArray: '6, 8', weight: 3 }}
              />
            </>
          )}
        </MapContainer>
      </Box>
    </Box>
  );
};