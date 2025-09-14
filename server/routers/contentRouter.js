import express from 'express';
import contentController from '../controllers/contentController.js';

const router = express.Router();


router.get('/songs',contentController.getSongsPage);
router.get('/songs/:songId', contentController.getSingleSongInfo);
router.get('/albums', contentController.getAlbumsPage);
router.get('/artists',contentController.getArtistsPage);

export default router;