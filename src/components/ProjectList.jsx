import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
// import { useSelector } from 'react-redux';
import axios from "axios";
import Table from "./Table";
import {  FaSearch } from "react-icons/fa";
import { BsFilterLeft } from "react-icons/bs";
import header from "../Images/Header-bg.svg";
import logo from "../Images/Logo (4).svg";
import backArrow  from "../Images/back arrow.svg"
import logout from "../Images/Logout (2).svg"
import "../image.css"
import { useNavigate } from "react-router-dom";

function ProjectList() {
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState(["0 result found"]);
  const [sortField, setSortField] = useState("Priority");
 const [currentPage ,setCurrentPage]=useState(1);
 const [isDropdownOpen, setIsDropdownOpen] = useState(true);
 const navigate = useNavigate();
 const recordsPerPage = 7;


  useEffect(() => {
    async function Get() {
      try {
      // setLoading(true)
          const response = await axios.get(
            `http://localhost:3001/ProjectList`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
          // console.log(response)
          setData(response.data);
          setSearchResult(response.data);

          // setLoading(false);
        
      } catch (error) {
        console.log(error.response.data.message);
       
      }
    }

    Get();
  }, []);

  
  useEffect(() => {
    async function handleSortSearch () {
      let sortedData = data;
    
      if (sortField) {
        sortedData = [...data].sort((a, b) => {
          if (a[sortField] < b[sortField]) return -1;
          if (a[sortField] > b[sortField]) return 1;
          return 0;
        });
        // console.log(sortedData);
      }
       if (searchItem) {
        const result =  await axios.get(
          `http://localhost:3001/ProjectList/search?query=${searchItem.toString()} `,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
         
        sortedData =result.data ;
      
      }
     
      const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const paginatedData = sortedData.slice(firstIndex, lastIndex);

      setSearchResult(paginatedData);
    };

    handleSortSearch();

  },[sortField, searchItem, data,currentPage ]);

  const npages = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);
  

 
  function prePage(){
    if(currentPage > 1){
      setCurrentPage(currentPage-1);
    }
}
function changepage(id){
setCurrentPage(id);

}
function nextPage(){
        if(currentPage < npages){
                    setCurrentPage(currentPage + 1);
        }
}



  const handleProjectStatusUpdate = (projectId, status) => {
    const updatedData = data.map((project) => {
      if (project._id === projectId) {
        return { ...project, status };
      }
      return project;
    });
    setData(updatedData);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectChange = (e) => {
    setSortField(e.target.value);
    setIsDropdownOpen(true);
  };
  const handleLogout = () => {

    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div className="flex flex-col lg:flex-row  h-screen w-full App">
    <div className="lg:block Sm:hidden text-white w-full lg:w-20 lg:p-4 sm:max-h-20 ">
     <Navbar/>
    </div>

      <div className="flex-grow  ">
      <div className="lg:relative Sm:fixed">
      <img src={header} alt='headingimage' className=' lg:h-[150px] lg:w-[2290px] Sm:w-full'></img>
      <img src={logout} alt='headingimage' className='absolute lg:hidden Sm:block Sm:top-[10px] Sm:right-4 ' onClick={handleLogout}></img>
              <div className="absolute lg:top-[2rem] justify-center lg:right-[36rem] sm:right-[20rem] Sm:right-[10rem] sm:top-[1rem] Sm:top-[0rem] md:right-[22rem] md:top-[1rem]  " style={{ top: logo }}>
        <img
          src={logo}
          alt="logo"
          className="h-[53px] w-[60px]  Sm:hidden lg:block"
        />
       
      </div>
       <img src={backArrow} alt="arrow" className="Sm:hidden lg:block absolute  lg:top-12 lg:left-8 Sm:left-4 Sm:top-[15px]"></img>
        <h1 className="absolute lg:top-10 lg:left-14 Sm:left-3 right-0 project-listing Sm:text-lg sm:top-1 Sm:top-1">
          Project Listing
        </h1>
      </div>

      <div className="flex flex-col   lg:rectangle lg:ml-4 Sm:mb-12  lg:absolute  md:absolute md:mt-5 Sm:mt-10 lg:bg-white   rounded-xl lg:top-[5rem] sm:top-[11rem] ">
        <div className="flex flex-col sm:flex-row Sm:flex-row lg:justify-between  lg:mb-2">
          <div className="flex items-center box-border  border-b border-gray-400  m-3 ">
            <div className="mt-5 p-1 Sm:mt-1 text-gray-300 lg:block  ">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              className="p-1 text-xl rounded-l text-gray-700 lg:bg-white Sm:bg-gray-100 border-none  Sm:m-0"
            />
          </div>
          <div className="flex lg:flex-row   items-center p-2">
          <label className="mr-2 Sm:hidden lg:block ">Sort By : </label>
          <button className="filter-icon-button">
          <span className="Sm:text-3xl Sm:mt-2 ml-[-7px] Sm:text-gray-400 lg:hidden Sm:block" onClick={toggleDropdown}><BsFilterLeft/></span>
        </button>
            <select
              id="reason"
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="p-1 border-b-2 Sm:hidden lg:block "
            >
              <option>Priority</option>
              <option>Reason</option>
              <option>Category</option>
              <option>Type</option>
              <option>ProjectName</option>
              <option>Department</option>
              <option>Location</option>
              <option>Division</option>
              <option>Status</option>
            </select>
            {
              isDropdownOpen ?"" :
              <select
              id="reason"
              value={sortField}
              onChange={handleSelectChange}
              className="Sm:p  Sm:w-[60px] Sm:text-sm bg-gray-100"
            >
            
              <option>Priority</option>
              <option>Reason</option>
              <option>Category</option>
              <option>Type</option>
              <option>ProjectName</option>
              <option>Department</option>
              <option>Location</option>
              <option>Division</option>
              <option>Status</option>
            </select>
            }
           
          </div>
        </div>
        

  
          
            <Table
              data={searchResult}
              onUpdateStatus={handleProjectStatusUpdate}
            />
         
       

        <nav className="bg-gray-100">
          <ul className="flex items-center justify-center space-x-2  ">
            <li className="page-item ">
              <button className="page-link p-1 bg-blue-300 rounded-xl mb-3" onClick={prePage}>Prev</button>
            </li>
            {numbers.map((n, i) => (
              <li key={i} className={`page-item p-4 ${currentPage === n ? "active" : ""}`}>
                <button className="page-link mb-3" onClick={() => { return changepage(n) }}>
                  {n}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button className="page-link p-1 bg-blue-300 mb-3  rounded-xl" onClick={nextPage}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
      {/* <div className=" absolute bottom-[-13rem] lg-hidden  Sm:block text-white w-full lg:w-20 lg:p-4 sm:max-h-20 ">
       <Navbar/>
      </div> */}
    </div>
    <div className="lg:absolute Sm:fixed lg:hidden Sm:block Sm:bottom-0 text-white w-full lg:w-20 lg:p-4 sm:max-h-20 ">
     <Navbar/>
    </div>
    </div>
  );
}

export default ProjectList;


