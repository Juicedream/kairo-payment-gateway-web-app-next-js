import { Loader } from "lucide-react";
import { useEffect } from "react";
import { getAllPayments, initiatePayment } from "../../lib/payments";
import { toast } from "react-toastify";


export default function BlinkPayLoginForm({
  email,
  setEmail,
  setError,
  error,
  loading,
  setLoading,
  userId,
 onPasswordlessLogin,
}) {
   
  useEffect(() => {
    if (!email) {
      setError("Email and password are required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  }, [email, setError]);

  async function handleLogin(e) {
    e.preventDefault();
   onPasswordlessLogin(email);
  }

  return (
    <>
      <div className="mt-4 px-18 flex-col items-center justify-center">
        <p>Enter your blinkpay email address</p>
        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="johndoe@gmail.com"
            required
          />
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>
      </div>
      {/* <div className="mt-4 px-18 flex-col items-center justify-center">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="input validator"
          required
          placeholder={"Password"}
          title={`Enter your blink pay account password`}
        />
        <p className="validator-hint">
          Amount must be between {min} to {String(max).toLocaleString()}
        </p>
      </div> */}
      <div className="mt-4 px-18 flex-col items-center justify-center">
        {!error && (
          <button
            className="btn btn-primary w-full"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin" /> : "Link account"}
          </button>
        )}
      </div>
    </>
  );
}
