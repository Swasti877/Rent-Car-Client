import { useEffect
 } from "react";
import "./DateTimeCard.css";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { MdWatchLater } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import locationFetchAPI from "../Functions/locationFetchAPI";
import { deleteAllErrors, updateBookDetails } from "../slice/bookDetailsSlice";

function DateTimeCard() {
  const locationsArray = useSelector((state) => state.locations.locationsArray);
  const bookDetails = useSelector((state) => state.bookDetails.bookDetails);
  const errors = useSelector((state) => state.bookDetails.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    locationFetchAPI.fetchAllLocation(dispatch);
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (value === "Select") value = "";
    dispatch(updateBookDetails({ name, value }));
    dispatch(deleteAllErrors());
  };

  return (
    <>
      <div className="dateTimeCard">
        <div className="dateTimeCard-hero">
          <h2>Book car in easy steps</h2>
          <p>
            Renting a car brings you freedom, and we'll help you find the best
            car for you at a great price
          </p>
          {errors.value && (
            <p
              style={{
                color: "var(--md-sys-color-error-light)",
                fontWeight: 700,
              }}
            >
              {errors.errorsArray[0].msg}
            </p>
          )}
        </div>
        <div className="dateTimeCard-card">
          <div>
            <HiLocationMarker className="HiLocationMarker" />
            <label htmlFor="pick-up">Pick-Up</label>
            <br />
            <select
              name="pickUp"
              id="pick-up"
              onChange={handleChange}
              value={bookDetails.pickUp}
              style={{
                border: errors.value
                  ? "2px solid var(--md-sys-color-error-light)"
                  : "none",
              }}
            >
              <option value={null}>Select</option>
              {locationsArray.length !== 0 &&
                locationsArray.map((location) => {
                  return (
                    <option key={location._id} value={location._id}>
                      {location.locationName} ({location.address})
                    </option>
                  );
                })}
            </select>
            <br />
            <div className="dateTimeCard-card-date">
              <div>
                <BsFillCalendarWeekFill className="BsFillCalendarWeekFill" />
                <label htmlFor="pick-up-date">Pick-up Date</label>
                <br />
                <input
                  name="pickUpDate"
                  id="pick-up-date"
                  type="date"
                  value={bookDetails.pickUpDate}
                  onChange={handleChange}
                  style={{
                    border: errors.value
                      ? "2px solid var(--md-sys-color-error-light)"
                      : "none",
                  }}
                />
              </div>
              <div>
                <BsFillCalendarWeekFill className="BsFillCalendarWeekFill" />
                <label htmlFor="drop-off-date">Drop-off Date</label>
                <br />
                <input
                  name="dropOffDate"
                  id="drop-off-date"
                  type="date"
                  value={bookDetails.dropOffDate}
                  onChange={handleChange}
                  style={{
                    border: errors.value
                      ? "2px solid var(--md-sys-color-error-light)"
                      : "none",
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <HiLocationMarker className="HiLocationMarker" />
            <label htmlFor="drop-off">Drop-Off</label>
            <br />
            <select
              name="dropOff"
              id="drop-off"
              onChange={handleChange}
              value={bookDetails.dropOff}
              style={{
                border: errors.value
                  ? "2px solid var(--md-sys-color-error-light)"
                  : "none",
              }}
            >
              <option value={null}>Select</option>
              {locationsArray.length !== 0 &&
                locationsArray.map((location) => {
                  return (
                    <option value={location._id}>
                      {location.locationName} ({location.address})
                    </option>
                  );
                })}
            </select>
            <br />
            <div className="dateTimeCard-card-time">
              <div>
                <MdWatchLater className="MdWatchLater" />
                <label htmlFor="pick-up-time">Pick-up Time</label>
                <br />
                <input
                  type="time"
                  name="pickUpTime"
                  id="pick-up-time"
                  value={bookDetails.pickUpTime}
                  onChange={handleChange}
                  style={{
                    border: errors.value
                      ? "2px solid var(--md-sys-color-error-light)"
                      : "none",
                  }}
                />
              </div>
              <div>
                <MdWatchLater className="MdWatchLater" />
                <label htmlFor="drop-off-time">Drop-off Time</label>
                <br />
                <input
                  type="time"
                  name="dropOffTime"
                  id="drop-off-time"
                  value={bookDetails.dropOffTime}
                  onChange={handleChange}
                  style={{
                    border: errors.value
                      ? "2px solid var(--md-sys-color-error-light)"
                      : "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DateTimeCard;
