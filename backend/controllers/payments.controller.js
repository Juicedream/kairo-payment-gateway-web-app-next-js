const generatePaymentID = require("../utils/generatePaymentID");
const PaymentModel = require("../models/payments.model.js");
const TransactionsModel = require("../models/transactions.model.js")
const dotenv = require("dotenv");
dotenv.config();

const internalServerError = { code: 500, status: "failed", error: "Internal Server error" }

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
    return res
      .status(500)
      .json(internalServerError);
  }
};

const getPaymentInfoByPayID = async (req, res) => {
    const { payId } = req.params;

   try { 
    if (!payId) {
        return res.status(400).json({
            code: 400,
            status: "failed",
            error: "Pay Id is required"
        });
    }

    const paymentInfo = await PaymentModel.find({ paymentId: payId });
    if (paymentInfo.length === 0) {
        return res.status(404).json({
            code: 404,
            status: "failed",
            error: "Payment Id is invalid"
        });
    }

    return res.status(200).json({code:200, status: "success", info: paymentInfo[0]});
} catch (error) {
    console.log("Error occurred getPaymentInfoByPayID controller ", error);
    return res.status(500).json(internalServerError);
}
    

}
const payWithCard = async (req, res) => {
  const {cardNumber, expiryDate, cvv, paymentID, amount } = req.body;
  if (!cardNumber || !expiryDate || !cvv || !paymentID || !amount) {
    return res.status(400).json({
      code: 400,
      status: "failed",
      error: "All fields are required"
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
        error: "Card number must be a demo number"
      });
    }
    const createTransaction = await TransactionsModel.create({
      paymentID,
      paymentType: "card",
      status: "successful",
      amount: Number(amount),
    });

    let existingPayment = await PaymentModel.findOne({ paymentId: paymentID});
    existingPayment.status = "successful"
    await existingPayment.save()
    return res.status(201).json({
      code: "201",
      status: "success",
      transaction: createTransaction
    });
  } catch (error) {
    console.error("Error occurred on payWithCard controller ", error);
    return res.status(500).json(internalServerError)
  }
}
const getVirtualAccount = async (req, res) => {
  const { amount } = req.body;
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;
  const bankUri = process.env.BANK_URI + "/api/v1"
try {
  // login into bank
  const response = await fetch(bankUri + "/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });
const loginData = await response.json();
if (!loginData?.token) {
  return res.status(400).json({
    code: 400,
    status: 'failed',
    error: "Error: Occured couldn't get into bank"
  });
}
// generate account data
const getVirtualAccountData = await fetch(bankUri + "/account/create-virtual-account", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${loginData?.token}`
  },
  body: JSON.stringify({ amount })
});
const data = await getVirtualAccountData.json();
if (!data) {
  return res.status(400).json({
    code: 400,
    status: "failed",
    error: "Error generating virtual account number at the moment"
  })
}
return res.status(201).json({
  code: 201,
  status: "success",
  data
})
} catch (error) {
  console.error("Error occurred in the generateVirtualAccountData controller ", error);
  return res.status(500).json(internalServerError);
}
}
const getAllTransactions = async(_, res) => {
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
}
module.exports = {
  initiatePayment,
  getPaymentInfoByPayID,
  payWithCard,
  getVirtualAccount,
  getAllTransactions
};
