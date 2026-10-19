const express = require ('express')
const musicController=require('../controller/music.controller') 
const authMiddleware=require('../middlewares/artist.middleware')
const multer = require('multer')


const artist= multer({
    storage: multer.memoryStorage()
})
const router = express.Router()

router.post('/artist', authMiddleware.authArtist, artist.single('music'), musicController.userCategory)
router.post('/album',  authMiddleware.authArtist, musicController.createAlbum)
router.get('/', authMiddleware.authUser, musicController.getAllMusic)
router.get('/albums', authMiddleware.authUser, musicController.getAllAlbums)
router.get('/albums/:albumId', authMiddleware.authUser, musicController.getAllAlbumsMusic)





module.exports=router;
