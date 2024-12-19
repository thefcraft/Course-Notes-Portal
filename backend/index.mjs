import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the CORS package
import { connectDB } from './db/connectDB.mjs';
import {v2 as cloudinary} from  'cloudinary';


import authRoutes from './routes/auth.route.mjs';
import contentRoute from './routes/content.route.mjs';

dotenv.config()
const PORT = process.env.BACKEND_PORT || 5001;
const app = express();


// Configure CORS - Allow all origins or restrict to specific origins
app.use(cors({
    origin: 'http://localhost:5173', // Allows all origins to make requests to your server
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers in requests
    credentials: true, // Allow cookies or credentials to be included in requests
}));

//cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
    secure: true,
})
app.use('/api/auth', authRoutes);
app.use('/api/content',contentRoute);



app.listen(PORT, () => {
    connectDB();
    console.log(`listening on port: ${PORT}`);
})