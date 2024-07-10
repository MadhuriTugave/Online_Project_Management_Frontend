import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
// import { useSelector } from 'react-redux';
import axios from 'axios';
import Table from './Table';
import { FaSearch } from 'react-icons/fa';
// import header  from "../Images/Header-bg.jpg";


function ProjectList() {

  const [data ,setData]= useState([]);
  const[searchItem , setSearchItem] = useState("");
  const [searchResult , setSearchResult] = useState(["0 result found"]);
  

  // const user = useSelector((state) => state);
  // // console.log(user.LoginLogoutUser)
  // const UserId = user.LoginLogoutUser.user._id;
  // // console.log(UserId)


  useEffect(()=>{
    async function Get(){
      try {
       if(!searchItem){
        const response = await axios.get(`http://localhost:3001/ProjectList`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        // console.log(response)
        setData(response.data);
        // setLoading(false);
       }
       else{
          const result  = data.filter((project)=> project.ProjectName.includes(searchItem));
          setSearchResult(result);
       }
      } catch (error) {
        console.log(error.response.data.message);
        // setLoading(false);
      }
    }

   Get();

  },[ searchItem,data]);

  const handleProjectStatusUpdate = (projectId, status) => {
    const updatedData = data.map(project => {
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
       <Navbar/>
      </div>
  
  
  {/* <div className="flex-grow p-2 "> */}
  <div className="flex-grow p-2  ">
       {/* <div>
        
        <img src={header} className='h-auto max-w-full  absolute '/>
        <h1 className="relative  text-3xl font-bold text-blue-500 m-4 sm:text-2xl">Project List </h1>
       </div> */}
      {/* </div>     */}

    
    
      <h1 className="relative  text-3xl font-bold text-blue-500 m-4 sm:text-2xl">Project List </h1>
   <div className=''>
   <div className="flex  mb-4">
        <input
          type="text"
          placeholder="Search by projectname..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="p-2 border-b-2  rounded-l m-2"
        />
        <div className="p-2  rounded-r">
          <FaSearch/>
        </div>
      </div>
      <div>
      <table className="min-w-full bg-white shadow-xl ">
        <thead>
          <tr className='bg-blue-100 '>
            <th className="py-2 px-2 border-b">Theme</th>
            <th className="py-2 px-2 border-b">Reason</th>
            <th className="py-2 px-2 border-b">Category</th>
            <th className="py-2 px-2 border-b">Type</th>
            <th className="py-2 px-2 border-b">Priority</th>
            <th className="py-2 px-2 border-b">Department</th>
            <th className="py-2 px-2 border-b">Location</th>
             <th className="py-2 px-2 border-b">Division</th>
            <th className="py-2 px-2 border-b">Status</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
    <Table  data = {searchItem ? searchResult  : data} onUpdateStatus={handleProjectStatusUpdate}/>
   
    </table>
      </div>
   </div>
   
    </div>
     
     
     
     
    
    
    </div>
  )
}

export default ProjectList
