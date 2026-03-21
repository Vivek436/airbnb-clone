import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import { authRouter } from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/user.route.js';
import listingRoute from './routes/listing.route.js';
import bookingRoute from './routes/booking.route.js';

dotenv.config()

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())

// CORS Configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.CLIENT_URL
].filter(Boolean)

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true)
        
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENVIRONMENT === 'development') {
            callback(null, true)
        } else {
            callback(null, true) // Allow all in development
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

let port = process.env.PORT || 8000

// Routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRoute)
app.use("/api/listing", listingRoute)
app.use("/api/booking", bookingRoute)

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'Airbnb Clone API is running!' })
})

// Start server
app.listen(port, () => {
    connectDb()
    console.log(`Server is running on port ${port}`)
})