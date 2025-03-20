import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api"

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(center);

  useEffect(() => {
    // Get initial position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );

      // Watch position for live updates
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error watching location:", error);
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, []);

  useEffect(() => {
    const updatePosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;

            console.log('Position updated:', latitude, longitude);
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });
    };

    updatePosition(); // Initial position update

    const intervalId = setInterval(updatePosition, 1000); // Update every 10 seconds

}, []);

  if (!currentPosition) {
    return <div>Loading location...</div>;
  }

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
      >
        <Marker position={currentPosition} />
      </GoogleMap>
    </LoadScript>
  )
}

export default LiveTracking