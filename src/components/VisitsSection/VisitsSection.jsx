import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './../../contexts/AuthContext';
import { deleteVisit, getUserVisits } from './../../services/Visits.services';
import PropertyCard from './../PropertyCard/PropertyCard';
import './VisitsSection.css';
//import trashIcon from '../../assets/images/Trash-icon.png';

export default function VisitsSection() {
    const [myVisits, setMyVisits] = useState([])
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(currentUser) {
            getUserVisits(currentUser.id)
            .then(res => setMyVisits(res))
            .catch(err => navigate('/error'))
        }
    }, [currentUser, navigate])

    const handleOnClick = (e) => {
        const id = e.target.id
        deleteVisit(id)
        .then(res => window.reload())
        .catch(err => navigate('/error'))
    }

  return (
    <div className="visits-section">
        {
            myVisits.length === 0 &&
            <h4>You have no scheduled visits at the moment.</h4>
        }
        {
            myVisits.length !== 0 && myVisits.map(visit => (
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
                    <div className='visit-hour-tag'>
                        {visit.day} at {visit.hour}
                    </div>
                    <div className='visit-trash-icon' id={visit.id} onClick={handleOnClick}>
                        Cancel
                    </div>
                </div>
            ))
        }
    </div>
  )
}
