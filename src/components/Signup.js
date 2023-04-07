import "./Signup.css";
import "../css/button.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import config from "../constant.js";

export default function Signup({ props }) {
  const { API_URL } = config;
  const navigate = useNavigate();
  const [signupState, setSignupState] = useState({
    error: false,
    errorsArray: [],
  });
  const [credentails, setCredentails] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    drivingLicenseNumber: "",
  });
  const { setToogleLoginSignup } = props;

  //function's
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentails({
      ...credentails,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      drivingLicenseNumber,
    } = credentails;

    const response = await fetch(API_URL + "/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        drivingLicenseNumber,
      }),
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.token);
      navigate("/");
    } else {
      setSignupState({
        ...signupState,
        error: true,
        errorsArray: json.errors,
      });
    }
  };

  return (
    <>
      <div className="signup">
        <div className="signup-title">Signup</div>
        <form className="signup-form">
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="username"
              onChange={handleChange}
              value={credentails.email}
              name="email"
              required
            />
          </div>
          <div>
            <label htmlFor="firstName">FirstName</label>
            <input
              type="text"
              id="firstName"
              onChange={handleChange}
              value={credentails.firstName}
              name="firstName"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">LastName</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={credentails.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentails.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="number"
              id="phoneNumber"
              onChange={handleChange}
              value={credentails.phoneNumber}
              name="phoneNumber"
              required
            />
          </div>
          <div>
            <label htmlFor="drivingNo">Driving License</label>
            <input
              type="text"
              id="drivingNo"
              onChange={handleChange}
              name="drivingLicenseNumber"
              value={credentails.drivingLicenseNumber}
              required
            />
          </div>
          <button
            type="submit"
            className="primary-button"
            onClick={handleSignup}
          >
            Signup
          </button>
        </form>
        <div className="signup-alreadyAccount">
          Already have an Account{" "}
          <a
            href="javascript:void(0);"
            onClick={() => {
              setToogleLoginSignup(true);
            }}
          >
            Login
          </a>
        </div>
        {signupState.error &&
          signupState.errorsArray.map((item) => {
            return <div className="signup-error">{item.msg}</div>;
          })}
      </div>
    </>
  );
}
