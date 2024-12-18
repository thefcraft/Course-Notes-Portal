import express from 'express';
import { getUserProfile, updateUserProfile, getPublicProfile } from '../controllers/user.controller.mjs';
import { verifyToken } from '../middleware/verifyToken.mjs';

const router = express.Router();

router.get('/me', verifyToken, getUserProfile); // Fetch authenticated user details
router.put('/me', verifyToken, updateUserProfile); // Update authenticated user profile
router.get('/:user_id', verifyToken, getPublicProfile); // Fetch another user's public profile

export default router;
