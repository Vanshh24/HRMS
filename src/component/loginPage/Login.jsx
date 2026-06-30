import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let [loginData, setLoginData] = useState({});
  let [error, setError] = useState({});
  let handleChange = (e) => {
    let { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  let navigate = useNavigate();
  let formError = {};
  let handleValidate = (loginData) => {
    if (!loginData.email) {
      formError.email = "Email is required.";
    } else if (!loginData.password) {
      formError.password = "Password is required";
    } else if (!loginData.confirmPassword) {
      formError.confirmPassword = "Confirm password is required.";
    } else {
      axios
        .post("http://localhost:5000/api/login", loginData)
        .then((response) => {
          let { success, message, token } = response.data;
          if (success) {
            alert(message);
            localStorage.setItem("auth_token: ", token);
            navigate("/admin");
          }
        })
        .catch((err) => {
          let { success, message } = err.response.data;
          if (!success) {
            alert(message);
          }
        });
    }
    setError(formError);
  };
  let handleClick = () => {
    handleValidate(loginData);
    console.log(loginData);
  };

  console.log(error.email);
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="..."></div>
      <div className="...">
        <div className="card w-100 h-150 border-1 border-black-200 m-auto rounded-md shadow-md/50">
          <h1 className="card-header text-center font-bold text-xl">Login</h1>
          <div className="card-body w-80 h-100 m-auto mt-8">
            <div className="mb-4">
              <label htmlFor="">Email</label>
              <input
                className="w-full border-1 border-black-500 h-8 rounded-md"
                type="email"
                name="email"
                onChange={handleChange}
              />
              <p>{error.email}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="">Password</label>
              <input
                className="w-full border-1 border-black-500 h-8 rounded-md"
                type="password"
                onChange={handleChange}
                name="password"
              />
              <p>{error.password}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="">Confirm Password</label>
              <input
                className="w-full border-1 border-black-500 h-8 rounded-md"
                type="password"
                onChange={handleChange}
                name="confirmPassword"
              />
              <p>{error.confirmPassword}</p>
            </div>
            <div>
              <button
                className="w-full bg-blue-500 text-white h-8 rounded-md"
                onClick={handleClick}
              >
                Login
              </button>
            </div>
            <Link to="/signup">Don't have an account.</Link>
          </div>
        </div>
      </div>
      <div className="..."></div>
    </div>
  );
}

export default Login;
