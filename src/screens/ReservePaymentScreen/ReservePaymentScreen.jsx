import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Carrousel from '../../components/Carrousel/Carrousel';
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import socket from "../../helpers/socketHelper";
import { paymentIntent } from "../../services/Payment.services";
import { getOneProperty } from '../../services/Properties.services';
import './ReservePaymentScreen.css';

const stripePromise = loadStripe("pk_test_51LxA2OAzYaaEnlBj4Br2dKk5iw4g8dqA2HdkVdV3zabPPH01r6XQ1IFGZTXZ0gPVaJuVYxG8d1Y5nMcZOURpp3BR00yH9lfgGB");

export default function PaymentScreen() {
  const [clientSecret, setClientSecret] = useState("");
  const [price, setPrice] = useState('');
  const [property, setProperty] = useState({});
  const [successfulMessage, setSuccessfulMessage] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

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

  const handleSuccessfulPayment = (boolean) => {
    if (boolean) {
      setSuccessfulMessage(true)
      socket.emit("notification", property.owner.email);
    } else {
      setSuccessfulMessage(false)
    }
  }

  return (
    <>
      {clientSecret && price && (
        <div className="paymentScreen">
          <div className="details-container">
            {
              successfulMessage ?
                <Link to='/my-area'>
                  <h2>RESERVATION SUCCESSFUL! CLICK <span>HERE</span> TO GO TO YOUR PERSONAL AREA</h2>
                </Link>
                :
                <h2>You are about to reserve the the place you will call home!<br></br> Please verify carefully the following information.</h2>
            }
            <div className="property-details-container">
              <Carrousel imagesArr={property.images} width={300} height={250} />
              <div>
                <p>Address: {property.address}</p>
                <p>Bedroom: {property.bedroom}</p>
                <p>Bathroom: {property.bathroom}</p>
                <p>Area: {property.squaredMeters} m<sup>2</sup></p>
                <h4>Monthly rent: {property.monthlyRent} €/month</h4>
              </div>
            </div>
            {
              !successfulMessage &&
              <>
                <h2>If you agree with the above, please proceed with the payment to finish the reservation of the property.</h2>
                <div className="payment-details-container">
                  <h6>RESERVATION PRICE: {price}€</h6>
                  <p>*The amount paid now will be discounted from the first monthly rent. <br />
                    *If the reservation is not accepted by the owner, the amount paid will be returned to you.</p>
                  <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm id={property.id} handleSuccessfulPayment={handleSuccessfulPayment} />
                  </Elements>
                </div>
              </>
            }
          </div>
        </div>
      )}
    </>
  )
}
