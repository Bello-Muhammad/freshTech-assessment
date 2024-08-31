const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Wallet = require('../../transaction/models/wallet.model');
const Transaction = require('../../transaction/models/transaction.model');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    imageURL: String,
    referalCode: {
        type: String,
        required: true
    },
    referals: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'active'
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('"password" can not be used')
            }
        }
    }
},
{
    timestamps: true
});

userSchema.virtual('wallet', {
    ref: 'Wallet',
    localField: '_id',
    foreignField: 'ownerId'
});

userSchema.virtual('transaction', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'payerId'
})

//userSchema
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password

    return userObject
}

userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  
    return token;
}
  
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
  
    if (!user) {
        throw new Error('invalid email')
    }
  
    const isMatch = await bcrypt.compare(password, user.password)
  
    if (!isMatch) {
        throw new Error('invalid password')
    }
  
    return user;
}

const User = mongoose.model('User', userSchema)

module.exports = User;