const jwt = require('jsonwebtoken')

const genToken = async (userId)=>{
    try {
        let token = await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
        return token
    } catch (error) {
        console.log("token error");
        
    }


}

module.exports = {genToken}