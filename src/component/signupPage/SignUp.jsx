import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

let baseUrl = import.meta.env.VITE_BASE_URL;

export default function SignUp() {
  let navigate = useNavigate();
  let [signupData, setSignupData] = useState({});
  let [error, setError] = useState({});

  let handleChange = (e) => {
    let { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };
  let handleSubmit = async () => {
    try {
      await axios
        .post(`${baseUrl}/signup`, signupData)
        .then((res) => {
          let { success, message, token } = res.data;
          if (success) {
            alert(message);
            localStorage.setItem("auth_token", token);
            navigate("/admin");
          }
        })
        .catch((err) => {
          let { success, message } = err.response.data;

          if (success === false) {
            alert(message);
          }
          console.log(err.response.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  let handleValidate = (signupData) => {
    let formError = {};

    if (!signupData.name) {
      formError.name = "Full name is required.";
    } else if (!signupData.email) {
      formError.email = "Email is required.";
    } else if (!signupData.password) {
      formError.password = "Password is required";
    } else if (!signupData.confirmPassword) {
      formError.confirmPassword = "Confirm password is required.";
    } else {
      if (signupData.password !== signupData.confirmPassword) {
        formError.confirmPassword = "Passwords do not match.";
      } else {
        handleSubmit();
      }
    }
    setError(formError);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="..."></div>
      <div className="...">
        <div className="card w-100 h-170 border border-black-200 m-auto rounded-md shadow-md/50">
          <h1 className="card-header text-center font-bold text-xl">Sign Up</h1>
          <div className="card-body w-80 h-100 m-auto mt-8">
            <div className="mb-4">
              <label htmlFor="name">Full Name</label>
              <input
                className="w-full border border-black-500 h-8 rounded-md"
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
              />
              <p>{error.name}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                className="w-full border border-black-500 h-8 rounded-md"
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
              />
              <p>{error.email}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                className="w-full border border-black-500 h-8 rounded-md"
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
              />
              <p>{error.password}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="w-full border border-black-500 h-8 rounded-md"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
              />
              <p>{error.confirmPassword}</p>
            </div>
            <div>
              <button
                type="button"
                className="w-full bg-blue-500 text-white h-8 rounded-md"
                onClick={() => handleValidate(signupData)}
              >
                Sign Up
              </button>
            </div>
            <Link to="/">Already have an account?</Link>
          </div>
        </div>
      </div>
      <div className="..."></div>
    </div>
  );
}
