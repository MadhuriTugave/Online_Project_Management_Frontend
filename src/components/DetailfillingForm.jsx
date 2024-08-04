import React, { useState } from "react";
import Navbar from "./Navbar";
// import Inputfield from "./inputfield";
import backArrow  from "../Images/back arrow.svg"
import axios from "axios";
import toast from "react-hot-toast";
import logout from "../Images/Logout (2).svg"
import { useNavigate } from "react-router-dom";
import header from "../Images/Header-bg.svg";
import logo from "../Images/Logo (4).svg";
import "../image.css"

function DetailfillingForm() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState("");
  const [reason, setReason] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("");
  const [endDate, setEndDate] = useState("");
  const [department, setDepartMent] = useState("");
  const [location, setLocation] = useState("");
  const [status,] = useState("Registered");
  const [division, setDivision] = useState("");
  const [error ,setError]= useState(false);
  const [dateError ,setDateError] = useState(false);

  async function handleProjectSave(e) {
    e.preventDefault();

    if ( theme ) {
      // console.log(endDate > startDate);
      if( reason &&
        category &&
        startDate &&
        type &&
        priority &&
        endDate &&
        department &&
        location &&
      
        division){

     console.log(endDate > startDate)
      if (endDate > startDate) {
        // console.log("submited")
        try {
          const Response = await axios.post(
            `https://online-project-management-onae.onrender.com/ProjectList`,
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
          );
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

          toast.success(Response.data.message);
          setTimeout(() => {
            navigate("/ProjectList");
          }, 2000);
        } catch (error) {
          console.log(error);
        }
      } else {
        setDateError("End Date should not be smaller then start Date");
      }
    }else{
      setError("All the fields are mandatory");
    }
    } else {
     setError("Project Theme Required")
    }
  
  }
  const handleLogout = () => {

    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div className="flex relative flex-col lg:flex-row Sm:h-full lg:h-[1000px] Sm:w-[380px]  lg:w-full App">
      <div className="lg:block Sm:hidden text-white w-full lg:w-20 lg:p-4 sm:max-h-20 ">
       <Navbar/>
      </div>

      <div className="flex-grow  ">
     
      <div className="lg:relative Sm:fixed">
          <img src={header} alt="headingimage" className="lg:h-[150px] lg:w-[2290px]" />
          <img src={logout} alt='headingimage' className='absolute lg:hidden Sm:block Sm:top-[10px] Sm:right-4 ' onClick={handleLogout}></img>
          <div className="absolute lg:top-[2rem] justify-center lg:right-[36rem] Sm:right-[20rem] md:right-[22rem] md:top-[1rem]">
            <img
              src={logo}
              alt="logo"
              className="h-[53px] w-[60px] Sm:hidden lg:block"
            />
          </div>
          <img src={backArrow} alt="Arrowimage  " className="Sm:hidden lg:block absolute lg:top-12 lg:left-8 Sm:left-4 Sm:top-[15px]" />
          <h1 className="absolute lg:top-10 lg:left-14 Sm:left-9 right-0 project-listing Sm:text-lg Sm:top-[7px]">
           Create Project
          </h1>
        </div>

        <div className="Sm:mt-14  flex lg:ml-3 lg:h-[796px] lg:w-[1258px] md:w-[800px] sm:w-[700px] Sm:w-[350px] md:absolute  lg:absolute lg:top-[60px] Sm:ml-4 Sm:mb-4  rounded-2xl sm:top-[10rem] md:top-[3rem] ">
          <form
            className=" Sm:mb-16  space-y-5 lg:px-5 Sm:py-5 Sm:px-3 Sm:py-3 bg-white rounded-xl  lg:shadow-lg shadow-blue-500/50 flex  lg:flex-row      Sm:flex-col  "
            onSubmit={handleProjectSave}
          >
            <div className=" flex lg:block md:flex-col sm:flex-col Sm:flex-col md:justify-center md:items-center sm:justify-center   Sm:justify-center Sm:items-center ">
            <div className="w-full ">
              <div className="lg:mb-10 lg:mt-0">
                <textarea
                  id="theme"
                  type="text"
                  placeholder="Enter Project Theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className={error ?"border-1 border border-rose-600  bg-white p-3 rounded-md text-black lg:h-[70px] Sm:w-[340px] lg:w-[714px] font-[10px]":"w-full p-3 border-gray-400   border-[1px] border-black rounded-lg md:flex-1 lg:h-[70px] lg:w-[714px] "}
                />{
                error ? <h6 className="text-red-500 text-md">{error}</h6> :<h6> </h6> 
                }
              </div>

              <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-2 lg:grid-cols-3 gap-9 ">
                <div className=" Sm:mt-2 sm:mt-2">
                  <label className=" lable mt-5">
                    Reason
                    <select
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full p-3 border lg:text-[18px] text-gray-600  rounded-lg border-gray-400   border-[1px] h-[48px] w-[337px] "
                    >
                     <option>Select Reason</option>
                      <option>Business</option>
                      <option>Dealership </option>
                      <option> Transport</option>
                    </select>
                  </label>

                  <div className="mt-4"><label className="lable">
                    Category
                    <select
                      id="category3"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-3 border-gray-400 lg:text-[18px] text-gray-600  border-[1px] rounded-lg border-black  h-[48px] w-[337px]"
                    >
                     <option>Select Category</option>
                      <option>QualityA</option>
                      <option>QualityB </option>
                      <option>QualityC </option>
                      <option>QualityD</option>
                    </select>
                  </label></div>

                  <div className="mt-4">
                  <label className="lable ">
                    Start Date as per project plan
                    <input
                      id="date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-3 border-gray-400 lg:text-[18px] text-gray-600   border-[1px] rounded-lg  h-[48px] w-[337px]"
                    />
                  </label>
                  
                  </div>
                </div>

                <div className="  Sm:mt-2 sm:mt-2">
              
                  <label className="lable">
                    Type
                    <select
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full p-3 border-gray-400 lg:text-[18px] text-gray-600 border-[1px] rounded-lg border-black  h-[48px] w-[337px]"
                    >
                      <option>Select Type</option>
                      <option>Internal</option>
                      <option>External </option>
                      <option>Vendor </option>
                    </select>
                  </label>
                  

                 <div className="mt-4"> 
                  <label className="lable">
                    Priority
                    <select
                      id="priority"
                      type="text"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full p-3 border-gray-400 lg:text-[18px] text-gray-600   border-[1px] rounded-lg border-black  h-[48px] w-[337px]"
                    >
                      <option value="">Select Priority</option>
                      <option>High</option>
                      <option>Medium </option>
                      <option>low </option>
                    </select>
                  </label></div>

                <div className="mt-4">
                <label className={dateError ? "lable3": "lable"}>
                    End Date as Per Project Plan
                    <input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className={dateError ? "w-full p-3 lg:text-[18px]  border-1 border border-rose-600   border-[1px]  rounded-lg  h-[48px] w-[337px]":"w-full p-3 lg:text-[18px] text-gray-600 border border-gray-400   border-[1px]  rounded-lg  h-[48px] w-[337px]"}
                    />
                  </label>
                  {
                    dateError ?<h6 className="text-red-500 text-md">{dateError}</h6>:<h6> </h6>
                  }
                </div>
                </div>

                <div className="  Sm:mt-2 sm:mt-2">
                  <label className="lable">
                    Location
                    <select
                      id="location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-3 border lg:text-[18px] text-gray-600 rounded-lg border-black border-gray-400   border-[1px] h-[48px] w-[337px]"
                    >
                      <option value="">Select Location</option>
                      <option>Pune</option>
                      <option>Delhi </option>
                      <option>Mumbai </option>
                    </select>
                  </label>
                 <div className="mt-4">
                 <label className="lable">
                    Department
                    <select
                      id="Department"
                      type="text"
                      value={department}
                      onChange={(e) => setDepartMent(e.target.value)}
                      className="w-full p-3 lg:text-[18px] text-gray-600 border rounded-lg border-gray-400   border-[1px] h-[48px] w-[337px]"
                    >
                      <option value="">Select DepartMent</option>
                      <option>Finance</option>
                      <option>stores </option>
                      <option>Startegy </option>
                      <option>Hr </option>
                      <option>Quality </option>
                      <option>Maintenance </option>
                    </select>
                  </label>
                 </div>

                 <div className="mt-4">
                 <label className="lable ">
                    Division
                    <select
                      id="division"
                      type="text"
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                      className="w-full p-3 lg:text-[18px] text-gray-600  border rounded-lg border-gray-400   border-[1px]  h-[48px] w-[337px]"
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
                  <div className=" lable2 lg:text-[18px]  flex flex-row Sm:mt-4 lg:mt-4"> Status: <span className="font-bold h1">Registered</span></div>
                </div>
                {/* <label className="inline-block">
                 
                </label> */}
               {/* <div className="flex flex-row lg:hidden"> Status:<span className="font-bold">Registered</span></div> */}
              </div>
              
            </div>
           
            </div>
           
            <div className="flex Sm:flex-col  md:block  Sm:items-center sm:justify-center sm:items-center  top-0">
              <button
                type="submit"
                className="lg:w-[150px] w-[140px]  mt-[-8px] Sm:w-[320px]   rounded-full text-md bg-blue-800 text-white hover:bg-blue-600 transition duration-300 p-[6px]"
              >
                Save Project
              </button>
            </div>
          </form>
        </div>
        
      </div>
      <div className="lg:absolute Sm:fixed lg:hidden Sm:block Sm:bottom-0 text-white w-full lg:w-20 lg:p-4 sm:max-h-20 ">
     <Navbar/>
    </div>
    </div>
  );
}

export default DetailfillingForm;
