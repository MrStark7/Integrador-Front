import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map: React.FC<{ origin: [number, number]; destination: [number, number] }> = ({ origin, destination }) => {
  const positions = [origin, destination];

  return (
    <MapContainer center={origin} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={origin} />
      <Marker position={destination} />
      <Polyline positions={positions} />
    </MapContainer>
  );
};

export default Map;
