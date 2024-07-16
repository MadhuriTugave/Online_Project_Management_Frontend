import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
// import { useSelector } from 'react-redux';
import axios from "axios";
import Table from "./Table";
import { FaSearch } from "react-icons/fa";
import header from "../Images/Header-bg.jpg";
import logo from "../Images/Logo.jpg";

function ProjectList() {
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState(["0 result found"]);
  const [sortField, setSortField] = useState("");
 const [currentPage ,setCurrentPage]=useState(1);
 
 const recordsPerPage = 7;


  useEffect(() => {
    async function Get() {
      try {
      // setLoading(true)
          const response = await axios.get(
            `https://online-project-management-onae.onrender.com/ProjectList`,
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
        sortedData = data.filter((project) =>
          project.ProjectName.includes(searchItem)
        );
      }
      // console.log(sortedData)
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


  return (
    <div className="flex flex-col lg:flex-row h-screen">
     <div className=" text-white w-full lg:w-20 lg:p-4  sm:max-h-20 ">
       <Navbar/>
      </div>

      <div className="flex-grow p-2 lg:ml-6">
      <div className="relative">
        <img src={header} className="h-auto max-w-full" alt="header" />
        <div className="absolute lg:top-[2rem] justify-center lg:right-[36rem] sm:right-[16rem] Sm:right-[10rem] sm:top-[1rem] Sm:top-[0rem] md:right-[28rem] md:top-[1rem]  " style={{ top: logo }}>
        <img
          src={logo}
          alt="logo"
          className="lg:w-20 lg:h-20 Sm:w-10 Sm:h-10 sm:w-10 sm:h-10 md:w-20 md:h-20 object-cover rounded-full  "
        />
       
      </div>
        <h1 className="absolute lg:top-10 left-5 right-0 text-white font-bold lg:text-2xl Sm:text-lg sm:top-1 Sm:top-1">
          Project List
        </h1>
      </div>

      <div className="flex flex-col absolute bottom-[-5rem] ml-2 bg-white shadow-xl rounded-xl lg:top-[9rem] sm:top-[13rem]  Sm:top-[11rem] p-4">
        <div className="flex flex-col sm:flex-row Sm:flex-row justify-between mb-2">
          <div className="flex items-center   mb-2 sm:mb-0">
            <div className="mt-5 p-1 Sm:mt-1 lg:block Sm:hidden ">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search project name..."
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              className="p-1 border-b-2 rounded-l m-1 Sm:m-0"
            />
          </div>
          <div className="flex lg:flex-row  Sm:flex-col items-center p-2">
            <label className="p- ">Sort By</label>
            <select
              id="reason"
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="p-1 border-b-2"
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
          </div>
        </div>

  
          
            <Table
              data={searchResult}
              onUpdateStatus={handleProjectStatusUpdate}
            />
         
       

        <nav className="m-1">
          <ul className="flex items-center justify-center space-x-2">
            <li className="page-item">
              <button className="page-link p-2 bg-blue-300" onClick={prePage}>Prev</button>
            </li>
            {numbers.map((n, i) => (
              <li key={i} className={`page-item p-4 ${currentPage === n ? "active" : ""}`}>
                <button className="page-link" onClick={() => { return changepage(n) }}>
                  {n}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button className="page-link p-2 bg-blue-300" onClick={nextPage}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    </div>
  );
}

export default ProjectList;


