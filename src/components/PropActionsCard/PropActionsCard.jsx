import React from 'react';
import './PropActionsCard.css';

export default function PropActionsCard() {

  return (
    <div className="prop-actions-container">
      <div>
        Please, complete the prequalifications form so you can get more
        information about this property.
        <button className="actions-btn-blue">Complete prequalifications</button>
      </div>
      <button className="actions-btn-yellow">Visit</button>
      <button className="actions-btn-blue">Contact</button>
      <button className="actions-btn-yellow">Reserve</button>
    </div>
  );
}
