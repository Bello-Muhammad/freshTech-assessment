const { Router } = require('express')
const getUserProfile = require("../controllers/user.getProfile.controller");
const userChangePassword = require("../controllers/user.changePassword.controller");
const protectUser = require('../../../middleware/auth');

const userRouter = Router();

//user route
userRouter.get('/profile', protectUser, getUserProfile);
userRouter.patch('/change-password', protectUser, userChangePassword)

module.exports = userRouter;