import express from 'express';
import cookieParser from 'cookie-parser';
import { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth, resendOtp } from '../controllers/auth.controller.mjs';
import { verifyToken } from '../middleware/verifyToken.mjs';
const router = express.Router();

router.use(express.json()); // to parse request.body as JSON
router.use(cookieParser()); // to parse cookie




router.get('/check-auth', verifyToken, checkAuth);

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.post('/verify-email', verifyEmail);
router.post('/resend-otp', resendOtp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router