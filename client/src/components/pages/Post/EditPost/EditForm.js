import { Component } from 'react'
import { Container, Form, Row, Col, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PostService from '../../../../services/posts.service'
import UploadsService from '../../../../services/uploads.service'
import { Spinner } from 'react-bootstrap'

class PostEdit extends Component {

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

    componentDidMount() {

        const { post_id } = this.props.match.params

        this.loadFormInfo(post_id)
    }

    loadFormInfo = (post_id) => {
        this.postService
            .postDetails(post_id)
            .then(response => this.setState({ post: response.data }))
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ post: { ...this.state.post, [name]: value } })
    }

    handleFormSubmit = e => {

        const { post_id } = this.props.match.params

        e.preventDefault()

        this.postService
            .postEdit(this.state.post, post_id)
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
                {!this.state.post
                    ?
                    <Spinner />
                    :
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>

                            <h1>Edit {this.state.post.title}</h1>
                            <hr></hr>

                            <Form onSubmit={this.handleFormSubmit}>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="title">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" value={this.state.post.title} onChange={this.handleInputChange} name="title" placeholder="Title" required />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="text">
                                        <Form.Label>Text</Form.Label>
                                        <Form.Control type="text" value={this.state.post.text} onChange={this.handleInputChange} name="text" placeholder="Text" required />
                                    </Form.Group>
                                </Row>

                                <img style={{ width: "100px" }} src={this.state.post.image} alt="book cover" />
                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control name="image" type="file" onChange={this.handleFileUpload} />
                                </Form.Group>

                                <button className='btn-form' type="submit">Edit</button>
                            </Form>

                        </Col>
                    </Row>
                }
            </Container >
        )
    }
}


export default PostEdit