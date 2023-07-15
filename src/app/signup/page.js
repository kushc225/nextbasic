"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
const Signup = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isButtonDis, setIsButtonDis] = useState(true);
  const [isVerify, setIsVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const singupHdl = async () => {
    try {
      setLoading(true);
      const data = await axios.post("/api/users/new", user);
      console.log(data.data);
      if (data.data.success) {
        // toast.success(data.data.msg);
        toast.success("Please Verify your email!");
      } else {
        setErr(data.data.msg);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setIsButtonDis(false);
    } else {
      setIsButtonDis(true);
    }
  }, [user]);
  return (
    <>
      <div className="absolute top-1/3 right-1/2 ">
        <h1 className="text-center">{loading ? "Processing" : " Signup"}</h1>
        <Toaster />
        <div className=" text-black border-1 border-red-500 mt-2 ">
          <input
            className="py-3 px-2"
            name="username"
            onChange={(e) => inputHandler(e)}
            value={user.username}
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="text-black border-1 border-red-500 mt-2 ">
          <input
            className=" py-3 px-2"
            name="email"
            onChange={(e) => inputHandler(e)}
            value={user.email}
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="text-black border-1  border-red-500 mt-2 ">
          <input
            className="py-3 px-2"
            name="password"
            onChange={(e) => inputHandler(e)}
            value={user.password}
            type="password"
            placeholder="Password"
          />
        </div>
        {!isVerify && (
          <div>
            <div
              className={`text-center mt-2 bg-violet-700 px-2 py-3 hover:bg-violet-600`}
              onClick={singupHdl}
            >
              <button>{isButtonDis ? "Cannot Signup " : " Sign UP"}</button>
            </div>
            <div className="">
              <Link className="block mt-4 text-center" href="/login">
                visit login
              </Link>
            </div>
          </div>
        )}
        {isVerify && (
          <div
            className={`text-center mt-2 bg-violet-700 px-2 py-3 hover:bg-violet-600`}
            onClick={singupHdl}
          >
            <button>Verify Email</button>
          </div>
        )}
        <div className="text-center mt-4"></div>
      </div>
    </>
  );
};

export default Signup;
