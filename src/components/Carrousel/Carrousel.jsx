import React, { useState } from 'react';
import { useEffect } from 'react';
import leftArrow from '../../assets/images/left-arrow.png'
import rightArrow from '../../assets/images/right-arrow.png'
import './Carrousel.css';

export default function Carrousel({ imagesArr, width = 18, height = 15 }) {
    const [lastIndex, setLastIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setLastIndex(imagesArr.length-1)
    }, [imagesArr])

    const handleChangeIndex = (e) => {
        if(e.target.id === 'left-arrow-div' || e.target.id === 'left-arrow') {            
            if(currentIndex > 0) {                
                setCurrentIndex(currentIndex - 1)
            }
        } else if(e.target.id === 'right-arrow-div' || e.target.id === 'right-arrow') {            
            if(currentIndex < lastIndex) {                
                setCurrentIndex(currentIndex + 1)
            }
        }
    }

    return (
        <div className='carrousel'>
            <div className='left-div' id='left-arrow-div' onClick={handleChangeIndex} >
                {
                    currentIndex >= 1 &&
                    <img id='left-arrow' src={leftArrow} 
                    alt="left" style={{ marginTop: `${height / 2.1}rem`}} />
                }
            </div>
            <div
                className="img-div"
                style={{ backgroundImage: `url(${imagesArr[currentIndex]})`, width: `${width}rem`, height: `${height}rem` }}
            ></div>
            <div className='right-div' id='right-arrow-div' onClick={handleChangeIndex}>
                {
                    currentIndex < lastIndex &&
                    <img src={rightArrow} id='right-arrow'
                    alt="right" style={{ marginTop: `${height / 2.1}rem` }} />
                }
            </div>
        </div>
    )
}
