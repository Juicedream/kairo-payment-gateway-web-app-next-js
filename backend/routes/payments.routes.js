const { initiatePayment, getPaymentInfoByPayID } = require("../controllers/payments.controller.js");

const router = require("express").Router();


router 
    .post("/initiate", initiatePayment)
    .get("/info/:payId", getPaymentInfoByPayID)


module.exports = router;