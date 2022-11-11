import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import CheckOutBillForm from "../../components/CheckOutBillForm/CheckOutBillForm";
import { payManyBillsIntent } from "../../services/Payment.services";


const stripePromise = loadStripe("pk_test_51LxA2OAzYaaEnlBj4Br2dKk5iw4g8dqA2HdkVdV3zabPPH01r6XQ1IFGZTXZ0gPVaJuVYxG8d1Y5nMcZOURpp3BR00yH9lfgGB");

export default function BillsPayment({ billsToPay, rent }) {
    const [clientSecret, setClientSecret] = useState("");
    const navigate = useNavigate();
    const idsToSend = [];

    const billsPaymentIntent = useCallback((ids) => {
        payManyBillsIntent(ids)
        .then(data => {
            setClientSecret(data.clientSecret)
        })
        .catch(err => navigate('/error'))
    }, [])

    useEffect(() => {
        if(billsToPay.length) {
            billsToPay.forEach((bill) => {
                return idsToSend.push(bill.id)
            })
    
            billsPaymentIntent(idsToSend)
        }
    }, [billsToPay, billsPaymentIntent]);

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
    <>
      {clientSecret && (
        <div className="bills-payment-screen">
          <>
            <div className="bills-payment-container">
              {billsToPay.map((bill) => (
                <div className="each-bill-to-pay" key={bill.id}>
                  <div>
                    <b>Type:</b> {bill.type}
                  </div>
                  <div>
                    <b>Amount:</b> {bill.amount}€
                  </div>
                </div>
              ))}
            </div>
            <Elements options={options} stripe={stripePromise}>
              <CheckOutBillForm bills={billsToPay} rent={rent} />
            </Elements>
          </>
        </div>
      )}
    </>
  );
}