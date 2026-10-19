const jwt = require('jsonwebtoken')

async function authArtist(req,res,next) {
     const token = req.cookies.token
    
  if(!token){
    return res.status(401).json({
        message: "Unauthorozed"
    })
  }
   try{
  
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role!=="artist"){
          return res.status(403).json({ message:"Not allowed to create an album"})
        }
          req.user = decoded
            next()

        }catch(err){
         return res.status(401).json({
        message: "Invalid Artist Credentials"
     })
    }
}

async function authUser(req,res,next){
    const token = req.cookies.token
     if(!token){
    return res.status(401).json({
        message: "Unauthorozed"
    })
  }
   try{
  
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if (decoded.role !=="user" ){
            return res.status(403).json({
                message: "You dont have access"
            })
        }
          req.user = decoded
            next()

        }catch(err){
         return res.status(401).json({
        message: "Invalid User Credentials"
     })
    }
}


module.exports={authArtist,authUser}