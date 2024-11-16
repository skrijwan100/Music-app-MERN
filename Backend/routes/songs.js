const express = require('express')
const router= express.Router()
const Song= require("../models/Songs")

router.post("/addsong",async(req,res)=>{
    res.send("hello")
    
})

module.exports=router;