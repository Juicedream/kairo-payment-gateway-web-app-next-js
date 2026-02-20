const generatePaymentID = require("../utils/generatePaymentID");
const PaymentModel = require("../models/payments.model.js");
const TransactionsModel = require("../models/transactions.model.js");
const dotenv = require("dotenv");
dotenv.config();

const internalServerError = {
  code: 500,
  status: "failed",
  error: "Internal Server error",
};

const initiatePayment = async (req, res) => {
  let { email, amount } = req.body;
  email = String(email).trim();
  amount = Number(amount) + 0.52;

  if (!email || !amount) {
    return res
      .status(400)
      .json({ code: 400, status: "failed", error: "All fields are required" });
  }
  try {
    const url = "http://localhost:3000/make-payment"; // this is a frontend link
    let paymentID = generatePaymentID(); // works now
    let existingPayID = await PaymentModel.find({ paymentId: paymentID });

    while (!existingPayID) {
      paymentID = generatePaymentID();
      existingPayID = await PaymentModel.find({ paymentId: paymentID });
    }

    const newPayment = await PaymentModel.create({
      email,
      amount,
      paymentId: paymentID,
      paymentUrl: url + "/" + paymentID,
    });

    await newPayment.save();

    return res.status(201).json({
      code: 201,
      status: "success",
      message: "Payment created successfully",
      pay: newPayment,
    });
  } catch (error) {
    console.error("Error occurred in the initiatePayment controller " + error);
    return res.status(500).json(internalServerError);
  }
};

