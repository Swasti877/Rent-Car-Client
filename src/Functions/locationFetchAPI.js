import config from "../constant.js";
import { addAllLocations } from "../slice/locationSlice.js";

const { API_URL } = config;

const locationFetchAPI = {
  fetchAllLocation: async (dispatch) => {
    const response = await fetch(`${API_URL}/location/fetchAllLocations`);
    const data = await response.json();
    dispatch(addAllLocations(data.locationsArray));
  },
};

export default locationFetchAPI;
