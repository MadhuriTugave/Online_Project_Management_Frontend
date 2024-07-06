import React, { useState } from 'react'
import Navbar from './Navbar'
import Inputfield from './inputfield'
import { useSelector } from 'react-redux';

// import header from "../Images/Header-bg.jpg"

function DetailfillingForm() {

  const user = useSelector((state) => state);
  console.log(user)

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


  function handleProjectSave (e){
      e.preventDefault();


      if(theme && reason && category && startDate && type && priority && endDate && department && location && status &&  division){
         console.log(endDate > startDate);
        if(endDate > startDate){
          console.log("submited")
            
          }else{
            console.log("End Date should not be smaller then start Date")
          }

      }else{
        console.log("All the fields are mandatory")
      }
 
  }

  return (
    <div>
      <div>
  <Navbar/>
  
    </div>
    <div className='bg-blue-100 flex justify-evenly h-screen '>
  
     <div>
     <div className="h-screen  ">
      {/* <div >
        <img src='header' className='h-full w-full'/>
      </div> */}
     <div className="  p-10 w-full">
      
     <form className="space-y-6 p-8 bg-white rounded-lg shadow-lg" onSubmit={handleProjectSave} >

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
          <option value="">For Business</option>
          <option value="category1">Business</option>
          <option value="category2">Dealership </option>
          <option value="category3"> Transport</option>
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
          <option value="">Select Category</option>
          <option value="category1">QualityA</option>
          <option value="category2">QualityB </option>
          <option value="category3">QualityC </option>
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
          <option value="">Select Type</option>
          <option value="category1">Internal</option>
          <option value="category2">External </option>
          <option value="category3">Vendor </option>
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
          <option value="category1">High</option>
          <option value="category2">Medium </option>
          <option value="category3">low </option>
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
          <option value="category1">Pune</option>
          <option value="category2">Delhi </option>
          <option value="category3">Mumbai </option>
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
          <option value="category1">Finance</option>
          <option value="category2">stores </option>
          <option value="category3">Startegy </option>
          <option value="category3">Quality </option>
          <option value="category3">Maintenance </option>
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
          <option value="category1">Compressor</option>
          <option value="category2">Filters </option>
          <option value="category3">Pumps </option>
          <option value="category3">Glass </option>
          <option value="category3">Water heater </option>
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
    </div>
  )
}

export default DetailfillingForm
