// Map.tsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
  mapLocation: {
    lat: number;
    lon: number;
    name: string;
  };
}

const Map: React.FC<MapProps> = ({ mapLocation }) => {
  const { lat, lon, name } = mapLocation;

  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  const defaultCenter = {
    lat: lat,
    lng: lon,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyA62XjyfmX-GxA7B_EMMzpmWeDWDv6SDGU">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} title={name} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
