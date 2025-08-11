import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();


router.get('/login',authController.getTempCode);
router.get('/spotify-callback',authController.getAccessToken);
router.post('/refresh-token', authController.refreshAccessToken);
//router.post('/logout',authController.logout);

export default router;