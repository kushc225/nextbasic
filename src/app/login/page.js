"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const page = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const loginHanlder = async () => {
    try {
      setLoading(true);
      const resp = await axios.post("api/users/login", user);
      if (resp.data.success) {
        router.push(`/profile`);
      } else {
        toast.error(resp.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [isButtonDis, setIsButtonDis] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setIsButtonDis(false);
    } else {
      setIsButtonDis(true);
    }
  }, [user]);
  return (
    <div className="absolute top-1/3 right-1/2 ">
      <Toaster />
      <h1 className="text-center">{loading ? "Processing" : "login"}</h1>
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
      <div
        className="text-center mt-2 bg-violet-700 px-2 py-3 hover:bg-violet-600"
        onClick={loginHanlder}
      >
        <button>{isButtonDis ? "Disable login" : "Login"}</button>
      </div>
      <div className="text-center mt-4">
        <Link href="/signup">Visit SignUP</Link>
      </div>
    </div>
  );
};

export default page;
