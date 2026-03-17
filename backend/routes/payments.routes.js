const { initiatePayment, getPaymentInfoByPayID, payWithCard, getVirtualAccount, getAllTransactions, deletePaymentByPayID, getTransactionByPaymentIDFromBlinkpay, updateTransaction, generateQrCodePayment } = require("../controllers/payments.controller.js");
const { verifyApiKey } = require("../middlewares/auth.middleware.js");

const router = require("express").Router();


router 
    .post("/initiate", verifyApiKey, initiatePayment)
    .get("/info/:payId", getPaymentInfoByPayID)
    .post("/pay-with-card", payWithCard)
    .post("/generate-account-number", getVirtualAccount)
    .get("/all", getAllTransactions)
    .delete("/delete-payment/:payId", deletePaymentByPayID)
    .get("/bank-transaction/:paymentId", getTransactionByPaymentIDFromBlinkpay)
    .post("/update-transaction", updateTransaction)
    .post('/generate-qrcode-payment/:paymentId', generateQrCodePayment);



module.exports = router;