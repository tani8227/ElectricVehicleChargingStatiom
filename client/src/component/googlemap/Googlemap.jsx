import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useParams } from 'react-router-dom';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = () => {
    const mapContainer = useRef(null);
    const params = useParams();
    const [endLongitude, endLatitude] = params.geocode.split(',').map(coord => parseFloat(coord));

    const startLongitude = 77.4537216;
    const startLatitude = 23.2620032;

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [startLongitude, startLatitude],
            zoom: 12,
        });

        const bounds = new mapboxgl.LngLatBounds();
        bounds.extend([startLongitude, startLatitude]);
        bounds.extend([endLongitude, endLatitude]);
        map.fitBounds(bounds, { padding: 50 });

        new mapboxgl.Marker({ color: 'green' })
            .setLngLat([startLongitude, startLatitude])
            .setPopup(new mapboxgl.Popup().setText('Start Point')) // Add a popup
            .addTo(map);

        new mapboxgl.Marker({ color: 'red' })
            .setLngLat([endLongitude, endLatitude])
            .setPopup(new mapboxgl.Popup().setText('End Point')) // Add a popup
            .addTo(map);

        const drawRoute = async () => {
            try {
                const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLongitude},${startLatitude};${endLongitude},${endLatitude}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch route');
                const data = await response.json();
                const route = data.routes[0].geometry;

                if (map.getSource('route')) map.removeSource('route');
                if (map.getLayer('route')) map.removeLayer('route');

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
            } catch (error) {
                console.error('Error fetching route:', error);
            }
        };

        map.on('load', drawRoute);

        return () => map.remove();
    }, [params.geocode, startLongitude, startLatitude, endLongitude, endLatitude]);

    return <div ref={mapContainer} style={{ height: '500px', width: '100%' }} />;
};

export default Map;
