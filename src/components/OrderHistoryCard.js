import { useEffect, useState } from "react";
import "./OrderHistoryCard.css";
import config from "../constant";

const OrderHistoryCard = ({ order }) => {
  const { API_URL } = config;
  const [car, setCar] = useState({}); // A single car detail which is Yet to be fetched

  useEffect(() => {
    (async () => {
      const response = await fetch(API_URL + "/car/fetchACar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: order.carID }),
      });
      if (response.status === 200) {
        const data = await response.json();
        setCar(data.car[0]);
      }
    })();
  }, []);

  return (
    <article class="order-history-card">
      <div class="order-history-card-header">
        <h2 class="order-history-card-title">Order #{order._id}</h2>
        <div className={ order.paymentStatus ? 'paid order-history-card-payment-status' : 'unpaid order-history-card-payment-status' }>
          {order.paymentStatus ? "Paid" : "Unpaid"}
        </div>
      </div>
      <div class="order-history-card-content">
        <div class="order-history-card-date">
          <div class="order-history-card-date-label">Pickup:</div>
          <div class="order-history-card-date-value">
            {order.rentalStartDate} @ {order.rentalStartTime}
          </div>
        </div>
        <div class="order-history-card-date">
          <div class="order-history-card-date-label">Return:</div>
          <div class="order-history-card-date-value">
            {order.rentalEndDate} @ {order.rentalEndTime}
          </div>
        </div>
        <div class="order-history-card-product">
          {car && (
            <>
              <img
                src={API_URL + `/car/fetchImage/${car.img}`}
                alt={car.make + car.model}
                class="order-history-card-product-image"
              />
              <div class="order-history-card-product-details">
                <div class="order-history-card-product-title">
                  {car.make} {car.model}
                </div>
                <div class="order-history-card-product-meta">
                  <div class="order-history-card-product-meta-item">
                    <span class="order-history-card-product-meta-label">
                      Color:
                    </span>
                    {car.color}
                  </div>
                  <div class="order-history-card-product-meta-item">
                    <span class="order-history-card-product-meta-label">
                      Mileage:
                    </span>
                    {car.mileage}kmpl
                  </div>
                  <div class="order-history-card-product-meta-item">
                    <span class="order-history-card-product-meta-label">
                      Type:
                    </span>
                    {car.carType}
                  </div>
                </div>
              </div>
            </>
          )}
          <div class="order-history-card-product-price">
            &#8377;{order.rentalPrice / 100}
          </div>
        </div>
      </div>
    </article>
  );
};

export default OrderHistoryCard;
