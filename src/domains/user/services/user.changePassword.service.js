const User = require("../models/user.model");
const bcrypt = require('bcryptjs');

const changePassword = async (body, _id) => {
    const { currentPassword, newPassword } = body;
    //check for null
    if(!currentPassword || !newPassword ) {
        throw new Error('currentPassword and newPassword inputs required');
    }

    const user = await User.findOne({ _id });
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    const hashedPassword = await bcrypt.hash(newPassword, 8);

    if(!isMatch) {
        throw new Error('invalide current password')
    }

    const password = hashedPassword;

    return await User.findByIdAndUpdate({ _id }, { password }, { new: true})
}

module.exports = changePassword;