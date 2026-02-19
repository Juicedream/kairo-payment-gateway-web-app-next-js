"use client";
import { InitiatePaymentModal } from "./InitiatePaymentModal";

export default function PaymentsHeader({setPayments}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">Payments Page</h2>
        <p className="text-sm text-gray-500">
          View and manage all payments made on the platform
        </p>
      </div>
      <button className="btn btn-primary" onClick={()=>{
      document.getElementById('my_modal_3').showModal()
      }}>Initiate Payment</button>
      <InitiatePaymentModal setPayments={setPayments} />
    </div>
  );
}
