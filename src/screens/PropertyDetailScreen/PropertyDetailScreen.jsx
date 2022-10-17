import React, { useEffect, useState } from 'react';
import './PropertyDetailScreen.css';
import { useParams } from 'react-router-dom';
import { getOneProperty } from './../../services/Properties.services';
import CloseBtnNav from "../../assets/images/CloseBtnNavbar.png";

export default function PropertyDetailScreen() {
    const  { id }  = useParams();
    const [property, setProperty] = useState('');
    const [allImages, setAllImages] = useState(false);
    const [firstImg, setFirstImage] = useState('');
    const [secondImg, setSecondImage] = useState('');

    useEffect(() => {
        getOneProperty(id)
        .then(res => {
            console.log(res.features)
            setProperty(res)
            setFirstImage(res.images[0])
            setSecondImage(res.images[1]);
        })
        .catch(err => console.log(err)) 
    }, [id])

    const showImages = () => {
        setAllImages(true)
    }

    const hideImages = () => {
      setAllImages(false);
    };

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

        <header>
          <div>
            <h2>
              {property.propertyType} on {property.address}
            </h2>
            <h2>{property.availabilityDate}</h2>
          </div>
          <h3>
            {property.monthlyRent} <small>€/mes</small>
          </h3>
        </header>

        <hr></hr>

        <section className="property-info">
          <h4>Details</h4>
          <div className="property-info-container">
            <span>{property.squaredMeters} m2</span>
            <span>
              {property.bedroom}
              {property.bedroom === "1" ? " room" : " rooms"}
            </span>
            <span>
              {property.bathroom}{" "}
              {property.bathroom === "1" ? " bathroom" : " bathrooms"}
            </span>
          </div>
        </section>
        <hr></hr>

        <section className="features">
          <h4>Features</h4>
          <div className="features-container">
            <li>{property.houseType || property.aparmentType}</li>
            <li>{property.orientation} orientation</li>
            <li>{property.furniture} furniture</li>
            <li>{property.floor} floor</li>
            <li>{property.heating}</li>
            <li>{property.petAllowed ? "Pets allowed" : "Pets not allowed"}</li>
          </div>
        </section>
        <hr></hr>

        <section className="amenities-container">
          <h4>Amenities</h4>
          <ul className="amenities-list">
            {property?.features?.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>
        <hr></hr>

        <section className="location">
          <h4>Location</h4>
          <div>
            Mapbox
          </div>
        </section>
      </div>
    );
}
