import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './PropertiesScreen.css'
import PropertyList from '../../components/PropertyList/PropertyList';
import { getAllProperties } from '../../services/Properties.services'
import { useParams } from 'react-router-dom';
import { getCoordinates } from '../../services/Map.services';
import { getOneProperty } from './../../services/Properties.services';
import { Marker } from 'react-map-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoibmluYWxib25pIiwiYSI6ImNsOWNuYXppYjBrNmYzcG9laHA3MTN3bTQifQ.90TcbIeqC9bJYExbkEto4Q';

export default function PropertiesScreen() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom] = useState(11.5);
    const [properties, setProperties] = useState('')
    const { search } = useParams()
    let blueMarker;

    useEffect(() => {
        getCoordinates(search)
            .then((res) => {
                if (map.current) return;
                map.current = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: 'mapbox://styles/mapbox/dark-v10',
                    center: [res.data.features[0].center[0], res.data.features[0].center[1]],
                    zoom: zoom
                });
            })
            .catch(err => console.log(err))

        getAllProperties(search)
            .then(res => {
                setProperties(res)
                createMarker(res)
                return getCoordinates(search)
            })
            .catch(err => console.log(err, 'entrou'))
    }, [zoom, search])

    const createMarker = (propert) => {
        propert.map((property) => {
            return new mapboxgl.Marker({
                color: "#FFD166",
            })
                .setLngLat([property.long, property.lat])
                .addTo(map.current);
        })
    }

    const changeBackgroundToGrey = (e) => {
        e.target.style.background = 'rgb(239, 239, 239)';
        if(e.target.id) {
            getOneProperty(e.target.id)
            .then(res => {
                blueMarker = new mapboxgl.Marker({
                    color: "#118AB2",
                })
                    .setLngLat([res.long, res.lat])
                    .addTo(map.current);
                    console.log(mapboxgl)
            })
            .catch((err) => console.log(err))
        }
    }

    const changeBackgroundToWhite = (e) => {
        e.target.style.background = '';
        blueMarker.remove()
    }

    return (
        <div className='PropertiesScreen'>
            <div className='property-list-container'>
                {
                    properties && (
                        properties.map((property) => (
                            <div key={property.id}
                            onMouseEnter={changeBackgroundToGrey}
                            onMouseLeave={changeBackgroundToWhite}
                            >
                                    <PropertyList
                                        images={property.images}
                                        address={property.address}
                                        bedroom={property.bedroom}
                                        bathroom={property.bathroom}
                                        id={property.id}
                                    />
                            </div>
                        ))
                    )
                }
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
    )
}
