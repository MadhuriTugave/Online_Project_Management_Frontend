import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { IoSearchSharp } from 'react-icons/io5';
// import image from "../Images/Header-bg.jpg"

function ProjectList() {

  const [data ,setData]= useState([]);
 

  const user = useSelector((state) => state);
  // console.log(user.LoginLogoutUser)
  const UserId = user.LoginLogoutUser.user._id;
  // console.log(UserId)


  useEffect(()=>{
    async function Get(){
      try {
        const response = await axios.get(`http://localhost:3001/ProjectList/${UserId}`);
        console.log(response)
        setData(response.data);
        // setLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
        // setLoading(false);
      }
    }
    Get();

  },[UserId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className=' '> 
  <div>
  <Navbar/>
  </div>
  
    
     
    <div className='flex sm:flex-row '>
      
    
    <div className=" mx-auto mr-10">
    
    <h1 className="text-3xl font-bold text-blue-500 m-4 sm:text-2xl">Project List </h1>
   
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
            <th className="py-2 px-2 border-b">Status</th>
            <th className="py-2 px-2 border-b">Division</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((project) => (
            // console.log(project.ProjectName, project.status)
            <tr key={project._id}>
              <td className="py-2 px-4 border-b">{project.ProjectName}
              <div>
                  <div> {formatDate(project.StartDate)}  to  {formatDate(project.EndDate)}</div>
                 
                </div>
              </td>
              <td className="py-2 px-3 border-b">{project.Reason}</td>
              <td className="py-2 px-3 border-b">{project.Category}</td>
              <td className="py-2 px-3 border-b">{project.Type}</td>
              <td className="py-2 px-3 border-b">{project.Priority}</td>
              <td className="py-2 px-3 border-b">{project.Department}</td>
              <td className="py-2 px-3 border-b">{project.Location}</td>
              <td className="py-2 px-3 border-b">{project.status}</td>
              <td className="py-2 px-3 border-b">{project.Division}</td>
              <div className=''>
              <button className='p-1 bg-blue-300 m-2 rounded-lg w-[70px] '>Start</button>
              <button className='p-1 bg-blue-300 m-2 rounded-lg w-[70px]'>Start</button>
              <button className='p-1 bg-blue-300 m-2 rounded-lg w-[70px]'>Start</button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
     
     
     
     
    
    
    </div>
  )
}

export default ProjectList
