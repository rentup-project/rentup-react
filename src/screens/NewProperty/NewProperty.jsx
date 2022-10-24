import React, { useContext, useState, useEffect } from "react";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import './NewProperty.css';
import AuthContext from './../../contexts/AuthContext';
import { createProperty } from './../../services/Properties.services';

export default function NewProperty() {
  const [typeHouse, setTypeHouse] = useState('');
  const [typeApartment, setTypeApartment] = useState('');
  const [formData, setFormData] = useState({});
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const { currentUser } = useContext(AuthContext);

  const suggestionSelect = (result, lat, lng, text) => {
    console.log(result, lat, lng);
    setAddress(result)
    setLatitude(lat)
    setLongitude(lng)
  }

  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }   

    if (name === "propertyType" && value === "House") {
      setTypeHouse(true)
      setTypeApartment(false);
    }
    
    if (name === "propertyType" && value === "Apartment"){
      setTypeApartment(true);
      setTypeHouse(false);
    }
  }

  const handleOnSubmit = () => {
    createProperty({
      ...formData,
      owner: currentUser,
      address: address,
      lat: latitude,
      long: longitude
    })
    .then(prop => console.log(prop))
    .catch(err => console.log(err))
  }

  return (
    <div className="new-property-container">
      <h3>Let's post your property!</h3>
      <form onSubmit={handleOnSubmit}>
        <MapboxAutocomplete
          publicKey="pk.eyJ1IjoibmluYWxib25pIiwiYSI6ImNsOWNuYXppYjBrNmYzcG9laHA3MTN3bTQifQ.90TcbIeqC9bJYExbkEto4Q"
          inputClass="form-control search"
          onSuggestionSelect={suggestionSelect}
          country="es"
          resetSearch={false}
        />
        <label htmlFor="addressVisibility">Address Visibility</label>
        <select
          name="addressVisibility"
          id="addressVisibility"
          onChange={handleOnChange}
        >
          <option name="selected" defaultValue>
            Select
          </option>
          <option className="option-filter" name="Show full address">
            Show full address
          </option>
          <option className="option-filter" name="Show street only">
            Show street only
          </option>
        </select>
        <label htmlFor="availabilityDate">Availability Date</label>
        <input
          type="date"
          name="availabilityDate"
          id="availabilityDate"
          onChange={handleOnChange}
        ></input>
        <label htmlFor="propertyType">Type of property</label>
        <select onChange={handleOnChange} name="propertyType" id="propertyType">
          <option name="selected" defaultValue>
            Select
          </option>
          <option className="option-filter" name="House">
            House
          </option>
          <option className="option-filter" name="Aparment">
            Apartment
          </option>
        </select>
        {typeHouse && (
          <>
            <label>House Type</label>
            <select onChange={handleOnChange} name="houseType" id="houseType">
              <option name="selected" defaultValue>
                Select
              </option>
              <option className="option-filter" name="Detached house">
                Detached house
              </option>
              <option className="option-filter" name="Semi-detached house">
                Semi-detached house
              </option>
              <option className="option-filter" name="Single family house">
                Single family house
              </option>
            </select>
          </>
        )}
        {typeApartment && (
          <>
            <label>Aparment Type</label>
            <select
              onChange={handleOnChange}
              name="apartmentType"
              id="apartmentType"
            >
              <option name="selected" defaultValue>
                Select
              </option>
              <option className="option-filter" name="Apartment">
                Apartment
              </option>
              <option className="option-filter" name="Penthouse">
                Penthouse
              </option>
              <option className="option-filter" name="Duplex">
                Duplex
              </option>
              <option className="option-filter" name="Studio">
                Studio
              </option>
              <option className="option-filter" name="Loft">
                Loft
              </option>
            </select>

            <label htmlFor="orientation">Orientation</label>
            <select
              name="orientation"
              id="orientation"
              onChange={handleOnChange}
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

            <label htmlFor="floor">Floor level</label>
            <select name="floor" id="floor" onChange={handleOnChange}>
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
          </>
        )}
        <label htmlFor="squaredMeters">Squared Meters</label>
        <input
          type="number"
          name="squaredMeters"
          id="squaredMeters"
          onChange={handleOnChange}
        ></input>
        <label htmlFor="bedroom">Bedrooms</label>
        <input
          type="number"
          name="bedroom"
          id="bedroom"
          onChange={handleOnChange}
        ></input>
        <label htmlFor="bathroom">Bathrooms</label>
        <input
          type="number"
          name="bathroom"
          id="bathroom"
          onChange={handleOnChange}
        ></input>
        <label htmlFor="furniture">Furniture</label>
        <select name="furniture" id="furniture" onChange={handleOnChange}>
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
        <label htmlFor="petAllowed">Pets allowed</label>
        <select name="petAllowed" id="petAllowed" onChange={handleOnChange}>
          <option className="option-filter" name="selected" defaultValue>
            Select
          </option>
          <option className="option-filter" name="true">
            Yes
          </option>
          <option className="option-filter" name="false">
            No
          </option>
        </select>
        <label htmlFor="heating">Heating</label>
        <select name="heating" id="heating" onChange={handleOnChange}>
          <option className="option-filter" name="selected" defaultValue>
            Select
          </option>
          <option
            className="option-filter"
            name="Individual-electric"
            defaultValue
          >
            Individual-electric
          </option>
          <option className="option-filter" name="Central">
            Central
          </option>
          <option className="option-filter" name="Individual-gas">
            Individual-gas
          </option>
        </select>
        <h6>Features</h6>
        <div className="features-container">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="Pool"
              name="Pool"
              value="Pool"
              onChange={handleOnChange}
            />
            <label htmlFor="Pool">Pool</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="Air conditioning"
              name="Air conditioning"
              value="Air conditioning"
            />
            <label htmlfor="Air conditioning">Air conditioning</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" id="Lyft" name="Lyft" value="Lyft" />
            <label htmlFor="Lyft">Lyft</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="Built-in cabinets"
              name="Built-in cabinets"
              value="Built-in cabinets"
            />
            <label htmlFor="Built-in cabinets">Built-in cabinets</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="Boxroom"
              name="Boxroom"
              value="Boxroom"
            />
            <label htmlFor="Boxroom">Boxroom</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="Parking"
              name="Parking"
              value="Parking"
            />
            <label htmlFor="Parking">Parking</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="Balcony"
              name="Balcony"
              value="Balcony"
            />
            <label htmlFor="Balcony">Balcony</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="Terrace"
              name="Terrace"
              value="Terrace"
            />
            <label htmlFor="Terrace">Terrace</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" id="Garden" name="Garden" value="Garden" />
            <label htmlFor="Garden">Garden</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="24-hour-security"
              name="24-hour-security"
              value="24-hour-security"
            />
            <label htmlFor="24-hour-security">24-hour-security</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" id="Gym" name="Gym" value="Gym" />
            <label htmlFor="Gym">Gym</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="Playground"
              name="Playground"
              value="Playground"
            />
            <label htmlFor="Playground">Playground</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" id="Spa" name="Spa" value="Spa" />
            <label htmlFor="Spa">Spa</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" id="Patio" name="Patio" value="Patio" />
            <label htmlFor="Patio">Patio</label>
          </div>
        </div>

        <label htmlFor="images">Images</label>
        <input
          type="file"
          name="images"
          id="images"
          multiple
          onChange={handleOnChange}
        ></input>

        <label htmlFor="requiredJobDuration">Required Job Duration</label>
        <select
          name="requiredJobDuration"
          id="requiredJobDuration"
          onChange={handleOnChange}
        >
          <option className="option-filter" name="selected" defaultValue>
            Select
          </option>
          <option
            className="option-filter"
            name="Less than 3 months"
            defaultValue
          >
            Less than 3 months
          </option>
          <option className="option-filter" name="Less then a year">
            Less then a year
          </option>
          <option className="option-filter" name="More than a year">
            More than a year
          </option>
        </select>

        <label htmlFor="requiredAnnualSalary">
          Minimun Annual Salary Requirement
        </label>
        <input
          type="number"
          min={15000}
          name="requiredAnnualSalary"
          id="requiredAnnualSalary"
          onChange={handleOnChange}
        ></input>

        <label htmlFor="monthlyRent">Monthly Rent</label>
        <input
          type="number"
          name="monthlyRent"
          id="monthlyRent"
          onChange={handleOnChange}
        ></input>

        <label htmlFor="bailDeposit">Bail Deposit</label>
        <input
          type="number"
          name="bailDeposit"
          id="bailDeposit"
          onChange={handleOnChange}
        ></input>

        <label htmlFor="reservationPrice">Reservation Price</label>
        <input
          type="number"
          name="reservationPrice"
          id="reservationPrice"
          onChange={handleOnChange}
        ></input>

        <label htmlFor="requireGuarantee">Guarantee</label>
        <select
          name="requiredJobDuration"
          id="requiredJobDuration"
          onChange={handleOnChange}
        >
          <option className="option-filter" name="selected" defaultValue>
            Select
          </option>
          <option className="option-filter" name="None" defaultValue>
            None
          </option>
          <option className="option-filter" name="1 month">
            1 month
          </option>
          <option className="option-filter" name="2 months">
            2 months
          </option>
        </select>

        <button>SUBMIT</button>
      </form>
    </div>
  );
}
