import React from 'react'
import './PropertyList.css'

export default function PropertyList({ images, address, bedroom, bathroom}) {
  return (
    <div className='PropertyList'>
        <div className='img-div' style={`backgroundImage: url(${images[0]})`}></div>
        <div className='content-div'>
            <h4>{address}</h4>
            <p>{bedroom} bedrooms & {bathroom} bathrooms</p>      
        </div>
    </div>
  )
}
