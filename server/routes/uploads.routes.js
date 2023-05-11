const express = require('express')
const router = express.Router()

const uploader = require('../config/cloudinary.config')



//IMAGE PROFILE
router.post('/image', uploader.single("image-data"), (req, res) => {
    
    if (!req.file) {
        res.status(500).json({ code: 500, message: 'Error loading the file' })
        return
    }

    res.json({ cloudinary_url: req.file.path })
})



module.exports = router