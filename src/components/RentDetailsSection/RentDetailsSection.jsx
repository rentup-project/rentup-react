import React from 'react';
import Moment from 'react-moment';
import './RentDetailsSection.css'

export default function RentDetailsSection({ rent, property }) {
  return (
    <div className="rent-details-section">
      <iframe title="contract" src={rent.contract} alt="contract" />
      <div className="rent-details-text">
        <h5>Contract info:</h5>
        <p>
          Start date:
          <Moment format="MMMM DD, YYYY" date={rent.startDate} />
        </p>
        <p>Duration: {rent.monthsDuration} months</p>
        <p>Monthly rent: {rent.pricePerMonth}€</p>
      </div>
    </div>
  );
}
