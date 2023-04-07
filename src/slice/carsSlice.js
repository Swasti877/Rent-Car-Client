import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    currCarData: {
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
    },
    carsArray: [],
    groupByCarType: [],
    groupByCarMakeType: [],
  },

  reducers: {
    addAllCars: (state, action) => {
      state.carsArray = action.payload;
    },
    addCarType: (state, action) => {
      state.groupByCarType = action.payload;
    },
    addGroupByCarMake: (state, action) => {
      state.groupByCarMakeType = action.payload;
    },
    currCarDataUpdate: (state, action) => {
      state.currCarData = action.payload;
    },
    editACar: (state, action) => {
      //Creating a Deep copy of array
      const deepCopy = _.cloneDeep(state.carsArray);
      const index = deepCopy.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        deepCopy[index] = action.payload;

        state.carsArray = deepCopy;
      }
    },
    addACar: (state, action) => {
      state.carsArray = [...state.carsArray, action.payload];
    },
    deleteACar: (state, action) => {
      state.carsArray = state.carsArray.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const {
  addAllCars,
  currCarDataUpdate,
  editACar,
  addACar,
  deleteACar,
  addCarType,
  addGroupByCarMake,
} = carsSlice.actions;
export default carsSlice.reducer;
