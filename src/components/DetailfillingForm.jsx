import React, { useState } from 'react'
import Navbar from './Navbar'
import Inputfield from './inputfield'
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';
// import header from "../Images/Header-bg.jpg"

// import header from "../Images/Header-bg.jpg"

function DetailfillingForm() {

  const user = useSelector((state) => state);
  console.log(user.LoginLogoutUser)
  const UserId = user.LoginLogoutUser.user._id;
const navigate = useNavigate();

  const[theme , setTheme] = useState("");
  const[reason , setReason] = useState("");
  const[category , setCategory] = useState("");
  const[startDate , setStartDate] = useState("");
  const[type , setType] = useState("");
  const[priority , setPriority] = useState("");
  const[endDate , setEndDate] = useState("");
  const[department , setDepartMent] = useState("");
  const[location , setLocation] = useState("");
  const[status , setStatus] = useState("Registered");
  const[division , setDivision] = useState("");


async  function handleProjectSave (e){
      e.preventDefault();


      if(theme && reason && category && startDate && type && priority && endDate && department && location && status &&  division){
         console.log(endDate > startDate);
        if(endDate > startDate){
          // console.log("submited")
          try {
           const Response = await axios
            .post(
              `http://localhost:3001/ProjectList/${UserId}`,
              {
                theme,
                reason,
                category,
                startDate,
                type,
                priority,
                endDate,
                department,
                location,
                status,
                division,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
              }
            )
            // console.log(Response);
            setTheme("");
            setCategory("");
              setDepartMent("");
              setDivision("");
              setEndDate("");
              setLocation("");
              setPriority("");
              setReason("");
              setStartDate("");
              setType("");
           
            
            setTimeout(() => {
              toast.success(Response.data.message)
              navigate("/ProjectList")
            }, 2000);
            
          } catch (error) {
            console.log(error)
          }
            
          }else{
            toast.error("End Date should not be smaller then start Date")
          }

      }else{
        toast.error("All the fields are mandatory")
      }
 
  }

  return (
    <div>
    
  <Navbar/>
  
  
    <div className=' flex justify-evenly h-full '>
  
     
     <div className="h-screen m-2 ">
      <h1 className='m-2 text-blue-500 font-bold text-3xl sm:text-2xl' >Create Project</h1>
      {/* <div className='' >
        <img src='header' className='h-full w-full'/>
      </div> */}
     <div className="  p-7 w-full bg-blue-100 shadow-sm shadow-blue-500/50">
      
<form className="space-y-8 p-8 bg-white rounded-lg shadow-lg" onSubmit={handleProjectSave} >

  <div className="space-y-4 md:flex md:items-center md:space-y-1 md:space-x-3">
    <Inputfield
      id="theme"
      type="text"
      placeholder="Enter Project Theme..."
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="w-full p-3 border border-indigo-600 border-black rounded-lg md:flex-1  "
    />
    <button
      type="submit"
      className="w-full md:w-auto md:flex-none rounded-lg text-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300 p-3"
    >
      Save Project 
    </button>
  </div>


  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="space-y-3">
      <label className="block">
        Reason
        <select
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-3 border rounded-lg border-black"
        >
          <option>For Business</option>
          <option>Business</option>
          <option>Dealership </option>
          <option> Transport</option>
        </select>
      </label>

      <label className="block">
        Category
        <select
          id="category3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded-lg border-black"
        >
          <option>Select Category</option>
          <option>QualityA</option>
          <option>QualityB </option>
          <option>QualityC </option>
        </select>
      
      </label>

      <label className="block">
        Start Date as per project plan
        <Inputfield
          id="date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
      </label>
    </div>

    <div className="space-y-3">
      <label className="block">
        Type
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-3 border rounded-lg border-black"
        >
          <option>Select Type</option>
          <option>Internal</option>
          <option>External </option>
          <option>Vendor </option>
        </select>
      </label>

      <label className="block">
        priority
        <select
          id="priority"
          type="text"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-3 border rounded-lg border-black"
        >
          <option value="">Select priority</option>
          <option>High</option>
          <option>Medium </option>
          <option>low </option>
        </select>
  
      </label>

     
      <label className="block">
      End Date as Per Project Plan
        <Inputfield
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-3  border border-2 border-black  rounded-lg"
        />
      </label>
    </div>

    <div className="space-y-3">
      <label className="block">
      Location
      <select
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 border rounded-lg border-black"
        >
          <option value="">Select Location</option>
          <option>Pune</option>
          <option>Delhi </option>
          <option>Mumbai </option>
        </select>
      </label>
      <label className="block">
      Department
      <select
          id="Department"
          type="text"
          value={department}
          onChange={(e) => setDepartMent(e.target.value)}
          className="w-full p-3 border rounded-lg border-black"
        >
          <option value="">Select DepartMent</option>
          <option>Finance</option>
          <option>stores </option>
          <option>Startegy </option>
          <option>Quality </option>
          <option>Maintenance </option>
        </select>
      </label>
      

      <label className="block">
        Division
        <select
          id="division"
          type="text"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          className="w-full p-3 border rounded-lg border-black"
        >
          <option value="">Select Division</option>
          <option>Compressor</option>
          <option>Filters </option>
          <option>Pumps </option>
          <option>Glass </option>
          <option>Water heater </option>
        </select>
      </label>
    </div>
    <label className="block">
        Status
        <Inputfield
          id="status"
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 "
        />
      </label>
  </div>
</form>
        </div>
    
     </div>
    </div>
     </div>
  )
}

export default DetailfillingForm
