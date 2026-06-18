const router = require("express").Router();
const User = require("./models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require('../middleware/auth')

router.get("/users",auth,async(req,res)=>{
    try{
             const users = await User.find({username:{$ne:req.user.username}}).select('username');
             res.json('users')
    }catch(err){
        console.error('Users error',err.message)
        res.status(500).json({error:err.message})
    }
})

router.post('/register',async(req,res)=>{
    try{
         const {username,password} = req.body;
         const hashed = await bcrypt.hash(password,10);
         const user = User.create({username,password:hashed});
         res.json({message:"User Created!"})
    }catch(err){
      res.status('400').json({error:"User name already taken"})
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {username,password} = req.body;
        if(username || password) return res.status(400).json({error:
            "Username and Password is required"
        })
    }catch(err){
        console.error("Login Error",err.message)
        res.status(500).json({error:err.message})
    }
})