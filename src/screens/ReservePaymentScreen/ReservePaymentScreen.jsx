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
          {successfulMessage ? (
            <Link to="/my-area">
              <h2>RESERVATION SUCCESSFUL!</h2>
              <span>
                <b>Click here</b> to go to your personal area.
              </span>
            </Link>
          ) : (
            <h2>
              You are about to reserve the the place you will call home!
              <br></br>
              <br></br>
              Please, verify carefully the following information:
            </h2>
          )}
          <div className="details-container">
            <div className="property-details-container">
              <div className="carrousel-payment-reserve">
                <Carrousel imagesArr={property.images} />
              </div>
              <div>
                <p>{property.address}</p>
                <p>
                  Monthly rent: <b>{property.monthlyRent} €</b>
                </p>
                <p>
                  Bedroom: <b>{property.bedroom}</b>
                </p>
                <p>
                  Bathroom: <b>{property.bathroom}</b>
                </p>
                <p>
                  Squared Meters:{" "}
                  <b>
                    {property.squaredMeters} m<sup>2</sup>
                  </b>
                </p>
              </div>
            </div>
            {!successfulMessage && (
              <div className="payment-details-container">
                <h6>RESERVATION PRICE: {price}€</h6>
                <p>
                  *The amount paid now will be discounted from the first monthly
                  rent. <br />
                  *If the reservation is not accepted by the owner, the amount
                  paid will be returned to you.
                </p>
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm
                    id={property.id}
                    handleSuccessfulPayment={handleSuccessfulPayment}
                  />
                </Elements>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
