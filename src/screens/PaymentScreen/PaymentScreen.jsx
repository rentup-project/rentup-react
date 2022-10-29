import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import './PaymentScreen.css';
import { paymentIntent } from "../../services/Payment.services";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { getOneProperty } from './../../services/Properties.services';
import { useParams, useNavigate } from 'react-router-dom';


const stripePromise = loadStripe("pk_test_51LxA2OAzYaaEnlBj4Br2dKk5iw4g8dqA2HdkVdV3zabPPH01r6XQ1IFGZTXZ0gPVaJuVYxG8d1Y5nMcZOURpp3BR00yH9lfgGB");

export default function PaymentScreen() {
  const [clientSecret, setClientSecret] = useState("");
  const [price, setPrice] = useState('')
  const [property, setProperty] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    paymentIntent(id)
    .then((data) => {
      setClientSecret(data.clientSecret)
      setPrice(data.reservationPrice)
    })

    getOneProperty(id)
    .then((prop) => {
      setProperty(prop)
    })
  }, [id, navigate]);

  const appearance = {
    theme: 'night',
    variables: {
      colorPrimary: '#ffd166',
    },
  };

  const options = {
    clientSecret,
    appearance
  }

  return (
    <div className="paymentScreen">
      {clientSecret && price && (
        <div>
          <div className="property-payment-details">
            <h2>You are about to rent the the place you will call home!</h2>
            <h4>Please check the following information</h4>
            <p>{property.address}</p>
            <p>{property.bathroom} bathrooms</p>
            <p>{property.bedroom} bathrooms</p>
            <p>{property.monthlyRent} €/mes</p>
            <p>
              {
              property.images.map((img) => (
                <img src={img} alt='property' width='150px'/>
              ))
              }
            </p>
          </div>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      )}
    </div>
  )
}
