import React, { useEffect, useState } from "react";
import Inputfield from "./inputfield";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logoTop from "../Images/Logo.jpg";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SetUser } from "../Redux/Actions";
// import bgImage from "../Images/login-bg-1.jpg"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // Regex to validate the email address
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Instantiate the navigate hook
  const navigate = useNavigate();

  // Get the access token from local storage
  const access_token = localStorage.getItem("access_token");

  // Navigate to the dashboard if the user is already logged in
  useEffect(() => {
    if (access_token) navigate("/Dashboard");
  }, [access_token, navigate]);



  // Handle login
  const handleLogin = async (e) => {
    // Prevent the default form submission
    e.preventDefault();
    // console.log(email , password)

    // Check if the email is empty
    if (email === "" && password === "") {
      toast.error("please fill the fields ");
    } else {
      if (email === "") {
        toast.error("email Cannot be empty ");
      } else if (password === "") {
        toast.error("password Cannot be empty ");
      }
    }

    // Send the login request
    if (email && password) {
      if (!emailRegex.test(email)) {
        toast.error("Invalid email");
      } else {
        try {
          const response = await axios.post(
            `http://localhost:3001/User/Login`,
            { email, password }
          );
          console.log(response.data);
          toast(response.data.message);

          // Set access token in local storage
          localStorage.setItem("access_token", response.data.access_token);

          // Fetch the user data
          dispatch(SetUser(response.data.user));

          // Navigate to the dashboard
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/Dashboard");
          }, 2000);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    }
  };

  // Navigate to Sign Up Page
  const handleSignupClick = () => {
 
    navigate("/SignUp");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className=" " style={{ top: logoTop }}>
        <img
          src={logoTop}
          alt="logo"
          className="w-32 h-32 object-cover rounded-full"
        />
      </div>
      <div className="rounded-3xl bg-blue-300 p-8 max-w-md w-full shadow-xl">
        <h1 className="text-heading-l text-white mb-5 mt-5 ">
          Login To Get started
        </h1>
        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Address Input Field*/}
          <Inputfield
            id="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password Input Field*/}
          <Inputfield
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full rounded-lg text-body-m  text-lg bg-blue-500 hover:bg-white  transition-duration-300 p-4"
            formNoValidate
          >
            Login
          </button>
        </form>
        {/* Navigate to Sign Up Page */}
        <div className="flex items-center justify-center mt-6">
          <p className="text-sm text-white mr-2">Don't have an account?</p>
          <button
            onClick={handleSignupClick}
            className="text-blue-800 text-body-m hover:text-black"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
