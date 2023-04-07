import config from "../constant";
import { addAllCars, deleteACar, addCarType, addGroupByCarMake } from "../slice/carsSlice";

const { API_URL } = config;

const carAPIFetchFun = {
  fetchAll: async (dispatch) => {
    const response = await fetch(API_URL + "/car/fetchAllCars");
    if (response.status === 200) {
      const data = await response.json();
      dispatch(addAllCars(data.carList));
    }
  },
  deleteCar: async (dispatch, car) => {
    const response = await fetch(API_URL + "/car/deleteCar", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: car._id }),
    });

    if (response.status === 200) {
      dispatch(deleteACar(car._id));
    } else {
      alert("Something Went Wrong");
    }
  },
  groupbyCarType: async (dispatch) => {
    const responseCarType = await fetch(API_URL + "/car/groupbyCarType");
    if (responseCarType.status === 200) {
      const data = await responseCarType.json();
      dispatch(addCarType(data.data));
    }
  },
  groupbyCarMake: async (dispatch) => {
    const responseCarMakeType = await fetch(API_URL + "/car/groupbyCarMake");
    if (responseCarMakeType.status === 200) {
      const data = await responseCarMakeType.json();
      dispatch(addGroupByCarMake(data.data));
    }
  },
  fetchAvialiableCars: async (dispatch) => {
    const response = await fetch(API_URL + "/car/fetchAvialiableCars");
    if (response.status === 200) {
      const data = await response.json();
      dispatch(addAllCars(data.carList));
    }
  },
};

export default carAPIFetchFun;
