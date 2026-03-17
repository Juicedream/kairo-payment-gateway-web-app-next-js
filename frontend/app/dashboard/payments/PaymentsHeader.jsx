"use client";
import { toast } from "react-toastify";
import { InitiatePaymentModal } from "./InitiatePaymentModal";

export default function PaymentsHeader({setPayments, user}) {
  function handleInitiatePayment () {
    if (!user?.apiKey){
      toast.error("You need an api key, Go to settings...");
    }else {
      document.getElementById('my_modal_3').showModal()
    }
  }
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">Payments Page</h2>
        <p className="text-sm text-gray-500">
          View and manage all payments made on the platform
        </p>
      </div>
      <button className="btn btn-primary" onClick={handleInitiatePayment}>Initiate Payment</button>
      <InitiatePaymentModal setPayments={setPayments} user={user} />
    </div>
  );
}
