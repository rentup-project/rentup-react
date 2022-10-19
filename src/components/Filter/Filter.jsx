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
        <form action="">
            <div className='min-max-filter'> 
                <h4>Price per month</h4>
                <div>
                    <p>FROM</p>
                    <input type="number" name="min-price" placeholder='Min price' min="0" />
                    <p>TO</p>
                    <input type="number" name="max-price" placeholder='Max price' min="0" />
                </div>
            </div>
            <div className='min-max-filter'> 
                <h4>Size</h4>
                <div>
                    <p>FROM</p>
                    <input type="number" name="min-meters" placeholder='Min size' min="0" />
                    <p>TO</p>
                    <input type="number" name="max-meters" placeholder='Max size' min="0" />
                </div>
            </div>
            <div className='select-filter'> 
                <h4>Bedrooms</h4>
                <div>
                    <select name="bedrooms" id="bedrooms">
                        <option className="option-filter" name="selected" selected>Select</option>
                        <option className="option-filter" name="studio">Studio</option>
                        <option className="option-filter" name="1+">1 or more</option>
                        <option className="option-filter" name="2+">2 or more</option>
                        <option className="option-filter" name="3+">3 or more</option>
                        <option className="option-filter" name="4+">more than 4</option>
                    </select>
                </div>
            </div>
            <div className='select-filter'> 
                <h4>Bathrooms</h4>
                <div>
                    <select name="bathrooms" id="bathrooms">
                        <option className="option-filter" name="selected" selected>Select</option>
                        <option className="option-filter" name="1+">1 or more</option>
                        <option className="option-filter" name="2+">2 or more</option>
                        <option className="option-filter" name="3+">3 or more</option>
                        <option className="option-filter" name="4+">more than 4</option>
                    </select>
                </div>
            </div>
            <div className='select-filter'> 
                <h4>Furniture</h4>
                <div>
                    <select name="furniture" id="furniture">
                        <option className="option-filter" name="selected" selected>Select</option>
                        <option className="option-filter" name="not-furnished">No furniture</option>
                        <option className="option-filter" name="only-kitchen">Only kitchen</option>
                        <option className="option-filter" name="fully-furnished">Fully furniture</option>
                    </select>
                </div>
            </div>
            <div className='select-filter'> 
                <h4>Orientation</h4>
                <div>
                    <select name="orientation" id="orientation">
                        <option className="option-filter" name="selected" selected>Select</option>
                        <option className="option-filter" name="interior">Interior</option>
                        <option className="option-filter" name="exterior">Exterior</option>
                        <option className="option-filter" name="orientation-both">Both</option>
                    </select>
                </div>
            </div>
            <div className='select-filter'> 
                <h4>Pets allowed</h4>
                <div>
                    <select name="pets-allowed" id="pets-allowed">
                        <option className="option-filter" name="allow" selected>Allow pets</option>
                        <option className="option-filter" name="doesnt-allow">Doesn't allow pets</option>
                    </select>
                </div>
            </div>
            <div className='select-filter'> 
                <h4>Heating</h4>
                <div>
                    <select name="heating" id="heating">
                        <option className="option-filter" name="selected" selected>Select</option>
                        <option className="option-filter" name="individual-elec" selected>Individual-electric</option>
                        <option className="option-filter" name="central">Central</option>
                        <option className="option-filter" name="individual-gas">Individual-gas</option>
                    </select>
                </div>
            </div>
            <div className='select-filter'> 
                <h4>Type</h4>
                <div>
                    <select name="property-type" id="property-type">
                        <option className="option-filter" name="selected" selected>Select</option>
                        <option className="option-filter" name="apartent">Apartment</option>
                        <option className="option-filter" name="house">House</option>
                    </select>
                </div>
            </div>
            <div className='select-filter'> 
                <h4>Floor</h4>
                <div>
                    <select name="floor" id="floor">
                        <option className="option-filter" name="selected" selected>Select</option>
                        <option className="option-filter" name="first">First floor</option>
                        <option className="option-filter" name="in-between">In between</option>
                        <option className="option-filter" name="last">Last</option>
                    </select>
                </div>
            </div>
            <div className='select-filter'> 
                <h4>Availability</h4>
                <div>
                    <select name="availability" id="availability">
                        <option className="option-filter" name="selected" selected>Select</option>
                        <option className="option-filter" name="available">Available</option>
                        <option className="option-filter" name="not-available">Not available</option>
                    </select>
                </div>
            </div>
            <button>FILTER</button>
        </form>
    </div>
  )
}
