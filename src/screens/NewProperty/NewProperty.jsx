import React, { useContext, useState } from "react";
import AddressAutofillForm from "../../components/AddressAutofillForm/AddressAutofillForm";
import './NewProperty.css';
import AuthContext from './../../contexts/AuthContext';

export default function NewProperty() {
  const [typeHouse, setTypeHouse] = useState('')
  const [typeApartment, setTypeApartment] = useState("");
  const { currentUser } = useContext(AuthContext);

  const handleOnChange = (e) => {
    const { name, value } = e.target

    if (name === "propertyType" && value === "House") {
      setTypeHouse(true)
      setTypeApartment(false);
    }
    
    if (name === "propertyType" && value === "Apartment"){
      setTypeApartment(true);
      setTypeHouse(false);
    }
  }

  return (
    <div className="new-property-container">
      <h3>Let's post your property!</h3>
      <form>
        <input name="owner" value={currentUser} hidden />
        <AddressAutofillForm />
        <label htmlFor="addressVisibility">Address Visibility</label>
        <select name="addressVisibility" id="addressVisibility">
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
            <select name="orientation" id="orientation">
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
            <select name="floor" id="floor">
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
        <input type="number" name="squaredMeters" id="squaredMeters"></input>
        <label htmlFor="bedroom">Bedrooms</label>
        <input type="number" name="bedroom" id="bedroom"></input>
        <label htmlFor="bathroom">Bathrooms</label>
        <input type="number" name="bathroom" id="bathroom"></input>
        <label htmlFor="furniture">Furniture</label>
        <select name="furniture" id="furniture">
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
        <select name="petAllowed" id="petAllowed">
          <option className="option-filter" name="true" defaultValue>
            Yes
          </option>
          <option className="option-filter" name="false">
            No
          </option>
        </select>
        <label htmlFor="heating">Heating</label>
        <select name="heating" id="heating">
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
            <input type="checkbox" id="Pool" name="Pool" value="Pool" />
            <label for="Pool">Pool</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="Air conditioning"
              name="Air conditioning"
              value="Air conditioning"
            />
            <label for="Air conditioning">Air conditioning</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" id="Lyft" name="Lyft" value="Lyft" />
            <label for="Lyft">Lyft</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="Built-in cabinets"
              name="Built-in cabinets"
              value="Built-in cabinets"
            />
            <label for="Built-in cabinets">Built-in cabinets</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="Boxroom"
              name="Boxroom"
              value="Boxroom"
            />
            <label for="Boxroom">Boxroom</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="Parking"
              name="Parking"
              value="Parking"
            />
            <label for="Parking">Parking</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="Balcony"
              name="Balcony"
              value="Balcony"
            />
            <label for="Balcony">Balcony</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="Terrace"
              name="Terrace"
              value="Terrace"
            />
            <label for="Terrace">Terrace</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" id="Garden" name="Garden" value="Garden" />
            <label for="Garden">Garden</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="24-hour-security"
              name="24-hour-security"
              value="24-hour-security"
            />
            <label for="24-hour-security">24-hour-security</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" id="Gym" name="Gym" value="Gym" />
            <label for="Gym">Gym</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="Playground"
              name="Playground"
              value="Playground"
            />
            <label for="Playground">Playground</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" id="Spa" name="Spa" value="Spa" />
            <label for="Spa">Spa</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" id="Patio" name="Patio" value="Patio" />
            <label for="Patio">Patio</label>
          </div>
        </div>

        <label htmlFor="images">Images</label>
        <input type="file" name="images" id="images" multiple></input>

        <label htmlFor="requiredJobDuration">Required Job Duration</label>
        <select name="requiredJobDuration" id="requiredJobDuration">
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
        ></input>

        <label htmlFor="monthlyRent">Monthly Rent</label>
        <input type="number" name="monthlyRent" id="monthlyRent"></input>

        <label htmlFor="bailDeposit">Bail Deposit</label>
        <input type="number" name="bailDeposit" id="bailDeposit"></input>

        <label htmlFor="reservationPrice">Reservation Price</label>
        <input
          type="number"
          name="reservationPrice"
          id="reservationPrice"
        ></input>

        <label htmlFor="requireGuarantee">Guarantee</label>
        <select name="requiredJobDuration" id="requiredJobDuration">
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
