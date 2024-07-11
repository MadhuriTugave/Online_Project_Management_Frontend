import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
// import { useSelector } from 'react-redux';
import axios from "axios";
import Table from "./Table";
import { FaSearch } from "react-icons/fa";
import header from "../Images/Header-bg.jpg";

function ProjectList() {
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState(["0 result found"]);
  const [sortField, setSortField] = useState("");
  // const[loading,setLoading]=useState(false);


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

    handleSortSearch();
  },[sortField, searchItem, data ]);

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
    setSearchResult(sortedData);
  };



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
      <div className=" text-white w-full lg:w-20 p-4">
        <Navbar />
      </div>

      <div className="flex-grow p-2 lg:ml-6 ">
        <div className="relative ">
          <img src={header} className="h-auto max-w-full   " alt="header" />
          <h1 className=" absolute lg:top-10 left-5 right-0 text-white font-bold text-2xl sm:top-1">
            Project List{" "}
          </h1>
        </div>

        <div className="flex flex-col absolute botton-[-5rem] ml-2 ">
          <div className="flex justify-between  mb-2  ">
            <div className="flex ">
              <div className="mt-5 p-1 ">
                <FaSearch />
              </div>
              <input
                type="text"
                placeholder="Search by projectname..."
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                className="p-2 border-b-2  rounded-l m-2 "
              />
            </div>
            <div className="flex p-3 ">
              <label className="p-2 w-[90px]">Sort By</label>

              <select
                id="reason"
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className=" p-2 border-b-2 "
              >
                <option>Priority</option>
                <option>Reason</option>
                <option>Category </option>
                <option> Type</option>
                <option> ProjectName</option>
                <option> Department</option>
                <option> Location</option>
                <option> Division</option>
                <option> Status</option>
              </select>
            </div>
          </div>
          <table className="min-w-full bg-white shadow-xl">
            <thead>
              <tr className="bg-blue-100 ">
                <th className="py-2 px-3 border-b">Project Names</th>
                <th className="py-2 px-3 border-b">Reason</th>
                <th className="py-2 px-3 border-b">Category</th>
                <th className="py-2 px-3 border-b">Type</th>
                <th className="py-2 px-3 border-b">Priority</th>
                <th className="py-2 px-3 border-b">Department</th>
                <th className="py-2 px-3 border-b">Location</th>
                <th className="py-2 px-3 border-b">Division</th>
                <th className="py-2 px-3 border-b">Status</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <Table
              data={searchResult }
              onUpdateStatus={handleProjectStatusUpdate}
            />
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProjectList;
