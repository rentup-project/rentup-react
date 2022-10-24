import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Filter.css";
import CloseBtnFilter from "../../assets/images/CloseBtnNavbar.png";

export default function Filter({ city, closeFilter, getFilterData }) {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(formData).toString();

    navigate({
      pathname: pathname,
      search: params,
    });

    getFilterData(formData);
    closeFilter();
  };

  return (
    <div className="Filter">
      <div className="filter-title">
        <h2>Filter</h2>
        <img src={CloseBtnFilter} alt="close" onClick={closeFilter} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="min-max-filter">
          <h4>Price per month</h4>
          <div>
            <p>FROM</p>
            <input
              onChange={handleOnChange}
              type="number"
              name="minPrice"
              placeholder="Min price"
              min="0"
            />
            <p>TO</p>
            <input
              onChange={handleOnChange}
              type="number"
              name="maxPrice"
              placeholder="Max price"
              min="0"
            />
          </div>
        </div>
        <div className="min-max-filter">
          <h4>Size</h4>
          <div>
            <p>FROM</p>
            <input
              onChange={handleOnChange}
              type="number"
              name="minMeters"
              placeholder="Min size"
              min="0"
            />
            <p>TO</p>
            <input
              onChange={handleOnChange}
              type="number"
              name="maxMeters"
              placeholder="Max size"
              min="0"
            />
          </div>
        </div>
        <div className="select-filter">
          <h4>Bedrooms</h4>
          <div>
            <select onChange={handleOnChange} name="bedroom" id="bedroom">
              <option className="option-filter" name="selected" defaultValue>
                Select
              </option>
              <option className="option-filter" name="studio">
                Studio
              </option>
              <option className="option-filter" name="1+">
                1 or more
              </option>
              <option className="option-filter" name="2+">
                2 or more
              </option>
              <option className="option-filter" name="3+">
                3 or more
              </option>
              <option className="option-filter" name="4+">
                more than 4
              </option>
            </select>
          </div>
        </div>
        <div className="select-filter">
          <h4>Bathrooms</h4>
          <div>
            <select onChange={handleOnChange} name="bathroom" id="bathroom">
              <option className="option-filter" name="selected" defaultValue>
                Select
              </option>
              <option className="option-filter" name="1+">
                1 or more
              </option>
              <option className="option-filter" name="2+">
                2 or more
              </option>
              <option className="option-filter" name="3+">
                3 or more
              </option>
              <option className="option-filter" name="4+">
                more than 4
              </option>
            </select>
          </div>
        </div>
        <div className="select-filter">
          <h4>Furniture</h4>
          <div>
            <select onChange={handleOnChange} name="furniture" id="furniture">
              <option className="option-filter" name="selected" defaultValue>
                Select
              </option>
              <option className="option-filter" name="not-furnished">
                No furnished
              </option>
              <option className="option-filter" name="only-kitchen">
                Only kitchen furnished
              </option>
              <option className="option-filter" name="fully-furnished">
                Fully furnished
              </option>
            </select>
          </div>
        </div>
        <div className="select-filter">
          <h4>Orientation</h4>
          <div>
            <select
              onChange={handleOnChange}
              name="orientation"
              id="orientation"
            >
              <option className="option-filter" name="selected" defaultValue>
                Select
              </option>
              <option className="option-filter" name="interior">
                Interior
              </option>
              <option className="option-filter" name="exterior">
                Exterior
              </option>
            </select>
          </div>
        </div>
        <div className="select-filter">
          <h4>Pets allowed</h4>
          <div>
            <select onChange={handleOnChange} name="petAllowed" id="petAllowed">
              <option className="option-filter" name="selected" defaultValue>
                Select
              </option>
              <option className="option-filter" name="allow">
                Allow pets
              </option>
              <option className="option-filter" name="doesnt-allow">
                Doesn't allow pets
              </option>
            </select>
          </div>
        </div>
        <div className="select-filter">
          <h4>Heating</h4>
          <div>
            <select onChange={handleOnChange} name="heating" id="heating">
              <option className="option-filter" name="selected" defaultValue>
                Select
              </option>
              <option
                className="option-filter"
                name="individual-elec"
                defaultValue
              >
                Individual-electric
              </option>
              <option className="option-filter" name="central">
                Central
              </option>
              <option className="option-filter" name="individual-gas">
                Individual-gas
              </option>
            </select>
          </div>
        </div>
        <div className="select-filter">
          <h4>Type</h4>
          <div>
            <select
              onChange={handleOnChange}
              name="propertyType"
              id="propertyType"
            >
              <option className="option-filter" name="selected" defaultValue>
                Select
              </option>
              <option className="option-filter" name="apartent">
                Apartment
              </option>
              <option className="option-filter" name="house">
                House
              </option>
            </select>
          </div>
        </div>
        <div className="select-filter">
          <h4>Floor</h4>
          <div>
            <select onChange={handleOnChange} name="floor" id="floor">
              <option className="option-filter" name="selected" defaultValue>
                Select
              </option>
              <option className="option-filter" name="first">
                First
              </option>
              <option className="option-filter" name="in-between">
                In between
              </option>
              <option className="option-filter" name="last">
                Last
              </option>
            </select>
          </div>
        </div>
        <div className="select-filter">
          <h4>Availability</h4>
          <div>
            <select
              onChange={handleOnChange}
              name="availabilityDate"
              id="availabilityDate"
            >
              <option className="option-filter" name="selected" defaultValue>
                Select
              </option>
              <option className="option-filter" name="available">
                Available
              </option>
              <option className="option-filter" name="not-available">
                Not available
              </option>
            </select>
          </div>
        </div>
        <button>FILTER</button>
      </form>
    </div>
  );
}
