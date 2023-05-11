const express = require('express')
const router = express.Router()

const Book = require('./../models/Book.model')




//CREATE BOOK 
router.post('/create', (req, res) => {

    const loggedUser = req.session.currentUser
    const id = loggedUser._id

    const { title, author, publisher, image, description, price, currency } = req.body

    Book
        .create({ title, author, publisher, image, description, price, currency, owner: id })
        .then(book => res.json(book))
        .catch(err => res.status(500).json({ code: 500, message: 'Could not create book', err }))
})



//GET BOOKS LIST
router.get('/list', (req, res) => {

    Book
        .find({ accepted: true })
        .populate('owner review')
        .sort({createdAt: 1})
        .then(book => res.json(book))
        .catch(err => res.status(500).json({ code: 500, message: 'Book list not found', err }))
})



//READ BOOK 
router.get('/details/:book_id', (req, res) => {

    const { book_id } = req.params

    Book
        .findById(book_id)
        .populate('owner review')
        .then(book => res.json(book))
        .catch(err => res.status(500).json({ code: 500, message: 'Book details not found', err }))
})



//EDIT BOOK 
router.put('/:book_id', (req, res) => {

    const { book_id } = req.params
    const { title, description, price, currency, image } = req.body

    Book
        .findByIdAndUpdate(book_id, { title, description, price, currency, image }, { new: true })
        .then(book => res.json(book))
        .catch(err => res.status(500).json({ code: 500, message: 'Could not edit book', err }))
})

//GET BOOKS NOT CONFIRMED LIST
router.get('/confirm/list', (req, res) => {

    Book
        .find({ accepted: false })
        .select(' _id title image')
        .then(book => res.json(book))
        .catch(err => res.status(500).json({ code: 500, message: 'Book to confirm not found', err }))
})

/*CONFIRM BOOK TO SELL*/

router.put('/confirm/:book_id', (req, res) => {

    const { book_id } = req.params
    const { accepted } = req.body
    console.log(req.body, " -----req.body")
    Book
        .findByIdAndUpdate(book_id, { accepted }, { new: true })
        .then(book => res.json(book))
        .catch(err => res.status(500).json({ code: 500, message: 'Could not edit book', err }))
})

//DELETE BOOK 
router.delete('/:book_id', (req, res) => {

    const { book_id } = req.params

    Book
        .findByIdAndDelete(book_id)
        .then(book => res.json(book))
        .catch(err => res.status(500).json({ code: 500, message: 'Could not delete book', err }))
})



module.exports = router