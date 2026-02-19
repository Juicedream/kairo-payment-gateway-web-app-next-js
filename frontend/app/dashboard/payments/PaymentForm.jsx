import { Loader } from "lucide-react";
import { useEffect } from "react";
import { getAllPayments, initiatePayment } from "../../lib/payments";
import { toast } from "react-toastify";


export default function PaymentForm({
  min = 10,
  max = 100,
  email,
  setEmail,
  amount,
  setAmount,
  setError,
  error,
  loading,
  setLoading,
  setPayments,
}) {
  useEffect(() => {
    if (!email || !amount) {
      setError("Email and amount are required");
    } else if (amount < min || amount > max) {
      setError(`Amount must be between ${min} and ${max}`);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  }, [email, amount, setError, min, max]);

  async function handleInitatePayment(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await initiatePayment(email, amount);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.message);
      }
    } catch (err) {
      console.error("Error initiating payment ", err);
    } finally {
      const response = await getAllPayments();
      setPayments(response.payments || []);
      document.getElementById("my_modal_3").close();
      setLoading(false);
      setEmail("");
      setAmount("");
    }
  }

  return (
    <>
      <div className="mt-4 px-18 flex-col items-center justify-center">
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
      <div className="mt-4 px-18 flex-col items-center justify-center">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="input validator"
          required
          placeholder={`Amount (between ${min} to ${Number(max).toLocaleString()})`}
          min={String(min)}
          max={String(max)}
          minLength={min}
          maxLength={max}
          title={`Must be between ${min} to ${max}`}
        />
        <p className="validator-hint">
          Amount must be between {min} to {String(max).toLocaleString()}
        </p>
      </div>
      <div className="mt-4 px-18 flex-col items-center justify-center">
        {!error && (
          <button
            className="btn btn-primary w-full"
            onClick={handleInitatePayment}
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin" /> : "Initiate Payment"}
          </button>
        )}
      </div>
    </>
  );
}
