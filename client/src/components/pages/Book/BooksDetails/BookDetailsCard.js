import { Component } from "react"
import { Spinner, Container, Col, Row, Image, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReviewsForm from "../../Review/ReviewsForm"
import BookEdit from '../EditBook/EditBook'

import heart from './heart.svg'

class BookDetailsCard extends Component {
    constructor() {
        super()
        this.state = {
            modal: false,
            review: false
        }
    }

    printHearts = (valor) => {
        const rate = []
        for (let i = 0; i < valor; i++) {
            rate.push(<img className='heart' src={heart}></img>)
        }
        return rate
    }

    render() {

        const { history, loggedUser, storeUser, loadBook, review } = this.props

        review?.reverse()

        return (
            <Container>
                {!this.props.title
                    ?
                    <Spinner className='spinner' animation="grow" variant="info" size="lg" />
                    :
                    <>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Image className='cover-img' src={this.props.image} alt={this.props.title} />
                            <br></br><br></br>
                            <h3 className='profile-name'>{this.props.title}<Image className='profile-check' src='' /></h3>
                            <p className='profile-email'>{this.props.description} | {this.props.price} €</p>
                        </Col>
                        <Col md={{ span: 2, offset: 5 }}>
                            <Link className='mint-button' to={'/profile/' + this.props.owner[0]._id}>{this.props.owner[0].firstName} {this.props.owner[0].lastName}</Link>
                        </Col>
                        <br></br>

                        <Col md={{ span: 10, offset: 1 }}>
                            <Row className="mb-3">
                                <Col>
                                    {<button className='blue-button' onClick={() => this.setState({ modal: true, review: true })}>add review</button>}
                                </Col>
                                <Col>
                                    {<button className='pink-button' onClick={() => this.setState({ modal: true })}>Edit Book</button>}
                                </Col>
                            </Row>
                        </Col>

                        {/* contact owner */}

                        {loggedUser && loggedUser.role === "ADMIN" && this.props.negateBook
                            ?
                            <Col md={{ span: 2, offset: 5 }}>
                                {this.props.accepted
                                    ?
                                    <Row className="mb-3"> {<button className='rose-button' onClick={() => this.props.negateBook()}>Negate book</button>}</Row>
                                    :
                                    <Row className="mb-3"> {<button className='mint-button' onClick={() => this.props.confirmBook()}>Confirm book</button>}</Row>}
                            </Col>
                            :
                            <Col md={{ span: 4, offset: 4 }}>
                                <Row className="mb-3">
                                    <Link className='mint-button' to={`/details/${this.props._id}`}>details</Link>
                                </Row>
                                
                            </Col>}
                        
                        <Col md={{ span: 6, offset: 3 }}>
                            <br></br>
                            <h3 >Reviews: </h3>
                            <hr></hr>
                            {review.map(elm =>
                                <>
                                    {this.printHearts(elm.points)}
                                    <h5>{elm.title}</h5>
                                    <p>{elm.text}</p>
                                </>
                            )}
                        </Col>

                        <Modal
                            backdrop="static"
                            keyboard={false}
                            size='lg' show={this.state.modal} onHide={() => this.setState({ modal: false })}>
                            <Modal.Header closeButton></Modal.Header>
                            <Modal.Body>
                                {!this.state.review ?
                                    <BookEdit {...this.props} history={history} closeModal={() => this.setState({ modal: false })} loggedUser={loggedUser} storeUser={storeUser} />
                                    : <ReviewsForm {...this.props} history={history} closeModal={() => this.setState({ modal: false })} loggedUser={loggedUser} storeUser={storeUser} />}
                            </Modal.Body>
                        </Modal>
                    </>
                }
            </Container>
        )
    }
}

export default BookDetailsCard