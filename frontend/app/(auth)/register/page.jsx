"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { registerUser } from "../../lib/user";
import  useAuthStore  from "../../../store/useAuthStore";
import { useRouter } from "next/navigation";


const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordError, setShowPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {login, user} = useAuthStore();
  const router = useRouter();
  const disableButton =
    !email ||
    !password ||
    showPasswordError ||
    !confirmPassword ||
    !firstName ||
    !lastName ||
    !orgName;
  async function handleRegister() {
    setLoading(true);
    try {
      // toast.success("Login Successfully");
      const data = await registerUser(
        email,
        password,
        firstName,
        lastName,
        orgName,
      );
      if (data.status === "failed") {
        toast.error(data.error);
      } else {
        await login(data.token);
        toast.success(data.msg);
        setEmail("");
        setConfirmPassword("");
        setOrgName("");
        setLastName("");
        setPassword("");
        setFirstName("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  function checkPasswordMatch() {
    if (password === "" || confirmPassword === "") {
      setShowPasswordError("");
      return;
    }

    if (confirmPassword !== password) {
      setShowPasswordError("Passwords don't match");
      return;
    }
    if (confirmPassword === password) {
      setShowPasswordError("");
      return;
    }
  }

  useEffect(() => {
    if (password || confirmPassword) {
      checkPasswordMatch();
    }
  }, [password, confirmPassword,]);

  useEffect(() => {
    if (user) {
      if (user?.role === "customer") {
        router.replace("/dashboard");
      }
    } else {
      router.replace("/register");
    }
  }, [user, router])

  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Register</legend>

          <label className="label">First Name</label>
          <input
            type="text"
            className="input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label className="label">Last Name</label>
          <input
            type="text"
            className="input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label className="label">Organization Name</label>
          <input
            type="text"
            className="input"
            placeholder="Organization Name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="label">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {showPasswordError && (
            <p className="text-red-400 mt-2">{showPasswordError}</p>
          )}

          {/* show password */}
          <div className="flex flex-row items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="show"
              className="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <label htmlFor="show" className="label">
              Show Password
            </label>
          </div>

          {!disableButton && (
            <button
              className="btn btn-neutral mt-4"
              disabled={loading}
              onClick={handleRegister}
            >
              {loading ? <span className="loading loading-dots loading-lg"></span> : "Register"}
            </button>
          )}
          <p className="w-full text-center text-accent mt-4">
            Already have an account?{" "}
            <Link className="underline" href="/login">
              Login
            </Link>
          </p>
          <p className="w-full text-center text-base-accent mt-4">
            <Link className="underline" href="/">
              Go Home
            </Link>
          </p>
        </fieldset>
      </div>
    </>
  );
};

export default RegisterPage;
