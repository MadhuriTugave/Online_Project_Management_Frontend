import React, { useState, useRef, useEffect } from "react";

import {  NavLink, useLocation, useNavigate } from "react-router-dom";
 import logo  from "../Images/Dashboard-active.jpg";
 import ProjectList from "../Images/Project-list-active.jpg";
 import createProject from "../Images/image1.jpg"
 import profile  from "../Images/Logout (1).jpg"



function Navbar() {

    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  
    const profileRef = useRef(null);

    const navigate = useNavigate();

    const { pathname } = useLocation();
    const location = pathname.split("/")[1];

    const access_token = localStorage.getItem("access_token");

    const handleLogout = () => {
  ;
        localStorage.removeItem("access_token")
        navigate("/")
      };
      useEffect(() => {
        const calculatePopupPosition = () => {
          if (profileRef.current && showProfileOptions) {
            const profileRect = profileRef.current.getBoundingClientRect();
            const navbarRect =
              profileRef.current.parentElement.getBoundingClientRect();
            const popupPos =
              profileRect.bottom > profileRect.left
                ? {
                    top: navbarRect.bottom - 144,
                    left: navbarRect.right - 24,
                  }
                : {
                    top: navbarRect.bottom + 8,
                    left: navbarRect.right - 260,
                  };
            setPopupPosition(popupPos);
          }
        };
    
        calculatePopupPosition();
    
        window.addEventListener("resize", calculatePopupPosition);
    
        return () => {
          window.removeEventListener("resize", calculatePopupPosition);
        };
      }, [showProfileOptions]);
  return (
    <>
    <nav className="flex justify-between items-center p-3 lg:mt-0 bg-box-bg sm:w-[90%] sm:mx-auto sm:mt-4  sm:rounded-xl lg:max-w-20 lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:z-50  lg:rounded-xl bg-white box-shadow shadow hover:shadow-2xl">
   
      <div className="flex lg:flex-col lg:items-center lg:justify-center lg:flex-grow lg:mt-2 lg:mb-4">
        <NavLink
          to="/Dashboard"
          className={`text-white p-3 hover:text-blue-500 ${
            !location ? "text-blue-500" : "opacity-75"
          }`}
        >
        <img src={logo} alt="DashbordLogo" className="w-8 lg:w-full" />
        </NavLink>
        <NavLink
          to="/ProjectList"
          className={`text-white p-3  ${
            location === "ProjectList" ? "text-blue-500" : "opacity-75"
          }`}>
       <img src={ProjectList} alt="Projects" className="w-8 lg:w-full" />
        </NavLink>
        <NavLink
          to="/Create"
          className={`text-white p-3 ${
            location === "Create" ? "text-blue-500" : "opacity-75"
          }`}
        >
       <img src={createProject} alt="Logo" className="w-8 lg:w-full" />
        </NavLink>
       
      </div>
      <div ref={profileRef}>
        <img src={profile} alt="logout"
          className="w-6 h-6 lg:mt-auto lg:mb-4  cursor-pointer"
          onClick={() => setShowProfileOptions(!showProfileOptions)}
        />
      </div>
      {showProfileOptions && (
        <div
          className="bg-blue-400 rounded-xl shadow-2xl p-4 absolute"
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
            zIndex: 100,
          }}
        >
          {access_token ? (
            <div className="text-white text-center">
              {/* <p>{user.data.email}</p> */}
              <button
                className="bg-white-bg text-blue m-2 py-2 px-4 rounded hover:bg-white transition duration-300 hover:text-blue-500 box-shadow shadow"
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
  )
}

export default Navbar
