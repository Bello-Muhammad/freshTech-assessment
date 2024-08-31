const express = require('express');
const authRouter = require('./user/routers/authRouters');
const userRouter = require('./user/routers/userRouters');
const transactionRouter = require('./transaction/router/transactionRouters');
const protectUser = require('../middleware/auth');

const appRouters = express.Router();
const v1Route = '/api/v1'

//auth route
appRouters.use(`${v1Route}/auth`, authRouter);
//user route
appRouters.use(`${v1Route}/user`, protectUser, userRouter);
//transaction route
appRouters.use(`${v1Route}/transaction`, protectUser, transactionRouter)

module.exports = appRouters;