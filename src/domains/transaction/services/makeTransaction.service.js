const crypto = require("crypto");
const Wallet = require("../models/wallet.model");
const Transaction = require("../models/transaction.model");

const createTransaction = async (body, user) => {
    const { service, amount, phoneNumber, paymentMethod } = body;
    const { _id } = user;

    //check for null
    if(!service || !phoneNumber || !amount || !paymentMethod ) {
        throw new Error('all input are require')
    }

    const total = await Wallet.findOne({ ownerId: _id });
    const reMainBalance = total.balance - amount;

    //check for negativity
    if(Math.sign(reMainBalance === -1)) {
        throw new Error('insufficient balance');
    }

    await Wallet.findOneAndUpdate({ ownerId: _id }, { balance: reMainBalance}, { new: true });

    const stat = ['successful', 'failed', 'initiated'];
    const tStat = () => {
        return stat[(Math.floor(Math.random() * stat.length))]
    }

    const status = tStat();
    const transactionNumber = await crypto.randomInt(10**7, 10**10-1) ;

    return await Transaction.create({
        service,
        amount,
        phoneNumber,
        totalAmount: reMainBalance,
        status,
        paymentMethod,
        transactionNumber,
        payerId: _id
    });

}

module.exports = createTransaction;