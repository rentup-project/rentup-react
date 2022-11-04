import React from 'react';
import './RentDetailsSection.css'

export default function RentDetailsSection({ rent, property }) {
  return (
    <div className='rent-details-section'>
        <iframe src={rent.contract} alt="contract"/>
        <div className='rent-details-text'>
            <p>Price per month: {rent.pricePerMonth}€</p>
            <p>Initial duration of the contract: {rent.monthsDuration} months</p>
            <p>Start date of the contract: {rent.startDate}</p>
            <p>Property ID: {rent.property}</p> 
        </div>
    </div>
  )
}
