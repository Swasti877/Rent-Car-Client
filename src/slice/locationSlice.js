import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const locationSlice = createSlice({
  name: "locations",
  initialState: {
    currLocationValue: {
      _id: "",
      address: "",
      locationName: "",
    },
    locationsArray: [],
  },
  reducers: {
    addAllLocations: (state, action) => {
      state.locationsArray = action.payload;
    },
    updateCurrLocationValue: (state, action) => {
      state.currLocationValue = action.payload;
    },
    editALocation: (state, action) => {
      const deepCopy = _.cloneDeep(state.locationsArray);
      const index = deepCopy.findIndex(
        (item) => item._id === action.payload._id
      );

      if (index !== -1) {
        deepCopy[index] = action.payload;
        state.locationsArray = deepCopy;
      }
    },
    addALocation: (state, action) => {
      state.locationsArray = [...state.locationsArray, action.payload];
    },
    deleteALocation: (state, action) => {
      state.locationsArray = state.locationsArray.filter(
        (location) => location._id !== action.payload
      );
    },
  },
});

export const {
  addAllLocations,
  updateCurrLocationValue,
  editALocation,
  addALocation,
  deleteALocation,
} = locationSlice.actions;
export default locationSlice.reducer;
