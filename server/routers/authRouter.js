import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();


router.get('/login',authController.getTempCode);
router.get('/spotify-callback',authController.setAccessToken);
router.post('/refresh-token', authController.refreshAccessToken);
router.get('/access-token', authController.getAccessToken);
router.get("/sdk-token", authController.getSDKToken);

//router.post('/logout',authController.logout);

export default router;