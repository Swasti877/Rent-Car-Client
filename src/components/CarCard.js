import "./carCard.css";
import { BsFillPersonFill } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import config from "../constant.js";
import topFunction from "../Functions/scrollToPage.js";
import {
  addToCart,
  resetBookDetails,
  updateErrors,
} from "../slice/bookDetailsSlice.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DateAndTime from "../Functions/DateAndTime";

export default function CarCard({ props }) {
  const { car } = props;
  const { API_URL } = config;
  const bookDetails = useSelector((state) => state.bookDetails.bookDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBook = (e, car) => {
    if (
      bookDetails.pickUp === "" ||
      bookDetails.dropOff === "" ||
      bookDetails.pickUpDate === "" ||
      bookDetails.dropOffDate === "" ||
      bookDetails.pickUpTime === "" ||
      bookDetails.dropOffTime === ""
    ) {
      dispatch(updateErrors([{ msg: "Enter All Field Data" }]));
      topFunction();
    } else {
      const obj = { bookDetails, car };
      if (
        DateAndTime.isCurrDateLess(bookDetails.pickUpDate) &&
        DateAndTime.isCurrDateLess(bookDetails.dropOffDate)
      ) {
        // checking if the pick Date and Drop Off Date are eqaul or not
        if (bookDetails.pickUpDate === bookDetails.dropOffDate) {
          const currDate = new Date();
          const currTime = currDate.getHours() + ":" + currDate.getMinutes();

          if (
            DateAndTime.isTimeLess(currTime, bookDetails.pickUpTime) &&
            DateAndTime.isTimeLess(
              bookDetails.pickUpTime,
              bookDetails.dropOffTime
            )
          ) {
            // Passed
            dispatch(addToCart(obj));
            dispatch(resetBookDetails());
            navigate("/orderHistory");
          } else {
            console.log("Time Error");
            dispatch(
              updateErrors([{ msg: "Time Diff Should be at least 2 Hour" }])
            );
          }
        } else {
          // Passed
          dispatch(addToCart(obj));
          dispatch(resetBookDetails());
          navigate("/orderHistory");
        }
      } else if(bookDetails.pickUpDate < bookDetails.dropOffDate) {
        // Passed
        dispatch(addToCart(obj));
        dispatch(resetBookDetails());
        navigate("/orderHistory");
      } else {
        dispatch(updateErrors([{ msg: "Date Are not Valid" }]));
      }
    }
  };

  return (
    <>
      <div className="carCard">
        <div className="carCard-title">
          {car.make} - {car.model}
        </div>
        <div className="carCard-carType">{car.carType}</div>
        <div className="carCard-img">
          <img src={API_URL + `/car/fetchImage/${car.img}`} alt="car" />
        </div>
        <div className="cardCard-desc">
          <div className="cardCard-desc-capacity">
            <BsFillPersonFill className="bsFillPersonFill" />2
          </div>
          <div className="cardCard-desc-transmission">
            <GiGearStickPattern className="giGearStickPattern" />
            Manual
          </div>
          <div className="cardCard-desc-price">
            <span>${car.price_per_day}</span>/day
          </div>
        </div>
        <div className="book-popup">
          <button
            className="primary-button"
            onClick={(e) => handleBook(e, car)}
          >
            Book
          </button>
        </div>
      </div>
    </>
  );
}
