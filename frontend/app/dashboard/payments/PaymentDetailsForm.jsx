import formatDate from "../../utils/date";

export default function PaymentDetailsForm({ payment }) {
  return (
    <div className="bg-base-300 px-4 rounded-md">
      <div className="flex justify-between items-center my-4 text-center">
        <p className="py-4">Payment ID: </p>
        <p>
          -------------------------------------------------------------
        </p>
        <p className="py-4 font-bold">{payment?.paymentId} </p>
      </div>
      <div className="flex justify-between items-center my-4 text-center">
        <p className="py-4">Amount: </p>
        <p>
          -----------------------------------------------------------------------------
        </p>
        <p className="py-4 font-bold">
          ₦ {Number(payment?.amount).toLocaleString()}{" "}
        </p>
      </div>
      <div className="flex justify-between items-center my-4">
        <p className="py-4">Email: </p>
        <p>
          -----------------------------------------------------------------------------
        </p>
        <p className="py-4 font-bold">{payment?.email} </p>
      </div>
      <div className="flex justify-between items-center my-4">
        <p className="py-4">Date: </p>
        <p>------------------------------------------------------------</p>
        <p className="py-4 font-bold">{formatDate(payment?.createdAt)} </p>
      </div>

      <div className="flex justify-between items-center my-4">
        <p className="py-4">Status: </p>
        <p>
          -----------------------------------------------------------------------------
        </p>
        <p
          className={`py-4 font-bold ${payment?.status === "successful" ? "text-green-500" : payment.status === "pending" ? "text-yellow-500" : "text-red-500"}`}
        >
          {payment?.status.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
