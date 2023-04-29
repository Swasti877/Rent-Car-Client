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
    <article>
      <section className="orderHistory-order-card">
        <div className="orderHistory-order-card-title">
          Order ID: {order._id}
        </div>
        <div className="orderHistory-order-card-date">
          <span>PickUp date:</span> &nbsp;<span>{order.rentalStartDate}</span>
        </div>
        {car && (
          <div className="orderHistory-order-card-product">
            <figure>
              <img src={API_URL + `/car/fetchImage/${car.img}`} alt="car" />
            </figure>
            <div className="orderHistory-order-card-product-desc">
              <div className="orderHistory-order-card-product-desc-title">
                {car.make + " " + car.model}
              </div>
              <div>
                <span>{car.color}</span>
                <span>{car.mileage + "kmpl"}</span>
                <span>{car.carType}</span>
              </div>
            </div>
            <div className="orderHistory-order-card-product-price">
              <div>&#8377;{order.rentalPrice}</div>
              <div>{car.carType}</div>
            </div>
          </div>
        )}
      </section>
    </article>
  );
};

export default OrderHistoryCard;
