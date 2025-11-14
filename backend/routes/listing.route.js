const express =require("express")
const isAuth = require("../middleware/isAuth")
const upload = require("../middleware/multer")
const addListing = require("../controllers/listing.controller")

let listingRoute = express.Router()
listingRoute.post("/add",isAuth,upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1}
]),addListing)

module.exports = listingRoute