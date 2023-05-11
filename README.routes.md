**/ INDEX /**
​
baseroute:'/'
router.get('/', (req, res) => res.json())
​
​
​
**/ USER /** 
**/ LOGIN (API)/**
<!-- modal => render -->
​
api.post('/login' (req, res) => {
​
    User
        .findOne('username')
        .then(user => res.json(user))
})
​
​
​
**/ SIGNUP /**
<!-- modal => render -->
​
api.post('/register', (req, res) => {
    
    User
        .create( { ... } )
        .then(() => res.json(user))  
})
<!--  signup es un MODAL no cambia de página y depués 
del login te muestra los contenidos protegidos -->
​
​
​
**/ PROFILE /**
​
api.get('/profile', (req, res) => { 
​
    const id = req.session.currentUser.id
    
    User
        .findById(id)
        .populate('reviews, post, book')
        .then(() => res.json())
})
​
​
​
**/ EDIT PROFILE /**
<!-- modal con detalles del profile -->
<!-- protegido, sólo CURRENTUSER-->
​
api.put('/profile/details/edit', (req, res) => { 
​
    User
        .findByIdAndUpdate()
})
​
​
​
**/ DELETE /**
<!-- protegido, sólo CURRENTUSER-->
​
api.delete('/user/delete/:id', (req, res) => {
​
    User
        .findByIdAndDelete()
        .then(() => res.json())
})
​
​
​
**/ BOOK /** 
**/ CREATE /**
<!-- modal => render -->
​
api.post('/new-book', (req, res) => {
​
    Book
        .create({ ... })
        .then(() => redirect('/profile'))
})
<!-- sale en el profile del user y en el timeline -->
​
​
​
**/ READ /**
​
api.get('/book/details/:id', (req, res) => { 
​
    Book
        .findById()
        .populate('reviews')
})
​
​
​
**/ UPDATE /**
<!-- protegido, sólo OWNER Y ADMIN-->
​
api.get('/book/details/:id', (req, res) => {
​
    Book
        .findById()
})
​
<!-- carga el formulario (MODAL) con la info del book -->
api.put('/book/update/:id', (req, res) => {
​
    Book
        .findByIdAndUpdate()
})
​
​
​
**/ DELETE /**
<!-- protegido, sólo OWNER Y ADMIN-->
​
api.delete('/book/delete/:id', (req, res) => {
​
    Book
        .findByIdAndDelete()
        .then(() => res.json())
})
​
​
​
**/ POST /** 
**/ CREATE /**
<!-- modal => render -->
​
api.post('/new-post', (req, res) => {
​
    Post
        .create({ ... })
        .then(() => res.json())
})
<!-- sale en el profile del user y en el timeline -->
​
​
​
**/ READ /**
​
api.get('/post/details/:id', (req, res) => { 
​
    Post
        .findById()
        .populate('reviews')
})
​
​
​
**/ UPDATE /**
<!-- protegido, sólo OWNER Y ADMIN-->
<!-- carga el formulario (MODAL) con la info del book -->
​
api.put('/post/update/:id', (req, res) => {
​
    Post
        .findByIdAndUpdate()
})
​
​
​
**/ DELETE /**
<!-- protegido, sólo OWNER Y ADMIN-->
​
api.delete('/post/delete/:id', (req, res) => {
​
    Post
        .findByIdAndDelete()
        .then(() => res.json())
})
​
​
​
​
**/ REVIEWS /**
**/CREATE/**
<!-- protegido, solo USER -->
<!-- desde POST/BOOK details -->
​
api.post(/book||post/details/review/:id', (req, res) => { 
​
const userId = req,session.currentUser.id
const bookId = { id } = req.params
const { title, text, points } = req.body
​
    Review
        .create({ owner : userId, book : bookId, title, text, points })
        .then( () => res.json())
})
​
​
​
**/EDIT/**
<!-- protegido, solo el OWNER y ADMIN  -->
<!-- desde POST/BOOK details -->
<!-- carga el formulario (MODAL) con la info de la review -->
​
api.put('/book||post/details/review/edit/:id', (req, res) => { 
​
const userId = req,session.currentUser.id
const bookId = { id } = req.params
const { title, text, points } = req.body
​
<!-- ver si se puede hacer sin destructurar -->
​
    Review
        .findByIdAndUpdate({ owner : userId, book : bookId, title, text, points })
        .then( () => res.json())
​
​
​
**/DELETE/**
<!-- protegido, sólo OWNER Y ADMIN-->
​
api.delete('/book||post/details/review/delete/:id', (req, res) => {
​
const { id } = req.params
​
    Review
        .findByIdAndDelete(id)
        .then(() => res.json())
})

