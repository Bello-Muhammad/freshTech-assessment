const Transaction = require("../models/transaction.model");

const oneUserTransaction = async ( transactionId, user ) => {
    const { _id } = user;

    return await Transaction.findOne({ _id: transactionId, payerId: _id });
}

module.exports = oneUserTransaction;