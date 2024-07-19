import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../Images/Dashboard-active.jpg";
import ProjectList from "../Images/Project-list-active.jpg";
import createProject from "../Images/image1.jpg";
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
      <nav className="flex justify-between items-center p-1 lg:mt-0 bg-box-bg sm:w-[100%] sm:mx-auto sm:mt-4  sm:rounded-xl lg:max-w-[60px] lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:z-50  lg:rounded-xl shadow-sm shadow-blue-500/50 bg-white box-shadow shadow hover:shadow-2xl">
        <div className="flex lg:flex-col lg:items-center lg:justify-center lg:flex-grow lg:mt-2 lg:mb-4">
          <NavLink
            to="/Dashboard"
            className="text-white p-3 hover:text-blue-500"
          >
            <img src={logo} alt="DashbordLogo" className="w-8 lg:w-full" />
          </NavLink>
          <NavLink to="/ProjectList" className="text-white p-3 ">
            <img src={ProjectList} alt="Projects" className="w-8 lg:w-full" />
          </NavLink>
          <NavLink to="/Create" className="text-white p-3 opacity-75">
            <img src={createProject} alt="Logo" className="w-8 lg:w-full" />
          </NavLink>
        </div>
        <div>
          <img
            src={profile}
            alt="logout"
            className="w-6 h-6 lg:mt-auto lg:mb-5  cursor-pointer  "
            onClick={handleLogout}
          />
        </div>
        
      </nav>
    </>
  );
}

export default Navbar;
