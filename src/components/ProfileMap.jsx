import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const ProfileMap = ({ lat, lng, name }) => {
  if (!lat || !lng) return null;

  return (
    <MapContainer center={[lat, lng]} zoom={13} className="h-64 w-full mt-4 rounded">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default ProfileMap;
