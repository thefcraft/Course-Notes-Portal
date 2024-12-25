import express from 'express';
import { getUserProfile, updateUserProfile, getPublicProfile, updateUserRole, getAllUsers } from '../controllers/user.controller.mjs';
import { verifyToken } from '../middleware/verifyToken.mjs';
import { authorizeRole } from '../middleware/authorizeRoles.mjs';

const router = express.Router();

router.get('/me', verifyToken, getUserProfile); // Fetch authenticated user details
router.put('/me', verifyToken, updateUserProfile); // Update authenticated user profile
router.put('/updateRole',verifyToken,authorizeRole("admin"), updateUserRole); 
router.get('/get-users', getAllUsers); 
router.get('/:user_id', verifyToken, getPublicProfile); // Fetch another user's public profile

export default router;