const getPaymentInfoByPayID = async (req, res) => {
  const { payId } = req.params;

  try {
    if (!payId) {
      return res.status(400).json({
        code: 400,
        status: "failed",
        error: "Pay Id is required",
      });
    }

    const paymentInfo = await PaymentModel.find({ paymentId: payId });
    if (paymentInfo.length === 0) {
      return res.status(404).json({
        code: 404,
        status: "failed",
        error: "Payment Id is invalid",
      });
    }

    return res
      .status(200)
      .json({ code: 200, status: "success", info: paymentInfo[0] });
  } catch (error) {
    console.log("Error occurred getPaymentInfoByPayID controller ", error);
    return res.status(500).json(internalServerError);
  }
};
const payWithCard = async (req, res) => {
  const { cardNumber, expiryDate, cvv, paymentID, amount } = req.body;
  if (!cardNumber || !expiryDate || !cvv || !paymentID || !amount) {
    return res.status(400).json({
      code: 400,
      status: "failed",
      error: "All fields are required",
    });
  }
  try {
    // if (!isNaN(cardNumber)) {
    //   return res.status(400).json({
    //     code: 400,
    //     status: "failed",
    //     error: "Card number must be an actual number"
    //   })
    // }
    if (cardNumber !== "4242424242424242") {
      return res.status(400).json({
        code: 400,
        status: "failed",
        error: "Card number must be a demo number",
      });
    }
    const createTransaction = await TransactionsModel.create({
      paymentID,
      paymentType: "card",
      status: "successful",
      amount: Number(amount),
    });

    let existingPayment = await PaymentModel.findOne({ paymentId: paymentID });
    existingPayment.status = "successful";
    await existingPayment.save();
    return res.status(201).json({
      code: "201",
      status: "success",
      transaction: createTransaction,
    });
  } catch (error) {
    console.error("Error occurred on payWithCard controller ", error);
    return res.status(500).json(internalServerError);
  }
};
const getVirtualAccount = async (req, res) => {
  let { amount, payment_id } = req.body;
  amount = Math.round(Number(amount));
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;
  const bankUri = process.env.BANK_URI + "/api/v1";

  if (!amount) {
    return res.status(400).json({
      code: 400,
      status: "failed",
      error: "Amount is required",
    });
  }
  if (!payment_id) {
    return res.status(400).json({
      code: 400,
      status: "failed",
      error: "Payment Id is required",
    });
  }
  try {
    // login into bank
    const response = await fetch(bankUri + "/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const loginData = await response.json();
    console.log("Login data from bank ", loginData);
    if (!loginData?.token) {
      return res.status(400).json({
        code: 400,
        status: "failed",
        error: "Error: Occured couldn't get into bank",
      });
    }
    // generate account data
    const getVirtualAccountData = await fetch(
      bankUri + "/account/create-virtual-account",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginData?.token}`,
        },
        body: JSON.stringify({ amount: amount, payment_id: payment_id }),
      },
    );
    const data = await getVirtualAccountData.json();
    if (!data) {
      return res.status(400).json({
        code: 400,
        status: "failed",
        error: "Error generating virtual account number at the moment",
      });
    }
    if (data.code === 400) {
      return res.status(400).json({
        code: 400,
        status: "failed",
        error:
          data?.msg || "Error generating virtual account number at the moment",
      });
    }
    return res.status(201).json({
      code: 201,
      status: "success",
      data,
    });
  } catch (error) {
    console.error(
      "Error occurred in the generateVirtualAccountData controller ",
      error,
    );
    return res.status(500).json(internalServerError);
  }
};
const getAllTransactions = async (_, res) => {
  try {
    const transactions = await TransactionsModel.find();
    const payments = await PaymentModel.find();
    return res.status(200).json({
      code: 200,
      status: "success",
      payments,
      transactions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(internalServerError);
  }
};
const deletePaymentByPayID = async(req, res) => {
  const { payId } = req.params;
  try {
    if (!payId) {
      return res.status(400).json({
        code: 400,
        status: "failed",
        error: "Pay Id is required",
      });
    }
    const deletedPayment = await PaymentModel.findOneAndDelete({
      paymentId: payId,
    });
    if (!deletedPayment) {
      return res.status(404).json({
        code: 404,
        status: "failed",
        error: "Payment Id is invalid",
      });
    }
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Payment deleted successfully",
    });
  } catch (error) {
    console.error("Error occurred in deletePaymentByPayID controller ", error);
    return res.status(500).json(internalServerError);
  }
};
const getTransactionByPaymentIDFromBlinkpay = async (req, res) => {
  const { paymentId } = req.params;
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;
  const bankUri = process.env.BANK_URI + "/api/v1"; 
  
  if (!paymentId) {
    return res.status(400).json({
      code: 400,
      status: "failed",
      error: "Payment ID is required",
    });
  }
  if (!paymentId.includes("-")) {
    return res.status(400).json({
      code: 400,
      status: "failed",
      error: "Invalid Payment ID",
    });
  }

  // login into bank
  const response1 = await fetch(bankUri + "/auth/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  console.log({email, password, bankUri})
  const loginData = await response1.json();
  console.log("Login data from bank ", loginData);

  if (!loginData?.token) {
    return res.status(400).json({
      code: 400,
      status: "failed",
      error: "Error: Occured couldn't get into bank",
    });
  }

  const response = await fetch(
    bankUri + "/account/transactions?payment_id=" + paymentId,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData?.token}`,
      },
    },
  );
  const data = await response.json();

  if (!data || data.code === 404) {
    return res.status(404).json({
      code: 404,
      status: "failed",
      error: "No transactions found for this payment id" + paymentId,
    });
  }

  return res.status(200).json({
    code: 200,
    status: "success",
    transactions: data?.transactions,
  });
};
const updateTransaction = async(req, res) => {
  let {payment_id, status, amount} = req.query;
  const existingPayment = await PaymentModel.findOne({ paymentId: payment_id});
  if (!payment_id || !status || !amount) {
    return res.status(400).json({
       code: 400,
      status: "failed",
      error: "Payment ID, Amount and Status of payment is required!"
    })
  }
  if (!existingPayment) {
    return res.status(404).json({
      code: 404,
      status: "failed",
      error: "Payment not found"
    })
  }

  if (existingPayment.status !== "pending") {
    return res.status(400).json({
       code: 400,
      status: "failed",
      error: "You cannot update this payment as it has been settled"
    })
  }

  if (!["successful", "failed"].includes(status)) {
    return res.status(400).json({
       code: 400,
      status: "failed",
      error: "Status must either be successful or failed"
    })
  }

  if (isNaN(amount) || amount <= 0) {
     return res.status(400).json({
       code: 400,
      status: "failed",
      error: "Amount must be an integer"
    });
  }

  amount = Number(amount);

  existingPayment.status = status;

  const transaction = await TransactionsModel.create({
     paymentID: payment_id,
      paymentType: "transfer",
      status,
      amount: Number(amount),
  })

  await existingPayment.save();

  return res.status(201).json({
      code: "201",
      status: "success",
      transaction,
    });

}
module.exports = {
  initiatePayment,
  getPaymentInfoByPayID,
  payWithCard,
  getVirtualAccount,
  getAllTransactions,
  deletePaymentByPayID,
  getTransactionByPaymentIDFromBlinkpay,
  updateTransaction
};
