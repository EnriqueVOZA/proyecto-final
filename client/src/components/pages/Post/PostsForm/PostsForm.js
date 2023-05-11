import { Component } from 'react'
import { Container, Form, Row, Col, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PostService from '../../../../services/posts.service'
import UploadsService from '../../../../services/uploads.service'


class PostsForm extends Component {

    constructor() {
        super()
        this.state = {
            post: {
                title: '',
                text: '',
                image: '',
                review: '',
                owner: '',
            },
            loading: false
        }

        this.postService = new PostService()
        this.uploadsService = new UploadsService()
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ post: { ...this.state.post, [name]: value } })
    }


    handleFormSubmit = e => {

        e.preventDefault()

        this.postService
            .postCreate(this.state.post)
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
                    post: { ...this.state.post, image: response.data.cloudinary_url }
                })
            })

            .catch(err => console.log(err))
    }


    render() {
        return (

            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>

                        <h1>New Post</h1>
                        <hr></hr>

                        <Form onSubmit={this.handleFormSubmit}>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" value={this.state.title} onChange={this.handleInputChange} name="title" placeholder="Title" required />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="text">
                                    <Form.Label>Text</Form.Label>
                                    <Form.Control type="text" value={this.state.text} onChange={this.handleInputChange} name="text" placeholder="Text" required />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control name="image" type="file" className="custom-file-input" id="customFile" onChange={this.handleFileUpload} />
                            </Form.Group>

                            <button className='btn-form' type="submit">Submit</button>
                        </Form>
                        
                    </Col>
                </Row>
            </Container >
        )
    }
}


export default PostsForm