import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../Images/Dashboard-active (1).svg";
import ProjectList from "../Images/Project-list-active (1).svg";
import createProject from "../Images/create-project-active.svg";
import profile from "../Images/Logout (1).jpg";
// import { useSelector } from "react-redux";

function Navbar() {
  // const user = useSelector((state) => state);
  // console.log(user)

  const navigate = useNavigate();



  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <>
      <nav className="flex justify-between    lg:mt-0 sm:w-[100%] sm:mx-auto   sm:rounded-xl lg:max-w-[58px]  lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 Sm:shadow-lg lg:shadow-lg  lg:rounded-xl  bg-white ">
        <div className="  lg:flex lg:flex-col lg:items-center lg:justify-center h-screen Sm:hidden lg:block md:block md:flex      ">
          <NavLink
            to="/Dashboard" 
            className={({ isActive }) =>
              `text-white p-3 mb-4 w-full ${isActive ? 'border-l-4  border-blue-500' : ''}`
            }>
            <img src={logo} alt="DashbordLogo" className="w-7 "/>
          </NavLink>
          <NavLink to="/ProjectList"
           className={({ isActive }) =>
            `text-white p-3 mb-4 w-full ${isActive ? 'border-l-4 border-blue-500' : ''}`
          }
           >
            <img src={ProjectList} alt="Projects" className="w-7 " />
          </NavLink>
          <NavLink to="/Create" 
         className={({ isActive }) =>
          `text-white p-3 w-full ${isActive ? 'border-l-4   border-blue-500' : ''}`
        }
          >
            <img src={createProject} alt="Logo" className="w-7  " />
          </NavLink>
        </div>
        <div className="md:hidden   lg:hidden Sm:w-[100%]   sm:w-[70%] Sm:block sm:block  Sm:flex Sm:justify-between">
          <NavLink
            to="/Dashboard"
            //  className="text-white p-3 "
            className={({ isActive }) =>
              `text-white p-3  ${isActive ? 'border-b-4  border-blue-500' : ''}`
            }
            >
            <img src={logo} alt="DashbordLogo" className="w-8 lg:w-full" />
          </NavLink>
          <NavLink to="/Create" 
          // className="text-white p-3 "
          className={({ isActive }) =>
            `text-white p-3  ${isActive ? 'border-b-4   border-blue-500' : ''}`
          }
          >
            <img src={createProject} alt="Logo" className="w-8 lg:w-full" />
          </NavLink>
          <NavLink to="/ProjectList" 
           className={({ isActive }) =>
            `text-white p-3  ${isActive ? 'border-b-4   border-blue-500' : ''}`
          }
          >
            <img src={ProjectList} alt="Projects" className="w-8 lg:w-full" />
          </NavLink>
         
        </div>
        <div>
          <img
            src={profile}
            alt="logout"
            className="w-6 h-6 Sm:mt-6 mt-auto lg:mb-5 Sm:hidden lg:block   cursor-pointer  "
            onClick={handleLogout}
          />
        </div>
        
      </nav>
    </>
  );
}

export default Navbar;
