const mongoose = require("mongoose")
const { User } = require("./user.model")

const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    image1:{
        type:String,
        required:true
    },
    image2:{
        type:String,
        required:true
    },
    image3:{
        type:String,
        required:true
    },
    rent:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    landMark:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    isBooked:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

let Listing = mongoose.model("Listing ",listingSchema)

module.exports = Listing
