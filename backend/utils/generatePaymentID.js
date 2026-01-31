const crypto = require("crypto");
const generatePaymentID = () => {
    return crypto.randomUUID()
}

module.exports = generatePaymentID;
