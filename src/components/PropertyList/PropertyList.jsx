import React from 'react'
import { Link } from 'react-router-dom'
import './PropertyList.css'

export default function PropertyList(
    { images, address, bedroom, bathroom, id, squaredMeters, lat, long, price, availability }
) {
    return (
        <div>
            <Link to={`/property/${id}`} className="property-link" id={`${lat},${long}`}>
                <div className='img-div' style={{ backgroundImage: `url(${images[0]})`}}>
                </div>
                <div className='content-div'>
                    <h4>{address.split(',')[0]}</h4>
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
                    <p>{availability}</p>
                </div>
            </Link>
        </div>
    )
}
