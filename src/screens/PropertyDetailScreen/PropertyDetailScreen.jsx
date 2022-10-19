import React, { useCallback, useEffect, useState } from 'react';
import './PropertyDetailScreen.css';
import { useParams } from 'react-router-dom';
import Moment from "react-moment";
import "moment-timezone";
import { getOneProperty } from './../../services/Properties.services';
/* IMAGES */
import CloseBtnNav from "../../assets/images/CloseBtnNavbar.png";
import StarBlack from '../../assets/images/Star_black.png';
import ShareIcon from '../../assets/images/Share-icon.png';
import UnFavIcon from '../../assets/images/UnFav-icon.png';
import CalendarIcon from '../../assets/images/Calendar-icon.png';
import HouseIcon from '../../assets/images/House-icon.png';
import ApartmentIcon from '../../assets/images/Apartment-icon.png';
import ExteriorIcon from '../../assets/images/Exterior-icon.png';
import InteriorIcon from '../../assets/images/Interior-icon.png';
import FurnishedIcon from '../../assets/images/Furnished-icon.png';
import FloorLevelIcon from '../../assets/images/Floor-level-icon.png';
import HeatingIcon from '../../assets/images/Heating-icon.png';
import PetIcon from '../../assets/images/Pet-icon.png';
/* COMPONENTS */
import Amenity from "../../components/Amenity/Amenity";
import Mapbox from '../../components/Mapbox/Mapbox';
import PropActionsCard from '../../components/PropActionsCard/PropActionsCard';
import Share from '../../components/Share/Share';

export default function PropertyDetailScreen() {
    const  { id }  = useParams();
    const [property, setProperty] = useState('');
    const [allImages, setAllImages] = useState(false);
    const [firstImg, setFirstImage] = useState('');
    const [secondImg, setSecondImage] = useState('');
    const [availability, setAvailability] = useState('');
    const [openShare, setOpenShare] = useState(false);

    const checkAvailability = useCallback(() => {
      if (property.availabilityDate <= Date.now()) {
        setAvailability('Available');
      }
      setAvailability('Available on ');
    }, [property.availabilityDate]);
    
    useEffect(() => {
        getOneProperty(id)
        .then((res) => {
            setProperty(res);
            setFirstImage(res.images[0]);
            setSecondImage(res.images[1]);
            checkAvailability();
        })
        .catch((err) => console.log(err));
    }, [id, checkAvailability]);

    const showImages = () => {
        setAllImages(true)
    }

    const hideImages = () => {
      setAllImages(false);
    };    

    const handleShare = () => {
      openShare ? setOpenShare(false) : setOpenShare(true)
    }

    return allImages ? (
      <div className="all-images">
        <img
          src={CloseBtnNav}
          alt="btn-close"
          onClick={hideImages}
          className="close-images"
        />
        <div className="all-images-container">
          {property?.images?.map((img, i) => (
            <div
              key={i}
              className={i === 2 ? "large-img" : "medium-img"}
              style={{
                backgroundImage: `url(${img})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
          ))}
        </div>
      </div>
    ) : (
      <div className="property-detail">
        <PropActionsCard />
        <section className="info-and-actions">
          <div className="info-container">
            <div className="availability-container">
              <div
                className="calendar-img"
                style={{
                  backgroundImage: `url(${CalendarIcon})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <span>
                {availability}
                <Moment format="MMMM D" date={property.availabilityDate} />
                th
              </span>
            </div>
            <div className="stars-container">
              <div
                className="review-img"
                style={{
                  backgroundImage: `url(${StarBlack})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <span>
                <span>4,5</span>
                <span>•</span>
                <a href="#opinions">5 reviews</a>
              </span>
            </div>
          </div>
          <div className="actions-container">
            <div className="share-container" onClick={handleShare}>
              <div
                className="share-img"
                style={{
                  backgroundImage: `url(${ShareIcon})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <span>Share</span>
            </div>
            <div className="save-fav-container">
              <div
                className="fav-img"
                style={{
                  backgroundImage: `url(${UnFavIcon})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <span>Save</span>
            </div>
          </div>
        </section>

        {openShare && <Share property={property} handleClick={handleShare}/>}

        <section className="main-imgs-container">
          <div
            className="main-imgs"
            style={{
              backgroundImage: `url(${firstImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div
            className="main-imgs"
            style={{
              backgroundImage: `url(${secondImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <button className="show-img-btn" onClick={showImages}>
            VIEW ALL PHOTOS
          </button>
        </section>

        <header className="header">
          <div className="title-price-container">
            <h3>
              {property.propertyType} on {property.address}
            </h3>
            <h3>
              {property.monthlyRent} <small>€/mes</small>
            </h3>
          </div>
          <div className="property-info-container">
            <span>{property.squaredMeters} m2</span>
            <span>•</span>
            <span>
              {property.bedroom}
              {property.bedroom === "1" ? " room" : " rooms"}
            </span>
            <span>•</span>
            <span>
              {property.bathroom}{" "}
              {property.bathroom === "1" ? " bathroom" : " bathrooms"}
            </span>
          </div>
        </header>
        <hr></hr>

        <section className="features">
          <h4>Features</h4>
          <div className="features-container">
            <div className="features-wraper">
              <div
                className="feature-img"
                style={
                  property.houseType
                    ? {
                        backgroundImage: `url(${HouseIcon})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : {
                        backgroundImage: `url(${ApartmentIcon})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                }
              ></div>
              <span>{property.houseType || property.aparmentType}</span>
            </div>

            <div className="features-wraper">
              <div
                className="feature-img"
                style={
                  property.orientation === "Exterior"
                    ? {
                        backgroundImage: `url(${ExteriorIcon})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : {
                        backgroundImage: `url(${InteriorIcon})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                }
              ></div>
              <span>{property.orientation} orientation</span>
            </div>

            <div className="features-wraper">
              <div
                className="feature-img"
                style={{
                  backgroundImage: `url(${HeatingIcon})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <span>{property.heating} heating</span>
            </div>

            <div className="features-wraper">
              <div
                className="feature-img"
                style={{
                  backgroundImage: `url(${FloorLevelIcon})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <span>{property.floor} floor</span>
            </div>

            {property.furniture !== "Not furnished" && (
              <div className="features-wraper">
                <div
                  className="feature-img"
                  style={{
                    backgroundImage: `url(${FurnishedIcon})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <span>{property.furniture}</span>
              </div>
            )}

            {property.petAllowed && (
              <div className="features-wraper">
                <div
                  className="feature-img"
                  style={{
                    backgroundImage: `url(${PetIcon})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <span>Pets allowed</span>
              </div>
            )}
          </div>
        </section>
        <hr></hr>

        <section className="amenities">
          <h4>Amenities</h4>
          <div className="amenities-container">
            {property?.features?.map((feature) => (
              <Amenity key={feature} feature={feature}></Amenity>
            ))}
          </div>
        </section>
        <hr></hr>

        <section id="opinions">
          <h4>Reviews</h4>
          <div className="opinions-container">
            <p>None reviews yet!</p>
          </div>
        </section>
        <hr></hr>

        {property && (
          <section className="location">
            <h4>Location</h4>
            <Mapbox lat={property.lat} long={property.long} />
          </section>
        )}
      </div>
    );
}
