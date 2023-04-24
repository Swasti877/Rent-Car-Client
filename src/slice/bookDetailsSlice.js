import { createSlice } from "@reduxjs/toolkit";

const bookDetailsSlice = createSlice({
  name: "bookDetails",
  initialState: {
    bookDetails: {
      pickUp: "",
      dropOff: "",
      pickUpDate: "",
      dropOffDate: "",
      pickUpTime: "",
      dropOffTime: "",
    },
    errors: {
      value: false,
      errorsArray: [],
    },
    cartCar: {},
  },
  reducers: {
    resetBookDetails: (state) => {
      state.bookDetails = {
        pickUp: "",
        dropOff: "",
        pickUpDate: "",
        dropOffDate: "",
        pickUpTime: "",
        dropOffTime: "",
      };
    },
    updateBookDetails: (state, action) => {
      state.bookDetails = {
        ...state.bookDetails,
        [action.payload.name]: action.payload.value,
      };
    },
    updateErrors: (state, action) => {
      state.errors = {
        ...state.errors,
        value: true,
        errorsArray: action.payload,
      };
    },
    deleteAllErrors: (state) => {
      state.errors = {
        ...state.errors,
        value: false,
        errorsArray: [],
      };
    },
    addToCart: (state, action) => {
      state.cartCar = action.payload;
    },
  },
});

export const {
  updateBookDetails,
  updateErrors,
  deleteAllErrors,
  addToCart,
  resetBookDetails,
} = bookDetailsSlice.actions;
export default bookDetailsSlice.reducer;
