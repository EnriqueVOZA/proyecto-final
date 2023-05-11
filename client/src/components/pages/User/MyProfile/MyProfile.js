import { Component } from "react"
import { Col, Image, Modal, Row, Spinner } from "react-bootstrap"

import UserService from "../../../../services/users.service"
import BookService from "../../../../services/books.service"
import { Redirect } from 'react-router-dom'
import ProfileBar from './ProfileBar/ProfileBar'
import BooksForm from "../../Book/BooksForm/BooksForm"
import PostsForm from "../../Post/PostsForm/PostsForm"
import ProfileEdit from "../EditUser/EditForm"
import AdminBar from "../../Admin/Admin Panel"


class MyProfile extends Component {
    constructor() {
        super()
        this.state = {
            books: undefined,
            post: undefined,
            booksToConfirm: undefined,
            modal: false,
            modal2: false,
            adminModal: false,
        }
        this.userService = new UserService()
        this.bookService = new BookService()
    }

    loadBookForAdmin = () => {
        this.bookService
            .bookToConfirm()
            .then(response => this.setState({ booksToConfirm: response.data }))
            .catch(err => console.log(err))
    }

    loadUser = () => {

        this.userService
            .profile()
            .then(response => this.setState({ friends: response.data[0].friends, books: response.data[1], posts: response.data[2] }))
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.loadUser()
        this.loadBookForAdmin()
    }

    render() {

        const { loggedUser, storeUser, history } = this.props

        return (
            loggedUser === undefined ? <Spinner className='spinner' animation="grow" variant="info" size="lg" />
                : !loggedUser ? <Redirect to="/" /> :
                    <>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Image className='cover-img' src={loggedUser.cover} />
                            <Image className='profile-img' src={loggedUser.image} roundedCircle />
                            <h3 className='profile-name'>{loggedUser.firstName} {loggedUser.lastName} <Image className='profile-check' src='' /></h3>
                            <p className='profile-email'>{loggedUser.email}</p>
                            <p className='profile-bio'>{loggedUser.bio}</p>

                            <br></br>
                        </Col>
                        {loggedUser.role === "ADMIN"
                            ?
                            <Col md={{ span: 2, offset: 5 }}>
                                <Row className="mb-3"> {<button className='mint-button' onClick={() => this.setState({ adminModal: true })}>Admin Panel</button>}</Row>
                                <br></br>
                            </Col>
                            :
                            <Col md={{ span: 4, offset: 4 }}>
                                <Row className="mb-3"></Row>
                            </Col>}
                        
                        <Col md={{ span: 4, offset: 4 }}>
                            <Row className="mb-3">

                                <Col>
                                    {<button className='blue-button' onClick={() => this.setState({ modal: true, isPost: false })}>add book</button>}
                                </Col>
                                <Col>
                                    {<button className='blue-button' onClick={() => this.setState({ modal: true, isPost: true })}>add post</button>}
                                </Col>

                                <Modal
                                    backdrop="static"
                                    keyboard={false}
                                    size='lg' show={this.state.modal} onHide={() => this.setState({ modal: false })}>
                                    <Modal.Header closeButton></Modal.Header>
                                    <Modal.Body>
                                        {this.state.isPost
                                            ? <PostsForm history={history} closeModal={() => this.setState({ modal: false })} loggedUser={loggedUser} storeUser={storeUser} />
                                            : <BooksForm history={history} closeModal={() => this.setState({ modal: false })} loggedUser={loggedUser} storeUser={storeUser} />}
                                    </Modal.Body>
                                </Modal>
                                <Col>
                                    <button className='pink-button' onClick={() => this.setState({ modal2: true })}>edit profile</button>{' '}
                                </Col>
                                <Modal backdrop="static" keyboard={false} size='lg' show={this.state.modal2} onHide={() => this.setState({ modal2: false })}>
                                    <Modal.Header closeButton></Modal.Header>
                                    <Modal.Body>
                                        <ProfileEdit {...this.props} history={history} closeModal={() => this.setState({ modal2: false })} loggedUser={loggedUser} storeUser={storeUser} />
                                    </Modal.Body>
                                </Modal>
                                <Modal backdrop="static" keyboard={false} size='lg' show={this.state.adminModal} onHide={() => this.setState({ adminModal: false })}>
                                    <Modal.Header closeButton></Modal.Header>
                                    <Modal.Body>
                                        <AdminBar books={this.state.booksToConfirm} />
                                    </Modal.Body>
                                </Modal>
                            </Row>
                        </Col>
                        <br></br>
                        <ProfileBar {...this.props} books={this.state.books} friends={this.state.friends} posts={this.state.posts} />
                    </>
        )
    }
}

export default MyProfile