import "./AdminCarDash.css";
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import config from "../constant.js";
import { currCarDataUpdate } from "../slice/carsSlice";
import { TiTick } from "react-icons/ti";
import { AiFillCloseCircle } from "react-icons/ai";
import { useEffect } from "react";
import carAPIFetchFun from "../Functions/carAPIFetch";
import topFunction from "../Functions/scrollToPage";

const AdminCarDash = ({ props }) => {
  const { API_URL } = config;
  const dispatch = useDispatch();
  const carsArray = useSelector((state) => state.cars.carsArray);
  const { setIsModalOpen } = props;

  useEffect(() => {
    carAPIFetchFun.fetchAll(dispatch);
  }, []);

  //functions
  const handleCarEdit = (e, car) => {
    setIsModalOpen(true);
    dispatch(currCarDataUpdate(car));
    topFunction();
  };

  const handleAddCar = () => {
    setIsModalOpen(true);
  };

  const handleCarDelete = async (e, car) => {
    carAPIFetchFun.deleteCar(dispatch, car);
  };

  return (
    <div className="adminCarDash">
      <div className="adminCarDash-title">
        <h2>AdminCarDash</h2>
      </div>
      <div className="adminCarDash-button">
        <button className="primary-button" onClick={handleAddCar}>
          Add Car
        </button>
      </div>
      <div className="adminCarDash-desc">
        <div className="adminCarDash-desc-table">
          <table cellSpacing={0}>
            <tr>
              <th>Image</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Color</th>
              <th>Mileage</th>
              <th>Price Per Day</th>
              <th>Car Type</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {carsArray.map((car) => {
              return (
                <tr key={car._id}>
                  <td>
                    <img
                      src={API_URL + `/car/fetchImage/${car.img}`}
                      alt="car"
                    />
                  </td>
                  <td>{car.make}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td>{car.color}</td>
                  <td>{car.mileage}</td>
                  <td>{car.price_per_day}</td>
                  <td>{car.carType}</td>
                  <td>{car.status ? <TiTick /> : <AiFillCloseCircle />}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={(e) => handleCarEdit(e, car)}
                  >
                    <RiEditBoxFill style={{ width: "30px", height: "30px" }} />
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={(e) => handleCarDelete(e, car)}
                  >
                    <MdDelete style={{ width: "30px", height: "30px" }} />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        <div className="adminCarDash-desc-form"></div>
      </div>
    </div>
  );
};

export default AdminCarDash;
