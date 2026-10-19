const musicModel = require('../models/music.model')
const jwt = require('jsonwebtoken')
const albumModel= require('../models/album.model')
const {uploadFile}= require('../services/storage.service')
const authMiddleware= require('../middlewares/artist.middleware')

async function userCategory(req,res){

   const {title}=req.body
   const file= req.file
   const result = await uploadFile(file.buffer.toString('base64'))

   const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
     })
         res.status(201).json({
            message: "Music created successfully",
            music:{
                id:music._id,
                title:music.title,
                uri:music.uri,
                artist:music.artist,
            }
         })    
}

async function createAlbum(req, res){
    
      const { title, music }= req.body
           

      const album = await albumModel.create({
        title,
        artist: req.user.id,
        music: music,
      })
      res.status(201).json({
        message:"Album created successfully",
        album:{
            id: album._id,
            artist: album.artist,
            title: album.title,
            music: album.music,
        }
      })
}

async function getAllMusic(req,res){
    const music = await musicModel.find().limit(2).populate('artist','username')
    res.status(200).json({
        message:"Music fetched successfully",
        music : music
    })
}

async function getAllAlbums(req,res){
     const albums = await albumModel.find().select('title artist').populate('artist','username')

    res.status(200).json({
        message:"Albums fetched successfully",
        albums: albums
    })
}
async function getAllAlbumsMusic(req,res){
     const albumId= req.params.albumId
     console.log(albumId)
     const album = await albumModel.findById(albumId).populate('artist','username').populate('music')
     if (!album) {
            return res.status(404).json({
                message: "Album not found"
            });
        }

     return res.status(200).json({
        message:"Albums Music fetched successfully",
        album: album
    })
}

module.exports={userCategory,createAlbum,getAllMusic,getAllAlbums,getAllAlbumsMusic}


