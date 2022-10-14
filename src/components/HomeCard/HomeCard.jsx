import React from 'react'
import './HomeCard.css'

export default function HomeCard({ color, img_url, number, title, text }) {

    const style = {
        backgroundColor: color,
    }

  return (
    <div className='HomeCard'>
        <div className='color-div' style={style}>
            <img src={img_url} alt="homecard" />
        </div>
        <h3>{number}.</h3>
        <h4>{title}</h4>
        <p>{text}</p>
    </div>
  )
}
