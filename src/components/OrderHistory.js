import "./OrderHistory.css";
import OrderHistoryCard from "./OrderHistoryCard";
import { FcNfcSign } from "react-icons/fc";
import { useSelector } from "react-redux";
import constant from "../constant.js";
import { useEffect, useState } from "react";
import DateAndTime from "../Functions/DateAndTime";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const OrderHistory = () => {
  const cartCar = useSelector((state) => state.bookDetails.cartCar);
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);
  const { API_URL } = constant;
  const [locationName, setLocationName] = useState({
    pickUp: "",
    dropOff: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (Object.keys(cartCar).length !== 0) {
        let response = await fetch(
          API_URL + `/location/fetchName/${cartCar.bookDetails.pickUp}`
        );
        const data1 = await response.json();
        response = await fetch(
          API_URL + `/location/fetchName/${cartCar.bookDetails.dropOff}`
        );
        const data = await response.json();
        setLocationName({
          ...locationName,
          dropOff: data.locationName,
          pickUp: data1.locationName,
        });
      }
    })();
  }, [cartCar]);

  useEffect(() => {
    // fetch the OrderHistory
    (async () => {
      const authToken = localStorage.getItem("token");
      if(authToken){
        const response = await fetch(API_URL + "/rental/fetchOrderHistory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({authToken})
        });

        const data = await response.json();
        if(response.status === 200) {
          setOrderHistory(data.orderHistory);
        }
      }
    })();

    // Getting Payemnt status from URL Parameter
    const paymentIntentStatus = new URLSearchParams(window.location.search).get(
      "paymentIntentStatus"
    );

    if (!paymentIntentStatus) {
      return;
    }

    if (paymentIntentStatus === "succeeded") {
      setAlertMsg("Payment Succeed");
      setAlertIsOpen(true);
      navigate("/orderHistory");
    }
  }, []);

  return (
    <>
      <Alert
        type="success"
        message={alertMsg}
        isOpen={alertIsOpen}
        setIsOpen={setAlertIsOpen}
      />
      <div className="orderHistory">
        <div className="orderHistory-orders">
          {orderHistory.length !== 0 && orderHistory.map((order)=>{
            return(
              <OrderHistoryCard key={order._id} order={order}/>
            )
          })}
        </div>
        <div className="orderHistory-payPage">
          <div className="orderHistory-payPage-title">Cart Item:</div>
          <div className="orderHistory-payPage-product">
            {Object.keys(cartCar).length !== 0 && (
              <>
                <figure>
                  <img
                    src={API_URL + `/car/fetchImage/${cartCar.car.img}`}
                    width="100%"
                    alt="car"
                  />
                  <figcaption>
                    {cartCar.car.make + " " + cartCar.car.model}
                  </figcaption>
                </figure>
                <table width="100%">
                  <tr>
                    <td>PickUp:</td>
                    <td>{locationName.pickUp}</td>
                  </tr>
                  <tr>
                    <td>Dropoff:</td>
                    <td>{locationName.dropOff}</td>
                  </tr>
                  <tr>
                    <td>Pickup Date:</td>
                    <td>{cartCar.bookDetails.pickUpDate}</td>
                  </tr>
                  <tr>
                    <td>Dropoff Date:</td>
                    <td>{cartCar.bookDetails.dropOffDate}</td>
                  </tr>
                  <tr>
                    <td>Pickup Time:</td>
                    <td>{cartCar.bookDetails.pickUpTime}</td>
                  </tr>
                  <tr>
                    <td>Dropoff Time:</td>
                    <td>{cartCar.bookDetails.dropOffTime}</td>
                  </tr>
                  <tr>
                    <td>Total Price(Price xDays)</td>
                    <td style={{ fontWeight: 700 }}>
                      &#8377;{cartCar.car.price_per_day} x{" "}
                      {DateAndTime.diffrenceInDays(
                        cartCar.bookDetails.pickUpDate,
                        cartCar.bookDetails.dropOffDate
                      )}
                    </td>
                  </tr>
                </table>
                <div className="orderHistory-payPage-button">
                  <button
                    className="primary-button"
                    onClick={() => {
                      if (localStorage.getItem("token")) {
                        navigate("/pay");
                      } else {
                        alert("Login with Your account First");
                      }
                    }}
                  >
                    PAY &#8377;
                    {DateAndTime.diffrenceInDays(
                      cartCar.bookDetails.pickUpDate,
                      cartCar.bookDetails.dropOffDate
                    ) * cartCar.car.price_per_day}
                    &nbsp;
                    <FcNfcSign
                      style={{ color: "red", width: "30px", height: "30px" }}
                    />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
