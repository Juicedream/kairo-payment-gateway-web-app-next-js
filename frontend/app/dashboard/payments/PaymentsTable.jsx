import Image from "next/image";
import formatDate from "../../utils/date";
import PaymentDetails from "./PaymentDetails";
import { useState } from "react";
import { deletePaymentByPayID, getAllPayments } from "../../lib/payments";
import { toast } from "react-toastify";

import DeletePaymentModal from "./DeletePaymentModal";

export default function PaymentsTable({ payments, setPayments }) {
  const [currentPayment, setCurrentPayment] = useState(null);
  function handleViewDetails(payment) {
    setCurrentPayment(payment);
    document.getElementById("my_modal_4").showModal();
  }

  function showDeleteConfirmation(payment) {
    setCurrentPayment(payment);
    document.getElementById('my_modal_5').showModal()
  }

  async function handleDeletePayment(payId) {
    try {
      const response = await deletePaymentByPayID(payId);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Payment with ID " + payId + " deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting payment with ID " + payId, error);
      toast.error("An error occurred while deleting payment with ID " + payId);
    } finally {
      const updatedPayments = await getAllPayments();
      setPayments(updatedPayments?.payments || []);
      document.getElementById('my_modal_5').close();
    }
  }
  function handleMakePayment(payment) { 
    setCurrentPayment(payment);
    window.location.href= payment?.paymentUrl || "#";
  }
  return (
    <>
      {payments.map((payment) => (
        <tr key={payment._id}>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <Image
                    width={12}
                    height={12}
                    src="/background.png"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">{payment?._id}</div>
                <div className="text-sm opacity-50">Nigeria</div>
              </div>
            </div>
          </td>

          <td>
            {payment?.email}
            <br />
            <span className="badge badge-ghost badge-sm">Payer</span>
          </td>
          <td className="flex flex-items items-center">
            ₦ {Number(payment?.amount).toLocaleString()}
          </td>
          <td>{payment?.paymentId}</td>
          <td>{formatDate(payment?.createdAt)}</td>
          <td
            className={`px-2 py-1 rounded-md text-sm font-semibold text-center
            ${payment?.status === "successful" ? "text-green-500" : payment.status === "pending" ? "text-yellow-500" : "text-red-500"}
            `}
          >
            {(payment?.status).toUpperCase()}
          </td>
          <td className="flex items-center gap-2">
            <button
              className="btn btn-soft btn-primary btn-xs"
              onClick={() => handleViewDetails(payment)}
            >
              Details
            </button>
            { payment.status === "pending" && <button className="btn btn-accent btn-xs" onClick={() => handleMakePayment(payment)}>Make Payment</button>}
            <PaymentDetails payment={currentPayment} />
           {payment.status === "pending" && <button
              className="btn btn-error btn-xs"
              onClick={() => showDeleteConfirmation(payment)}
            >
              Delete
            </button>}

            <DeletePaymentModal 
              onDelete={handleDeletePayment}
              payment={currentPayment}
            />
          </td>
        </tr>
      ))}
    </>
  );
}
