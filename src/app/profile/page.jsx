'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const Profile = () => {
  const router = useRouter()
  const hdl = async () => {
    console.log(user.username);
    router.push(`/profile/${user.username}`)
  }
  useEffect(()=> {
    getData();
  },[])
  const [user,setUser] = useState({});
  const getData = async () => {
    const data = await axios.get('/api/users/me');
    if(data.data.success) {
      setUser(data.data.user);
    }
  }
  return (
    <>
  <div className='absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2'>bsdk 
  
  <p>{user?.username || "loading"}</p>
    <button className=' bg-blue-500 border-none rounded-xl px-4 py-2 mt-2 hover:border-2 hover:border-blue-500' onClick={hdl}>More ?</button>
  </div>
    </>
  )
}

export default Profile