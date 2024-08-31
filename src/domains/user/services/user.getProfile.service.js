const User = require("../models/user.model");

const userProfile = async (user) => {
    const { _id } = user;
    const userDetails = await User.findOne({ _id })
        .populate({ path: 'wallet', select: 'balance'});
 
    return {
        userDetails,
        wallet: userDetails.wallet[0]
    };
}

module.exports = userProfile;