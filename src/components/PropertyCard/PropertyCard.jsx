import "moment-timezone";
import React from 'react';
import { Link } from 'react-router-dom';
import './PropertyCard.css';

export default function PropertyCard({
  images,
  address,
  bedroom,
  bathroom,
  id,
  squaredMeters,
  lat,
  long,
  price
}) {

    return (
      <Link
        to={`/property/${id}`}
        className="property-card-link"
        id={`${lat},${long}`}
      >
        <div
          className="property-card-img"
          style={{ backgroundImage: `url(${images[0]})` }}
        ></div>
        <div className="property-card-content">
          <div className="property-card_title">
            <h5>{address.split(",")[0]}</h5>
            <p>{price}€</p>
          </div>
          <span>{squaredMeters} m2</span>
          <span>•</span>
          <span>
            {bedroom}
            {bedroom === "1" ? " bedroom" : " bedrooms"}
          </span>
          <span>•</span>
          <span>
            {bathroom}
            {bathroom === "1" ? " bathroom" : " bathrooms"}
          </span>
        </div>
      </Link>
    );
}
