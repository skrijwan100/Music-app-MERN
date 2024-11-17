const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const fecthuser = require('../middleware/fecthuser');
const Songs = require('../models/Songs');
const Favsong = require('../models/Favsong');

router.post("/addfavsong/:id",fecthuser, async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        // console.log(req.body)
        // const { title, artist } = req.body;
        const findsong = await Songs.findById(req.params.id)
        console.log(findsong)
        const stitle = findsong.stitle;
        const artist = findsong.artist;
        const coverImg = findsong.coverImg;
        const duration = findsong.duration;
        const fileUrl = findsong.fileUrl;

        if (!findsong) {
            return res.status(404).json({ "error": "NOT FOUND" })
        }
        const addfavsong= await Favsong({
            user: req.user,
            stitle,
            artist,
            coverImg,
            duration,
            fileUrl
        })
        const favsong=  await addfavsong.save()
        return res.status(200).json({ "message": favsong})
    } catch (error) {
        console.log(error)
        return res.status(500).send("intarnal server error.")
    }

})
router.get("/fecthallfavsong",fecthuser,async(req,res)=>{
    try {
        const findallfavsong= await Favsong.find({user:req.user})
        // console.log(findallfavsong)
        return res.status(200).json({"message":findallfavsong})

    } catch (error) {
        console.log(error)
        return res.status(500).send("intarnal server error.")
        
    }
   
})
router.delete("/deltefavsong/:id",fecthuser,async(req,res)=>{
    try {
    await Favsong.findByIdAndDelete(req.params.id)
    return res.status(200).json({"message":"delete complect"})
} catch (error) {
    console.log(error)
    return res.status(500).send("intarnal server error.")
        
}

})

module.exports = router;