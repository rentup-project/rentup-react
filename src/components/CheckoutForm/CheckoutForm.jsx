import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import './CheckoutForm.css';
import AuthContext from "../../contexts/AuthContext";
import { reserveProperty } from './../../services/Properties.services';
import { useNavigate } from 'react-router-dom';

export default function CheckoutForm({ id, handleSuccessfulPayment }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret)
    .then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          handleSuccessfulPayment(true)
          reserveProperty({ propertyId: id, currentUserId: currentUser.id })
          .then((res)=> setMessage("Payment succeeded!"))
          .catch(err => navigate('/error'))
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, id, currentUser, navigate, handleSuccessfulPayment]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.REACT_APP_CLIENT_URL}/payment/reserve/${id}`
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {
        !message && (
          <>
          <PaymentElement id="payment-element" />
          <button disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">
              {isLoading ? <div className="spinner" id="spinner"></div> : "PAY"}
            </span>
          </button>
          </>
        )
      }
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}