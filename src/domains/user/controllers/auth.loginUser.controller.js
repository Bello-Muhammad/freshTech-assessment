const loginUser = require("../services/auth.loginUser.service");

const authUserLogin = async (req, res) => {
    try {
        const { body: { email, password }} = req;
        const data = await loginUser(email, password);

        return res.status(201).json({
            responseMessage: 'user authenticate successfully',
            response: {
                data
            }
        }) 
    } catch (error) {
        return res.status(400).json({
            responseMessage: 'user autentication failed',
            error: error.message
        })
    }
}

module.exports = authUserLogin;