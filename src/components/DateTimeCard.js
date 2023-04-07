import "./DateTimeCard.css";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { MdWatchLater } from "react-icons/md";

function DateTimeCard() {
  return (
    <>
      <div className="dateTimeCard">
        <div className="dateTimeCard-hero">
          <h2>Book car in easy steps</h2>
          <p>
            Renting a car brings you freedom, and we'll help you find the best
            car for you at a great price
          </p>
        </div>
        <div className="dateTimeCard-card">
          <div>
            <HiLocationMarker className="HiLocationMarker" />
            <label for="pick-up">Pick-Up</label>
            <br />
            <select name="pick-up" id="pick-up">
              <option value="mahesana">Mahesana</option>
              <option value="ahmedabad">Ahmedabad</option>
              <option value="gandhinagar">Gandhinagar</option>
            </select>
            <br />
            <div className="dateTimeCard-card-date">
              <div>
                <BsFillCalendarWeekFill className="BsFillCalendarWeekFill" />
                <label for="pick-up-date">Pick-up Date</label>
                <br />
                <input name="pick-up-date" id="pick-up-date" type="date" />
              </div>
              <div>
                <BsFillCalendarWeekFill className="BsFillCalendarWeekFill" />
                <label for="drop-off-date">Drop-off Date</label>
                <br />
                <input name="drop-off-date" id="drop-off-date" type="date" />
              </div>
            </div>
          </div>
          <div>
            <HiLocationMarker className="HiLocationMarker" />
            <label for="drop-off">Drop-Off</label>
            <br />
            <select name="drop-off" id="drop-off">
              <option value="mahesana">Mahesana</option>
              <option value="ahmedabad">Ahmedabad</option>
              <option value="gandhinagar">Gandhinagar</option>
            </select>
            <br />
            <div className="dateTimeCard-card-time">
              <div>
                <MdWatchLater className="MdWatchLater" />
                <label for="pick-up-time">Pick-up Time</label>
                <br />
                <input type="time" name="pick-up-time" id="pick-up-time" />
              </div>
              <div>
                <MdWatchLater className="MdWatchLater" />
                <label for="drop-off-time">Drop-off Time</label>
                <br />
                <input type="time" name="drop-off-time" id="drop-off-time" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DateTimeCard;
