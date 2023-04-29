import "./AddCarCard.css";
import "../css/input.css";
import "../css/button.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import config from "../constant.js";
import { editACar, currCarDataUpdate, addACar } from "../slice/carsSlice";

export default function AddCarCard({ props }) {
  const { API_URL } = config;
  const { setIsModalOpen } = props;
  const dispatch = useDispatch();
  const currCarData = useSelector((state) => state.cars.currCarData);
  const [input, setInput] = useState(currCarData);
  const [error, setError] = useState({ value: false, errArray: [] });

  useEffect(() => {
    setInput(currCarData);
  }, [currCarData]);

  //function
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

  const handlePhoto = (e) => {
    setInput({
      ...input,
      img: e.target.files[0],
    });
  };

  const handleAddOrEditCar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("make", input.make);
    formData.append("model", input.model);
    formData.append("year", input.year);
    formData.append("color", input.color);
    formData.append("mileage", input.mileage);
    formData.append("price_per_day", input.price_per_day);
    formData.append("status", input.status);
    formData.append("carType", input.carType);
    formData.append("photo", input.img);
    if (input._id === "") {
      //New Car is Added
      const response = await fetch(API_URL + "/car/addCar", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.status === 200) {
        dispatch(addACar({ ...input, img: data.img, _id: data._id }));
        dispatch(
          currCarDataUpdate({
            _id: "",
            make: "",
            model: "",
            year: "",
            color: "",
            mileage: "",
            price_per_day: "",
            status: "",
            carType: "",
            img: "",
          })
        );
        setIsModalOpen(false);
      } else {
        setError({
          ...error,
          value: true,
          errArray: data.errors,
        });
      }
    } else {
      // Edit Car is Performed
      const response = await fetch(API_URL + "/car/updateCar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await response.json();
      if (response.status === 200) {
        
        dispatch(editACar(input))
        dispatch(
          currCarDataUpdate({
            _id: "",
            make: "",
            model: "",
            year: "",
            color: "",
            mileage: "",
            price_per_day: "",
            status: "",
            carType: "",
            img: "",
          })
        );
        setIsModalOpen(false);
      } else {
        setError({
          ...error,
          value: true,
          errArray: data.errors,
        });
      }
    }
  };

  const handleCarModalCloseButton = () => {
    dispatch(
      currCarDataUpdate({
        _id: "",
        make: "",
        model: "",
        year: "",
        color: "",
        mileage: "",
        price_per_day: "",
        status: "",
        carType: "",
        img: "",
      })
    );
    setIsModalOpen(false);
  };

  return (
    <div className="addCarCard">
        <div>
          <AiFillCloseCircle
          className="AiFillCloseCircle"
            style={{ width: "20px", height: "20px" }}
            onClick={handleCarModalCloseButton}
          />
        </div>
      <form encType="multipart/form-data" onSubmit={handleAddOrEditCar}>
        <div>
          <label htmlFor="make">Make</label>
          <input
            className="input"
            type="text"
            id="make"
            value={input.make}
            name="make"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="model">Model</label>
          <input
            className="input"
            type="text"
            id="model"
            value={input.model}
            name="model"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="year">Year</label>
          <input
            className="input"
            type="number"
            id="year"
            value={input.year}
            name="year"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="color">Color</label>
          <input
            className="input"
            type="text"
            id="color"
            value={input.color}
            name="color"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="mileage">Mileage</label>
          <input
            className="input"
            type="number"
            id="mileage"
            value={input.mileage}
            name="mileage"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pricePerDay">Price Per Day</label>
          <input
            className="input"
            type="number"
            id="pricePerDay"
            value={input.price_per_day}
            name="price_per_day"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="carType">Car Type</label>
          <input
            className="input"
            type="text"
            id="carType"
            value={input.carType}
            name="carType"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <label htmlFor="status_true">True</label>
          <input
            className="input"
            type="radio"
            value="true"
            name="status"
            id="status_true"
            onChange={handleChange}
          />
          <label htmlFor="status_false">False</label>
          <input
            className="input"
            type="radio"
            value="false"
            name="status"
            id="status_false"
            onChange={handleChange}
          />
        </div>
        <div className="img_upload">
          <label htmlFor="img">Add Image</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            className="input"
            name="img"
            id="img"
            onChange={handlePhoto}
          />
        </div>
        {error.value &&
          error.errArray.map((item) => {
            return <div style={{ color: "red" }}>{item.msg}</div>;
          })}

        <div>
          <button input="submit" value="Submit" className="primary-button">
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
}
