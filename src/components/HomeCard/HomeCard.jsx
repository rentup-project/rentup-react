import React from 'react'
import './HomeCard.css'

export default function HomeCard({ color, img_url, number, position, left, title, text }) {

  const style = {
      backgroundColor: color,
  }

  return left ? (
    <div className="homeCard fade-in-bottom">
      <div className={position} style={style}>
        <img src={img_url} alt="homecard" />
      </div>
      <div className="card-text">
        <h2>{number}</h2>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  ) : (
    <div className="homeCard fade-in-bottom">
      <div className="card-text">
        <h2>{number}</h2>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <div className={position} style={style}>
        <img src={img_url} alt="homecard" />
      </div>
    </div>
  );
}
