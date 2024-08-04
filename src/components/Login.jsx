import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logoTop from "../Images/Logo (4).svg";

import { useDispatch } from "react-redux";
import { SetUser } from "../Redux/Actions";
import bgImage from "../Images/login-bg-1 (1).svg"
import show from "../Images/show.jpg";
import hide from "../Images/hide.jpg";
import "../image.css"
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
    // console.log(email , password);


  
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
    <div className="h-full flex flex-col lg:justify-center  items-center relative ">
    <div className="absolute">
        <img src={bgImage} alt="header"/>
      </div>
      <div className="absolute lg:top-[5rem] Sm:top-[5rem] justify-center image-wrapper " style={{ top: logoTop }}>
      
        {/* <img
          src={logoTop}
          alt="logo"
          className="h-2 w-20 object-cover rounded-full "
        >
         
        </img> */}
         <div class="logo relative ">
        <img src={logoTop} alt="Logo" class="logo-image"/>
      
        
    </div>
       
      </div>
    <div className="absolute lg:top-[11rem] text-md Sm:top-[11rem] text-stone-200" >
    Onling Project Management
    </div>
      <div className="rounded-xl bg-white lg:p-8 Sm:p-4  max-w-[410px] w-full shadow-xl  absolute lg:top-[14rem]  Sm:top-[18rem] sm:top-[30rem]">
        <h1 className=" text-xl lg:mt-2 text-gray-700 font-[20px] lg:mb-9  Sm:text-left lg:text-center ">
          Login to get started
        </h1>
        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5 lg:mt-10 Sm:mt-5 ">
          {/* Email Address Input Field*/}
          <div className="relative w-full flex flex-col justify-between">
         {/* <div className={Emailerror ? "mt-3 :"mt-10" }> */}
         <lable className={Emailerror ? "text-red-500 " :"text-stone-500 text-sm "}>Email
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
            Emailerror ? <h6 className="text-red-500 text-md">{Emailerror}</h6> :<h6 className=""> </h6>
          }
          {/* Password Input Field*/}
     
          <div className={Passworderror ? " relative mt-4" :"  relative mt-10 "}>
            <lable className={Passworderror ? "text-red-500" :"text-stone-500 text-sm  "}>Password
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
        
        <button onClick={handlePasssword} type="button">
           {
            passwordVisible? ( <img src={hide} alt="hide" className={Passworderror  ? "absolute h-9 w-9 bottom-[50px] right-3" : "absolute h-9 w-9 bottom-[30px] right-3"}/>):
            (<img src={show} alt="show" className={Passworderror ?"absolute h-10 w-10 bottom-[50px] right-3 rounded-full": "absolute h-10 w-10 bottom-[30px] right-3 rounded-full"}/>)
           }
          </button>
          
             </lable>
       
           
          
          <Link className={Passworderror ? `absolute right-3 text-xs text-blue-500 bottom-[28px]` :`absolute right-3 text-xs text-blue-500 bottom-[9px]`} to="/ForgotPassword">Forgot Password?</Link>
         </div> 

        
    
         
         <div className={Passworderror && Emailerror ? " flex justify-center  " :"mt-6 flex justify-center   "}>
         <button
            type="submit"
            className=" mt-3 w-full lg:w-[180px]  rounded-full text-white text-body-m  text-lg bg-blue-600 hover:bg-blue-500  transition-duration-300 p-1"
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
      <div className="absolute lg:bottom-[-44rem] lg:left-[35rem] p-10 h-20 w-200 sm:bottom-[-58rem] sm:left-[24rem]  Sm:bottom-[-37rem] Sm:left-[-1rem]">
      {
         
            error ? <h6 className="text-red-500 ">{error}</h6>:" "
       }
      </div>
    </div>
  );
}

export default Login;
