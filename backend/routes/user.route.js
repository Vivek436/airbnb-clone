const express = require("express")
const isAuth = require("../middleware/isAuth")
const { getCurrentUser } = require("../controllers/user.controller")


let userRoute = express.Router()

userRoute.get("/currentuser",isAuth,getCurrentUser)

module.exports = userRoute