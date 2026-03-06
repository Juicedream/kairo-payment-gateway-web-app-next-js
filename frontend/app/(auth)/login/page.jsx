"use client";
import  Link from "next/link";
import { useState, useEffect } from "react";
import {ToastContainer, toast} from "react-toastify";
import { loginUser  } from "../../lib/user";
import useAuthStore from "../../../store/useAuthStore";

import {useRouter} from "next/navigation";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {login, user} = useAuthStore();
  const router = useRouter();
  const disableButton = !email || !password;

  async function handleSignIn () {
    setLoading(true);
    try {
      // toast.success("Login Successfully");
      const data = await loginUser(email, password);
      if (data.status === "failed") {
        toast.error(data.error);
      }else {
        await login(data.token)
        toast.success(data.msg)
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (user) {
      if (user?.role === "customer") {
        router.replace("/dashboard");
      }
    } else {
      router.replace("/login");
    }
  }, [user, router])
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

         {!disableButton && <button className="btn btn-neutral mt-4" disabled={loading} onClick={handleSignIn}>
           {loading ? <span className="loading loading-dots loading-lg"></span> : "Login"}
            </button>}
          <p className="w-full text-center text-accent mt-4">
            Don&apos;t have an account? <Link className="underline" href="/register">Register</Link> 
          </p>
        </fieldset>
      </div>
    </>
  );
}

export default LoginPage
