const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    currency: {
        type: String,
        default: 'NGN'
    },
    balance: {
        type: Number
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }
},
{
    timestamps: true
});

const Wallet = new mongoose.model('Wallet', walletSchema);

module.exports = Wallet;