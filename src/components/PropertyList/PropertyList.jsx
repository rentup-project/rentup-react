import React from 'react'
import './PropertyList.css'

export default function PropertyList({ images, address, bedroom, bathroom }) {
    return (
        <div className='PropertyList'>
            <div className='img-div'>
                <img src={images[0]} alt="bla" />
            </div>
            <div className='content-div'>
                <h4>{address.split(',')[0]}</h4>
                <p>{bedroom} bedrooms & {bathroom} bathrooms</p>
            </div>
        </div>
    )
}
