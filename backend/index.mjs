import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the CORS package
import { connectDB } from './db/connectDB.mjs';
import {v2 as cloudinary} from  'cloudinary';


import authRoutes from './routes/auth.route.mjs';
import contentRoute from './routes/content.route.mjs';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.mjs';
import userRoutes from './routes/user.routes.mjs';
import notesRoutes from './routes/notes.routes.mjs';




dotenv.config()
const PORT = process.env.BACKEND_PORT || 5001;
const app = express();


// Configure CORS - Allow all origins or restrict to specific origins
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

//cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
    secure: true,
})

app.use(express.json()); // Ensure body-parser is applied globally
app.use(cookieParser()); // Parse cookies

app.use('/api/auth', authRoutes);
app.use('/api/content',contentRoute);
app.use('/api/users', userRoutes);
app.use('/api/notes', notesRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`listening on port: ${PORT}`);
})