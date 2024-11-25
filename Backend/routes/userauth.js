const express= require("express")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const fecthuser=require("../middleware/fecthuser")
const router = express.Router()
const jwt_secret=process.env.JWT_SECRET_CODE

router.post("/register",[
    body('name','Enter your name').isLength({min:3}),
    body('email','Enter your email').isEmail(),
    body('password','Enter password the length more then 7 charector').isLength({min:7})
],async(req,res)=>{
    // console.log(req.body)
    try {
        
  
    const {name,email,password}=req.body;
    const error=validationResult(req)
      if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
      }
    const chakeemail= await User.findOne({email})
    if(chakeemail){
        return res.status(400).json({"error":"The Email is aleady exites"})
    }
    const salt = await bcrypt.genSalt(12)
    const hashpass= await bcrypt.hash(password,salt)
    const user = await User({
        name:name,
        email:email,
        password:hashpass,
    })
    user.save()
    // const authtoken=jwt.sign({user:user.id},jwt_secret)
    // res.cookie("auth-token",authtoken,{
    //     httpOnly:true,
    //     maxAge: 24 * 60 * 60 * 1000,  
    // })
    return res.status(202).json({"message":"You register Successfully"})
} catch (error) {
    console.log(error)
    res.status(500).send("intarnal server error.")
}

})

router.post("/login",[
    body('email','Enter your email.').isEmail(),
    body('password','Enter password').isLength({min:5})
],async(req,res)=>{
    try {
        
    
    const {email,password}=req.body;
    const error=validationResult(req)
      if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
      }
    const finduser= await User.findOne({email:email})
    if(!finduser){
        return res.status(404).json({"error":"Not fonud any account"})
    }
    const chakepass= await bcrypt.compare(password,finduser.password)
    if(!chakepass){
       return res.status(400).json({"error":"Enter right password"})
    }
    const jwttoken= jwt.sign({user:finduser.id},jwt_secret)
    res.cookie("auth-token",jwttoken,{
        // httpOnly:true,
        sameSite: "None", // Allow cross-origin requests
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,  
    })
    return res.status(200).json({"message":"Login scuessfully"})
} catch (error) {
    console.log(error)
    res.status(500).send("intarnal server error.")
}

})

router.get("/getuser",fecthuser,async(req,res)=>{
 const userid=req.user
 console.log(userid)
 const userdata= await User.findById(userid).select("-password")
 console.log(userdata)
 res.status(202).json({"message":userdata})
})
router.post("/logout",(req,res)=>{
    res.clearCookie("auth-token", {
        httpOnly: true,
        secure: true, // Use in production with HTTPS
        sameSite: "Strict", // Prevent CSRF attacks
      });
      return res.status(200).json({ message: "Logged out successfully" });
})


module.exports=router