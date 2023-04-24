import "./NavBar.css";
import "../css/button.css";
import logo from "../res/logo.svg";
import { useNavigate } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

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
          <Link to="#">About Us</Link>
        </div>
        <div>
          <Link to="/fleet">Fleet</Link>
        </div>
        <div>
          <Link to="#">Help</Link>
        </div>
        <div>
          <Link to="/orderHistory" className="navBar-History">
            History <FaHistory className="FaHistory"/>
          </Link>
        </div>
        <div>
          {localStorage.getItem("token") === null ? (
            <Link
              className="primary-button"
              to='/login'
            >
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
