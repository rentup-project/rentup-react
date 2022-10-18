import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './PropertiesScreen.css'
import PropertyList from '../../components/PropertyList/PropertyList';
import { getAllProperties } from '../../services/Properties.services'
import { Link, useParams } from 'react-router-dom';
mapboxgl.accessToken = 'pk.eyJ1IjoibmluYWxib25pIiwiYSI6ImNsOWNuYXppYjBrNmYzcG9laHA3MTN3bTQifQ.90TcbIeqC9bJYExbkEto4Q';

export default function PropertiesScreen() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [long] = useState(-3.70);
    const [lat] = useState(40.43);
    const [zoom] = useState(11.5);
    const [properties, setProperties] = useState('')
    const { search } = useParams()

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [long, lat],
            zoom: zoom
        });

        getAllProperties(search)
            .then(res => {
                setProperties(res)
                createMarker(res)
            })
            .catch(err => console.log(err))
    });

    const createMarker = (propert) => {
        propert.map((property) => {
            return new mapboxgl.Marker({
                color: "#FFD166",
            })
                .setLngLat([property.long, property.lat])
                .addTo(map.current);
        })
    }

    return (
        <div className='PropertiesScreen'>
            <div className='property-list-container'>
                {
                    properties && (
                        properties.map((property) => (
                            <div key={property.id}>
                                <Link to={`property/${property.id}`}>
                                <PropertyList
                                    images={property.images}
                                    address={property.address}
                                    bedroom={property.bedroom}
                                    bathroom={property.bathroom}
                                />
                                </Link>
                            </div>
                        ))
                    )
                }
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
    )
}
