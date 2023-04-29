import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrRentalData, editRentalData } from "../slice/rentalSlice.js";
import config from "../constant.js";

export default function AddRentalCard({ props }) {
  const { API_URL } = config;
  const currRentalData = useSelector((state) => state.rentals.currRentalData);
  const { setIsModalOpen } = props;
  const [input, setInput] = useState(currRentalData);
  const dispatch = useDispatch();
  useEffect(() => {
    setInput(currRentalData);
  }, [currRentalData]);

  //function
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleEditRental = async (e) => {
    e.preventDefault();
    const response = await fetch(API_URL + "/rental/updateRental", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (response.status === 200) {
      dispatch(editRentalData(input));
      dispatch(
        updateCurrRentalData({
          _id: "",
          carID: "",
          locationID: "",
          userID: "",
          rentalStartDate: "",
          rentalEndDate: "",
          rentalPrice: "",
          paymentStatus: "",
        })
      );

      setIsModalOpen(false);
    } else {
      alert("Invalid Data!");
    }
  };

  return (
    <div className="addLocationCard">
      <form>
        <div>
          <AiFillCloseCircle
          className="AiFillCloseCircle"
            style={{ width: "20px", height: "20px" }}
            onClick={() => {
              setIsModalOpen(false);
            }}
          />
        </div>
        {/* <div>
          <label htmlFor="carID">Car ID</label>
          <input className="input" type="text" id="carID"></input>
        </div>
        <div>
          <label htmlFor="locationID">Location ID</label>
          <input className="input" type="text" id="locationID"></input>
        </div>
        <div>
          <label htmlFor="userID">User ID</label>
          <input className="input" type="text" id="userID"></input>
        </div> */}
        <div>
          <label htmlFor="rentalStartDate">Rental Start Date</label>
          <input
            className="input"
            type="date"
            id="rentalStartDate"
            name="rentalStartDate"
            value={input.rentalStartDate}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="rentalEndDate">Rental End Date</label>
          <input
            className="input"
            type="date"
            id="rentalEndDate"
            value={input.rentalEndDate}
            name="rentalEndDate"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="rentalPrice">Rental Price</label>
          <input
            className="input"
            type="number"
            id="rentalPrice"
            value={input.rentalPrice}
            name="rentalPrice"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="paymentStatus">Payment Status</label>
          <input
            className="input"
            type="text"
            id="paymentStatus"
            onChange={handleChange}
            name="paymentStatus"
            value={input.paymentStatus}
          ></input>
        </div>
        <div>
          <button className="primary-button" onClick={handleEditRental}>
            Edit Rental
          </button>
        </div>
      </form>
    </div>
  );
}
