import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slice/counterSlice.js";
import carsReducer from "../slice/carsSlice.js";
import locationReducer from "../slice/locationSlice.js";
import rentalReducer from "../slice/rentalSlice.js";
import bookDetailsReducer from "../slice/bookDetailsSlice.js";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    cars: carsReducer,
    locations: locationReducer,
    rentals: rentalReducer,
    bookDetails: bookDetailsReducer,
  },
});

export default store;
