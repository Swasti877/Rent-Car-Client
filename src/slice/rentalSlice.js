import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const rentalSlice = createSlice({
  name: "rentals",
  initialState: {
    currRentalData: {
      _id: "",
      carID: "",
      locationID: "",
      userID: "",
      rentalStartDate: "",
      rentalEndDate: "",
      rentalPrice: "",
      paymentStatus: "",
    },
    rentalsArray: [],
  },
  reducers: {
    addAllRentalData: (state, action) => {
      state.rentalsArray = action.payload;
    },
    updateCurrRentalData: (state, action) => {
      state.currRentalData = action.payload;
    },
    editRentalData: (state, action) => {
      const deepCopy = _.cloneDeep(state.rentalsArray);
      const index = deepCopy.findIndex(
        (rental) => rental._id === action.payload._id
      );

      if (index !== -1) {
        deepCopy[index] = action.payload;
        state.rentalsArray = deepCopy;
      }
    },
    deleteRentalData: (state, action) => {
      state.rentalsArray = state.rentalsArray.filter(
        (rental) => rental._id !== action.payload
      );
    },
  },
});

export const { addAllRentalData, updateCurrRentalData, editRentalData, deleteRentalData } =
  rentalSlice.actions;

export default rentalSlice.reducer;
