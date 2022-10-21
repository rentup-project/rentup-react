import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import './Mapbox.css';
mapboxgl.accessToken =
  "pk.eyJ1IjoibmluYWxib25pIiwiYSI6ImNsOWNuYXppYjBrNmYzcG9laHA3MTN3bTQifQ.90TcbIeqC9bJYExbkEto4Q";

export default function Mapbox({long, lat}) {
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/dark-v10",
          center: [Number(long), Number(lat)],
          zoom: 15,
        });
        createMarker();
    });

    const createMarker = () => {        
        return new mapboxgl.Marker({ color: "#FFD166" })
          .setLngLat([Number(long), Number(lat)])
          .addTo(map.current);
    };

    return (
        <div ref={mapContainer} className="map-property-detail" />
    );
}

