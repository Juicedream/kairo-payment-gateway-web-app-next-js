const { initiatePayment, getPaymentInfoByPayID, payWithCard, getVirtualAccount, getAllTransactions } = require("../controllers/payments.controller.js");

const router = require("express").Router();


router 
    .post("/initiate", initiatePayment)
    .get("/info/:payId", getPaymentInfoByPayID)
    .post("/pay-with-card", payWithCard)
    .post("/generate-account-number", getVirtualAccount)
    .get("/all", getAllTransactions)


module.exports = router;