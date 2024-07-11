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
  const HandleStatus = (projectId, Status) => {
    UpdateStatus(projectId, Status);
  };
  return (
    <>
      <tbody>
        { data ? data.map((project) => (
          // console.log(project.ProjectName, project.status)
          <tr key={project._id}>
            <td className="py-2 px-4 border-b ">
            <div className="font-bold">  {project.ProjectName}</div>
              <div className="text-sm">
                <div>
                  {" "}
                  {formatDate(project.StartDate)} to{" "}
                  {formatDate(project.EndDate)}
                </div>
              </div>
            </td>
            <td className="py-2 px-3 border-b ">{project.Reason}</td>
            <td className="py-2 px-3 border-b">{project.Category}</td>
            <td className="py-2 px-3 border-b">{project.Type}</td>
            <td className="py-2 px-3 border-b">{project.Priority}</td>
            <td className="py-2 px-3 border-b">{project.Department}</td>
            <td className="py-2 px-3 border-b">{project.Location}</td>
            <td className="py-2 px-3 border-b">{project.Division}</td>
            <td className="py-2 px-3 border-b">{project.status}</td>

            <div className="">
              <button
                className="p-2 bg-blue-300 m-2  rounded-lg w-[70px] hover:bg-white text-blue-500 border-2"
                onClick={() => HandleStatus(project._id, "Running")}
              >
                Start
              </button>
              <button
                className="p-2 bg-blue-300 m-2 rounded-lg w-[70px]  hover:bg-white text-blue-500 border-2"
                onClick={() => HandleStatus(project._id, "Closed")}
              >
                Close
              </button>
              <button
                className="p-2 bg-blue-300 m-2 rounded-lg w-[70px] "
                onClick={() => HandleStatus(project._id, "Cancled")}
              >
                Cancel
              </button>
            </div>
          </tr>
        )) : <div className="text-center text-2xl">Loading.....</div>}
      </tbody>
    </>
  );
}

export default TableData;
