"use client";
import DarkNightToggler from "../../../components/DarkNightToggler";
import MakePaymentHeader from "../../../components/make-payment/MakePaymentHeader";
import CardForm from "../../../components/make-payment/CardForm";
import Loader from "../../../components/Loader";
import ToastAlert from "../../../components/ToastAlert";
import Success from "../../../components/Success";
import { LoaderPinwheel, X } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getTransactionDetails,
  getVirtualAccount,
  updateTransaction,
} from "../../lib/payments";
import { ToastContainer, toast } from "react-toastify";
import formatDate from "../../utils/date";

const websocket = new WebSocket(
  "wss://blink-pay-bank-app-backend.onrender.com",
);

function MakePaymentPage() {
  const { id } = useParams();
  const router = useRouter();

  const [paymentInfo, setPaymentInfo] = useState({});
  const [virtualAccountInfo, setVirtualAccountInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [showCardAlertError, setShowCardAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState("02:00");

  const [options, setOptions] = useState([
    { name: "Bank", clicked: false },
    { name: "Card", clicked: true },
    { name: "Transfer", clicked: false },
    { name: "Wallet", clicked: false },
  ]);

  const handleClickedOption = (choice) => {
    options.map(async (option, index) => {
      if (option.name === choice) {
        let newOptions = [
          { name: "Bank", clicked: false },
          { name: "Card", clicked: false },
          { name: "Transfer", clicked: false },
          { name: "Wallet", clicked: false },
        ];
        newOptions[index].clicked = true;
        setOptions(newOptions);
        if (choice === "Transfer") {
          await getVirtualAccountInfo(
            paymentInfo?.amount,
            paymentInfo?.paymentId,
          );
          await countdownTimer(2);
        }
        return;
      }
    });
  };
  const countdownTimer = async (numberofMins) => {
    let time = numberofMins * 60 - 1;
    const interval = setInterval(() => {
      const mins = Math.floor(time / 60);
      const secs = time % 60;
      setTimer(
        `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`,
      );
      time--;
      if (time < 0) {
        clearInterval(interval);
        setTimer("00:00");
        router.back();
      }
    }, 1000);
  };

  const getPaymentInfo = async (payId) => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/payments/info/" + payId,
      );
      const data = await res.json();
      if (data?.status !== "pending") {
        return data;
      }
      return data?.info;
    } catch (error) {
      console.error(error);
    }
  };
  const getVirtualAccountInfo = async (amount, payment_id) => {
    setLoading(true);
    if (virtualAccountInfo) {
      setLoading(false);
      return;
    }
    try {
      const response = await getVirtualAccount(amount, payment_id);
      if (response?.status === "success") {
        setVirtualAccountInfo(response?.data?.virtual_account);
      }
    } catch (error) {
      console.error("Error occurred while generating virtual account ", error);
      toast.error("Failed to generate Virtual Account");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    async function setPaymentPage() {
      const response = await getPaymentInfo(id);
      if (!response || response?.info.status !== "pending") {
        alert("Invalid or Expired Payment");
        router.back();
        return;
      }
      setPaymentInfo(response?.info);
      setIsPageLoading(false);
    }
    setPaymentPage();
  }, []);

  const handleMadeTransfer = async (payment_id, amount) => {
    setLoading(true);
    try {
      const response = await getTransactionDetails(payment_id);
      if (response?.error) {
        toast.error("Why are you lying?? ehn???");
        setLoading(false);
        return;
      }
      if (response?.transactions?.payment_id) {
        const status = "successful";
        const updatePayment = await updateTransaction(
          payment_id,
          status,
          amount,
        );
     
        if (updatePayment?.transaction?.status) {
          toast.success("Payment received successfully! 😍");
          setTimeout(() => {
            router.back();
          }, 3000);
        }
        if (updatePayment.error) {
          toast.error("Payment was not received 🥺, try again later!");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    }
  };

  useEffect(() => {
    websocket.onopen = () => {
      console.log("Connected to blinkpay");
    };
    websocket.onmessage = (event) => {
      const { event: evt, data } = JSON.parse(event.data);
      if (
        data?.transaction?.payment_id === paymentInfo?.paymentId &&
        data?.transaction?.amount === paymentInfo?.amount
      ) {
        if (evt === "money_recieved") {
          toast.success("Money Recieved !");
        }
        if (evt === "transfer_initialized") {
          toast.success("Transfer executing...");
        }
      }
    };
  }, []);

  return (
    <div className="w-full flex flex-row h-screen bg-[url('/background.png')] items-center justify-center bg-center">
      <div className="absolute inset-0 bg-black/90" />
      <ToastContainer />
      {/* toggle switch */}
      <DarkNightToggler />
      {/*Toast Alert  */}
      {showCardAlertError && (
        <div className="absolute top-4">
          <ToastAlert type="error" message={errorMessage} />
        </div>
      )}
      {isPageLoading ? (
        <div className="w-50 h-50 bg-white z-999 rounded-box flex justify-center items-center">
          <LoaderPinwheel className="animate-spin" size={52} />
        </div>
      ) : (
        <Suspense fallback={"loading...."}>
          <div className="p-4 rounded-box w-130 h-130 glass flex flex-col items-center animate-fade-in z-9999 md:mx-4">
            {/* close icon */}
            <div
              className="w-full flex justify-end hover:cursor-pointer"
              onClick={() => window.history.back()}
            >
              <X size={25} />
            </div>

            {success ? (
              <div
                key="card"
                className="mt-4 w-80 h-100 bg-white rounded-md border-2 border-slate-200 flex flex-col items-center"
              >
                <Success />
              </div>
            ) : (
              <>
                {/* header */}
                <MakePaymentHeader
                  label="💳 Kairo"
                  desc="Choose a payment option"
                />
                {/* options */}
                <div className="w-80 rounded-full bg-gray-400/50 h-10 py-1 mt-4 flex flex-row justify-between px-1">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleClickedOption(option.name)}
                      className={`flex items-center px-3 hover:cursor-pointer font-light ${option.clicked ? "bg-white rounded-full  shadow-black shadow-sm text-primary-content" : "text-slate-600"}`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
                {/* Card */}
                {options.map((option) => {
                  if (option.name === "Card" && option.clicked === true) {
                    return (
                      <div
                        key="card"
                        className="mt-4 w-80 h-70 bg-white rounded-md border-2 border-slate-200 flex flex-col items-center"
                      >
                        {/* card holder name */}
                        {!loading ? (
                          <>
                            <CardForm
                              setLoading={setLoading}
                              setError={setShowCardAlertError}
                              setSuccess={setSuccess}
                              setErrorMessage={setErrorMessage}
                              amount={paymentInfo?.amount}
                              id={id}
                            />
                          </>
                        ) : (
                          <>
                            <Loader />
                          </>
                        )}
                      </div>
                    );
                  }
                  if (option.name === "Transfer" && option.clicked === true) {
                    return (
                      <div
                        key="transfer"
                        className="mt-4 w-80 h-75 bg-white rounded-md border-2 border-slate-200 flex flex-col items-center text-accent-content"
                      >
                        {loading ? (
                          <>
                            <Loader />
                          </>
                        ) : virtualAccountInfo !== null ? (
                          <>
                            <p className="text-sm mt-4 text-center">
                              Transfer the amount to the following account:
                            </p>

                            <div className="w-64 p-4 bg-gray-100 rounded-md mt-4">
                              <p className="text-xs">
                                Account Name: <b>{virtualAccountInfo?.name}</b>
                              </p>
                              <p className="text-xs mt-2">
                                Account Number: <b>{virtualAccountInfo?.acc_number}</b>
                              </p>
                              <p className="text-xs mt-2">
                                Amount:{" "}
                                <b>{virtualAccountInfo?.amount}</b>
                              </p>
                              <p className="text-xs mt-2">
                                Bank: <b>{virtualAccountInfo?.bank_name}</b>
                              </p>
                              {timer !== "00:00" ? (
                                <>
                                  <p className="text-xs mt-2">
                                    Timer:{" "}
                                    <b className="text-lg text-red-500">
                                      {timer}
                                    </b>
                                  </p>
                                  <button
                                    onClick={() =>
                                      handleMadeTransfer(paymentInfo?.paymentId, paymentInfo?.amount)
                                    }
                                    className="btn btn-soft btn-accent mt-2"
                                  >
                                    I have made the transfer
                                  </button>
                                </>
                              ) : (
                                <p className="bg-red-700 text-center text-white mt-2 p-2 rounded-md text-xs">
                                  Expired
                                </p>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="text-sm mt-4 text-center">
                              No virtual account information available try again
                              after a few seconds or choose another payment
                              method
                            </p>
                          </>
                        )}
                      </div>
                    );
                  }
                })}
              </>
            )}

            <p className="absolute bottom-0 mb-4 text-xs">
              Powered by <b>Kairo</b> Payment Gateway Team
            </p>
          </div>
        </Suspense>
      )}
    </div>
  );
}

export default MakePaymentPage;
