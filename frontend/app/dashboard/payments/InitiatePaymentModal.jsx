import { useState } from "react";
import PaymentForm from "./PaymentForm";

export function InitiatePaymentModal({setPayments}) {
  const min = 100;
  const max = 100000;
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-center">Initiate Payment</h3>
        {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
       <PaymentForm 
        min={min}
        max={max}
        email={email}
        setEmail={setEmail}
        amount={amount}
        setAmount={setAmount}
        error={error}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
        setPayments={setPayments}
       />
      </div>
    </dialog>
  );
}
