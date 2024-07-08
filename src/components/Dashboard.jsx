import React from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux';

function Dashboard() {
  const user = useSelector((state) => state);
  console.log(user.LoginLogoutUser)
  return (
    <div className='bg-blue-100 h-screen w-full'>
   
      <Navbar/>
    </div>
  )
}

export default Dashboard
