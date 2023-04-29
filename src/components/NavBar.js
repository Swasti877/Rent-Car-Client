import "./NavBar.css";
import "../css/button.css";
import logo from "../res/logo.svg";
import { useNavigate } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(-1);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/about-us") {
      setActiveTab(0);
    } else if (path === "/fleet") {
      setActiveTab(1);
    } else if (path === "/orderHistory") {
      setActiveTab(2);
    } else {
      setActiveTab(-1);
    }
  }, [location]);

  return (
    <header className="navBar">
      <div
        className="navBar-title"
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="navBar-title-logo">
          <img src={logo} alt="website-logo" />
        </div>
        <div className="navBar-title-text">Unique</div>
      </div>
      <div className="navBar-link">
        <div>
          <Link className={activeTab === 0 ? "active" : ""} to="/about-us">
            About Us
          </Link>
        </div>
        <div>
          <Link className={activeTab === 1 ? "active" : ""} to="/fleet">
            Fleet
          </Link>
        </div>
        <div>
          <Link to="#">Help</Link>
        </div>
        <div>
          <Link
            className={
              activeTab === 2 ? "navBar-History active" : "navBar-History"
            }
            to="/orderHistory"
          >
            History <FaHistory className="FaHistory" />
          </Link>
        </div>
        <div>
          {localStorage.getItem("token") === null ? (
            <Link className="primary-button" to="/login">
              Login
            </Link>
          ) : (
            <Link
              className="primary-button"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
