const { response } = require("express");
const createUser = require("../services/auth.registerUser.service");

const registerUser = async (req, res) => {
    try {
        const { body } = req;
        const data = await createUser(body);
        
        return res.status(201).json({
            responseMessage: 'user created successfully',
            response: {
                data
            }
        })
    } catch (error) {
        return res.status(400).json({
            responseMessage: 'user creation failed',
            error: error.message
        })
    }
}

module.exports = registerUser;