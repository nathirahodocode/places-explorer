import React from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '420px' };
const DEFAULT_CENTER = { lat: -3.745, lng: -38.523 };

export const PlaceMap = ({ place }) => {
  const center = place?.geometry?.location || DEFAULT_CENTER;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={place ? 15 : 3}
    >
      {place && <MarkerF position={place.geometry.location} />}
    </GoogleMap>
  );
};