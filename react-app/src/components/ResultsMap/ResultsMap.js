import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '600px',
  height: '1000px',
};

const ResultsMap = ({ apiKey, results }) => {

  const markers = [];
  results.forEach((business, idx) => {
    let coords = { lat: business.lat, lng: business.lng };

    markers.push({
      position: coords,
      num: idx
    })
  });


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{lat: results[0].lat, lng: results[0].lng}}
          zoom={13}
        >
          {results.map((result, i) => (
            <Marker position={{lat: result.lat, lng: result.lng}} label={{text: (i+1).toString()}}/>
          ))}

        </GoogleMap>
      )}
    </>
  );
};

export default ResultsMap;
