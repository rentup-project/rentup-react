import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Filter.css";
import CloseBtnFilter from "../../assets/images/CloseBtnNavbar.png";

export default function Filter({ city, closeFilter, getFilterData }) {
  const location = useLocation();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let bedroomSelect;
  let bathroomSelect;
  let furnitureSelect;
  let orientationTypeSelect;
  let petAllowedInfoSelect;

  //definir en el form data los datos de filtros anteriores
  useEffect(() => {
    setFormData(Object.fromEntries(new URLSearchParams(location.search)))
  }, [])

  //handle on change para ver el valor cuando escriber o seleccionas un input
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //handle on submit para enviar al back los parametros y cerrar la caja del filtro
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

  //logica para que la info del filtrado anterior ya venga seleccionado

  //bedroom
  if (!formData.bedrooms || formData.bedrooms === 'Select') {
    bedroomSelect = 'Select'
  } else if (formData.bedrooms === 'Studio') {
    bedroomSelect = 'Studio'
  } else if (formData.bedrooms === '1 or more') {
    bedroomSelect = '1 or more'
  } else if (formData.bedrooms === '2 or more') {
    bedroomSelect = '2 or more'
  } else if (formData.bedrooms === '3 or more') {
    bedroomSelect = '3 or more'
  } else if (formData.bedrooms === 'More than 4'){
    bedroomSelect = 'More than 4'
  }

  //bathroom
  if (!formData.bathrooms || formData.bathrooms === 'Select') {
    bathroomSelect = 'Select'
  } else if (formData.bathrooms === '1 or more') {
    bathroomSelect = '1 or more'
  } else if (formData.bathrooms === '2 or more') {
    bathroomSelect = '2 or more'
  } else if (formData.bathrooms === '3 or more') {
    bathroomSelect = '3 or more'
  } else if (formData.bathrooms === 'More than 4'){
    bathroomSelect = 'More than 4'
  }

  //furniture
  if (!formData.furnitures || formData.furnitures === 'Select') {
    furnitureSelect = 'Select'
  } else if (formData.furnitures === 'Not furnished') {
    furnitureSelect = 'Not furnished'
  } else if (formData.furnitures === 'Only kitchen furnished') {
    furnitureSelect = 'Only kitchen furnished'
  } else if (formData.furnitures === 'Fully furnished') {
    furnitureSelect = 'Fully furnished'
  }

  //orientationType
  if (!formData.orientationType || formData.orientationType === 'Select') {
    orientationTypeSelect = 'Select'
  } else if (formData.orientationType === 'Exterior') {
    orientationTypeSelect = 'Exterior'
  } else if (formData.orientationType === 'Interior') {
    orientationTypeSelect = 'Interior'
  }

  //petAllowedInfo petAllowedInfoSelect
  if (!formData.petAllowedInfo || formData.petAllowedInfo === 'Select') {
    petAllowedInfoSelect = 'Select'
  } else if (formData.petAllowedInfo === 'Allow pets') {
    petAllowedInfoSelect = 'Allow pets'
  } else if (formData.petAllowedInfo === 'Does not allow pets') {
    petAllowedInfoSelect = 'Does not allow pets'
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="filter-title">
        <h2>Filter</h2>
        <img src={CloseBtnFilter} alt="close" onClick={closeFilter} />
      </div>
      <div className="Filter">
        <div className="min-max-filter">
          <h4>Monthly Rent</h4>
          <div>
            <p>FROM</p>
            <input
              onChange={handleOnChange}
              type="number"
              name="minPrice"
              placeholder="Min price"
              min="0"
              value={formData.minPrice && formData.minPrice}
            />
            <p>TO</p>
            <input
              onChange={handleOnChange}
              type="number"
              name="maxPrice"
              placeholder="Max price"
              min="0"
              value={formData.maxPrice && formData.maxPrice}
            />
          </div>
        </div>
        <div className="min-max-filter">
          <h4>Squared Meters</h4>
          <div>
            <p>FROM</p>
            <input
              onChange={handleOnChange}
              type="number"
              name="minMeters"
              placeholder="Min size"
              min="0"
              value={formData.minMeters && formData.minMeters}
            />
            <p>TO</p>
            <input
              onChange={handleOnChange}
              type="number"
              name="maxMeters"
              placeholder="Max size"
              min="0"
              value={formData.maxMeters && formData.maxMeters}
            />
          </div>
        </div>
        <div className="select-filter">
          <h4>Bedrooms</h4>
          <div>
            <select onChange={handleOnChange} name="bedrooms" id="bedrooms" value={bedroomSelect}>
              <option className="option-filter" name="selected">
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
              More than 4
              </option>
            </select>
          </div>
        </div>
        <div className="select-filter">
          <h4>Bathrooms</h4>
          <div>
            <select onChange={handleOnChange} name="bathrooms" id="bathrooms" value={bathroomSelect}>
              <option className="option-filter" name="selected">
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
                More than 4
              </option>
            </select>
          </div>
        </div>
        <div className="select-filter">
          <h4>Furniture</h4>
          <div>
            <select onChange={handleOnChange} name="furnitures" id="furnitures" value={furnitureSelect}>
              <option className="option-filter" name="selected">
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
          </div>
        </div>
        <div className="select-filter">
          <h4>Orientation</h4>
          <div>
            <select
              onChange={handleOnChange}
              name="orientationType"
              id="orientationType"
              value={orientationTypeSelect}
            >
              <option className="option-filter" name="selected">
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
            <select onChange={handleOnChange} name="petAllowedInfo" id="petAllowedInfo" value={petAllowedInfoSelect}>
              <option className="option-filter" name="selected">
                Select
              </option>
              <option className="option-filter" name="allow">
                Allow pets
              </option>
              <option className="option-filter" name="doesnt-allow">
                Does not allow pets
              </option>
            </select>
          </div>
        </div>
        <div className="select-filter">
          <h4>Heating</h4>
          <div>
            <select onChange={handleOnChange} name="heatingType" id="heatingType">
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
          <h4>Property Type</h4>
          <div>
            <select
              onChange={handleOnChange}
              name="propertyTypeInfo"
              id="propertyTypeInfo"
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
            <select onChange={handleOnChange} name="floorInfo" id="floorInfo">
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
              name="availabilityDateInfo"
              id="availabilityDateInfo"
            >
              <option className="option-filter" name="selected" defaultValue>
                Select
              </option>
              <option className="option-filter" name="available">
                Available now
              </option>
              <option className="option-filter" name="not-available">
                Available soon
              </option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <button>FILTER</button>
      </div>
    </form>
  );
}