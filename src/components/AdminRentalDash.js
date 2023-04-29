import "./AdminRentalDash.css";
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import {
  addAllRentalData,
  updateCurrRentalData,
  deleteRentalData,
} from "../slice/rentalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import config from "../constant.js";

export default function AdminRentalDash({ props }) {
  const rentalsArray = useSelector((state) => state.rentals.rentalsArray);
  const { API_URL } = config;
  const { setIsModalOpen } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await fetch(API_URL + "/rental/fetchAllRentals");
      if (response.status === 200) {
        const data = await response.json();
        dispatch(addAllRentalData(data.rentalsArray));
      }
    })();
  }, []);

  //function
  const handleEditRental = (e, rental) => {
    dispatch(updateCurrRentalData(rental));
    setIsModalOpen(true);
  };

  const handleRentalDelete = async (e, rental) => {
    const response = await fetch(API_URL + "/rental/deleteRental", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: rental._id }),
    });

    if (response.status === 200) {
      dispatch(deleteRentalData(rental._id));
    }
  };

  console.log(rentalsArray);

  return (
    <div className="adminRentalDash">
      <div className="adminRentalDash-title">
        <h2>Admin Rental Dashboard</h2>
      </div>
      <div className="adminRentalDash-desc">
        <div className="adminRentalDash-desc-table">
          <table cellSpacing={0}>
            <tr>
              <th>Car ID</th>
              <th>PickUp Location ID</th>
              <th>DropOff Location ID</th>
              <th>User ID</th>
              <th>Rental Start Date</th>
              <th>Rental End Date</th>
              <th>Rental Price</th>
              <th>Transaction ID</th>
              <th>Payment Status</th>
              <th>Charge Extra</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {rentalsArray.map((rental) => {
              return (
                <tr key={rental._id}>
                  <td>{rental.carID}</td>
                  <td>{rental.locationIDPickUp}</td>
                  <td>{rental.locationIDDropOff}</td>
                  <td>{rental.userID}</td>
                  <td>{rental.rentalStartDate}</td>
                  <td>{rental.rentalEndDate}</td>
                  <td>{rental.rentalPrice}</td>
                  <td>{rental.transactionID}</td>
                  <td>
                    <div
                      className={
                        rental.paymentStatus
                          ? "paid order-history-card-payment-status"
                          : "unpaid order-history-card-payment-status"
                      }
                      style={{ textAlign: "center" }}
                    >
                      {rental.paymentStatus ? "Paid" : "Unpaid"}
                    </div>
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={(e) => handleEditRental(e, rental)}
                  >
                    <RiEditBoxFill style={{ width: "30px", height: "30px" }} />
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      handleRentalDelete(e, rental);
                    }}
                  >
                    <MdDelete style={{ width: "30px", height: "30px" }} />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        <div className="adminRentalDash-desc-form"></div>
      </div>
    </div>
  );
}
