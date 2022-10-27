import React from "react";
import { Link } from "react-router-dom";
import "./PropActionsCard.css";

export default function PropActionsCard( {property} ) {
  const { owner } = property
  
  return (
    <div className="prop-actions-container">
      <div className="prop-actions-container-wrapper">
        <div>
          Please, complete the prequalifications form so you can get more
          information about this property.
          <button className="actions-btn-blue">
            Complete prequalifications
          </button>
        </div>
        <button className="actions-btn-yellow">Visit</button>
        <Link to={`/messages/${owner}`} className="actions-btn-blue">Contact</Link>
        <button className="actions-btn-yellow">Reserve</button>
      </div>
    </div>
  );
}
