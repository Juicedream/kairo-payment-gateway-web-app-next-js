"use client";
import  Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import {ToastContainer, toast} from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const disableButton = !email || !password;
  async function handleSignIn () {
    setLoading(true);
    toast.success("Login Successfully");
    setLoading(false);
  }
  return (
    <>
    <ToastContainer />
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>

          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>

          <button className="btn btn-neutral mt-4" disabled={disableButton} onClick={handleSignIn}>
           {loading ? "...." : "Login"}
            </button>
          <p>
            Don&apos;t have an account? <Link className="underline" href="/register">Register</Link> 
          </p>
        </fieldset>
      </div>
    </>
  );
}

export default LoginPage
