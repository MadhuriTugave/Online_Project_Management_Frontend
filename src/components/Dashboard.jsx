import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';

import Graphs from './Graphs';
import logo from "../Images/Logo (4).svg";
import header  from "../Images/Header-bg.svg"
import logout from "../Images/Logout (2).svg"
import "../image.css"
import { useNavigate } from 'react-router-dom';

function Dashboard() {
 
  const [total ,setTotal] = useState(0);
  const [runningProjects , setRunningProjects]= useState(0);
  const [closed ,setClosed]=useState(0);
  const [cancelled ,setCancelled]=useState(0);
  const [delay , setdelay] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    async function getList (){
      try {
      
        const response = await axios.get(`http://localhost:3001/ProjectList/CardValues`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
     
       
       console.log(response);
      const data =response.data
      const total_Projects = data.map(item => item.total_Projects);
      const total_Closed = data.map(item => item.total_Closed);  
      const total_Running = data.map(item => item.total_Running); 
      const total_Cancelled = data.map(item => item.total_Cancelled); 

      const total_delay = data.map(item => item.total_delay); 
      setTotal(total_Projects);
        setClosed(total_Closed);
        setRunningProjects(total_Running);
        setCancelled(total_Cancelled);
        setdelay(total_delay);
      
      } catch (error) {
        console.log(error);
      }
    }
    getList();
  },[]);

  const handleLogout = () => {

    localStorage.removeItem("access_token");
    navigate("/");
  };
 

  return (
    <div className="flex flex-col lg:flex-row lg:h-[700px] Sm:h-[860px]  w-full App">
      <div className="Sm:hidden lg:block md:block text-white w-full lg:w-20 lg:p-4 sm:max-h-20 ">
       <Navbar/>
      </div>
      <div className='flex-grow '>
      {/* <div className="flex-grow "> */}
       <div className='relative '>
        <img src={header} alt='headingimage' className=' lg:h-[150px] lg:w-[2290px] '></img>
        <img src={logout} alt='headingimage' className='absolute lg:hidden Sm:block Sm:top-[10px] Sm:right-4 ' onClick={handleLogout}></img>
             
        <div className="absolute lg:top-[2rem]   lg:right-[36rem] sm:right-[20rem] Sm:right-[10rem] sm:top-[1rem] Sm:top-[0rem] md:right-[27rem] md:top-[1rem]  " style={{ top: logo }}>
        <img
          src={logo}
          alt="logo"
          className="h-[53px] w-[60px] Sm:hidden sm:hidden lg:block "
        />
       
      </div>
        <h1 className='absolute lg:top-9 lg:left-8 right-0  dashboard Sm:left-[12px] Sm:top-1 Sm:text-lg'>Dashboard</h1>
       
        </div>
        <div class=" lg:ml-[70px] sm:ml-[0] Sm:ml-[2px] flex lg:flex-row justify-around Sm:justify-around absolute lg:top-[110px] md:top-[12rem] Sm:top-[60px] right-0 left-0  ">
        
  <div className='bg-white Sm:shadow-lg lg:shadow-md lg:h-[83px] lg:w-[237.6px] rounded-md md:h-[80px] md:w-[140px]  sm:h-[80px] sm:w-[100px] Sm:h-[80px]  Sm:w-[100px]'>
    <div className='w-[5px] lg:h-[83px] bg-cyan-400 flex rounded Sm:h-[80px] '>
        <div className='absolute mt-1 lg:ml-4  Sm:ml-2 sm:ml-3 text-gray-500 lg:font-[20px] Sm:text-[14px]  '>Total Projects</div> <span className= 'Sm:hidden lg:block md:block md:ml-4 span mt-7 lg:ml-4 '>{total }</span><span className= 'lg:hidden md:hidden Sm:block Sm mt-7  sm:ml-4 Sm:ml-3'>{total }</span>
          </div>
         </div>
         <div className='bg-white shadow-md lg:h-[83px] lg:w-[237.6px] rounded-md Sm:h-[80px] sm:h-[75px] Sm:w-[100px] sm:w-[100px] md:h-[80px] md:w-[140px] '>
    <div className='w-[5px] lg:h-[83px] bg-cyan-400 flex rounded Sm:h-[80px]'>
        <div className='mt-1   lg:ml-4 Sm:ml-3  sm:ml-3 text-gray-500 font-[20px]'>Closed <span className=' span lg:ml-1  sm:ml-4 Sm:ml-4 Sm:hidden lg:block md:block'>{closed }</span><span className=' span lg:ml-4 Sm sm:ml-4 Sm:ml-1 Sm:block lg:hidden md:hidden'>{closed }</span> </div>
          </div>
         </div>
         <div className='bg-white shadow-md  lg:h-[83px] lg:w-[237.6px] md:h-[80px] md:w-[140px]  rounded-md sm:hidden lg:block Sm:hidden md:block '>
    <div className='w-[5px] lg:h-[83px] md:h-[80px] bg-cyan-400 flex rounded '>
        <div className=' lg:ml-4  sm:ml-4 text-gray-500 font-[20px] mt-1 '>Running <span className='span lg:block Sm:hidden md:block'>{runningProjects }</span></div> <span className= 'lg:hidden Sm:block Sm mt-7  md:hidden sm:ml-4 Sm:ml-2'>{runningProjects }</span>
          </div>
         </div>
         <div className='bg-white shadow-md h-[83px] w-[237.6px] rounded-md sm:hidden lg:block Sm:hidden '>
    <div className='w-[5px] h-[83px] bg-cyan-400 flex rounded flex-row   '>
        <div className='absolute mt-1 lg:ml-4  sm:ml-4 text-gray-500 font-[20px] '>Closure Delay </div><span className= ' text-gray-700 text-4xl span mt-7 lg:ml-4  sm:ml-4 Sm:hidden lg:block'>{delay }</span> <span className= 'lg:hidden Sm:block Sm mt-7  sm:ml-4 Sm:ml-2'>{delay }</span>
          </div>
         </div>
  <div className='bg-white shadow-md lg:h-[83px] lg:w-[237.6px] rounded-md lg:block Sm:h-[80px]  Sm:w-[100px] sm:h-[80px]  sm:w-[110px] md:h-[80px] md:w-[140px]'>
         <div className='w-[5px] lg:h-[83px] Sm:h-[80px] bg-cyan-400 flex rounded  '>
            <div className='  mt-1 lg:ml-4 Sm:ml-3 sm:ml-3 text-gray-500 font-[20px] '>Cancelled <span className=' span lg:block Sm:hidden md:block'>{cancelled}</span> <span className= 'lg:hidden Sm:block Sm mt-7 md:hidden  sm:ml-4 Sm:mt-0 Sm:ml-1'>{cancelled }</span></div>
          </div>
  </div>
            </div>

      
    <div className='absolute lg:top-[13rem] md:top-[20rem] Sm:top-[10rem]  Sm:ml-3 lg:ml-2'>
      <h6 className='lg:ml-4  department-wise-to'>Department Wise - Total Vs Closed</h6>
    <Graphs/>
    </div>
      
      {/* </div> */}
      


     

  </div>
  <div className="lg:absolute Sm:fixed lg:hidden md:hidden Sm:w-[74%] Sm:block Sm:bottom-0 text-white w-full lg:w-20 lg:p-4 sm:max-h-20 ">
     <Navbar/>
    </div>
    </div>
  )
}

export default Dashboard
