"use client";
import PaymentsHeader from "./PaymentsHeader";
import PaymentsTable from "./PaymentsTable";
import { useEffect, useState } from "react";
import { getAllPayments } from "../../lib/payments";
import { Loader } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { socketClientConnection } from "../../lib/socket";

const websocket = new WebSocket(
  "wss://blink-pay-bank-app-backend.onrender.com",
);

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  let socket = socketClientConnection();

  useEffect(() => {
    socket.on("pay-with-card", async (data) => {
      console.log("Payment processed:", data);
      // Optionally, you can show a notification or update the UI based on the payment data
      const response = await getAllPayments();
      setPayments(response.payments || []);
    });
  });

  async function fetchData() {
    try {
      const response = await getAllPayments();
      setPayments(response.payments || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoadingData(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    websocket.onopen = () => {
      console.log("Connected to blink pay from Payments page");
    }
    websocket.onmessage = (event) => {
      const { event: evt } = JSON.parse(event.data);
      if (evt === "money_recieved") {
        fetchData();
      }
    };
  }, []);
  //   console.log("Payments ", payments);
  return (
    <div className="p-4">
      <ToastContainer />
      <PaymentsHeader setPayments={setPayments} />
      {loadingData ? (
        <Loader className="animate-spin text-center mt-8" />
      ) : payments.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No payments found.</p>
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <PaymentsTable payments={payments} setPayments={setPayments} />
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
