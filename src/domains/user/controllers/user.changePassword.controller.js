const changePassword = require("../services/user.changePassword.service");

const userChangePassword = async (req, res) => {
    try {
        const { body, user: { _id } } = req;
        const data = await changePassword(body, _id );

        return res.status(201).json({
            responseMessage: 'password changed successfully',
            response: {
                data
            }
        }) 
    } catch (error) {
        return res.status(400).json({
            responseMessage: 'user password update failed',
            error: error.message
        })
    }
}

module.exports = userChangePassword;