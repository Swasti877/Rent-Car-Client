import img2 from "../res/hyundai_palisade.png";
import LandingPage2 from "./LandingPage2";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landingPage">
      <div className="landingPage1">
        <div className="landingPage1-desc">
          <div className="headline">
            <h1>Drive the Best with Our Premium Car Rental Service</h1>
          </div>
          <div className="subheadline">
            Discover a seamless and luxurious car rental experience with our
            app.
          </div>
          <div>
            <button
              className="primary-button"
              onClick={() => {
                navigate("/fleet");
              }}
            >
              Book Now
            </button>
          </div>
        </div>
        <div className="landingPage1-img">
          <img src={img2} alt="car" />
          <div className="landingPage1-img-map" />
        </div>
      </div>
      {/* <LandingPage2 /> */}
    </div>
  );
}

export default LandingPage;
