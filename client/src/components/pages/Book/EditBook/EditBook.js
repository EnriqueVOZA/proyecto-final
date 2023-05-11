import { Component } from 'react'
import { Container, Form, Row, Col, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import BookService from '../../../../services/books.service'
import UploadsService from '../../../../services/uploads.service'
import { Spinner } from 'react-bootstrap'

class BookEdit extends Component {

    constructor() {
        super()
        this.state = {
            book: {
                title: '',
                author: '',
                publisher: '',
                image: '',
                description: '',
                accepted: '',
                price: '',
                currency: '',
                review: '',
                owner: '',
            },
            loading: false
        }

        this.bookService = new BookService()
        this.uploadsService = new UploadsService()
    }

    componentDidMount() {

        const { book_id } = this.props.match.params

        this.loadFormInfo(book_id)
    }

    loadFormInfo = (book_id) => {
        this.bookService
            .bookDetails(book_id)
            .then(response => this.setState({ book: response.data }))
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ book: { ...this.state.book, [name]: value } })
    }

    handleFormSubmit = e => {

        const { book_id } = this.props.match.params

        e.preventDefault()

        this.bookService
            .bookEdit(this.state.book, book_id)
            .then(() => {
                this.props.history.push('/')
                this.props.closeModal()
            })
            .catch(err => console.log(err))
    }

    handleFileUpload = e => {

        this.setState({ loading: true })

        const uploadData = new FormData()
        uploadData.append('image-data', e.target.files[0])


        this.uploadsService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({
                    loading: false,
                    book: { ...this.state.book, image: response.data.cloudinary_url }
                })
            })

            .catch(err => console.log(err))
    }



    render() {
        console.log(this.props, 'PROPS')
        return (

            <Container>
                {!this.state.book
                    ?
                    <Spinner />
                    :
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>

                            <h1>Edit {this.state.book.title}</h1>
                            <hr></hr>

                            <Form onSubmit={this.handleFormSubmit}>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="title">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" value={this.state.book.title} onChange={this.handleInputChange} name="title" placeholder="Title" required/>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" value={this.state.book.description} onChange={this.handleInputChange} name="description" placeholder="Description" required/>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="author">
                                        <Form.Label>Author</Form.Label>
                                        <Form.Control type="text" value={this.state.book.author} onChange={this.handleInputChange} name="author" placeholder="Author" required/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="publisher">
                                        <Form.Label>Publisher</Form.Label>
                                        <Form.Control type="text" value={this.state.book.publisher} onChange={this.handleInputChange} name="publisher" placeholder="Publisher" required/>
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" value={this.state.book.price} onChange={this.handleInputChange} name="price" placeholder="Price" required/>
                                </Form.Group>

                                <img style={{ width: "100px" }} src={this.state.book.image} alt="book cover" />
                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control name="image" type="file" onChange={this.handleFileUpload} />
                                </Form.Group>

                                <button className='btn-form' type="submit">edit</button>
                            </Form>

                        </Col>
                    </Row>
                }
            </Container >
        )
    }
}


export default BookEdit