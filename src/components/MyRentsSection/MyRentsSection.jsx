import React, { useContext, useState } from 'react';
import './MyRentsSection.css';
import { useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { getOwnerRents } from '../../services/Properties.services';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../PropertyCard/PropertyCard';
import menuIcon from '../../assets/images/menu-icon.png'
import { cancelReservation } from './../../services/Properties.services';

export default function MyRentsSection() {
  const [rents, setRents] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      getOwnerRents(currentUser.id)
        .then((res) => {
          setRents(res)
        })
        .catch((err) => navigate("/error"));
    }
  }, [currentUser, navigate])

  const hanleCancelReservation = (id) => {
    cancelReservation(id)
      .then((res) => {
        const filtered = rents.filter(prop => prop.id !== id)
        setRents(filtered)
      })
      .catch(err => navigate('/error'))
  }

  const redirectToForm = (id) => {
    navigate(`/rent/details/${id}`)
  }

  const handleOnClick = (e) => {
    let getId = e.target.id
    let elementWithId;

    if (getId) {
      elementWithId = document.querySelector(`.class${getId}`)
    }

    if (elementWithId.className.includes('opened')) {
      elementWithId.className = `class${getId} closed`
    } else {
      elementWithId.className = `class${getId} opened`
    }
  }

  return (
    <div className="my-rents-container">
      {rents?.map((rent) => (
        <div className="my-rent-wrapper" key={rent.id}>
          <PropertyCard
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
          {rent.reserved && !rent.rented && <div className="tag-status yellow-tag">Reserved</div>}
          {rent.rented && <div className="tag-status green-tag">Rented</div>}
          {rent.owner === currentUser.id && rent.reserved && !rent.rented &&
            (
              <div className="menu-icon-div">
                <img id={rent.id} className={`menu-icon-img`} src={menuIcon} alt='menu icon' onClick={handleOnClick} />
                <div className={`class${rent.id} closed`}>
                  <button className="menu-option" onClick={() => redirectToForm(rent.id)}>Fill rent info</button>
                  <button className="menu-option" onClick={() => hanleCancelReservation(rent.id)}>Cancel reservation</button>
                </div>
              </div>
            )
          }
          {rent.rented &&
            (
              <div className="menu-icon-div">
                <img id={rent.id} className={`menu-icon-img`} src={menuIcon} alt='menu icon' onClick={handleOnClick} />
                <div className={`class${rent.id} closed`}>
                  <button className="menu-option" onClick={() => redirectToForm(rent.id)}>See details</button>
                </div>
              </div>
            )
          }
        </div>
      ))}
    </div>
  );
}
