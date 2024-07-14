import React, { useEffect, useState } from "react";
import Inputfield from "./inputfield";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import logoTop from "../Images/Logo.jpg";
import { useDispatch } from "react-redux";
import { SetUser } from "../Redux/Actions";
import bgImage from "../Images/login-bg-1.jpg";
import show from "../Images/show.jpg";
import hide from "../Images/hide.jpg";

function SignUp() {
  // State to store the email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible ,setPasswordVisible]= useState(false);

  const dispatch = useDispatch();
  // Instantiate the navigate hook
  const navigate = useNavigate();

  // Regex to validate the email address
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Get the access token from local storage
  const access_token = localStorage.getItem("access_token");

  // Navigate to the dashboard if the user is already logged in
  useEffect(() => {
    if (access_token) navigate("/Dashboard");
  }, [access_token, navigate]);

  // Placeholder function to handle the Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if the password and confirm password match
    if (password === "" && email === "" && confirmPassword === "") {
      toast.error("Please fill all the fields"); //check if all the fields are empty.
    } else if (email === "") {
      toast.error(" Email cannot be empty"); // Check if the email is empty
    } else if (password === "") {
      toast.error("password cannot be empty"); // Check if the password is empty
    } else if (confirmPassword === "") {
      toast.error("confirmPassword cannot be empty"); // Check if the confirm password is empty
    } else if (password !== confirmPassword) {
      return toast.error(" confirmPassword is not matching");
    }

    if (email && password && confirmPassword) {
      // Validate the email address
      if (!emailRegex.test(email)) {
        toast.error("Invalid email");
      } else {
        try {
          // Send the registration request
          const response = await axios.post(
            `https://online-project-management-onae.onrender.com/User/SignUp`,
            {
              email,
              password,
            }
          );

          // console.log(response.data)
          //Set access token in local storage
          localStorage.setItem("access_token", response.data.access_token);

          // Fetch the user data
            dispatch(SetUser(response.data.user));

          // Navigate to the dashboard
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/Dashboard");
          }, 2000);
        } catch (error) {
          // console.log(error)
          toast.error(error.response.data.message);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      }
    }
  };
  // Navigate to Login Page
  const handleLoginClick = () => {
    navigate("/");
  };
  const handlePasssword = ()=>{
    setPasswordVisible(!passwordVisible);
  }
  return (
    <div className="h-[500px] flex flex-col lg:justify-center items-center relative ">
    <div className="absolute">
      <img src={bgImage} alt="header"/>
    </div>
    <div className="absolute top-[5rem] justify-center  " style={{ top: logoTop }}>
      <img
        src={logoTop}
        alt="logo"
        className="w-32 h-32 object-cover rounded-full"
      />
     
    </div>
      <div className="rounded-3xl bg-white p-6 max-w-md w-full shadow-2xl absolute top-[15rem]">
        <h1 className="text-2xl text-blue mb-5 text-center">Sign Up</h1>

        <form onSubmit={handleSignUp} className="space-y-5">
          {/* Email Address Input Field*/}
          <Inputfield
            id="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password Input Field*/}
        <div className="relative ">
        <Inputfield
            id="password"
            type={passwordVisible ? "text" :"password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <button onClick={handlePasssword} type="button">
           {
            passwordVisible? ( <img src={hide} alt="hide" className="absolute h-9 w-9 top-2 right-3"/>):
            (<img src={show} alt="show" className="absolute h-10 w-10 top-2 right-3"/>)
           }
          </button>
        
          <Inputfield
            id="confirmPassword"
            type={passwordVisible ? "text" :"password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg text-body-m  text-lg bg-blue-500 hover:bg-blue-300  transition-duration-300 p-4"
            formNoValidate
          >
            SignUp
          </button>
        </form>

        {/* Navigate to Sign Up Page */}
        <div className="flex items-center justify-center mt-6">
          <p className="text-sm text-black mr-2">Already have an account?</p>
          <button
            onClick={handleLoginClick}
            className="text-blue-800  text-body-m hover:text-black"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
