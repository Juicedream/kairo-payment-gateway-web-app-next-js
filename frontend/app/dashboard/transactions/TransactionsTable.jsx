"use client";
import { CreditCard } from "lucide-react";
import formatDate from "../../utils/date";
import TransactionDetails from "./TransactionDetails";
import { useState } from "react";

export default function TransactionsTable({ transactions }) {
  const [currentTransaction, setCurrentTransaction] = useState(null);
  console.log(transactions[0]);
  return (
    <>
      {transactions.map((transaction) => (
        <tr
          key={transaction._id}
          className="hover:bg-accent-content hover:cursor-pointer"
          onClick={() => {
            setCurrentTransaction(transaction);
            document.getElementById("my_modal_4").showModal();
          }}
        >
          <th></th>
          <td>
            <div className="flex items-center gap-3">
              <div>
                <div className="font-bold">{transaction?._id}</div>
                <div className="text-sm opacity-50">Nigeria</div>
              </div>
            </div>
          </td>

          <td>
            {transaction?.email}
            <br />
            <span className="badge badge-ghost badge-sm">Payer</span>
          </td>
          <td className="flex flex-items items-center">
            ₦ {Number(transaction?.amount).toLocaleString()}
          </td>
          <td>{transaction?.paymentID}</td>
          <td>{formatDate(transaction?.createdAt)}</td>
          <td
            className={`px-2 py-1 rounded-md text-sm font-semibold text-center
            ${transaction?.status === "successful" ? "text-green-500" : transaction.status === "pending" ? "text-yellow-500" : "text-red-500"}
            `}
          >
            {(transaction?.status).toUpperCase()}
          </td>
          <td className="flex items-center gap-2">
            <span>{transaction?.paymentType === "card" && <CreditCard />}</span>
            <span>
              {transaction?.paymentType.charAt(0).toUpperCase() +
                transaction?.paymentType.slice(1)}
            </span>
            <TransactionDetails transaction={currentTransaction} />
          </td>
          {/* <td>
            <button className="btn btn-ghost btn-xs">Details</button>
          </td> */}
        </tr>
      ))}
    </>
  );
}
