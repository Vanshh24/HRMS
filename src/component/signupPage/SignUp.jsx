import { Link } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  let [signupData, setSignupData] = useState({});
  let [error, setError] = useState({});
  let handleChange = (e) => {
    let { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };
  let formError = {};
  let handleValidate = (signupData) => {
    if (!signupData.name) {
      formError.name = "Full name is required.";
    } else if (!signupData.email) {
      formError.email = "Email is required.";
    } else if (!signupData.password) {
      formError.password = "Password is required";
    } else if (!signupData.confirmPassword) {
      formError.confirmPassword = "Confirm password is required.";
    } else {
      console.log("Api data", signupData);
    }
    setError(formError);
  };
  let handleClick = () => {
    handleValidate(signupData);
    console.log(signupData);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="...">
        <div className="card w-100 h-170 border-1 border-black-200 m-auto rounded-md shadow-md/50">
          <h1 className="card-header text-center font-bold text-xl">Sign Up</h1>
          <div className="card-body w-80 h-100 m-auto mt-8">
            <div className="mb-4">
              <label htmlFor="name">Full Name</label>
              <input
                className="w-full border-1 border-black-500 h-8 rounded-md"
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
                className="w-full border-1 border-black-500 h-8 rounded-md"
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
                className="w-full border-1 border-black-500 h-8 rounded-md"
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
                className="w-full border-1 border-black-500 h-8 rounded-md"
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
                // onClick={handleClick}
              >
                Sign Up
              </button>
            </div>
            <Link to="/login">Already have an account?</Link>
          </div>
        </div>
      </div>
      <div className="..."></div>
    </div>
  );
}

export default SignUp;
