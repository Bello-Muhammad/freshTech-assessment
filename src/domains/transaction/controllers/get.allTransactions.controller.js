const userTransactions = require("../services/allTransactions.service");

const allUserTransactions = async (req, res) => {
    try {
        const { user } = req;
        const data = await userTransactions(user);

        return res.status(200).json({
            responseMessage: 'user transactions fetch successfully',
            response: {
                data
            }
        }) 
    } catch (error) {
        return res.status(400).json({
            responseMessage: 'fetching user transactions failed',
            error: error.message
        })
    }
}

module.exports = allUserTransactions;