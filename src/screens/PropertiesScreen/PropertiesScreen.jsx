import mapboxgl from 'mapbox-gl';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FilterIcon from '../../assets/images/filter-icon.png';
import YellowSearchIcon from '../../assets/images/yellow-search-icon.png';
import Filter from "../../components/Filter/Filter";
import PropertyList from '../../components/PropertyList/PropertyList';
import { getCoordinates } from '../../services/Map.services';
import { getAllProperties } from '../../services/Properties.services';
import './PropertiesScreen.css';
mapboxgl.accessToken = 'pk.eyJ1IjoibmluYWxib25pIiwiYSI6ImNsOWNuYXppYjBrNmYzcG9laHA3MTN3bTQifQ.90TcbIeqC9bJYExbkEto4Q';

export default function PropertiesScreen() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [properties, setProperties] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filterPage, setFilterPage] = useState(false);
  const [currentMarkers, setCurrentMarkers] = useState([]);
  const [sortBy, setSortBy] = useState('date')
  const [pagination, setPagination] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(null);
  const [skipNumber, setSkipNumber] = useState(0)
  const [updatePage, setUpdate] = useState(true)
  const { search } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  let propertiesPerPage = 10;
  let blueMarker;

  const removeMarkers = useCallback(() => {
    currentMarkers.forEach(marker => {
      marker.remove();
    })
  }, [currentMarkers])

  const createMarker = useCallback((properties) => {
    removeMarkers();
    const markers = [];
    
    properties.map((property) => {
      let markerToAdd = new mapboxgl.Marker({
        color: "#FFD166",
      })
      .setLngLat([property.long, property.lat])
      .addTo(map.current)
      return markers.push(markerToAdd)
    });
    
    setCurrentMarkers(markers)
  }, [removeMarkers])

  const changePagination = (e) => {
    if(e.target.value === pagination + 1 && (pagination < lastPage)) {
      let bla = pagination * propertiesPerPage
      setSkipNumber(bla)
      setPagination(pagination + 1)
      window.scrollTo(0, 0)
    } else if (e.target.value === pagination - 1 && pagination > 1) {
      let bla = (pagination - 2) * propertiesPerPage
      setSkipNumber(bla)
      setPagination(pagination - 1)
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    if(totalProperties) {
      setLastPage(Math.ceil(totalProperties/propertiesPerPage))
    }
  }, [totalProperties, lastPage, pagination])

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
          zoom: 11.5,
        })
      })
      .catch((err) => navigate("/error"));
  }, [search])

  useEffect(() => {
    let queries = new URLSearchParams(location.search)

    getAllProperties(search, queries, skipNumber)
    .then((newProps) => {
      setTotalProperties(newProps.totalDocuments)
      let newPropsJson = newProps.json
      let sorted = newPropsJson.sort((a, b) => moment(a.createdAt).format('YYYYMMDD') - moment(b.createdAt).format('YYYYMMDD'))
      setProperties(sorted);
      createMarker(sorted)
    })
    .catch((err) => navigate("/error"));
  }, [search, skipNumber, updatePage])

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const handleSubmit = () => {
    if (searchInput !== "") {
      navigate(`/search/${searchInput}`);
    }
  };

  const handleOnClick = () => {
    handleSubmit();
  };

  const handleFilterData = (filterData) => {
    getAllProperties(search, filterData, 0)
      .then((newProps) => {
        setTotalProperties(newProps.totalDocuments)
        let newPropsJson = newProps.json
        if (newPropsJson.length) {
          let newProperties = newPropsJson.filter((newProp) =>
            properties.map((prop) => prop.id !== newProp.id)
          );
          setProperties(newProperties);
          createMarker(newProperties)
        } else {
          setProperties(newPropsJson);
        }
      })
      .catch((err) => navigate("/error"))
  };

  const createBlueMarker = (e) => {
    if (e.target.id) {
      let arr = e.target.id.split(',')
      let targetLat = arr[0]
      let targetLong = arr[1]

      blueMarker = new mapboxgl.Marker({
        color: "#118AB2",
      })
      .setLngLat([targetLong, targetLat])
      .addTo(map.current);
    }
  };

  const removeBlueMarker = (e) => {
    blueMarker?.remove();
  };

  const openFilterPage = () => {
    if (filterPage) {
      setFilterPage(false);
    } else {
      setFilterPage(true);
    }
  };

  const changeSortByState = (e) => {
    if(e.target.selectedIndex === 4) {
      setSortBy('size-biggest')
      properties.sort((a, b) => b.squaredMeters - a.squaredMeters)
    } else if(e.target.selectedIndex === 3) {
      setSortBy('size-smallest')
      properties.sort((a, b) => a.squaredMeters - b.squaredMeters)
    } else if(e.target.selectedIndex === 2) {
      setSortBy('price-highest')
      properties.sort((a, b) => b.monthlyRent - a.monthlyRent)
    } else if (e.target.selectedIndex === 1) {
      setSortBy('price-lowest')
      properties.sort((a, b) => a.monthlyRent - b.monthlyRent)
    } else {
      setSortBy('date')
      properties.sort((a, b) => moment(a.createdAt).format('YYYYMMDD') - moment(b.createdAt).format('YYYYMMDD'))
    }
  }

  return (
    <div className="PropertiesScreen">
      <div className="yellow-div"></div>
      <div className="search-filter-container">
        <form onSubmit={handleSubmit}>
          <button>
            <img
              src={YellowSearchIcon}
              alt="logo-search"
              onClick={handleOnClick}
            />
          </button>
          <input
            placeholder="Search by your favourite location"
            value={searchInput}
            onChange={handleChange}
          />
        </form>
        <button className="btn-filter" onClick={openFilterPage}>
          <img src={FilterIcon} alt="filter-icon" />
          Filter
        </button>
      </div>
      <div>
        <div className="city-title-sort">
          <h2>{search}</h2>
          <div className='sort-div'>
            <p>
              Sort by: 
            </p>
            <form>
              <select id="sortByBtn" onChange={changeSortByState}>
                <option name="date: most recent first" defaultValue>
                  Date - most recent first
                </option>
                <option name="price: lowest first">
                  Price - lowest first
                </option>
                <option name="price: highest first">
                  Price - highest first
                </option>
                <option name="price: lowest first">
                  Size - smallest first
                </option>
                <option name="price: highest first">
                  Size - biggest first
                </option>
              </select>
            </form>
          </div>
        </div>
        <div className="property-list-container">
          {properties &&
            properties.map((property) => (
              <div
                key={property.id}
                onMouseEnter={createBlueMarker}
                onMouseLeave={removeBlueMarker}
              >
                <PropertyList
                  images={property.images}
                  address={property.address}
                  bedroom={property.bedroom}
                  bathroom={property.bathroom}
                  id={property.id}
                  squaredMeters={property.squaredMeters}
                  lat={property.lat}
                  long={property.long}
                  price={property.monthlyRent}
                  availability={property.availability}
                />
              </div>
            ))}
        </div>
        <div className='pagination-container'>
        {
        lastPage > 1 &&
          <ul className="pagination-ul">
            <li className={`pagination-li ${pagination === 1 && 'disabled'}`} onClick={changePagination} 
            value={pagination - 1}>Previous</li>
            <li className={`pagination-li ${pagination === lastPage && 'disabled'}`} onClick={changePagination} 
            value={pagination + 1}>Next</li>
          </ul>
        }
        </div>
      </div>
      <div ref={mapContainer} className="map-container" />
      {filterPage && (
        <div className="filter-page">
          <Filter
            city={search}
            closeFilter={openFilterPage}
            getFilterData={handleFilterData}
          />
        </div>
      )}
    </div>
  );
}

