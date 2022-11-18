import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './../../contexts/AuthContext';
import { deleteVisit, getUserVisits } from './../../services/Visits.services';
import PropertyCard from './../PropertyCard/PropertyCard';
import './VisitsSection.css';
import ghostImage from '../../assets/images/ghost-image.png';
import trashIcon from '../../assets/images/Trash-icon.png';

export default function VisitsSection() {
    const [myVisits, setMyVisits] = useState([]);
    const [loading, setLoading] = useState('');
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser) {
          setLoading(true);
          getUserVisits(currentUser.id)
          .then(res => {
            setMyVisits(res);
            setLoading(false);
          })
          .catch(err => navigate('/error'))
        }
    }, [currentUser, navigate])

    const handleOnClick = (e) => {
        const id = e.target.id
        deleteVisit(id)
        .then(res => {
            const filtered = myVisits.filter((visit) => visit.id !== id);
            setMyVisits(filtered);
        })
        .catch(err => navigate('/error'))
    }

  return (
    <div className="visits-section">
      {loading && (
        <div className="spinner-container">
          <span className="loader"></span>
        </div>
      )}

      {!loading && myVisits.length === 0 && (
        <div className="no-content-div">
          <h4>You have no scheduled visits at the moment.</h4>
          <img src={ghostImage} alt="ghost" />
        </div>
      )}
      {!loading &&
        myVisits.length !== 0 &&
        myVisits.map((visit) => (
          <div className="each-visit-container" key={visit.id}>
            <PropertyCard
              images={visit.property.images}
              address={visit.property.address}
              bedroom={visit.property.bedroom}
              bathroom={visit.property.bathroom}
              id={visit.property.id}
              squaredMeters={visit.property.squaredMeters}
              lat={visit.property.lat}
              long={visit.property.long}
              price={visit.property.monthlyRent}
              reserved={visit.property.reserved}
              rented={visit.property.rented}
            />
            <div className="visit-hour-tag">
              {visit.day} at {visit.hour}
            </div>
            <div className="visit-trash-icon" onClick={handleOnClick}>
              <img
                src={trashIcon}
                id={visit.id}
                alt="trash"
                width="30px"
                onClick={handleOnClick}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
