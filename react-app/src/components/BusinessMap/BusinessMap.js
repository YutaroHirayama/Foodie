import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '70%',
  height: '400px',
};



const Maps = ({ apiKey, business }) => {

  const center = {
    lat: business.lat,
    lng: business.lng,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const marker = new Marker({
    position: center
  })

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          <Marker position={center} title={business.name}/>
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
