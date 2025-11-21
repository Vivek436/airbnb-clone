const mongoose = require('mongoose')

const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('DB connected');
        
    }catch(error){
        console.log("db error",error);
        
    }
}

module.exports = {connectDb}