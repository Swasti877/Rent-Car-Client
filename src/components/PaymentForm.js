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
import { useNavigate } from "react-router-dom";

export default function PaymentForm({ props }) {
  const { API_URL } = config;
  const navigate = useNavigate();
  const { amount } = props;
  const [detailsAfterTransaction, setDetailsAfterTransaction] = useState({
    msg: "",
    id: "",
  });
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

    const dataID = new URLSearchParams(window.location.search).get("data");

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setDetailsAfterTransaction({
            ...detailsAfterTransaction,
            msg: "Payment succeeded!",
            _id: dataID,
          });
          changePaymentStatusToTrue(dataID, paymentIntent.id).then(() => {
            navigate(
              `/orderHistory?paymentIntentStatus=${paymentIntent.status}`
            ); // after changing value navigate back to orderHistory Page
          });
          break;
        case "processing":
          setDetailsAfterTransaction({
            ...detailsAfterTransaction,
            msg: "Payment succeeded!",
            _id: dataID,
          });
          break;
        case "requires_payment_method":
          setDetailsAfterTransaction({
            ...detailsAfterTransaction,
            msg: "Payment succeeded!",
            _id: dataID,
          });
          break;
        default:
          setDetailsAfterTransaction({
            ...detailsAfterTransaction,
            msg: "Payment succeeded!",
            _id: dataID,
          });
          break;
      }
    });
  }, [stripe]);

  const changePaymentStatusToTrue = (_id, transactionID) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(API_URL + "/rental/changeValue", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _id,
            transactionID, 
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update payment status");
        }

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

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
          locationIDPickUp: bookDetails.pickUp,
          locationIDDropOff: bookDetails.dropOff,
          userID: data._id,
          rentalStartDate: bookDetails.pickUpDate,
          rentalEndDate: bookDetails.dropOffDate,
          rentalStartTime: bookDetails.pickUpTime,
          rentalEndTime: bookDetails.dropOffTime,
          rentalPrice: amount,
          paymentStatus: false,
        }),
      });

      if (response2.status === 200) {
        const data = await response2.json();
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `http://localhost:3000/pay?data=${data._id}`,
          },
        });
        if (error.type === "card_error" || error.type === "validation_error") {
          alert(error.message);
        } else {
          alert("An unexpected error occurred.");
        }
      }
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
        <h2>{detailsAfterTransaction.msg}</h2>
      )}
    </>
  );
}
