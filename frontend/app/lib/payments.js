export const getAllPayments = async (userId) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/payments/all`;
  const response = await fetch(url);
  const data = await response.json();
  
  if (data?.payments.length < 1) {
    return data;
  }
  let userData = data?.payments.filter((payment) => payment?.userId === userId );
  return userData;
};

export const initiatePayment = async (email, amount, apiKey) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/payments/initiate`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({ email, amount }),
  });
  const data = await response.json();
  return data;
};


export const deletePaymentByPayID = async (payId) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/payments/delete-payment/${payId}`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export const getVirtualAccount = async (amount, payment_id, blinkPay_email) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/payments/generate-account-number`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount, payment_id: payment_id, email: blinkPay_email }),
  });
  const data = await response.json();
  return data;
};

export const getTransactionDetails = async (payment_id, blink_pay_email) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/payments/bank-transaction/${payment_id}?email=${blink_pay_email}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const updateTransaction = async (payment_id, status, amount) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/payments/update-transaction?payment_id=${payment_id}&status=${status}&amount=${amount}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const generateQRCode = async (payment_id, amount) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/payments/generate-qrcode-payment/${payment_id}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({amount})
  });
  const data = await response.json();
  return data;
};
