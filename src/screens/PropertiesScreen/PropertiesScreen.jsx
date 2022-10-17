import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './PropertiesScreen.css'
mapboxgl.accessToken = 'pk.eyJ1IjoibmluYWxib25pIiwiYSI6ImNsOWNuYXppYjBrNmYzcG9laHA3MTN3bTQifQ.90TcbIeqC9bJYExbkEto4Q';

export default function PropertiesScreen() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [long, setLng] = useState(-3.70);
    const [lat, setLat] = useState(40.43);
    const [zoom, setZoom] = useState(11.5);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [long, lat],
            zoom: zoom
        });
    });

    return (
        <div className='PropertiesScreen'>
            <div ref={mapContainer} className="map-container" />
        </div>
    )
}
