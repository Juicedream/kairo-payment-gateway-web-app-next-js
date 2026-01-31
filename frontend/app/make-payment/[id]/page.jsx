"use client";
import { X } from "lucide-react";
import { Suspense, useState } from "react";
import DarkNightToggler from "../../../components/DarkNightToggler";
import MakePaymentHeader from "../../../components/make-payment/MakePaymentHeader";
import CardForm from "../../../components/make-payment/CardForm";
import Loader from "../../../components/Loader";
import ToastAlert from "../../../components/ToastAlert";
import Success from "../../../components/Success";
import { useParams } from "next/navigation"

function MakePaymentPage() {
  const {id} = useParams();
  console.log(id);
  const [loading, setLoading] = useState(false);
  const [showCardAlertError, setShowCardAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [options, setOptions] = useState([
    { name: "Bank", clicked: false },
    { name: "Card", clicked: true },
    { name: "Transfer", clicked: false },
    { name: "Wallet", clicked: false },
  ]);

  const handleClickedOption = (choice) => {
    options.map((option, index) => {
      if (option.name === choice) {
        let newOptions = [
          { name: "Bank", clicked: false },
          { name: "Card", clicked: false },
          { name: "Transfer", clicked: false },
          { name: "Wallet", clicked: false },
        ];
        newOptions[index].clicked = true;
        setOptions(newOptions);
        return;
      }
    });
  };
  // console.log(errorMessage);
  // console.log(showCardAlertError);
  return (
    <div className="w-full flex flex-row h-screen bg-[url('/background.png')] items-center justify-center bg-center">
      <div className="absolute inset-0 bg-black/90" />
      {/* toggle switch */}
      <DarkNightToggler />
      {/*Toast Alert  */}
      {showCardAlertError && (
        <div className="absolute top-4">
          <ToastAlert
            type="error"
            message={errorMessage}
          />
        </div>
      )}
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
              })}
            </>
          )}

          <p className="absolute bottom-0 mb-4 text-xs">
            Powered by <b>Kairo</b> Payment Gateway Team
          </p>
        </div>
      </Suspense>
    </div>
  );
}

export default MakePaymentPage;
