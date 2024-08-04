import React, { useState } from 'react'
import logoTop from "../Images/Logo (4).svg";
import bgImage from "../Images/login-bg-1.jpg"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ResetPassword() {
    const [PasswordError ,setPasswordError] = useState(false);
    const [Password,setPassword]= useState("");

    const {id ,token}= useParams();
    const navigate = useNavigate();

   async function handleSendemail(e){
    console.log(Password)
    e.preventDefault();
    if(Password){
        try {
            const response = await axios.post(
                `http://localhost:3001/User/reset_Password/${id}/${token}`,
                { Password}
              ); 
              // console.log(response.data);
              if(response.data.status === 200){
                navigate("/");

              }
             
        } catch (error) {
           console.log(error); 
          
        }
    }else{
        setPasswordError("Enter Password")
       }
   }

  return (
    <div className="h-[500px] flex flex-col lg:justify-center mt-0 items-center relative ">
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
    <div className="absolute top-[11rem] justify-center text-white" >
    <h6>Onling Project Management</h6>
    </div>
      <div className="rounded-xl bg-white p-8 sm:shadow-3xl  max-w-[420px] w-full shadow-xl absolute top-[15rem]">
        <h1 className="text-xl text-gray-700 mb-9 text-center ">
        Reset Password
        </h1>
        {/* Login Form */}
        <form onSubmit={handleSendemail} className="space-y-5 mt-2">
          {/* Email Address Input Field*/}
          <div className="relative w-full flex flex-col justify-between ">
         {/* <div className="mt-3 "> */}
         <lable className={PasswordError? "text-red-500 " :"text-black-500 "}> New Password
          <input
            id="password"
            type="password"
            className={PasswordError ? " border-1 border border-rose-600 w-full bg-white p-3 rounded-md text-black " :"w-full bg-white p-3 rounded-md text-black border border-1 border-slate-500"}
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          </lable>
   
         {
            PasswordError ? <h6 className="text-red-500 text-md">{PasswordError}</h6> :<h6> </h6>
          }
    
    <div className={PasswordError ? " flex justify-center " :"mt-6 flex justify-center   "}>
         <button
            type="submit"
            className="w-[160px] rounded-full text-body-m  text-lg bg-blue-500 hover:bg-blue-300  transition-duration-300 p-1"
            formNoValidate
          >
            Update
          </button>
       \</div>
         </div>
        </form>
       
      </div>
     
    </div>
  )
}
