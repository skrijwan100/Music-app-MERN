const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const Songs = require('../models/Songs');
const fecthadmin = require("../middleware/fecthadmin")

router.post("/addsong", fecthadmin, [
    body('stitle', "Enter song title").isLength({ min: 3 }),
    body('artist', "Enter song artist name").isLength({ min: 4 }),
    body('coverImg', 'Enter cover img url').exists(),
    body('duration', "Enter duration of your song").exists(),
    body('fileUrl', 'Enter loction of the song').exists(),
], async (req, res) => {
    try {


        const { stitle, artist, coverImg, duration, fileUrl } = req.body;
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const newsong = await Songs({
            stitle: stitle,
            artist: artist,
            coverImg: coverImg,
            duration: duration,
            fileUrl: fileUrl
        })
        const song = await newsong.save();
        return res.status(200).json({ song })
    } catch (error) {
        console.log(error)
        return res.status(500).send("intarnal server error.")
    }

})

router.get("/getallsong", async (req, res) => {
    try {
        const allsong = await Songs.find()
        return res.status(200).json({ allsong })

    } catch (error) {
        console.log(error)
        return res.status(500).send("intarnal server error.")

    }
})

router.put("/updatesong/:id", fecthadmin, [
    body('stitle', "Enter song title").isLength({ min: 3 }),
    body('artist', "Enter song artist name").isLength({ min: 4 }),
    body('coverImg', 'Enter cover img url').exists(),
    body('duration', "Enter duration of your song").exists(),
    body('fileUrl', 'Enter loction of the song').exists()
], async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        try {
            const findsong = await Songs.findById(req.params.id)

        } catch (error) {
            return res.status(404).json({ "message": "NOT FOUND" })

        }
        const updatesong = {}
        const { stitle, artist, coverImg, duration, fileUrl } = req.body;
        if (stitle) {
            updatesong.stitle = stitle;
        }
        if (artist) {
            updatesong.artist = artist;
        }
        if (coverImg) {
            updatesong.coverImg = coverImg;
        }
        if (duration) {
            updatesong.duration = duration;
        }
        if (fileUrl) {
            updatesong.fileUrl = fileUrl
        }

        const newupdatesong = await Songs.findByIdAndUpdate(req.params.id, { $set: updatesong }, { new: true })
        return res.status(200).json({ newupdatesong })


    } catch (error) {
        console.log(error)
        return res.status(500).send("intarnal server error.")

    }

})

router.delete("/deletesong/:id", fecthadmin, async (req, res) => {
    try {
        try {
            const findsong = await Songs.findById(req.params.id)

        } catch (error) {
            return res.status(404).json({ "error": "NOT FOUND" })

        }
        await Songs.findByIdAndDelete(req.params.id)
        return res.status(202).json({"message":"delete complect"})
    } catch (error) {
        console.log(error)
        return res.status(500).send("intarnal server error.")
    }

})
module.exports = router;