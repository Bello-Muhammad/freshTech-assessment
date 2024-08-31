const User = require("../models/user.model");

const loginUser = async (email, password) => {

    //check for null
    if( !email || !password) {
        throw new Error('email and password input require');
    }

    const user = await User.findByCredentials(email, password);
    const authToken = await user.generateAuthToken();

    return {
        user,
        authToken
    }
}

module.exports = loginUser;