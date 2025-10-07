import express from 'express';
import contentController from '../controllers/contentController.js';

const router = express.Router();


router.get('/songs',contentController.getSongsPage);
router.get('/songs/search',contentController.getSongSearchResults);
router.get('/songs/:songId', contentController.getSingleSongInfo);
router.get('/albums', contentController.getAlbumsPage);
router.get('/albums/search',contentController.getAlbumSearchResults);
router.get('/albums/:albumId',contentController.getSingleAlbumInfo);
router.get('/artists',contentController.getArtistsPage);
router.get('/artists/search',contentController.getArtistSearchResults);
router.get('/artists/:artistId',contentController.getSingleArtistInfo);

export default router;