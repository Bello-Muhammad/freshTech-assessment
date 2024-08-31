const createTransaction = require("../services/makeTransaction.service");

const makeTransaction = async (req, res) => {
    try {
        const { body, user } = req;
        const data = await createTransaction(body, user);

        return res.status(201).json({
            responseMessage: 'user transaction successfully',
            response: {
                data
            }
        }) 
    } catch (error) {
        return res.status(400).json({
            responseMessage: 'user transaction failed',
            error: error.message
        })
    }
}

module.exports = makeTransaction;