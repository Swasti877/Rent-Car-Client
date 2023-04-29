import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import config from "../constant";
import PaymentForm from "./PaymentForm";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(
  "pk_test_51KUrPtSJMMQQJFOHik3zjuYRK5TcnQP8bDLIkOg5xx6sIClawCzgx1xvPvZul3ShjCiEymWu9QevYFE0n98AJSmG00s3JIbpHB"
);

export default function Stripe() {
  const cartCar = useSelector((state) => state.bookDetails.cartCar);
  const { API_URL } = config;
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(0);
  const apperance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    apperance,
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(API_URL + "/payment/create-paymentIntent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartCar }),
      });

      const data = await response.json();
      if (response.status === 200) {
        setClientSecret(data.clientSecret);
        setAmount(data.amount);
      }
    })();
  }, []);

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm props={{ amount, clientSecret }} />
        </Elements>
      )}
    </>
  );
}
