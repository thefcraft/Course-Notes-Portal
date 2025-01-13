import express from 'express';
import cookieParser from 'cookie-parser';
import { signinMicrosoft, logout, checkAuth } from '../controllers/auth.controller.mjs';
import { verifyToken } from '../middleware/verifyToken.mjs';
const router = express.Router();

router.get('/check-auth', verifyToken, checkAuth);

router.post('/signinMicrosoft', signinMicrosoft);
router.post('/logout', logout);

export default router