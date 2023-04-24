import "./PaymentForm.css";
import "../css/button.css";
import { useSelector } from "react-redux";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import config from "../constant";

export default function PaymentForm({ props }) {
  const { API_URL } = config;
  const { amount } = props;
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const cartCar = useSelector((state) => state.bookDetails.cartCar);
  const stripe = useStripe();
  const elements = useElements();
  const paymentElementOptions = {
    layout: "tabs",
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.href).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
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
  }, [stripe]);

  console.log("cartCar >> ", cartCar);

  // Function's
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(API_URL + "/auth/getID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("token") }),
    });

    const data = await response.json();
    if (response.status === 200) {
      const { bookDetails, car } = cartCar;

      const response2 = await fetch(API_URL + "/rental/addRental", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carID: car._id,
          locationID: [bookDetails.pickUp, bookDetails.dropOff],
          userID: data._id,
          rentalStartDate: bookDetails.pickUpDate,
          rentalEndDate: bookDetails.dropOffDate,
          rentalStartTime: bookDetails.pickUpTime,
          rentalEndTime: bookDetails.dropOffTime,
          rentalPrice: amount,
          paymentStatus: false,
        }),
      });

      const data2 = await response2.json();
      console.log("data>>", data2);

      if (response2.status === 200) {
        setId(data._id);
      }
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/pay?data=${id}`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      alert(error.message);
    } else {
      alert("An unexpected error occurred.");
    }
  };

  return (
    <>
      {Object.keys(cartCar).length !== 0 ? (
        <form onSubmit={handleSubmit}>
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
          <button className="primary-button">
            PAY &#8377;
            {amount / 100}
          </button>
        </form>
      ) : (
        <h2>{message}</h2>
      )}
    </>
  );
}
