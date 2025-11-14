const { isObjectIdOrHexString } = require("mongoose");
const uploadCloudinary = require("../config/cloudinary");
const Listing = require("../model/listing.model");
const { User } = require("../model/user.model");



const addListing = async (req,res)=>{
    try {
        let host = req.userId;
        let {title,discription,rent,city,landMark,category} = req.body;
        let image1 = await uploadCloudinary(res.files.image1[0].path)
        let image2 = await uploadCloudinary(res.files.image2[0].path)
        let image3 = await uploadCloudinary(res.files.image3[0].path)

        let listing = await Listing.create({
            title,
            discription,
            rent,
            city,
            landMark,
            category,
            image1,
            image2,
            image3,
            host
        })
        let user = await User.findByIdAndUpdate(host,{$push:{listing:isObjectIdOrHexString._id}},{new:true})
        
        if(!user){

            res.status(404).json({message:"user is not found"})
        }
        
        res.status(201).json(listing)
    } catch (error) {
        res.status(500).json({message:`AddListing error ${error}`})
    }
}

module.exports = addListing