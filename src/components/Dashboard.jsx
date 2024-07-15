import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import header  from "../Images/Header-bg.jpg";
import Graphs from './Graphs';
import logo from "../Images/Logo.jpg";


function Dashboard() {
 
  const [total ,setTotal] = useState(0);
  const [runningProjects , setRunningProjects]= useState(0);
  const[closed ,setClosed]=useState(0);
  const[cancelled ,setCancelled]=useState(0);
  const [delay , setdelay] = useState(0);


  useEffect(()=>{
    async function getList (){
      try {
      
        const response = await axios.get(`https://online-project-management-onae.onrender.com/ProjectList`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        // console.log(response,new Date().toDateString());
    
        const data = response.data;
       const find = data.filter((project)=> project.status === "Closed");
       const Running = data.filter((project)=> project.status === "Running");
       const filter = data.filter((project)=> project.status === "Running" && project.EndDate < new Date().toDateString()  )
      //  console.log(filter);
       const cancelled = data.filter((project)=> project.status === "Cancled");

      setTotal(response.data.length);
        setClosed(find.length);
        setRunningProjects(Running.length);
        setCancelled(cancelled.length);
        setdelay(filter.length);
      
      } catch (error) {
        console.log(error);
      }
    }
    getList();
  },[])
 

  return (
    <div className="flex flex-col lg:flex-row  h-screen w-full">
      <div className=" text-white w-full lg:w-20 p-4 sm:max-h-20 ">
       <Navbar/>
      </div>
      <div className='flex-grow p-2 lg:ml-6'>
      {/* <div className="flex-grow "> */}
       <div className='relative '>
        <img src={header} alt='headingimage' className='h-auto max-w-full  '></img>
        <div className="absolute lg:top-[2rem] justify-center lg:right-[36rem] sm:right-[16rem] Sm:right-[16rem] sm:top-[1rem] Sm:top-[1rem] md:right-[28rem] md:top-[1rem]  " style={{ top: logo }}>
        <img
          src={logo}
          alt="logo"
          className="lg:w-20 lg:h-20 Sm:w-10 Sm:h-10 sm:w-10 sm:h-10 md:w-20 md:h-20 object-cover rounded-full  "
        />
       
      </div>
        <h1 className='absolute lg:top-10 left-5 right-0 text-white font-bold text-2xl sm:top-1'>Dashboard</h1>
        <div class="flex lg:flex-row justify-around sm:justify-around absolute lg:bottom-[-4rem]  sm:bottom-[-5rem] left-0 right-0 ">
        
  <div className='bg-white shadow-2xl h-[90px] w-[220px] rounded-md  sm:h-[80px] sm:w-[180px]'>
    <div className='w-1 h-[90px] bg-blue-400 flex rounded sm:h-[80px]'>
        <div className='lg:text-lg sm:text-sm  ml-3 sm:ml-4'>TotalProjects <span className='text-4xl m-2'>{total }</span></div>
          </div>
         </div>
         <div className='bg-white shadow-2xl h-[90px] w-[220px] rounded-md sm:h-[80px] sm:w-[180px] '>
    <div className='w-1 h-[90px] bg-blue-400 flex rounded sm:h-[80px]'>
        <div className='lg:text-lg  ml-3 sm:text-sm'>Closed <span className='text-4xl m-2'>{closed }</span></div>
          </div>
         </div>
         <div className='bg-white shadow-2xl h-[90px] w-[220px]  rounded-md sm:hidden lg:block Sm:hidden '>
    <div className='w-1 h-[90px] bg-blue-400 flex rounded'>
        <div className='lg:text-lg  ml-3 sm:text-sm '>Running <span className='text-4xl m-2'>{runningProjects }</span></div>
          </div>
         </div>
         <div className='bg-white shadow-2xl h-[90px] w-[220px] rounded-md sm:hidden lg:block Sm:hidden '>
    <div className='w-1 h-[90px] bg-blue-400  rounded    '>
        <div className='lg:text-lg  ml-3 sm:text-sm '>ClosureDelay <span className='text-4xl m-2'>{delay}</span></div>
          </div>
         </div>
  <div className='bg-white shadow-2xl h-[90px] w-[220px] rounded-md lg:block sm:h-[80px] sm:w-[180px] '>
         <div className='w-1 h-[90px] sm:h-[80px] bg-blue-400 flex rounded  '>
            <div className=' lg:text-lg  ml-3 sm:taxt-sm '>Cancelled <span className='text-4xl m-2'>{cancelled}</span></div>
          </div>
  </div>
            </div>

       </div>
       <Graphs/>
      
      {/* </div> */}
      


 

  </div>
    
    </div>
  )
}

export default Dashboard
