import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios';
import './PaymentScreen.css';
import { paymentIntent } from "../../services/Payment.services";

const stripePromise = loadStripe("pk_test_51LxA2OAzYaaEnlBj4Br2dKk5iw4g8dqA2HdkVdV3zabPPH01r6XQ1IFGZTXZ0gPVaJuVYxG8d1Y5nMcZOURpp3BR00yH9lfgGB");

export default function PaymentScreen() {
    const [clientSecret, setClientSecret] = useState("");

    // const bodyToPost = {
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] })
    // }

    useEffect(() => {
        paymentIntent({msg: 'hola marinas'})
        .then((res) => {
            console.log(res) 
            return res.json()
        })
        .then((data) => setClientSecret(data.clientSecret));
    }, []);

  return (
    <div className="paymentScreen">PaymentScreen</div>
  )
}
