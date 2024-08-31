const oneUserTransaction = require("../services/singleTransaction.service");

const getUserTransaction = async (req, res) => {
    try {
        const { params: { transactionId }, user } = req;
        const data = await oneUserTransaction(transactionId, user);

        return res.status(200).json({
            responseMessage: 'user transaction fetch successfully',
            response: {
                data
            }
        }) 
    } catch (error) {
        return res.status(400).json({
            responseMessage: 'fetching user transaction failed',
            error: error.message
        })
    }
}

module.exports = getUserTransaction;