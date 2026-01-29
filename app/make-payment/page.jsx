"use client";
import {
  Calendar,
  CreditCard,
  Lock,
  Moon,
  RefreshCcw,
  Sun,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";




function MakePaymentPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [expDate, setExpDate] = useState("");
  const [expDateError, setExpDateError] = useState(false);
  const [refreshBtn, setRefreshBtn] = useState(false);
  const [showButton, setShowButton] = useState(true);
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

  const handleCardNumberInput = (value) => {
    const masterInputs = [
      "51",
      "52",
      "53",
      "54",
      "55",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
    ];
    const visa = "4";
    masterInputs.map((number) => {
      if (String(value).length < 2) {
        setCardType("");
      }

      if (String(value).startsWith(number)) {
        setCardType("mastercard");
      }
    });
    if (String(value).startsWith(visa) && String(value).length > 1) {
      setCardType("visa");
    }
    if (value === "") {
      setCardType("");
    }
    let input = String(value).replace(/\D/g, "");
    let formatted = input.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  const handleExpiryDate = (date) => {
    setRefreshBtn(false);
    let value = String(date);
    if (value.length === 3) {
      setRefreshBtn(true);
    }
    if (value.length === 4) {
      setRefreshBtn(true);
      setExpDateError("");
    }
    if (value.length === 2 && !value.includes("/")) {
      value += "/";
      setExpDate("");
    }
    if (value.length === 5 && value.includes("/")) {
      if (!isExpiryDateValid(value)) {
        setExpDateError("Expired Card");
      } else {
        setExpDateError("");
      }
    }
    setExpDate(value);
  };

  function isExpiryDateValid(expiryDate) {
    const dateParts = expiryDate.split("/");
    const month = parseInt(dateParts[0], 10) - 1;
    const year = 2000 + parseInt(dateParts[1], 10);
    const today = new Date();
    const expires = new Date(year, month + 1, 1);
    return today < expires;
  }

  return (
    <div className="w-full flex flex-row h-screen bg-[url('/background.png')] items-center justify-center bg-center bg-blue-500">
      <div className="absolute inset-0 bg-black/90" />
      <div className="absolute top-0 my-4 right-0 mx-6">
        <label className="flex cursor-pointer gap-2">
          <span className="label-text">
            <Moon />
          </span>
          <input
            type="checkbox"
            value="cmyk"
            className="toggle theme-controller"
          />
          <span className="label-text">
            <Sun />
          </span>
        </label>
      </div>
      {/*  */}
      <Suspense fallback={"loading...."}>
        <div className="p-4 rounded-box w-130 h-130 glass flex flex-col items-center animate-fade-in z-9999 md:mx-4">
          {/* close icon */}
          <div
            className="w-full flex justify-end hover:cursor-pointer"
            onClick={() => window.history.back()}
          >
            <X size={25} />
          </div>
          {/* header */}
          <div className="flex flex-col items-center">
            <h1 className="text-primary-content text-3xl">💳 Kairo</h1>
            <p className="text-xs">Choose a payment option</p>
          </div>
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
                  {showButton ? (
                    <>
                      <div className="w-full rounded-box px-1 py-2">
                        <label className="input validator bg-white text-primary-content border-b border-slate-200">
                          <User />
                          <input
                            type="text"
                            required
                            placeholder="CardHolder Name"
                            minLength="3"
                            maxLength="30"
                            title="Only Letters"
                            className="text-primary-content"
                            autoCapitalize="words"
                          />
                        </label>
                      </div>
                      {/* card number */}
                      <div className="w-full rounded-box px-1 py-2">
                        <label className="input validator bg-white text-primary-content border-b border-slate-200">
                          <CreditCard />
                          <input
                            type="text"
                            inputMode="numeric"
                            value={cardNumber}
                            onChange={(e) =>
                              handleCardNumberInput(e.target.value)
                            }
                            required
                            placeholder="**** **** **** 3086"
                            minLength="0"
                            maxLength="19"
                            title="Only numbers"
                            className="text-primary-content"
                          />
                          {cardType === "visa" && (
                            <Image
                              src={"./visa.svg"}
                              width={30}
                              height={30}
                              alt="visa logo"
                            />
                          )}
                          {cardType === "mastercard" && (
                            <Image
                              src={"./mastercard.svg"}
                              width={30}
                              height={30}
                              alt="mastercard logo"
                            />
                          )}
                        </label>
                        {/* <p className="validator-hint">
                    Invalid {cardType.toLowerCase()} card number
                    </p> */}
                      </div>
                      {/* expiry date and cvv */}
                      <div className="w-full flex flex-row px-1 gap-2">
                        {/* exp date */}
                        <div className="w-3/6">
                          <label className="input validator bg-white text-primary-content border-slate-200 border-r">
                            <Calendar />
                            <input
                              type="text"
                              className="w-full text-primary-content"
                              required
                              placeholder="05/27"
                              value={expDate}
                              onChange={(e) => handleExpiryDate(e.target.value)}
                              minLength="5"
                              maxLength="5"
                              title="Must be a valid expiry date"
                            />
                            {refreshBtn && (
                              <div
                                onClick={() => setExpDate("")}
                                className="active:bg-slate-200 active:p-1 rounded-full"
                              >
                                <RefreshCcw size={18} />
                              </div>
                            )}
                          </label>
                          <p className="text-red-400 text-sm mt-3">
                            {expDateError}
                          </p>
                          <p className="validator-hint">Invalid Expiry Date</p>
                        </div>
                        {/* cvv */}
                        <div className="w-3/6">
                          <label className="input validator bg-white text-primary-content border-b border-slate-200">
                            <Lock />
                            <input
                              type="text"
                              inputMode="numeric"
                              className="w-full text-primary-content"
                              required
                              placeholder="***"
                              minLength="3"
                              maxLength="3"
                              title="Must be 3 digits"
                            />
                          </label>
                          <p className="validator-hint">Must be 3 digits</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setShowButton(false)}
                        type="button"
                        className="btn btn-primary px-12 py-6 rounded-full"
                      >
                        {/* <span className="loading loading-spinner"></span> */}
                        Pay ₦15,261.90
                      </button>
                    </>
                  ) : (
                    <span className="loading loading-spinner text-accent-content flex h-100 items-center size-10"></span>
                  )}
                </div>
              );
            }
          })}
          <p className="absolute bottom-0 mb-4 text-xs">Powered by <b>Kairo</b> Payment Gateway Team</p>
        </div>
      </Suspense>
    </div>
  );
}

export default MakePaymentPage;
