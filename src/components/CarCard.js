import "./carCard.css";
import { BsFillPersonFill } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import config from "../constant.js";

export default function CarCard({ props }) {
  const { car } = props;
  const { API_URL } = config;
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
      </div>
    </>
  );
}
