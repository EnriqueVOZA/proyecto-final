const express = require('express')
const router = express.Router()


router.get('/unsplash', (req, res) => res.json(process.env.UNSPLASH))


module.exports = router