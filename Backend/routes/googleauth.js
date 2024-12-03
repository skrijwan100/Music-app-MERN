const exprees = require("express")
const router = exprees.Router()
const passport = require("passport")
require('dotenv').config();

router.get("/login/falid",(req,res)=>{
    res.status(400).json({"message":"Loing fail"})
})

router.get('/login/sucesss',(req,res)=>{
    if(req.user){
        res.status(200).json({
            "message":"Loing suessfully",
            "user":req.user,
        })
    }
    else{
        res.status(401).json({"message":"Unauthorized"})
    }
})

router.get("/google/callback", passport.authenticate('google', {
    successRedirect: process.env.BACKEND_URL,
    failureRedirect: "/login/faild",

}))

router.get("/google",passport.authenticate("google",['profile',"email"]))

router.get("logout",(req,res)=>{
    req.logOut();
    res.redirect(process.env.FRONTEND_ORIGIN)
})

module.exports=router;