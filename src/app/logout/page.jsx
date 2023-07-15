'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast, { Toaster } from "react-hot-toast";
const Profile = () => {
  const router = useRouter()
  const logoutHdl = async () =>{
    const data = await axios.get('api/users/logout');
    // console.log(data)
    if(data.data.success) {
      router.push('/login')
    }
      else {
        toast.error("Unable to Logout...")
      }
  }
  return (
    <div className='absolute top-1/2 left-1/2'>
      <Toaster/>
      <button className="rounded-xl shadow-sm hover:bg-transparent  hover:border-2 hover:border-blue-500 transition-colors bg-blue-500 px-4 py-2 text-white" onClick={logoutHdl}>Logout</button>
    </div>
  )
}

export default Profile