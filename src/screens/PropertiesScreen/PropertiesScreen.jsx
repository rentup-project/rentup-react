import mapboxgl from 'mapbox-gl';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FilterIcon from '../../assets/images/filter-icon.png';
import ghostImage from '../../assets/images/ghost-image.png';
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
  const [propertiesToShow, setPropertiesToShow] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterPage, setFilterPage] = useState(false);
  const [currentMarkers, setCurrentMarkers] = useState([]);
  const [sortBy, setSortBy] = useState('date')
  const [pagination, setPagination] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(null);
  const { search } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  let propertiesPerPage = 5;
  let blueMarker;

  const removeMarkers = useCallback(() => { //REMOVE ALL YELLOW MARKERS
    currentMarkers.forEach(marker => {
      marker.remove();
    })
  }, [currentMarkers])

  const createMarker = useCallback((propertyToMark) => { //CREATE YELLOW MARKERS
    removeMarkers();
    const markers = [];

    propertyToMark.map((property) => {
      let markerToAdd = new mapboxgl.Marker({
        color: "#FFD166",
      })
        .setLngLat([property.long, property.lat])
        .addTo(map.current)
      return markers.push(markerToAdd)
    });

    setCurrentMarkers(markers)
  }, [removeMarkers])

  const changePagination = (e) => { //CHANGE PAGINATION WHEN CLICKING ON PREVIOUS OR NEXT PAGE
    if (e.target.value === pagination + 1 && (pagination < lastPage)) {
      setPagination(pagination + 1)
      window.scrollTo(0, 0)
    } else if (e.target.value === pagination - 1 && pagination > 1) {
      setPagination(pagination - 1)
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => { //SET LAST PAGE TO BE ABLE TO PAGINATE
    if (totalProperties) {
      setLastPage(Math.ceil(totalProperties / propertiesPerPage))
    }
  }, [totalProperties, lastPage, pagination, propertiesPerPage])

  useEffect(() => { //GET COORDINATES TO CENTER MAP
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
  }, [search, navigate])

  useEffect(() => { //DO THE PROPERTIES SEARCH AND SET ALL PROPERTIES TO PROPERTIES
    let queries = new URLSearchParams(location.search)

    getAllProperties(search, queries)
      .then((newProps) => {
        newProps.sort((a, b) => moment(a.createdAt).format('YYYYMMDD') - moment(b.createdAt).format('YYYYMMDD'))
        setProperties(newProps);
        setTotalProperties(newProps.length)
      })
      .catch((err) => navigate("/error"));
  }, [search, location.search, navigate])

  useEffect(() => { //SET PROPERTIES TO SHOW ACCORDING TO PAGINATION
    blueMarker?.remove();
    if (pagination && properties) {
      let initial = ((pagination - 1) * propertiesPerPage);
      let final = ((pagination - 1) * propertiesPerPage) + propertiesPerPage;
      let pieceOfPpropertiesToShow = [...properties].slice(initial, final)

      setPropertiesToShow(pieceOfPpropertiesToShow)
    }
  }, [properties, pagination, sortBy, propertiesPerPage]) //no añadir blueMarker al array de dependencias

  useEffect(() => { //SET MARKERS TO PROPERTIES TO SHOW
    blueMarker?.remove();
    let sortedMarkers = [...propertiesToShow].sort((a, b) => b.lat - a.lat)
    createMarker(sortedMarkers)
  }, [propertiesToShow]) //no añadir createMarker, ni blueMarker al array de dependencias

  const handleChange = (e) => { //HANDLE CHANGE OF NEW SEARCH BY CITY
    const { value } = e.target;
    setSearchInput(value);
  };

  const handleSubmit = () => { //NAVIGATE TO SEARCH/CITY
    if (searchInput !== "") {
      navigate(`/search/${searchInput}`);
    }
  };

  const handleOnClick = () => { //CALLS HANDLE SUBMIT
    handleSubmit();
  };

  const handleFilterData = (filterData) => { //DO THE SEARCH WITH FILTER
    getAllProperties(search, filterData)
      .then((newProps) => {
        if (newProps.length) {
          let newProperties = newProps.filter((newProp) =>
            properties.map((prop) => prop.id !== newProp.id)
          );
          setProperties(newProperties);
        } else {
          setProperties(newProps);
        }
      })
      .catch((err) => navigate("/error"))
  };

  const openFilterPage = () => { //OPENS FILTER
    if (filterPage) {
      setFilterPage(false);
    } else {
      setFilterPage(true);
    }
  };

  const changeSortByState = (e) => { //HANDLE THE SORT OF ALL PROPERTIES
    setPagination(1)
    if (e.target.selectedIndex === 4) {
      properties.sort((a, b) => b.squaredMeters - a.squaredMeters)
      setSortBy('size-biggest')
    } else if (e.target.selectedIndex === 3) {
      properties.sort((a, b) => a.squaredMeters - b.squaredMeters)
      setSortBy('size-smallest')
    } else if (e.target.selectedIndex === 2) {
      properties.sort((a, b) => b.monthlyRent - a.monthlyRent)
      setSortBy('price-highest')
    } else if (e.target.selectedIndex === 1) {
      properties.sort((a, b) => a.monthlyRent - b.monthlyRent)
      setSortBy('price-lowest')
    } else if (e.target.selectedIndex === 0) {
      properties.sort((a, b) => moment(a.createdAt).format('YYYYMMDD') - moment(b.createdAt).format('YYYYMMDD'))
      setSortBy('date')
    }
  }

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
          <span>Filter</span>
        </button>
      </div>
      <div>
        <div className="city-title-sort">
          <h2>{search}</h2>
          <div className='sort-div'>
            <label className='form-label'>
              Sort by
            </label>
            <form>
              <select id="sortByBtn"  className="form-control form-control-sm" onChange={changeSortByState}>
                <option name="date: most recent first" defaultValue>
                  Most recent
                </option>
                <option name="price: lowest first">
                  Cheapest
                </option>
                <option name="price: highest first">
                  Most expensive
                </option>
                <option name="price: lowest first">
                  Smallest
                </option>
                <option name="price: highest first">
                  Biggest
                </option>
              </select>
            </form>
          </div>
        </div>
        <div className="property-list-container">
          {propertiesToShow.length > 0 &&
            propertiesToShow.map((property) => (
              <div
                key={property.id}
                onMouseEnter={createBlueMarker}
                onMouseLeave={removeBlueMarker}
                id={`${property.lat},${property.long}`}
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
            {
              propertiesToShow.length === 0 && 
              <div className='no-content-div'>
                  <h4>No properties available. Please try again.</h4>
                  <img src={ghostImage} alt="ghost" />
              </div>
            }
        </div>
        <div className='pagination-container'>
          {
            lastPage > 1 &&
            <ul className="pagination-ul">
              <li className={`pagination-li ${pagination === 1 && 'disabled-pagination'}`} onClick={changePagination}
                value={pagination - 1}>Previous</li>
              <li className={`pagination-li ${pagination === lastPage && 'disabled-pagination'}`} onClick={changePagination}
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

