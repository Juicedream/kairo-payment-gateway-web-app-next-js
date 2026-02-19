const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    paymentUrl: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ["successful", "pending", "failed"],
        default: "pending"
    }
}, {timestamps: true});

const Payment = mongoose.model('payment', paymentSchema);
module.exports = Payment;