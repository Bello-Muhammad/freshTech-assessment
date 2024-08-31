const { Router } = require('express');
const authUserLogin = require("../controllers/auth.loginUser.controller");
const registerUser = require("../controllers/auth.registerUser.controller");


const authRouter = Router();

//auth route
authRouter.post('/register', registerUser);
authRouter.post('/login', authUserLogin);

module.exports = authRouter;