import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useParams } from 'react-router-dom';
const GOOGLE_ACCESS_TOKEN = import.meta.env.VITE_GOOGLE_ACCESS_TOKEN;

mapboxgl.accessToken = VITE_GOOGLE_ACCESS_TOKEN;

const Map = () => {
    const mapContainer = useRef(null);
    const params = useParams();
    const [endLongitude, endLatitude] = params.geocode.split(',').map(coord => parseFloat(coord));

    // Define starting coordinates (replace with actual values)
    const startLongitude =77.4537216;  // Example longitude for starting point
    const startLatitude =  23.2620032;  // Example latitude for starting point

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [startLongitude, startLatitude], // Start location as center
            zoom: 5, // Initial zoom level
        });

        // Add markers for the start and end points
        new mapboxgl.Marker({ color: 'green' }) // Start marker
            .setLngLat([startLongitude, startLatitude])
            .addTo(map);

        new mapboxgl.Marker({ color: 'red' }) // End marker
            .setLngLat([endLongitude, endLatitude])
            .addTo(map);

        // Add the route between the start and end points
        const drawRoute = async () => {
            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLongitude},${startLatitude};${endLongitude},${endLatitude}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
            const response = await fetch(url);
            const data = await response.json();
            const route = data.routes[0].geometry;

            // Add route to the map as a layer
            map.addSource('route', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: route,
                },
            });

            map.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': '#888',
                    'line-width': 6,
                },
            });
        };

        map.on('load', drawRoute);

        return () => map.remove();
        
    }, [startLongitude, startLatitude, endLongitude, endLatitude]);

    return (
        <div ref={mapContainer} style={{ height: '500px', width: '100%' }} />
    );
};

export default Map;
