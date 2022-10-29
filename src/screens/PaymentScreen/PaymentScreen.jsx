import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import './PaymentScreen.css';
import { paymentIntent } from "../../services/Payment.services";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";


const stripePromise = loadStripe("pk_test_51LxA2OAzYaaEnlBj4Br2dKk5iw4g8dqA2HdkVdV3zabPPH01r6XQ1IFGZTXZ0gPVaJuVYxG8d1Y5nMcZOURpp3BR00yH9lfgGB");

export default function PaymentScreen() {
  const [clientSecret, setClientSecret] = useState("");

  // const bodyToPost = {
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] })
  // }

  useEffect(() => {
    paymentIntent({ items: 'hola marinas' })
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  console.log(clientSecret)
  const options = {
    clientSecret,
    theme: 'stripe'
  }

  return (
    <div className="paymentScreen">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
