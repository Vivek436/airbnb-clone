const { User } = require("../model/user.model")

const getCurrentUser = async (req,res) =>{
    try {
        let user = await User.findById(req.userId).select("-password")
        if(!user){
            res.status(400).json({message:"user doen't found"})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:`get current user ${error}`})
    }
}
module.exports = {getCurrentUser}