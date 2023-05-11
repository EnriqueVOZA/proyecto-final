import { Component } from 'react'
import { Container, Form, Row, Col, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import BookService from '../../../../services/books.service'
import UploadsService from '../../../../services/uploads.service'


class BooksForm extends Component {

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


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ book: { ...this.state.book, [name]: value } })
    }


    handleFormSubmit = e => {

        e.preventDefault()

        this.bookService
            .bookCreate(this.state.book)
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
                    book: { ...this.state.book, [e.target.name]: response.data.cloudinary_url }
                })
            })

            .catch(err => console.log(err))
    }


    render() {
        return (

            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>

                        <h1>New Book</h1>
                        <hr></hr>

                        <Form onSubmit={this.handleFormSubmit}>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" value={this.state.title} onChange={this.handleInputChange} name="title" placeholder="Title" required />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" value={this.state.description} onChange={this.handleInputChange} name="description" placeholder="Description" required />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="author">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control type="text" value={this.state.author} onChange={this.handleInputChange} name="author" placeholder="Author" required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="publisher">
                                    <Form.Label>Publisher</Form.Label>
                                    <Form.Control type="text" value={this.state.publisher} onChange={this.handleInputChange} name="publisher" placeholder="Publisher" required />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" value={this.state.price} onChange={this.handleInputChange} name="price" placeholder="Price" required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control name="image" type="file" onChange={this.handleFileUpload} />
                            </Form.Group>

                            <button className='btn-form' type="submit">Submit</button>
                        </Form>
                        
                    </Col>
                </Row>
            </Container >
        )
    }
}


export default BooksForm