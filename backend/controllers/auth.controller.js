const { genToken } = require("../config/token")
const {User} = require('../model/user.model')
const bcrypt = require('bcryptjs')

const signUp = async (req,res)=>{
    try{
        let {name,email,password}= req.body
        let existUser = await User.findOne({email})
        if (existUser) {
    return res.status(409).json({ message: "User already exists" });
}
        let hashPassword = await bcrypt.hash(password,10)
        let user = await User.create({name,email,password:hashPassword})
        let token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENVIRONMENT = "production",
            sameSite :"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000

        })
        return res.status(201).json(user)

    }catch(error){
        return res.status(500).json({message:`signup error ${error}`})
    }
}


// module.exports={signUp}


const login = async (req,res) => {
    try {
        let {email,password}= req.body
        let user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"User is not exist"})

        }
        let isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(404).json({message:"incorect Password"})
 
        }
        let token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENVIRONMENT = "production",
            sameSite :"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000

        })
        return res.status(200).json(user)
    } catch (error) {
         return res.status(500).json({message:`login error ${error}`})
    }
}


const logOut = async (req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:`Logout Successfully`})
    } catch (error) {
          return res.status(500).json({message:`Logout error${error}`})
    }
}
// module.exports = {login}

module.exports = { signUp, login, logOut};