import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import header  from "../Images/Header-bg.jpg";
import Graphs from './Graphs';


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
        <h1 className='absolute lg:top-10 left-5 right-0 text-white font-bold text-2xl sm:top-1'>Dashboard</h1>
        <div class="flex lg:flex-row justify-around sm:justify-evenly absolute  sm:bottom-[-3rem] left-0 right-0 ">
        
  <div className='bg-white shadow-2xl h-[90px] w-[220px] rounded-md  '>
    <div className='w-1 h-[90px] bg-blue-400 flex rounded'>
        <div className='lg:text-lg sm:text-sm  ml-3'>TotalProjects <span className='text-4xl m-2'>{total ? total : <h1 className='text-sm'>Loading..</h1>}</span></div>
          </div>
         </div>
         <div className='bg-white shadow-2xl h-[90px] w-[220px] rounded-md  '>
    <div className='w-1 h-[90px] bg-blue-400 flex rounded'>
        <div className='lg:text-lg  ml-3 sm:text-sm'>Closed <span className='text-4xl m-2'>{closed ? closed : <h1 className='text-sm'>Loading..</h1>}</span></div>
          </div>
         </div>
         <div className='bg-white shadow-2xl h-[90px] w-[220px] rounded-md sm:hidden lg:block'>
    <div className='w-1 h-[90px] bg-blue-400 flex rounded'>
        <div className='lg:text-lg  ml-3 sm:text-sm '>Running <span className='text-4xl m-2'>{runningProjects ? runningProjects: <h1 className='text-sm'>Loading..</h1>}</span></div>
          </div>
         </div>
         <div className='bg-white shadow-2xl h-[90px] w-[220px] rounded-md  '>
    <div className='w-1 h-[90px] bg-blue-400  rounded    '>
        <div className='lg:text-lg  ml-3 sm:text-sm '>ClosureDelay <span className='text-4xl m-2'>{delay ? delay : <h1 className='text-sm'>Loading..</h1>}</span></div>
          </div>
         </div>
  <div className='bg-white shadow-2xl h-[90px] w-[220px] rounded-md lg:block sm:hidden md:hidden '>
         <div className='w-1 h-[90px] bg-blue-400 flex rounded  '>
            <div className=' lg:text-lg  ml-3 sm:taxt-sm '>Cancelled <span className='text-4xl m-2'>{cancelled ? cancelled :<h1 className='text-sm'>Loading..</h1>}</span></div>
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
