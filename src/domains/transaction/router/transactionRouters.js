const { Router } = require('express');
const makeTransaction = require('../controllers/makeTransaction.controller');
const allUserTransactions = require('../controllers/get.allTransactions.controller');
const getUserTransaction = require('../controllers/get.transaction.controller');

const transactionRouter = Router();

transactionRouter.post('/', makeTransaction);
transactionRouter.get('/all/transactions', allUserTransactions);
transactionRouter.get('/:transactionId', getUserTransaction)

module.exports = transactionRouter;