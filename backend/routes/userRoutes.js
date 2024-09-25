import express from 'express';
const router = express.Router();

import { authUser, 
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile ,
    handleFileUpload,
    upload
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';


router.post('/', upload.single('image'), handleFileUpload, registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
