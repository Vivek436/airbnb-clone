const express = require('express')
const dotenv = require('dotenv')
const { connectDb } = require('./config/db')
const { authRouter } = require('./routes/auth.route')
dotenv.config()
const app = express()

let port = process.env.PORT || 6000

app.use("/api/auth",authRouter)


app.listen(port,()=>{
    connectDb()
    console.log('app listen on 8000 port');
    
})