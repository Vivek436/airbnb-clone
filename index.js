const express = require('express')
const dotenv = require('dotenv')
const { connectDb } = require('./config/db')
const  {authRouter}  = require('./routes/auth.route')
const cookieParser = require('cookie-parser')
const cors = require('cors') 
const userRoute = require('./routes/user.route')
const listingRoute = require('./routes/listing.route')
dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

let port = process.env.PORT || 6000

app.use("/api/auth",authRouter)
app.use("/api/user",userRoute)
app.use("/api/listing",listingRoute)


app.listen(port,()=>{
    connectDb()
    console.log('app listen on 8000 port');
    
})