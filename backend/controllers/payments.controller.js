const generatePaymentID = require("../utils/generatePaymentID");
const PaymentModel = require("../models/payments.model.js");

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

module.exports = {
  initiatePayment,
  getPaymentInfoByPayID
};
