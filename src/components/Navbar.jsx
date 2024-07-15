import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../Images/Dashboard-active.jpg";
import ProjectList from "../Images/Project-list-active.jpg";
import createProject from "../Images/image1.jpg";
import profile from "../Images/Logout (1).jpg";
import { useSelector } from "react-redux";

function Navbar() {
  const user = useSelector((state) => state);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const navigate = useNavigate();

  const access_token = localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <>
      <nav className="flex justify-between items-center p-3 lg:mt-0 bg-box-bg sm:w-[100%] sm:mx-auto sm:mt-4  sm:rounded-xl lg:max-w-20 lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:z-50  lg:rounded-xl shadow-md shadow-blue-500/50 bg-white box-shadow shadow hover:shadow-2xl">
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
            onClick={() => setShowProfileOptions(!showProfileOptions)}
          />
        </div>
        {showProfileOptions && (
          <div
            className=" rounded-xl shadow-xl p-2 absolute lg:top-[30rem] md:left-[40rem] md:top-[1rem] lg:left-[-1rem] sm:top-[1rem] sm:right-[5rem] Sm:top-[1rem] Sm:right-[5rem]  text-blue"
              // position: "absolute",
              // left: "110px",
              // bottom: "10px", "
            style={{
              // backgroundColor: "blue",
              // text: "blue",
              // position: "absolute",
              // left: "110px",
              // bottom: "10px",
            }}
          >
            {access_token ? (
              <div className="text-white text-center">
                <p>{user.LoginLogoutUser.user.email}</p>
                <button
                  className="bg-blue-500   py-2 px-4 rounded hover:bg-blue-300 transition duration-300 hover:text-blue-500 "
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="text-white text-center">
                <button
                  className="bg-white-bg text-blue m-2 py-2 px-4 rounded hover:bg-white transition duration-300 hover:text-blue-500 box-shadow shadow"
                  onClick={() => navigate("/")}
                >
                  Login
                </button>
                <button
                  className="bg-white-bg text-white m-2 py-2 px-4 rounded  hover:bg-white transition duration-300 hover:text-blue-500 box-shadow shadow"
                  onClick={() => navigate("/SignUp")}
                >
                  SignUp
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
