import { Calendar, CreditCard, Lock, RefreshCcw, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

function CardForm({ setLoading, setError, setSuccess, setErrorMessage, amount }) {
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [data, setData] = useState({
    cardNumber,
    cvv,
    fullName,
    expDate,
  });
  const [expDateError, setExpDateError] = useState(false);
  const [refreshBtn, setRefreshBtn] = useState(false);
  // functions
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

  useEffect(() => {
    setData({ cardNumber, cvv, fullName, expDate });
  }, [
    cardNumber,
    expDate,
    fullName,
    cvv
  ])
  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      if (!cardNumber || !expDate || !fullName || !cvv) {
        setError(true);
        setErrorMessage("All fields are required");
        setTimeout(() => setError(false), 3000);
        return;
      }

      setLoading(true);
      const random = Math.floor(Math.random() * 2);
      if (random === 1) {
        setTimeout(() => setSuccess(true), 3000);
        return;
      }
      if (random === 0) {
        setErrorMessage("Payment failed, try another card");
        setTimeout(() => setError(true), 3000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => setLoading(false), 3000);
    }
  };
  return (
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            onChange={(e) => handleCardNumberInput(e.target.value)}
            required
            placeholder="**** **** **** 3086"
            minLength="0"
            maxLength="19"
            title="Only numbers"
            className="text-primary-content"
          />
          {cardType === "visa" && (
            <Image src={"../visa.svg"} width={30} height={30} alt="visa logo" />
          )}
          {cardType === "mastercard" && (
            <Image
              src={"../mastercard.svg"}
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
          <p className="text-red-400 text-sm mt-3">{expDateError}</p>
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
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </label>
          <p className="validator-hint">Must be 3 digits</p>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        type="button"
        className="btn btn-primary px-12 py-6 rounded-full"
      >
        {/* <span className="loading loading-spinner"></span> */}
        Pay ₦ {Number(amount).toLocaleString() || "15,261.90"
}      </button>
    </>
  );
}

export default CardForm;
