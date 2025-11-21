const express = require('express');
const { signUp, login, logOut } = require('../controllers/auth.controller');
const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logOut);

// export router directly
module.exports = {authRouter};
