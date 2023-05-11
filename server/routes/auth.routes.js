const express = require('express')
const router = express.Router()

const User = require('../models/User.model')

const bcrypt = require("bcrypt")
const bcryptSalt = 10

const transporter = require('../config/nodemailer.config')

const { randomToken, emails } = require('../utils')



// USER -- SIGNUP
router.post('/register', (req, res) => {

    const { email, password, firstName, lastName, bio, role, friend, image, cover } = req.body
    const address = { road, number, city, state } = req.body

    const tokenConfirmation = randomToken()
    const objectEmail = { email, tokenConfirmation }
    const emailToSend = emails('email', objectEmail)

    transporter
        .sendMail(emailToSend)
        .then(info => console.log(info))
        .catch(err => console.log(err))

    console.log(req.body)
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    User
        .create({ email, password: hashPass, firstName, lastName, bio, tokenConfirmation, role, friend, address, image, cover })
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err }))
})



// EMAIL'S CONFIRMATION
router.get('/confirmation/email/:token', (req, res) => {

    const { token } = req.params

    User.find({ tokenConfirmation: token })
        .then(user => {

            if (user.length) {

                User.findByIdAndUpdate(user[0]._id, { role: 'USER' }, { new: true })
                    .then(() => res.redirect('/api'))
                    .catch(err => console.log(err))

            } else {

                res.status(401).json({ code: 401, message: 'Email confirmation Error' })
            }
        })
        .catch(err => console.log(err))
})



//LOGIN -- (API)
router.post('/login', (req, res) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {

            if (!user) {
                res.status(401).json({ code: 401, message: 'Username not registered' })
                return
            }

            if (!bcrypt.compareSync(password, user.password)) {
                res.status(401).json({ code: 401, message: 'Incorrect password' })
                return
            }

            req.session.currentUser = user
            res.json(req.session.currentUser)
        })

        .catch(err => res.status(500).json({ code: 500, message: 'Try again', err }))
})



//LOGOUT -- (API)
router.get('/logout', (req, res) => {
    req.session.destroy(() => res.json({ message: 'Logout successful' }))
})



//IS LOGIN?
router.post('/isloggedin', (req, res) => {
    req.session.currentUser ? res.json(req.session.currentUser) : res.status(401).json({ code: 401, message: 'Unauthorized' })
})



module.exports = router