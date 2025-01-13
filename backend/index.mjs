import express from 'express';
import cors from 'cors'; // Import the CORS package
import { connectDB } from './db/connectDB.mjs';
import {v2 as cloudinary} from  'cloudinary';

import contentRoute from './routes/content.route.mjs';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.mjs';
import userRoutes from './routes/user.routes.mjs';
import { CLOUDINARY_API_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET_KEY } from './utils/constants.mjs';

const app = express();

connectDB();

app.use(express.json()); // Ensure body-parser is applied globally
app.use(cookieParser()); // Parse cookies

// Configure CORS - Allow all origins or restrict to specific origins
// if(CORS_ORIGIN){
//   app.use(cors({
//     origin: CORS_ORIGIN,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   }));
// }

app.get('/', async (req, res) => res.status(201).json({
  ok: true,
  running: true
}))

//cloudinary config
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET_KEY,
  secure: true,
})

app.use('/api/auth', authRoutes);
app.use('/api/content',contentRoute);
app.use('/api/users', userRoutes);

// app.listen(PORT, () => {
  // connectDB();
  // console.log(`Server running at http://localhost:${PORT}`);
// });

// module.exports = app;
export default app;