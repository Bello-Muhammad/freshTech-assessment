const crypto = require("crypto");
const User = require("../models/user.model");
const Wallet = require("../../transaction/models/wallet.model");

const createUser = async (body) => {
    const { name, email, phoneNumber, password, imageURL, referal} = body;

    //checking for null || undefined
    if(!name || !email || !phoneNumber || !password) {
        throw new Error('all input required');
    }

    const userExist = await User.findOne({ email });

    //check for validity
    if(userExist) {
        throw new Error('user detail exist');
    }

    if( referal) {
        //find referal code
        const referedBy = await User.findOne({ referalCode: referal });

        //check if code exist
        if(!referedBy) {
            throw new Error('invalid referal code')
        }

        //update number of user refer
        const ref = referedBy.referals + 1;
        await User.findOneAndUpdate({ referalCode: referal }, { referals: ref }, { new: true });
        
        const referalCode = await crypto.randomBytes(3).toString('hex').toUpperCase();

        const user = new User({
            name,
            email,
            imageURL: imageURL || 'img',
            phoneNumber,
            referalCode,
            password
        });
    
        //generate user token
        const authToken = await user.generateAuthToken();

        await Wallet.create({ balance: 40000, ownerId: user._id });
        await user.save();

        return {
            user,
            authToken
        }
    }

    const referalCode = await crypto.randomBytes(3).toString('hex').toUpperCase();

    const user = new User({
        name,
        email,
        imageURL: imageURL || 'img',
        phoneNumber,
        referalCode,
        password
    });

    await Wallet.create({ balance: 40000, ownerId: user._id });
    await user.save();

    //generate user token
    const authToken = await user.generateAuthToken();

    return {
        user,
        authToken
    }
}

module.exports = createUser;