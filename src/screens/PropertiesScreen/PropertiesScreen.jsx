import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import mapboxgl from 'mapbox-gl';
import './PropertiesScreen.css'
import PropertyList from '../../components/PropertyList/PropertyList';
import Filter from "../../components/Filter/Filter";
import { getAllProperties } from '../../services/Properties.services'
import { getCoordinates } from '../../services/Map.services';
import { getOneProperty } from './../../services/Properties.services';
import YellowSearchIcon from '../../assets/images/yellow-search-icon.png';
import FilterIcon from '../../assets/images/filter-icon.png';
mapboxgl.accessToken = 'pk.eyJ1IjoibmluYWxib25pIiwiYSI6ImNsOWNuYXppYjBrNmYzcG9laHA3MTN3bTQifQ.90TcbIeqC9bJYExbkEto4Q';

export default function PropertiesScreen() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom] = useState(11.5);
    const [properties, setProperties] = useState('')
    const { search } = useParams()
    let blueMarker;
    const [searchInput, setSearchInput] = useState('')
    const navigate = useNavigate();
    const [filterPage, setFilterPage] = useState(false)

    const handleChange = (e) => {
        const {value} = e.target
        setSearchInput(value)
    }

    const handleSubmit = () => {
        if (searchInput !== '') {
            navigate(`/search/${searchInput}`)
        }
    }

    const handleOnClick = () => {
        handleSubmit()
    }

    useEffect(() => {
        getCoordinates(search)
          .then((res) => {
            if (map.current) return;
            map.current = new mapboxgl.Map({
              container: mapContainer.current,
              style: "mapbox://styles/mapbox/dark-v10",
              center: [
                res.data.features[0].center[0],
                res.data.features[0].center[1],
              ],
              zoom: zoom,
            });

            getAllProperties(search)
              .then((res) => {
                setProperties(res);
                createMarker(res);
              })
              .catch((err) => navigate("/error"));
          })
          .catch((err) => navigate("/error"));
    }, [zoom, search, navigate])

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
        if(e.target.id) {
            getOneProperty(e.target.id)
              .then((res) => {
                blueMarker = new mapboxgl.Marker({
                  color: "#118AB2",
                })
                  .setLngLat([res.long, res.lat])
                  .addTo(map.current);
              })
              .catch((err) => navigate("/error"));
        }
    }

    const changeBackgroundToWhite = (e) => {
        blueMarker?.remove();
    }

    const openFilterPage = () => {
        if (filterPage) {
            setFilterPage(false)
        } else {
            setFilterPage(true)
        }
    }

    return (
        <div className='PropertiesScreen'>
            <div className='yellow-div'></div>
            <div className='search-filter-container'>
                <form onSubmit={handleSubmit}>
                    <button>
                        <img src={YellowSearchIcon} alt="logo-search" onClick={handleOnClick} />
                    </button>
                    <input
                        placeholder="Search by your favourite location"
                        value={searchInput}
                        onChange={handleChange}
                    />
                </form>
                <button className='btn-filter' onClick={openFilterPage}>
                    <img src={FilterIcon} alt="filter-icon" />
                    Filter
                </button>
            </div>
            <div className='property-list-container'>
                {
                    search ? 
                    <h2>Properties in {search}</h2>
                    :
                    <h2>No properties found</h2>
                }
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
                                        squaredMeters={property.squaredMeters}
                                    />
                            </div>
                        ))
                    )
                }
            </div>
            <div ref={mapContainer} className="map-container" />
            {
            filterPage &&
                <div className='filter-page'>
                    <Filter city={search} CloseFilter={openFilterPage} />
                </div>
            }
        </div>
    )
}
