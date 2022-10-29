import React, { useCallback, useEffect, useState } from 'react';
import Moment from "react-moment";
import "moment-timezone";
import { Link } from 'react-router-dom';
import CalendarIcon from '../../assets/images/Calendar-icon.png';
import './PropertyList.css';

export default function PropertyList(
    { images, address, bedroom, bathroom, id, squaredMeters, lat, long, price, availability }
) {
    const [available, setAvailable] = useState("");

    const checkAvailability = useCallback(() => {
      if (availability <= Date.now()) {
        setAvailable("Available");
      }
      setAvailable("Available on ");
    }, [availability]);

    useEffect(() => {
      checkAvailability();
    }, [checkAvailability]);

    return (
      <div>
        <Link
          to={`/property/${id}`}
          className="property-link"
          id={`${lat},${long}`}
        >
          <div
            className="img-div"
            style={{ backgroundImage: `url(${images[0]})` }}
          ></div>
          <div className="content-div">
            <h4>{address.split(",")[0]}</h4>
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
            <p>{price}€</p>
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
                {available}
                <Moment format="MMM D" date={availability} />
              </span>
            </div>
          </div>
        </Link>
      </div>
    );
}
