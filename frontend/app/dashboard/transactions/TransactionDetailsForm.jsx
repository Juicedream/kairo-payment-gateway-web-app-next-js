import formatDate from "../../utils/date";

export default function TransactionDetailsForm({ transaction }) {
  return (
    <div className="bg-base-300 px-4 rounded-md">
      <div className="flex justify-between items-center my-4 text-center">
        <p className="py-4">Transaction ID: </p>
        <p>
          -------------------------------------------------------------
        </p>
        <p className="py-4 font-bold">{transaction?.paymentID} </p>
      </div>
      <div className="flex justify-between items-center my-4 text-center">
        <p className="py-4">Amount: </p>
        <p>
          -----------------------------------------------------------------------------
        </p>
        <p className="py-4 font-bold">
          ₦ {Number(transaction?.amount).toLocaleString()}{" "}
        </p>
      </div>
      <div className="flex justify-between items-center my-4">
        <p className="py-4">Payment Type: </p>
        <p>
          -----------------------------------------------------------------------------
        </p>
        <p className="py-4 font-bold">{transaction?.paymentType} </p>
      </div>
      <div className="flex justify-between items-center my-4">
        <p className="py-4">Date: </p>
        <p>------------------------------------------------------------</p>
        <p className="py-4 font-bold">{formatDate(transaction?.createdAt)} </p>
      </div>

      <div className="flex justify-between items-center my-4">
        <p className="py-4">Status: </p>
        <p>
          -----------------------------------------------------------------------------
        </p>
        <p
          className={`py-4 font-bold ${transaction?.status === "successful" ? "text-green-500" : transaction.status === "pending" ? "text-yellow-500" : "text-red-500"}`}
        >
          {transaction?.status.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
