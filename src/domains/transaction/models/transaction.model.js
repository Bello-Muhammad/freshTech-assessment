const { type } = require('express/lib/response');
const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
    {
        service: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        currency: {
            type: String,
            default: 'NGN'
        },
        amount: {
            type: Number,
            required: true
        },
        totalAmount: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        paymentMethod: {
            type: String,
            required: true
        },
        transactionNumber: {
            type: String,
            required: true
        },
        payerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        }
    },
    {
        timestamps: true
    }
);

const Transaction = new mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;