const Transaction = require("../models/transaction.model");

const userTransactions = async (user) => {
    const { _id } = user;

    return await Transaction.find({ payerId: _id });
}

module.exports = userTransactions;