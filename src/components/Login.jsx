import React, { useEffect, useState } from "react";
import Inputfield from "./inputfield";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logoTop from "../Images/Logo.jpg";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SetUser } from "../Redux/Actions";
import bgImage from "../Images/login-bg-1.jpg"
import show from "../Images/show.jpg";
import hide from "../Images/hide.jpg";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible , setPasswordVisible]=useState(false);

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
            `https://online-project-management-onae.onrender.com/User/Login`,
            { email, password }
          );
          // console.log(response.data);
          toast.success(response.data.message);

          // Set access token in local storage
          localStorage.setItem("access_token", response.data.access_token);

          // Fetch the user data
          dispatch(SetUser(response.data.user));

          // Navigate to the dashboard
        
          setTimeout(() => {
            navigate("/Dashboard");
          }, 1000);
        } catch (error) {
          // console.log(error)
          toast.error(error.response.data.message);
        }
      }
    }
  };


  // Navigate to Sign Up Page
  const handleSignupClick = () => {
 
    navigate("/SignUp");
  };
  const handlePasssword=()=>{
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
     
      <div className="rounded-3xl bg-white p-7 sm:shadow-3xl  max-w-md w-full shadow-xl absolute top-[15rem]">
        <h1 className="text-2xl text-black mb-5 text-center ">
          Login To Get started
        </h1>
        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Address Input Field*/}
          <Inputfield
            id="email"
            type="email"
            placeholder="Email address...."
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
         
     
         </div>
      
          <button
            type="submit"
            className="w-full rounded-lg text-body-m  text-lg bg-blue-500 hover:bg-blue-300  transition-duration-300 p-4"
            formNoValidate
          >
            Login
          </button>
        </form>
        {/* Navigate to Sign Up Page */}
        <div className="flex items-center justify-center mt-6">
          <p className="text-sm text-black mr-2">Don't have an account?</p>
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
