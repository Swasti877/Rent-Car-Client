import "./AdminLocationDash.css";
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllLocations,
  updateCurrLocationValue,
  deleteALocation,
} from "../slice/locationSlice";
import { useEffect } from "react";
import config from "../constant.js";

export default function AdminLocationDash({ props }) {
  const { API_URL } = config;
  const { setIsModalOpen } = props;
  const dispatch = useDispatch();
  const locationsArray = useSelector((state) => state.locations.locationsArray);

  useEffect(() => {
    (async () => {
      const response = await fetch(API_URL + "/location/fetchAllLocations");
      if (response.status === 200) {
        const data = await response.json();
        dispatch(addAllLocations(data.locationsArray));
      }
    })();
  }, []);

  //functions
  const handleLocationEdit = (e, location) => {
    setIsModalOpen(true);
    dispatch(updateCurrLocationValue(location));
  };

  const handleDeleteLocation = async (e, location) => {
    const response = await fetch(API_URL + "/location/deleteLocation", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: location._id }),
    });

    if (response.status === 200) {
      dispatch(deleteALocation(location._id));
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="adminLocationDash">
      <div className="adminLocationDash-title">
        <h2>Admin Location Dashboard</h2>
      </div>
      <div className="adminLocationDash-button">
        <button className="primary-button" onClick={() => setIsModalOpen(true)}>
          Add Location
        </button>
      </div>
      <div className="adminLocationDash-desc">
        <div className="adminLocationDash-desc-table">
          <table cellSpacing={0}>
            <tr>
              <th>Location Name</th>
              <th>Address</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {locationsArray.map((location) => {
              return (
                <tr key={location._id}>
                  <td>{location.locationName}</td>
                  <td>{location.address}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={(e) => handleLocationEdit(e, location)}
                  >
                    <RiEditBoxFill style={{ width: "30px", height: "30px" }} />
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      handleDeleteLocation(e, location);
                    }}
                  >
                    <MdDelete style={{ width: "30px", height: "30px" }} />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        <div className="adminLocationDash-desc-form"></div>
      </div>
    </div>
  );
}
