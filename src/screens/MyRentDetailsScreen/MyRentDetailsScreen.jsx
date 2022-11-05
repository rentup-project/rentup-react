import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BillsSection from '../../components/BillsSection/BillsSection';
import RentForm from '../../components/RentForm/RentForm';
import RentDetailsSection from './../../components/RentDetailsSection/RentDetailsSection';
import { getOneProperty, getOneRent } from './../../services/Properties.services';
import './MyRentDetailsScreen.css';

export default function MyRentDetailsScreen() {
  const [property, setProperty] = useState({})
  const [rent, setRent] = useState({})
  const [section, setSection] = useState('rent-details')
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    getOneProperty(id)
    .then(res => setProperty(res))
    .catch(err => navigate('/error'))
  }, [id, navigate])

  useEffect(() => {
    if (property.rented) {
      getOneRent(id)
      .then(res => setRent(res))
      .catch(err => navigate('/error'))
    }
  }, [property, id, navigate])

  const handleOnClick = (e) => {
    const { id } = e.target;
    setSection(id);
  };

  return (
    <div className='rent-details-screen'>
      {
        rent !== {} &&
        <div className='rent-details-container'>
          <ul className="btns-sections-container">
            <li
              onClick={handleOnClick}
              className={
                section === "rent-details" ? "section-selected" : "section-unselected"
              }
              id="rent-details"
            >
              Rent Details
            </li>
            <li
              onClick={handleOnClick}
              className={
                section === "bills"
                  ? "section-selected"
                  : "section-unselected"
              }
              id="bills"
            >
              Bills
            </li>
            <li
              onClick={handleOnClick}
              className={
                section === "requests"
                  ? "section-selected"
                  : "section-unselected"
              }
              id="requests"
            >
              Requests
            </li>
            <li
              onClick={handleOnClick}
              className={
                section === "reviews" ? "section-selected" : "section-unselected"
              }
              id="reviews"
            >
              Reviews
            </li>
          </ul>
        </div>
      }

        {rent !== {} && section === "rent-details" && 
          <RentDetailsSection 
          rent={rent}
          property={property}
          />
        }

        {rent !== {} && section === "bills" && <BillsSection rent={rent} />}

        {rent !== {} && section === "requests" && <div>request</div>}

        {rent !== {} && section === "reviews" && <div>reviews</div>}

        {
        rent === {} &&
        <RentForm propertyId={id} />
        }
    </div>
  )
}
