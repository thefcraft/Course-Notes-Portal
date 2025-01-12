import dotenv from 'dotenv'; dotenv.config();

import express from 'express';
import cors from 'cors'; // Import the CORS package
import { connectDB } from './db/connectDB.mjs';
import {v2 as cloudinary} from  'cloudinary';

import contentRoute from './routes/content.route.mjs';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.mjs';
import userRoutes from './routes/user.routes.mjs';
import notesRoutes from './routes/notes.routes.mjs';
import { BACKEND_PORT, CLOUD_API_KEY, CLOUD_NAME, CLOUD_SECRET_KEY, CORS_ORIGIN } from './utils/constants.mjs';

const PORT = BACKEND_PORT;
const app = express();

connectDB();

app.use(express.json()); // Ensure body-parser is applied globally
app.use(cookieParser()); // Parse cookies

// Configure CORS - Allow all origins or restrict to specific origins
if(CORS_ORIGIN){
  app.use(cors({
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));
}

app.get('/', async (req, res) => res.status(201).json({
  ok: true,
  running: true
}))

//cloudinary config
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_SECRET_KEY,
  secure: true,
})

app.use('/api/auth', authRoutes);
app.use('/api/content',contentRoute);
app.use('/api/users', userRoutes);
app.use('/api/notes', notesRoutes);

// app.listen(PORT, () => {
  // connectDB();
  // console.log(`Server running at http://localhost:${PORT}`);
// });

// module.exports = app;
export default app;