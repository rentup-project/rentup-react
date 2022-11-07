import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { updateBills } from './../../services/Bills.services';

export default function CheckOutBillForm({ bills }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ids, setIds] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const idsToSend = []
    if(bills.length) {
        bills.forEach((bill) => {
            return idsToSend.push(bill.id)
        })

        setIds(idsToSend)
    }
}, [bills]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/error`,
      },
      redirect: "if_required"
    });

    if (paymentIntent) {
      switch (paymentIntent.status) {
        case "succeeded":
          updateBills(ids)
          .then((res)=> setMessage("Payment successful."))
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
    }

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
              {isLoading ? <div className="spinner" id="spinner"></div> : "PAY NOW"}
            </span>
          </button>
          </>
        )
      }
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}