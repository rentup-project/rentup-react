import React, { useContext, useState } from 'react';
import './MyRentsSection.css';
import { useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';
import {getOwnerRents } from '../../services/Properties.services';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../PropertyCard/PropertyCard';

export default function MyRentsSection() {
    const [rents, setRents] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            getOwnerRents(currentUser.id)
            .then((res) => {
                console.log(res)
                setRents(res)
            })
            .catch((err) => navigate("/error"));        
        }
    }, [currentUser, navigate])

    
    return (
      <div className="my-rents-container">
        {rents?.map((rent) => (
          <div className="my-rent-wrapper">
            <PropertyCard
              key={rent.id}
              images={rent.images}
              address={rent.address}
              bedroom={rent.bedroom}
              bathroom={rent.bathroom}
              id={rent.id}
              squaredMeters={rent.squaredMeters}
              lat={rent.lat}
              long={rent.long}
              price={rent.monthlyRent}
              reserved={rent.reserved}
              rented={rent.rented}
            />
            {rent.reserved && <div className="tag-status yellow-tag">Reserved</div>}
            {rent.rented && <div className="tag-status green-tag">Rented</div>}
          </div>
        ))}
      </div>
    );
}
