import { getAllPayments } from "../../lib/payments";
import PaymentsHeader from "./PaymentsHeader";
import PaymentsTable from "./PaymentsTable";

export default async function PaymentsPage() {
  const data = await getAllPayments();
  const payments = data?.payments || [];
//   console.log("Payments ", payments);
  return (
    <div className="p-4">
     <PaymentsHeader />
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
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <PaymentsTable payments={payments} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
