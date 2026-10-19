require("dns").setServers(["8.8.8.8"]) 
const mongoose = require('mongoose')

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected to MongoDB')
    }
    catch(err){
        console.log('Error connecting to MongoDB',err)
    }
}

module.exports = connectDB