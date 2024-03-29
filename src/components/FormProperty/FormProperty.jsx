import React, { useContext, useEffect, useState } from "react";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import { useNavigate } from "react-router-dom";
import AuthContext from "./../../contexts/AuthContext";
import { getOneProperty } from "./../../services/Properties.services";
import "./FormProperty.css";

export default function FormProperty({ mongoErr, handleOnEdit, handleOnCreate, propertyId }) {
  const [typeHouse, setTypeHouse] = useState("");
  const [typeApartment, setTypeApartment] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [features, setFeatures] = useState([]);
  const [weeklyAvailability, setWeeklyAvailability] = useState([]);
  const [images, setImages] = useState([]);
  const [propertyData, setPropertyData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (propertyId) {
      getOneProperty(propertyId)
        .then((prop) => {
        
          if (prop.petAllowed) {
            prop.petAllowed = "Yes";
          } else if (!prop.petAllowed) {
            prop.petAllowed = "No";
          }

          if (prop.propertyType === "House") {
            setTypeHouse(true);
            setTypeApartment(false);
          } else if (prop.propertyType === "Apartment") {
            setTypeApartment(true);
            setTypeHouse(false);
          }

          setPropertyData(prop);
        })
        .catch((err) => navigate("/error"));
    }
  }, [navigate, propertyId]);

  const suggestionSelect = (result, lat, lng, text) => {
    setAddress(result);
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleOnClick = () => {
    setLoading(true)
  }

  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "checkbox") {
      if(
        e.target.name === 'Monday' || e.target.name === 'Tuesday' || e.target.name === 'Wednesday' || 
        e.target.name === 'Thursday' || e.target.name === 'Friday' || e.target.name === 'Saturday' || 
        e.target.name === 'Sunday'
      ) {
        if(weeklyAvailability.includes(e.target.name)) {
          const filtered = weeklyAvailability.filter((day) => day !== e.target.name)
          setWeeklyAvailability(filtered);
        } else {
          setWeeklyAvailability([...weeklyAvailability, value]);
        }
      } else {
        if(features.includes(e.target.name)) {
          const filtered = features.filter((feature) => feature !== e.target.name)
          setFeatures(filtered);
        } else {
          setFeatures([...features, value]);
        }
      }
    } else if (type === "file") {
      setImages(files);
    } else {
      setPropertyData({ ...propertyData, [name]: value });
    }

    if (name === "propertyType" && value === "House") {
      setTypeHouse(true);
      setTypeApartment(false);
    } else if (name === "propertyType" && value === "Apartment") {
      setTypeApartment(true);
      setTypeHouse(false);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    const extraData = {
      ...propertyData,
      address,
      features,
      weeklyAvailability,
      owner: currentUser.id,
      lat: latitude,
      long: longitude,
    };

    for (let data in extraData) {
      formData.append(data, extraData[data]);
    }

    for (let image of images) {
      formData.append("images", image);
    }

    if (handleOnCreate) {      
      handleOnCreate(formData);
      setLoading(false);
    } else {
      handleOnEdit(formData);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="form-property-create-edit">
      <div>
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <MapboxAutocomplete
          publicKey="pk.eyJ1IjoibmluYWxib25pIiwiYSI6ImNsOWNuYXppYjBrNmYzcG9laHA3MTN3bTQifQ.90TcbIeqC9bJYExbkEto4Q"
          onSuggestionSelect={suggestionSelect}
          country="es"
          resetSearch={false}
          name="address"
          id="address"
          inputClass={`form-control search ${
            mongoErr?.address ? "is-invalid" : ""
          }`}
        />
        {mongoErr?.address && (
          <div className="error-feedback">{mongoErr?.address}</div>
        )}
      </div>

      <div>
        <label htmlFor="addressVisibility" className="form-label">
          Address Visibility
        </label>
        <select
          name="addressVisibility"
          id="addressVisibility"
          onChange={handleOnChange}
          className={`form-select ${
            mongoErr?.addressVisibility ? "is-invalid" : ""
          }`}
          aria-describedby="validationServer04Feedback"
          value={propertyData.addressVisibility}
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
        {mongoErr?.addressVisibility && (
          <div id="validationServer04Feedback" className="invalid-feedback">
            {mongoErr?.addressVisibility}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="availabilityDate" className="form-label">
          Availability Date
        </label>
        <input
          type="date"
          defaultValue={propertyData.availabilityDate}
          name="availabilityDate"
          id="availabilityDate"
          onChange={handleOnChange}
          className={`form-control ${
            mongoErr?.availabilityDate ? "is-invalid" : ""
          }`}
        ></input>
        {mongoErr?.availabilityDate && (
          <div className="invalid-feedback">{mongoErr?.availabilityDate}</div>
        )}
      </div>

      <div>
        <label htmlFor="tenantsQuantity" className="form-label">
          Maximum Tenants Quantity
        </label>
        <input
          value={propertyData.tenantsQuantity}
          type="number"
          min={1}
          name="tenantsQuantity"
          id="tenantsQuantity"
          onChange={handleOnChange}
          className={`form-control ${
            mongoErr?.tenantsQuantity ? "is-invalid" : ""
          }`}
        ></input>
        {mongoErr?.tenantsQuantity && (
          <div id="validationServer04Feedback" className="invalid-feedback">
            {mongoErr?.tenantsQuantity}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="propertyType" className="form-label">
          Type of property
        </label>
        <select
          value={propertyData.propertyType}
          onChange={handleOnChange}
          name="propertyType"
          id="propertyType"
          className={`form-select ${
            mongoErr?.propertyType ? "is-invalid" : ""
          }`}
          aria-describedby="validationServer04Feedback"
        >
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
        {mongoErr?.propertyType && (
          <div id="validationServer04Feedback" className="invalid-feedback">
            {mongoErr?.propertyType}
          </div>
        )}
      </div>

      {typeHouse && (
        <div>
          <label className="form-label">House Type</label>
          <select
            value={propertyData.houseType}
            onChange={handleOnChange}
            name="houseType"
            id="houseType"
            className={`form-select ${mongoErr?.houseType ? "is-invalid" : ""}`}
            aria-describedby="validationServer04Feedback"
          >
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
          {mongoErr?.houseType && (
            <div id="validationServer04Feedback" className="invalid-feedback">
              {mongoErr?.houseType}
            </div>
          )}
        </div>
      )}

      {typeApartment && (
        <>
          <div>
            <label className="form-label">Aparment Type</label>
            <select
              value={propertyData.apartmentType}
              onChange={handleOnChange}
              name="apartmentType"
              id="apartmentType"
              className={`form-select ${
                mongoErr?.apartmentType ? "is-invalid" : ""
              }`}
              aria-describedby="validationServer04Feedback"
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
            {mongoErr?.apartmentType && (
              <div id="validationServer04Feedback" className="invalid-feedback">
                {mongoErr?.apartmentType}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="orientation" className="form-label">
              Orientation
            </label>
            <select
              value={propertyData.orientation}
              name="orientation"
              id="orientation"
              onChange={handleOnChange}
              className={`form-select ${
                mongoErr?.orientation ? "is-invalid" : ""
              }`}
              aria-describedby="validationServer04Feedback"
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
            {mongoErr?.orientation && (
              <div id="validationServer04Feedback" className="invalid-feedback">
                {mongoErr?.orientation}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="floor" className="form-label">
              Floor level
            </label>
            <select
              value={propertyData.floor}
              name="floor"
              id="floor"
              onChange={handleOnChange}
              className={`form-select ${mongoErr?.floor ? "is-invalid" : ""}`}
              aria-describedby="validationServer04Feedback"
            >
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
            {mongoErr?.floor && (
              <div id="validationServer04Feedback" className="invalid-feedback">
                {mongoErr?.floor}
              </div>
            )}
          </div>
        </>
      )}

      <div>
        <label htmlFor="squaredMeters" className="form-label">
          Squared Meters
        </label>
        <input
          value={propertyData.squaredMeters}
          type="number"
          name="squaredMeters"
          id="squaredMeters"
          onChange={handleOnChange}
          className={`form-control ${
            mongoErr?.squaredMeters ? "is-invalid" : ""
          }`}
        ></input>
        {mongoErr?.squaredMeters && (
          <div id="validationServer04Feedback" className="invalid-feedback">
            {mongoErr?.squaredMeters}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="bedroom" className="form-label">
          Bedrooms
        </label>
        <input
          value={propertyData.bedroom}
          type="number"
          name="bedroom"
          id="bedroom"
          onChange={handleOnChange}
          className={`form-control ${mongoErr?.bedroom ? "is-invalid" : ""}`}
        ></input>
        {mongoErr?.bedroom && (
          <div id="validationServer04Feedback" className="invalid-feedback">
            {mongoErr?.bedroom}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="bathroom" className="form-label">
          Bathrooms
        </label>
        <input
          value={propertyData.bathroom}
          type="number"
          name="bathroom"
          id="bathroom"
          onChange={handleOnChange}
          className={`form-control ${mongoErr?.bathroom ? "is-invalid" : ""}`}
        ></input>
        {mongoErr?.bathroom && (
          <div id="validationServer04Feedback" className="invalid-feedback">
            {mongoErr?.bathroom}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="furniture" className="form-label">
          Furniture
        </label>
        <select
          value={propertyData.furniture}
          name="furniture"
          id="furniture"
          onChange={handleOnChange}
          className={`form-select ${mongoErr?.furniture ? "is-invalid" : ""}`}
          aria-describedby="validationServer04Feedback"
        >
          <option className="option-filter" name="selected" defaultValue>
            Select
          </option>
          <option className="option-filter" name="not-furnished">
            Not furnished
          </option>
          <option className="option-filter" name="only-kitchen">
            Only kitchen furnished
          </option>
          <option className="option-filter" name="fully-furnished">
            Fully furnished
          </option>
        </select>
        {mongoErr?.furniture && (
          <div id="validationServer04Feedback" className="invalid-feedback">
            {mongoErr?.furniture}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="petAllowed" className="form-label">
          Pets allowed
        </label>
        <select
          name="petAllowed"
          id="petAllowed"
          onChange={handleOnChange}
          className="form-select"
          aria-describedby="validationServer04Feedback"
          value={propertyData.petAllowed}
        >
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
      </div>

      <div>
        <label htmlFor="heating" className="form-label">
          Heating
        </label>
        <select
          value={propertyData.heating}
          name="heating"
          id="heating"
          onChange={handleOnChange}
          className="form-select"
          aria-describedby="validationServer04Feedback"
        >
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
      </div>

      <div>
        <label className="form-label">Features</label>
        <div className="commodities-container">
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Pool"
              name="Pool"
              value="Pool"
              onChange={handleOnChange}
              {...(propertyData?.features?.includes("Pool") && {
                checked: true,
              })}
            />
            <label htmlFor="Pool" className="form-check-label">
              Pool
            </label>
          </div>
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Air conditioning"
              name="Air conditioning"
              value="Air conditioning"
              onChange={handleOnChange}
              {...(propertyData?.features?.includes("Air conditioning") && {
                checked: true,
              })}
            />
            <label htmlFor="Air conditioning" className="form-check-label">
              Air conditioning
            </label>
          </div>
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Lift"
              name="Lift"
              value="Lift"
              onChange={handleOnChange}
              {...(propertyData?.features?.includes("Lift") && {
                checked: true,
              })}
            />
            <label htmlFor="Lift" className="form-check-label">
              Lift
            </label>
          </div>
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Built-in cabinets"
              name="Built-in cabinets"
              value="Built-in cabinets"
              onChange={handleOnChange}
              {...(propertyData?.features?.includes("Built-in cabinets") && {
                checked: true,
              })}
            />
            <label htmlFor="Built-in cabinets" className="form-check-label">
              Built-in cabinets
            </label>
          </div>
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Boxroom"
              name="Boxroom"
              value="Boxroom"
              onChange={handleOnChange}
              {...(propertyData?.features?.includes("Boxroom") && {
                checked: true,
              })}
            />
            <label htmlFor="Boxroom" className="form-check-label">
              Boxroom
            </label>
          </div>
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Parking"
              name="Parking"
              value="Parking"
              onChange={handleOnChange}
              {...(propertyData?.features?.includes("Parking") && {
                checked: true,
              })}
            />
            <label htmlFor="Parking" className="form-check-label">
              Parking
            </label>
          </div>
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Balcony"
              name="Balcony"
              value="Balcony"
              onChange={handleOnChange}
              {...(propertyData?.features?.includes("Balcony") && {
                checked: true,
              })}
            />
            <label htmlFor="Balcony" className="form-check-label">
              Balcony
            </label>
          </div>
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Terrace"
              name="Terrace"
              value="Terrace"
              onChange={handleOnChange}
              {...(propertyData?.features?.includes("Terrace") && {
                checked: true,
              })}
            />
            <label htmlFor="Terrace" className="form-check-label">
              Terrace
            </label>
          </div>
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Garden"
              name="Garden"
              value="Garden"
              onChange={handleOnChange}
              {...(propertyData?.features?.includes("Garden") && {
                checked: true,
              })}
            />
            <label htmlFor="Garden" className="form-check-label">
              Garden
            </label>
          </div>
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="24-hour-security"
              name="24-hour-security"
              value="24-hour-security"
              onChange={handleOnChange}
              {...(propertyData?.features?.includes("24-hour-security") && {
                checked: true,
              })}
            />
            <label htmlFor="24-hour-security" className="form-check-label">
              24-hour-security
            </label>
          </div>
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Gym"
              name="Gym"
              value="Gym"
              onChange={handleOnChange}
              {...(propertyData?.features?.includes("Gym") && {
                checked: true,
              })}
            />
            <label htmlFor="Gym" className="form-check-label">
              Gym
            </label>
          </div>
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Playground"
              name="Playground"
              value="Playground"
              onChange={handleOnChange}
              {...(propertyData?.features?.includes("Playground") && {
                checked: true,
              })}
            />
            <label htmlFor="Playground" className="form-check-label">
              Playground
            </label>
          </div>
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Spa"
              name="Spa"
              value="Spa"
              onChange={handleOnChange}
              {...(propertyData?.features?.includes("Spa") && {
                checked: true,
              })}
            />
            <label htmlFor="Spa" className="form-check-label">
              Spa
            </label>
          </div>
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Patio"
              name="Patio"
              value="Patio"
              onChange={handleOnChange}
              {...(propertyData?.features?.includes("Patio") && {
                checked: true,
              })}
            />
            <label htmlFor="Patio" className="form-check-label">
              Patio
            </label>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="images" className="form-label">
          Image
        </label>
        <input
          type="file"
          name="images"
          id="images"
          onChange={handleOnChange}
          className={`form-control ${mongoErr?.images ? "is-invalid" : ""}`}
          multiple
        ></input>
        {mongoErr?.images && (
          <div id="validationServer04Feedback" className="invalid-feedback">
            {mongoErr?.images}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="requiredJobDuration" className="form-label">
          Required Job Duration
        </label>
        <select
          value={propertyData.requiredJobDuration}
          name="requiredJobDuration"
          id="requiredJobDuration"
          onChange={handleOnChange}
          className="form-select"
          aria-describedby="validationServer04Feedback"
        >
          <option className="option-filter" name="selected" defaultValue>
            Select
          </option>
          <option
            className="option-filter"
            name="More than 3 months"
            defaultValue
          >
            More than 3 months
          </option>
          <option className="option-filter" name="One year">
            One year
          </option>
          <option className="option-filter" name="More than a year">
            More than a year
          </option>
        </select>
      </div>

      <div>
        <label htmlFor="requiredAnnualSalary" className="form-label">
          Minimun Annual Salary Requirement
        </label>
        <input
          value={propertyData.requiredAnnualSalary}
          type="number"
          min={15000}
          name="requiredAnnualSalary"
          id="requiredAnnualSalary"
          onChange={handleOnChange}
          className={`form-control ${
            mongoErr?.requiredAnnualSalary ? "is-invalid" : ""
          }`}
        ></input>
        {mongoErr?.requiredAnnualSalary && (
          <div id="validationServer04Feedback" className="invalid-feedback">
            {mongoErr?.requiredAnnualSalary}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="monthlyRent" className="form-label">
          Monthly Rent
        </label>
        <input
          value={propertyData.monthlyRent}
          type="number"
          name="monthlyRent"
          id="monthlyRent"
          onChange={handleOnChange}
          className={`form-control ${
            mongoErr?.monthlyRent ? "is-invalid" : ""
          }`}
        ></input>
        {mongoErr?.monthlyRent && (
          <div id="validationServer04Feedback" className="invalid-feedback">
            {mongoErr?.monthlyRent}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="bailDeposit" className="form-label">
          Bail Deposit
        </label>
        <input
          value={propertyData.bailDeposit}
          type="number"
          name="bailDeposit"
          id="bailDeposit"
          onChange={handleOnChange}
          className="form-control"
        ></input>
      </div>

      <div>
        <label htmlFor="reservationPrice" className="form-label">
          Reservation Price
        </label>
        <input
          value={propertyData.reservationPrice}
          type="number"
          name="reservationPrice"
          id="reservationPrice"
          onChange={handleOnChange}
          className={`form-control ${
            mongoErr?.reservationPrice ? "is-invalid" : ""
          }`}
        ></input>
        {mongoErr?.reservationPrice && (
          <div id="validationServer04Feedback" className="invalid-feedback">
            {mongoErr?.reservationPrice}
          </div>
        )}
      </div>

      <div>
        <label className="form-label">
          Choose the days you are available to show your property
        </label>
        <div className="commodities-container">
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Monday"
              name="Monday"
              value="Monday"
              onChange={handleOnChange}
              {...(propertyData?.weeklyAvailability?.includes("Monday") && {
                checked: true,
              })}
            />
            <label htmlFor="Monday" className="form-check-label">
              Monday
            </label>
          </div>
        </div>
        <div className="commodities-container">
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Tuesday"
              name="Tuesday"
              value="Tuesday"
              onChange={handleOnChange}
              {...(propertyData?.weeklyAvailability?.includes("Tuesday") && {
                checked: true,
              })}
            />
            <label htmlFor="Tuesday" className="form-check-label">
              Tuesday
            </label>
          </div>
        </div>
        <div className="commodities-container">
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Wednesday"
              name="Wednesday"
              value="Wednesday"
              onChange={handleOnChange}
              {...(propertyData?.weeklyAvailability?.includes("Wednesday") && {
                checked: true,
              })}
            />
            <label htmlFor="Wednesday" className="form-check-label">
              Wednesday
            </label>
          </div>
        </div>
        <div className="commodities-container">
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Thursday"
              name="Thursday"
              value="Thursday"
              onChange={handleOnChange}
              {...(propertyData?.weeklyAvailability?.includes("Thursday") && {
                checked: true,
              })}
            />
            <label htmlFor="Thursday" className="form-check-label">
              Thursday
            </label>
          </div>
        </div>
        <div className="commodities-container">
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Friday"
              name="Friday"
              value="Friday"
              onChange={handleOnChange}
              {...(propertyData?.weeklyAvailability?.includes("Friday") && {
                checked: true,
              })}
            />
            <label htmlFor="Friday" className="form-check-label">
              Friday
            </label>
          </div>
        </div>
        <div className="commodities-container">
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Saturday"
              name="Saturday"
              value="Saturday"
              onChange={handleOnChange}
              {...(propertyData?.weeklyAvailability?.includes("Saturday") && {
                checked: true,
              })}
            />
            <label htmlFor="Saturday" className="form-check-label">
              Saturday
            </label>
          </div>
        </div>
        <div className="commodities-container">
          <div className="checkbox-wrapper form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Sunday"
              name="Sunday"
              value="Sunday"
              onChange={handleOnChange}
              {...(propertyData?.weeklyAvailability?.includes("Sunday") && {
                checked: true,
              })}
            />
            <label htmlFor="Sunday" className="form-check-label">
              Sunday
            </label>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="hourAvailability" className="form-label">
          What is your time frame availability on the days chosen above?
        </label>
        <select
          value={propertyData.hourAvailability}
          name="hourAvailability"
          id="hourAvailability"
          onChange={handleOnChange}
          className={`form-select ${
            mongoErr?.hourAvailability ? "is-invalid" : ""
          }`}
          aria-describedby="validationServer04Feedback"
        >
          <option className="option-filter" name="selected" defaultValue>
            Select
          </option>
          <option
            className="option-filter"
            name="Morning - from 9AM to 12PM"
            defaultValue
          >
            Morning - from 9AM to 12PM
          </option>
          <option
            className="option-filter"
            name="Afternoon - from 2PM to 6PM"
            defaultValue
          >
            Afternoon - from 2PM to 6PM
          </option>
          <option
            className="option-filter"
            name="Evening - from 6PM to 9PM"
            defaultValue
          >
            Evening - from 6PM to 9PM
          </option>
        </select>
        {mongoErr?.hourAvailability && (
          <div id="validationServer04Feedback" className="invalid-feedback">
            {mongoErr?.hourAvailability}
          </div>
        )}
      </div>
      <button onClick={handleOnClick}>
        {loading ? (
          <div className="loader-small"></div>
        ) : handleOnCreate ? (
          "CREATE"
        ) : (
          "EDIT"
        )}
      </button>
    </form>
  );
}