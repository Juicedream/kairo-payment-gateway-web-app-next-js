import { useState } from "react";
import BlinkPayLoginForm from "./BlinkPayLoginForm";
import { linkBlinkPayAccount, verifyOtpBlinkpayAccount } from "../../lib/user";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { useEffect } from "react";

export function BlinkPayAccountModal({ user, onFetchProfile, token }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState("");

  async function handlePasswordLogin(userEmail) {
    setLoading(true);
    setEmail(userEmail);
    try {
      // "No Otp found on this account, please request for a new one"
      const response = await linkBlinkPayAccount(email);
      if (response.status === "failed") {
        throw Error(response.error);
      }
      setShowForm(false);
      setShowOtpForm(true);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setEmail("");
      document.getElementById("my_modal_3").close();
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordLogin(userEmail) {
    setLoading(true);
    setEmail(userEmail);
    console.log({email});
    try {
      // "No Otp found on this account, please request for a new one"
      const response = await linkBlinkPayAccount(userEmail);
      if (response.status === "failed") {
        throw Error(response.error);
      }
      localStorage.setItem("otp", response?.otp);
      localStorage.setItem("email", userEmail);
      setShowForm(false);
      setShowOtpForm(true);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setEmail("");
      document.getElementById("my_modal_3").close();
    } finally {
      setLoading(false);
    }
  }

  async function handleOtpVerification(userEmail, userOtp, userId) {
    setLoading(true);
    try {
      // "No Otp found on this account, please request for a new one"
      const response = await verifyOtpBlinkpayAccount(userEmail, userOtp, userId);
      if (response.status === "failed") {
        throw Error(response.error);
      } else {
        setShowOtpForm(false);
        document.getElementById("my_modal_3").close();
        toast.success(response.message);
        onFetchProfile(token);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      if (error.message === "No Otp found on this account, please request for a new one") {
        setShowOtpForm(false);
        setOtp("");
        localStorage.removeItem("otp");
        localStorage.removeItem("email");
        document.getElementById("my_modal_3").close();
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    onFetchProfile(token);
  }, [token]);
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {!showForm && !showOtpForm && (
          <>
            <h3 className="font-bold text-lg text-center">
              Login to your Blinkpay account
            </h3>

            <div className="mt-4">
              <p>
                Is your blink pay account email the same as your account?{" "}
                {user?.email}
              </p>
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  disabled={loading}
                  onClick={() => handlePasswordLogin(user?.email)}
                  className={`btn btn-success btn-soft ${loading && "animate-pulse"}`}
                >
                  {loading ? "linking..." : "Yes, link account"}
                </button>
                <button
                  onClick={() => setShowForm(true)}
                  className="btn btn-error"
                >
                  No
                </button>
              </div>
            </div>
          </>
        )}
        {showForm && (
          <BlinkPayLoginForm
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            userId={user?._id}
            setShowForm={setShowForm}
            onPasswordlessLogin={handlePasswordLogin}
          />
        )}

        {showOtpForm && (
          <>
            <h3 className="font-bold text-lg text-center">Verify Otp</h3>
            <span className="text-center text-sm mt-2">
              Check your mail for an otp
            </span>
            <div className="flex flex-col justify-center items-center">
              <input
                type="text"
                placeholder="Otp"
                value={otp}
                onChange={(e) => setOtp(Number(e.target.value))}
              />
              <button
                disabled={loading}
                onClick={() => handleOtpVerification(email, otp, user?._id)}
                className="btn btn-success mt-6"
              >
                {loading ? <Loader className="animate-spin" /> : "Submit"}
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
