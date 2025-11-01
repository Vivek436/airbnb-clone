const signUp = async (req,res)=>{
    try{
        let {name,email,password}= req.body
        let existUser = await User.findOne({email})
        if(existUser){
            return re.status(404).json({message:"User is already exist"})

        }
        let hashPasword = await bcrypt.hash(password,10)
        let user = await User.create({name,email,password:hashPasword})
        
    }catch(error){

    }
}


module.exports={signUp}