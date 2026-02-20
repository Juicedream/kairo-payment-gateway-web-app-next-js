const { initiatePayment, getPaymentInfoByPayID, payWithCard, getVirtualAccount, getAllTransactions, deletePaymentByPayID, getTransactionByPaymentIDFromBlinkpay, updateTransaction } = require("../controllers/payments.controller.js");

const router = require("express").Router();


router 
    .post("/initiate", initiatePayment)
    .get("/info/:payId", getPaymentInfoByPayID)
    .post("/pay-with-card", payWithCard)
    .post("/generate-account-number", getVirtualAccount)
    .get("/all", getAllTransactions)
    .delete("/delete-payment/:payId", deletePaymentByPayID)
    .get("/bank-transaction/:paymentId", getTransactionByPaymentIDFromBlinkpay)
    .post("/update-transaction", updateTransaction);


module.exports = router;