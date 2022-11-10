import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import menuIcon from "../../assets/images/menu-icon.png";
import AuthContext from "../../contexts/AuthContext";
import { getReviewRent } from "../../services/MyArea.services";
import { getOwnerRents } from "../../services/Properties.services";
import PropertyCard from "../PropertyCard/PropertyCard";
import { cancelReservation } from "./../../services/Properties.services";
import "./MyRentsSection.css";
import ghostImage from '../../assets/images/ghost-image.png'

export default function MyRentsSection() {
  const [rents, setRents] = useState([]);
  const [reviewed, setReviewed] = useState("");
  const [idProp, setIdProp] = useState('');
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

  useEffect(() => {
    if(idProp) {
      getReviewRent(idProp)
        .then((res) => {
          if (res.length > 0) {
            setReviewed(true);
          } else {
            setReviewed(false);
          }
        })
        .catch((err) => navigate("/error"));
    }    
  }, [idProp, navigate])
  
  const handleCancelReservation = (id) => {
    cancelReservation(id)
      .then((res) => {
        const filtered = rents.filter((prop) => prop.id !== id);
        setRents(filtered);
      })
      .catch((err) => navigate("/error"));
  };

  const redirectToFormRent = (id) => {
    navigate(`/rent/details/${id}`);
  };

  const redirectToFormReview = (id) => {
    navigate(`/rent/review/${id}`);
  };

  const handleOnClick = (e) => {
    let getId = e.target.id;
    let elementWithId;
  
    if (getId) {
      elementWithId = document.querySelector(`.class${getId}`);
      setIdProp(getId);
    }

    if(idProp) {
      if (elementWithId.className.includes("opened")) {
        elementWithId.className = `class${getId} closed`;
      } else {
        elementWithId.className = `class${getId} opened`;
      }
    }

  };

  return (
    <div className="my-rents-container">
      {rents.length > 0 ?
       rents.map((rent) => (
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
          {rent.reserved && !rent.rented && (
            <div className="tag-status yellow-tag">Reserved</div>
          )}
          {rent.rented && <div className="tag-status green-tag">Rented</div>}

          {rent.owner === currentUser.id && rent.reserved && !rent.rented && (
            <div className="menu-icon-div">
              <img
                id={rent.id}
                className={`menu-icon-img`}
                src={menuIcon}
                alt="menu icon"
                onClick={handleOnClick}
              />
              
                <div className={`class${rent.id} closed`}>
                  <button
                    className="menu-option"
                    onClick={() => redirectToFormRent(rent.id)}
                  >
                    Fill rent info
                  </button>
                  <button
                    className="menu-option"
                    onClick={() => handleCancelReservation(rent.id)}
                  >
                    Cancel reservation
                  </button>
                </div>
              
            </div>
          )}
          {rent.owner === currentUser.id && rent.rented && (
            <div className="menu-icon-div">
              <img
                id={rent.id}
                className={`menu-icon-img`}
                src={menuIcon}
                alt="menu icon"
                onClick={handleOnClick}
              />
              
                <div className={`class${rent.id} closed`}>
                  <button
                    className="menu-option"
                    onClick={() => redirectToFormRent(rent.id)}
                  >
                    See details
                  </button>
                </div>
              
            </div>
          )}
          {rent.owner !== currentUser.id && rent.rented && !reviewed && (
            <div className="menu-icon-div">
              <img
                id={rent.id}
                className={`menu-icon-img`}
                src={menuIcon}
                alt="menu icon"
                onClick={handleOnClick}
              />
              
                <div className={`class${rent.id} closed`}>
                  <button
                    className="menu-option"
                    onClick={() => redirectToFormRent(rent.id)}
                  >
                    See details
                  </button>
                  <button
                    className="menu-option"
                    onClick={() => redirectToFormReview(rent.id)}
                  >
                    Write a review
                  </button>
                </div>
              
            </div>
          )}
          {rent.owner !== currentUser.id && rent.rented && reviewed && (
            <div className="menu-icon-div">
              <img
                id={rent.id}
                className={`menu-icon-img`}
                src={menuIcon}
                alt="menu icon"
                onClick={handleOnClick}
              />
              
                <div className={`class${rent.id} closed`}>
                  <button
                    className="menu-option"
                    onClick={() => redirectToFormRent(rent.id)}
                  >
                    See details
                  </button>
                </div>
              
            </div>
          )}
        </div>
      )):
      <div className='no-content-div'>
        <h4>You have no rents.</h4>
        <img src={ghostImage} alt="ghost" />
      </div>
    }
    </div>
  );
}
