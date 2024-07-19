import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import logoTop from "../Images/Logo.jpg";

import { useDispatch } from "react-redux";
import { SetUser } from "../Redux/Actions";
import bgImage from "../Images/login-bg-1.jpg"
import show from "../Images/show.jpg";
import hide from "../Images/hide.jpg";
// import bg2 from "../Images/Logo-Photoroom.jpg"


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible , setPasswordVisible]=useState(false);
  const [error ,setError] = useState(false);
  const [Emailerror ,setEmailError] = useState(false);
  const [Passworderror ,setPasswordError] = useState(false);

  const dispatch = useDispatch();
  // Regex to validate the email address
  // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

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


  
      if (email === "") {
        setEmailError("Email is required  ");
      }
    if (password === "") {
      setPasswordError("password is required ");
     }

    // Send the login request
    if (email && password) {
  
        try {
          const response = await axios.post(
            `https://online-project-management-onae.onrender.com/User/Login`,
            { email, password }
          );
          console.log(response.data);
          // toast.success(response.data.message);
          setError(response.data.message);
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
          // toast.error(error.response.data.message);
          setError(error.response.data.message);
        }
      
    }
  };


  // Navigate to Sign Up Page

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
          className="w-20 h-20  rounded-full"
        />
       
      </div>
    <div className="absolute top-[12rem] justify-center text-white" >
    <h6>Onling Project Management</h6>
    </div>
      <div className="rounded-3xl bg-white p-8 sm:shadow-3xl  max-w-[420px] w-full shadow-xl absolute top-[15rem]">
        <h1 className="text-xl text-black mb-9 text-center ">
          Login To Get started
        </h1>
        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5 mt-10">
          {/* Email Address Input Field*/}
          <div className="relative w-full flex flex-col justify-between ">
         {/* <div className="mt-3 "> */}
         <lable className={Emailerror ? "text-red-500 " :"text-black-500 "}>Email
          <input
            id="email"
            type="email"
            className={Emailerror ? " border-1 border border-rose-600 w-full bg-white p-3 rounded-md text-black " :"w-full bg-white p-3 rounded-md text-black border border-1 border-slate-500"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          </lable>
         {/* </div> */}
         {
            Emailerror ? <h6 className="text-red-500 text-md">{Emailerror}</h6> :<h6> </h6>
          }
          {/* Password Input Field*/}
     
          <div className={Passworderror ? "mt-4" :"mt-10 "}>
            <lable className={Passworderror ? "text-red-500" :"text-black-500 "}>password
        <input
            id="password"
            type={passwordVisible ? "text" :"password"}
            placeholder=""
            className={Passworderror ? " border-1 border border-rose-600 w-full bg-white p-3 rounded-md text-black " :"w-full bg-white p-3 rounded-md text-black border border-1 border-slate-500"}
            value={password}
           
            onChange={(e) => setPassword(e.target.value)}
          />
       {
            Passworderror ? <h6 className="text-red-500 text-md">{Passworderror}</h6> :<h6> </h6> 
          }
          
             </lable>
           <button onClick={handlePasssword} type="button">
           {
            passwordVisible? ( <img src={hide} alt="hide" className="absolute h-9 w-9 top-[9rem] right-3"/>):
            (<img src={show} alt="show" className="absolute h-10 w-10 top-[9rem] right-3 rounded-full"/>)
           }
          </button>
         
     
         </div>
         
         <div className={Passworderror ? "mt-4 flex justify-center " :"mt-10 flex justify-center   "}>
         <button
            type="submit"
            className="w-[160px] rounded-full text-body-m  text-lg bg-blue-500 hover:bg-blue-300  transition-duration-300 p-1"
            formNoValidate
          >
            Login
          </button>
          </div>
         </div>
        </form>
        {/* Navigate to Sign Up Page */}
        <div className="flex items-center justify-center mt-6">
          {/* <p className="text-sm text-black mr-2">Don't have an account?</p> */}
          {/* <button
            onClick={handleSignupClick}
            className="text-blue-800 text-body-m hover:text-black"
          >
            Sign Up
          </button> */}
          
        </div>
      </div>
      <div className="absolute bottom-[-15rem] p-10 h-20 w-200  ">
      {
         
            error ? <h6 className="text-red-500 ">{error}</h6>:" "
       }
      </div>
    </div>
  );
}

export default Login;
