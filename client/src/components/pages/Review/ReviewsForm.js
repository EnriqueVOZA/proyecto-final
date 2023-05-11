import { Component } from 'react'
import { Container, Form, Row, Col, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReviewService from '../../../services/reviews.service'
import UploadsService from '../../../services/uploads.service'
import CustomizedRatings from "../../../utils/Rating/Rating"


class ReviewsForm extends Component {

    constructor() {
        super()
        this.state = {
            review: {
                title: '',
                text: '',
                points: '',
                owner: '',
                file_id: '',
                price: false,
            },
            loading: false
        }

        this.reviewService = new ReviewService()
        this.uploadService = new UploadsService()
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ review: { ...this.state.review, [name]: value } })
    }

    handleRating = value => { this.setState({ review: { ...this.state.review, points: value } }) }


    handleFormSubmit = e => {


        e.preventDefault()

        this.reviewService
        .reviewCreate(this.state.review)
        .then(() => {
                this.state.review.price ?
                    this.props.history.push(`/book/details/${this.state.review.file_id}`) :
                    this.props.history.push(`/post/details/${this.state.review.file_id}`)
                    
                this.state.review.price?
                this.props.loadBook().then(() => this.props.closeModal())
                :this.props.loadPost().then(() => this.props.closeModal())
                
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.props.price
            ? this.setState({ review: { price: true, file_id: this.props.match.params.book_id } })
            : this.setState({ review: { price: false, file_id: this.props.match.params.post_id } })
    }

    

    render() {
        return (

            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>

                        <h1>New Review</h1>
                        <hr></hr>

                        <Form onSubmit={this.handleFormSubmit}>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" value={this.state.title} onChange={this.handleInputChange} name="title" placeholder="Title" />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="text">
                                    <Form.Label>Review</Form.Label>
                                    <Form.Control type="text" value={this.state.text} onChange={this.handleInputChange} name="text" placeholder="Review" />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="text">
                                    <Form.Label>Rating</Form.Label>
                                    <CustomizedRatings type="number" value={this.state.points} onChange={this.handleInputChange} handleRating={this.handleRating} name="points" />
                                </Form.Group>
                            </Row>

                            <button className='btn-form' type="submit">Submit</button>
                        </Form>

                    </Col>
                </Row>
            </Container >
        )
    }
}


export default ReviewsForm