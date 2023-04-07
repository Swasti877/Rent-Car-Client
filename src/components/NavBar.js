import "./NavBar.css";
import "../css/button.css";
import logo from "../res/logo.svg";
import { useNavigate } from "react-router-dom";

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
          <a href="#">About Us</a>
        </div>
        <div>
          <a href="/fleet">Cars</a>
        </div>
        <div>
          <a href="#">Help</a>
        </div>
        <div>
          <button className="primary-button" onClick={()=>{navigate('/login')}}>Login</button>
        </div>
      </div>
    </header>
  );
}
