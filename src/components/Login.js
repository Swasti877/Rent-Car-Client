import "./Login.css";
import { useNavigate } from "react-router-dom";
import { RiLoginBoxFill } from "react-icons/ri";
import config from "../constant.js";
import { useState } from "react";

export default function Login({ props }) {
  const [loginState, setLoginState] = useState({
    error: false,
    errosArray: [],
  });
  const [credentails, setCredentails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setToogleLoginSignup } = props;
  const { API_URL } = config;

  //functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentails({
      ...credentails,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(API_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentails.email,
        password: credentails.password,
      }),
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.token);
      if (json.isAdmin) {
        navigate("/admin/car");
      } else {
        navigate("/");
      }
    } else {
      setLoginState({
        ...setLoginState,
        error: true,
        errosArray: json.errors,
      });
    }
  };

  return (
    <>
      <div className="Login">
        <div className="login-title">
          <h1>Login</h1>
        </div>
        <form>
          <div className="login-username">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="username"
              required
              name="email"
              value={credentails.email}
              onChange={handleChange}
            ></input>
          </div>
          <div className="login-password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={credentails.password}
              onChange={handleChange}
            ></input>
          </div>
          <div className="login-button">
            <button
              type="submit"
              className="primary-button"
              onClick={handleLogin}
            >
              <div className="login-button-text">
                <div>Login</div>
                <div>
                  <RiLoginBoxFill className="riLoginBoxFill" />
                </div>
              </div>
            </button>
          </div>
        </form>
        <div className="login-signupPage-link">
          Don't have an account?{" "}
          <a href="#" onClick={() => setToogleLoginSignup(false)}>
            Sign up
          </a>
        </div>
        {loginState.error &&
          loginState.errosArray.map((item) => {
            return <div className="login-error">{item.msg}</div>;
          })}
      </div>
    </>
  );
}
