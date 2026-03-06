const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
        
    },
    organizationName: {
        type: String,
        required: true,
    },
    apiKey: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: "customer"
    }

}, {timestamps: true});

const User = mongoose.model('user', userSchema);
module.exports = User;