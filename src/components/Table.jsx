import axios from "axios";
import React from "react";
import "../image.css"

function TableData({ data, onUpdateStatus }) {
  // console.log(data)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  async function UpdateStatus(projectId, status) {
    console.log(projectId, status);
    // console.log(localStorage.getItem("access_token"));
    try {
      const response = await axios.put(
        `https://online-project-management-onae.onrender.com/ProjectList/${projectId}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      // console.log(response)
      onUpdateStatus(projectId, response.data.status);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <table className="min-w-full bg-white">
    <thead className="hidden lg:table-header-group ">
      <tr className="bg-blue-100">
        <th className="py-3 px-4 border-b table-heading2">Project Name</th>
        <th className="py-2 px-4 border-b table-heading2">Reason</th>
        <th className="py-2 px-4 border-b table-heading2">Category</th>
        <th className="py-2 px-5 border-b table-heading2">Type</th>
        <th className="py-2 px-4 border-b table-heading2 ">Priority</th>
        <th className="py-2 px-4 border-b table-heading2">Department</th>
        <th className="py-2 px-4 border-b table-heading2">Location</th>
        <th className="py-2 px-4 border-b table-heading2">Division</th>
        <th className="py-2 px-5  border-b table-heading2 ">Status</th>
     
        <th className="py-2 px-3 border-b "></th>
        <th className="py-2 px-3 border-b"></th>
        <th className="py-2 px-3 border-b"></th>
        
      </tr>
    </thead>
    <tbody>
      {data ? data.map((project) => (
        <tr key={project._id} className="hidden lg:table-row">
          <td className="py-2 px-3 border-b">
            <div className="table-heading2">{project.ProjectName}</div>
            <div className="text-sm text-[#5c5a5a] tracking-wide">
              <div>{formatDate(project.StartDate)} to {formatDate(project.EndDate)}</div>
            </div>
          </td>
          <td className="py-2 px-3 border-b table-data">{project.Reason}</td>
          <td className="py-2 px-3 border-b table-data">{project.Category}</td>
          <td className="py-2 px-3 border-b table-data">{project.Type}</td>
          <td className="py-2 px-3 border-b table-data">{project.Priority}</td>
          <td className="py-2 px-3 border-b table-data">{project.Department}</td>
          <td className="py-2 px-3 border-b table-data">{project.Location}</td>
          <td className="py-2 px-3 border-b table-data">{project.Division}</td>
         <div>
         <td className="py-5 px-4 border-b table-heading text-[14px]">{project.status}</td>
         <td className=" border-b"></td>
         </div>
          <td className="py-2 px-3 border-b ">
            <div className="flex  space-x-4 lg:ml-3 ">
              <button
                className="p- bg-blue-600 rounded-3xl  w-[70px] text-white border-2"
                onClick={() => UpdateStatus(project._id, "Running")}
              >
                Start
              </button>
              <button
                className="button text-blue-500 "
                onClick={() => UpdateStatus(project._id, "Closed")}
              >
                Close
              </button>
              <button
                className="button  text-blue-500"
                onClick={() => UpdateStatus(project._id, "Cancelled")}
              >
                Cancel
              </button>
             
               
          
            </div>
          </td>
        </tr>
      )) : <div className="text-center text-2xl">No project created yet</div>}
    </tbody>
  </table>
   
    <div className="flex flex-col  lg:items-center lg:hidden ">
      {data ? data.map((project, index) => (
       <>
        <div key={index} className="border rounded-lg p-2 mx-2 my-1 flex flex-col  bg-white lg:shadow lg:w-full  md:w-4/4 lg:w-1/2 ">
      <div className="flex p-1">
      <div>
      <div className="font-bold text-gray-500  text-lg">{project.ProjectName}</div>
          <div className="text-sm mb-2 text-gray-500">{formatDate(project.StartDate)} to {formatDate(project.EndDate)}</div>
          <div className="text-gray-400">Reason: <span className="text-gray-500">{project.Reason} </span></div>
          <div className="text-gray-400">Type: <span className="text-gray-500">{project.Type}</span> * Category: <span className="text-gray-500">{project.Category} </span> 
          
          </div>
          <div className="text-gray-400">Div: <span className="text-gray-500 font-normal  ">{project.Division}</span> * Dept: <span className="text-gray-500 font-normal">{project.Department}</span> 
          </div>
          <div className="text-gray-400">Location: <span className="text-gray-500">{project.Location}</span> </div>
          <div className="text-gray-400">Priority: <span className="text-gray-500">{project.Priority}</span> </div>
          
         
      
      </div>
          <div className="text-gray-600 font-bold ">  {project.status}</div>
      </div>
      <div className="lg:flex space-x-8 mt-1 ml-3 justify-center">
            <button
              className="p-1 bg-blue-600 rounded-3xl w-[80px] text-white border-2"
              onClick={() => UpdateStatus(project._id, "Running")}
            >
              Start
            </button>
            <button
              className="p-1 bg-white rounded-3xl w-[80px] text-blue-500 border border-blue-500"
              onClick={() => UpdateStatus(project._id, "Closed")}
            >
              Close
            </button>
            <button
              className="p-1 bg-white rounded-3xl w-[80px] text-blue-500 border border-blue-500"
              onClick={() => UpdateStatus(project._id, "Cancelled")}
            >
              Cancel
            </button>
          </div> 
        </div>
        
        </>
      )) : <div className="text-center text-2xl">No project created yet</div>}
    </div>

    

    </>
  );
}

export default TableData;
