import './Filter.css'
import CloseBtnFilter from '../../assets/images/CloseBtnNavbar.png';

import React from 'react'

export default function Filter({ CloseFilter }) {
  return (
    <div className='Filter'>
        <div className='filter-title'>
            <h2>Filter</h2>
            <img src={CloseBtnFilter} alt="close" onClick={CloseFilter} />
        </div>
    </div>
  )
}
