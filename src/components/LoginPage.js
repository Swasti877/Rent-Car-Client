import "./LoginPage.css";
import car from "../res/hyundai_palisade.png";
import Login from "./Login.js";
import Signup from './Signup.js';
import { useState } from "react";

export default function LoginPage() {
  const [toogleLoginSignup, setToogleLoginSignup] = useState(true);

  return (
    <>
      <div className="loginPage">
        <div className="loginPage-img">
          <div />
          <img src={car} alt="car" />
        </div>
        <div className="loginPage-form">
          {toogleLoginSignup ? <Login props={{setToogleLoginSignup}}/> : <Signup props={{setToogleLoginSignup}}/>}
        </div>
      </div>
    </>
  );
}
