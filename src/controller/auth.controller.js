const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerUser(req,res){
    const {username, email, password, role = "user"} = req.body
    const hash = await bcrypt.hash(password,10)

    const existingUser = await userModel.findOne({
        $or:[
            {username},
            {email},
        ]
    })
    if(existingUser){
        return res.status(400).json({
            message: "user already exists"
        })
    }
    const user = await userModel.create({
        username,
        email,
        password: hash,
        role,
    })
    const token = jwt.sign({
        id:user._id,
        role:user.role},
        process.env.JWT_SECRET)

        res.cookie('token', token)

        res.status(201).json({
            message: "user registered successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }
        })
}

async function loginUser(req,res){
    const {username,email,password} = req.body
    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(!user){
        return res.status(401).json({
            message: "user not existed"
        })
    }
    const validPassword = await bcrypt.compare(password,user.password)

    if(!validPassword){
        return res.status(401).json({
            message:"Invalid password or username"
        })
    }

     const token = jwt.sign({
        id:user._id,
        role:user.role},
        process.env.JWT_SECRET)

        res.cookie('token', token)

        res.status(201).json({
            message: "user loggedIn successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }
        })
}
async function logoutUser(req, res) {
    res.clearCookie('token')
    res.status(201).json({
        message: "Logout Successfuly"
    })
}

module.exports={registerUser,loginUser,logoutUser}