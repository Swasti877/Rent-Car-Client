import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  editALocation,
  updateCurrLocationValue,
  addALocation,
} from "../slice/locationSlice";
import config from "../constant";

export default function AddLocationCard({ props }) {
  const dispatch = useDispatch();
  const [error, setError] = useState({ value: false, errArray: [] });
  const { API_URL } = config;
  const { setIsModalOpen } = props;
  const currLocationValue = useSelector(
    (state) => state.locations.currLocationValue
  );
  const [input, setInput] = useState(currLocationValue);

  useEffect(() => {
    setInput(currLocationValue);
  }, [currLocationValue]);

  //functions
  const handleChange = (e) => {
    setError({
      ...error,
      value: false,
    });
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleAddLocation = async (e) => {
    e.preventDefault();
    if (input._id === "") {
      //Add Location function
      const response = await fetch(API_URL + "/location/addLocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await response.json();
      if (response.status === 200) {
        dispatch(addALocation({ ...input, _id: data._id }));
        dispatch(
          updateCurrLocationValue({
            _id: "",
            address: "",
            locationName: "",
          })
        );
        setIsModalOpen(false);
      } else {
        setError({ ...error, value: true, errArray: data.errors });
      }
    } else {
      const response = await fetch(API_URL + "/location/updateLocation", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (response.status === 200) {
        dispatch(editALocation(input));
        dispatch(
          updateCurrLocationValue({
            _id: "",
            address: "",
            locationName: "",
          })
        );
        setIsModalOpen(false);
      } else {
        alert("Something went wrong!");
      }
    }
  };

  const handleLocationModalCloseButton = () => {
    dispatch(
      updateCurrLocationValue({
        _id: "",
        address: "",
        locationName: "",
      })
    );
    setIsModalOpen(false);
  };

  return (
    <div className="addLocationCard">
      <form>
        <div>
          <AiFillCloseCircle
            style={{ width: "20px", height: "20px" }}
            onClick={handleLocationModalCloseButton}
            className="AiFillCloseCircle"
          />
        </div>
        <div>
          <label htmlFor="locationName">Location (City)</label>
          <input
            className="input"
            type="text"
            id="locationName"
            onChange={handleChange}
            name="locationName"
            value={input.locationName}
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address (Full Address)</label>
          <input
            className="input"
            type="text"
            id="address"
            onChange={handleChange}
            name="address"
            value={input.address}
          ></input>
        </div>
        {error.value &&
          error.errArray.map((err) => (
            <div style={{ color: "red" }}>{err.msg}</div>
          ))}
        <div>
          <button onClick={handleAddLocation} className="primary-button">
            Add Location
          </button>
        </div>
      </form>
    </div>
  );
}
