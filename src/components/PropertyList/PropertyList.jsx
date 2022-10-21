import React from 'react'
import { Link } from 'react-router-dom'
import './PropertyList.css'

export default function PropertyList({ images, address, bedroom, bathroom, id }) {
    return (
        <Link to={`/property/${id}`} className="property-link">
            <div className='property-list' id={id}>
                <div className='img-div' style={{ backgroundImage: `url(${images[0]})`}}>
                </div>
                <div className='content-div'>
                    <h4>{address.split(',')[0]}</h4>
                    <p>{bedroom} bedrooms & {bathroom} bathrooms</p>
                </div>
            </div>
        </Link>
    )
}
