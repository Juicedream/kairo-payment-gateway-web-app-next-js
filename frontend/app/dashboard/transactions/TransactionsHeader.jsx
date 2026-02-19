export default function TransactionsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">Transactions Page</h2>
        <p className="text-sm text-gray-500">
          View and manage all transactions made on the platform
        </p>
      </div>
      {/* <button className="btn btn-primary">Initiate Transaction</button> */}
    </div>
  );
}
