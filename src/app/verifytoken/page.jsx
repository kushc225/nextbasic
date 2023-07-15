"use client" 
import axios from "axios"
import Link from "next/link"
import toast,{ Toaster } from "react-hot-toast"
import {useState } from "react"
export default function VerifyEmail() {
    const [token,setToken] = useState("")
    const [verified,setVerified] = useState(false)
    const verifyUserMail = async () => {
        try {
            const token = window.location.search.split("=")[1];
            setToken(token || "")
            console.log(token)
            const data = await axios.post('/api/users/verifyemail',{token})
            if(data.data.success) {
                setVerified(true);
                toast.success("verified return to login")

            }else {
                toast.error('could not veified...')
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (<div className="absolute left-1/2 right-1/2">
        <h1 className="text-4xl ">Verify Email</h1>
        <h2>{token? `${token}`:"no token"}</h2>
        <button 
        className="absolute left-1/2 right-1/2 bg-blue-500 shadow-md rounded-xl"
        onClick={verifyUserMail}>Verify Email</button>

        {
            verified && (
                <div>
                    <p>Email veified Please </p><Link href="/login">Login</Link>
                </div>
            )
        }
        <Toaster/>
    </div>)
}