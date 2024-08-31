const userProfile = require("../services/user.getProfile.service");

const getUserProfile = async (req, res) => {
    try {
        
        const data = await userProfile(req.user);

        return res.status(200).json({
            responseMessage: 'user details fetch successfully',
            response: {
                data
            }
        }) 
    } catch (error) {
        return res.status(400).json({
            responseMessage: 'fetching user details failed',
            error: error.message
        })
    }
}

module.exports = getUserProfile;