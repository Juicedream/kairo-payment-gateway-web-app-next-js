"use client";
import { useEffect, useState } from "react";
import useAuthStore from "../../../store/useAuthStore";
import { getAllTransactions } from "../../lib/transactions";
import TransactionsHeader from "./TransactionsHeader";
import TransactionsTable from "./TransactionsTable";
import { useRouter } from "next/navigation";

export default function TransactionsPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions(userId) {
      let data = await getAllTransactions(userId);
      setTransactions(data);
    }
    fetchTransactions(user?._id);
  }, [user]);

  return (
    <div className="p-4">
      <TransactionsHeader />
      {transactions.length === 0 ? (
        <div className="text-center">
          <p className="text-center text-gray-500 mt-8">
            No transactions found.
          </p>
          <button
            className="btn btn-secondary my-2"
            onClick={() => router.push("/dashboard/payments")}
          >
            Inititate Payment
          </button>
        </div>
      ) : (
        <div className="py-4">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr></tr>
                <tr>
                  <th></th>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Payment ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Payment Type</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                <TransactionsTable transactions={transactions} />
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
