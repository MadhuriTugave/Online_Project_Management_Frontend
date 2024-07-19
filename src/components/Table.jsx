import axios from "axios";
import React from "react";

function TableData({ data, onUpdateStatus }) {
  // console.log(data)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  async function UpdateStatus(projectId, status) {
    // console.log(projectId, status);
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
        <th className="py-2 px-2 border-b">Project Names</th>
        <th className="py-2 px-2 border-b">Reason</th>
        <th className="py-2 px-2 border-b">Category</th>
        <th className="py-2 px-2 border-b">Type</th>
        <th className="py-2 px-2 border-b">Priority</th>
        <th className="py-2 px-2 border-b">Department</th>
        <th className="py-2 px-2 border-b">Location</th>
        <th className="py-2 px-2 border-b">Division</th>
        <th className="py-2 px-2 border-b">Status</th>
        <th className="py-2 px-2 border-b"></th>
        <th className="py-2 px-2 border-b"></th>
        <th className="py-2 px-2 border-b"></th>
      </tr>
    </thead>
    <tbody>
      {data ? data.map((project) => (
        <tr key={project._id} className="hidden lg:table-row">
          <td className="py-2 px-3 border-b">
            <div className="font-bold">{project.ProjectName}</div>
            <div className="text-sm">
              <div>{formatDate(project.StartDate)} to {formatDate(project.EndDate)}</div>
            </div>
          </td>
          <td className="py-2 px-3 border-b">{project.Reason}</td>
          <td className="py-2 px-3 border-b">{project.Category}</td>
          <td className="py-2 px-3 border-b">{project.Type}</td>
          <td className="py-2 px-3 border-b">{project.Priority}</td>
          <td className="py-2 px-3 border-b">{project.Department}</td>
          <td className="py-2 px-3 border-b">{project.Location}</td>
          <td className="py-2 px-3 border-b">{project.Division}</td>
          <td className="py-2 px-3 border-b">{project.status}</td>
          <td className="py-2 px-3 border-b">
            <div className="flex space-x-2">
              <button
                className="p-1 bg-blue-600 rounded-3xl w-[70px] text-white border-2"
                onClick={() => UpdateStatus(project._id, "Running")}
              >
                Start
              </button>
              <button
                className="p-1 bg-white rounded-3xl w-[70px] text-blue-500 border-2 border-blue-500"
                onClick={() => UpdateStatus(project._id, "Closed")}
              >
                Close
              </button>
              <button
                className="p-1 bg-white rounded-3xl w-[70px] text-blue-500 border-2 border-blue-500"
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
   
    <div className="flex flex-col items-center lg:hidden ">
      {data ? data.map((project, index) => (
        <div key={index} className="border rounded-lg p-4 mb-4 bg-white shadow w-full md:w-4/4 lg:w-1/2 ">
          <div className="font-bold text-lg">{project.ProjectName}</div>
          <div className="text-sm m-1">{formatDate(project.StartDate)} to {formatDate(project.EndDate)}</div>
          <div className="text-gray-600"><span className="font-bold">Reason: </span>{project.Reason}</div>
          <div className="text-gray-600"><span className="font-bold">Category:</span> {project.Category}</div>
          <div className="text-gray-600"><span className="font-bold">Type:</span> {project.Type}</div>
          <div className="text-gray-600"><span className="font-bold">Priority:</span> {project.Priority}</div>
          <div className="text-gray-600"><span className="font-bold">Department:</span> {project.Department}</div>
          <div className="text-gray-600"><span className="font-bold">Location:</span> {project.Location}</div>
          <div className="text-gray-600"><span className="font-bold">Division:</span> {project.Division}</div>
          <div className="text-gray-600"><span className="font-bold">Status:</span>   {project.status}</div>
          <div className="flex space-x-2 mt-2 justify-center">
            <button
              className="p-1 bg-blue-600 rounded-3xl w-[70px] text-white border-2"
              onClick={() => UpdateStatus(project._id, "Running")}
            >
              Start
            </button>
            <button
              className="p-1 bg-white rounded-3xl w-[70px] text-blue-500 border-2 border-blue-500"
              onClick={() => UpdateStatus(project._id, "Closed")}
            >
              Close
            </button>
            <button
              className="p-1 bg-white rounded-3xl w-[70px] text-blue-500 border-2 border-blue-500"
              onClick={() => UpdateStatus(project._id, "Cancelled")}
            >
              Cancel
            </button>
          </div>
        </div>
      )) : <div className="text-center text-2xl">No project created yet</div>}
    </div>

    

    </>
  );
}

export default TableData;
