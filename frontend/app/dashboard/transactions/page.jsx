import { getAllTransactions } from "../../lib/transactions";
import TransactionsHeader from "./TransactionsHeader";
import TransactionsTable from "./TransactionsTable";

export default async function TransactionsPage() {
  const data = await getAllTransactions();
  const transactions = data?.transactions || [];
  return (
    <div className="p-4">
      <TransactionsHeader />
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No transactions found.</p>
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
