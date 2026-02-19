const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
    paymentID: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["successful", "pending", "failed"],
        default: "pending"
    },
    paymentType: {
        type: String,
        enum: ["card", "transfer", "bank-code", "crypto"],
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Transactions = mongoose.model("Transactions", transactionSchema);
module.exports = Transactions;