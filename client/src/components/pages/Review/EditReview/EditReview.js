import { Component } from 'react'
import { Container, Form, Row, Col, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UploadsService from '../../../../services/uploads.service'
import { Spinner } from 'react-bootstrap'
import ReviewService from '../../../../services/reviews.service'


class ReviewEdit extends Component {

    constructor() {
        super()
        this.state = {
            review: {
                title: '',
                text: '',
                points: '',
                owner: '',
            },
            loading: false
        }

        this.reviewService = new ReviewService()
        this.uploadsService = new UploadsService()
    }

    componentDidMount() {

        const { review_id } = this.props.match.params

        this.loadFormInfo(review_id)
    }

    loadFormInfo = (review_id) => {
        this.reviewService
            .reviewDetails(review_id)
            .then(response => this.setState({ review: response.data }))
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ review: { ...this.state.review, [name]: value } })
    }

    handleFormSubmit = e => {

        const { review_id } = this.props.match.params

        e.preventDefault()

        this.reviewService
            .reviewEdit(this.state.review, review_id)
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
                    review: { ...this.state.review, image: response.data.cloudinary_url }
                })
            })

            .catch(err => console.log(err))
    }



    render() {
        console.log(this.props, 'PROPS')
        return (

            <Container>
                {!this.state.review
                    ?
                    <Spinner />
                    :
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>

                            <h1>Edit {this.state.review.title}</h1>
                            <hr></hr>

                            <Form onSubmit={this.handleFormSubmit}>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="title">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" value={this.state.review.title} onChange={this.handleInputChange} name="title" placeholder="Title" />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="text">
                                        <Form.Label>Review</Form.Label>
                                        <Form.Control type="text" value={this.state.review.text} onChange={this.handleInputChange} name="text" placeholder="Review" />
                                    </Form.Group>
                                </Row>

                                <button className='btn-form' type="submit">edit</button>
                            </Form>

                        </Col>
                    </Row>
                }
            </Container >
        )
    }
}


export default ReviewEdit