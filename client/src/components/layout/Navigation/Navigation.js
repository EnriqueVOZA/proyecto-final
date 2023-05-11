import { Component } from 'react'
import { Link } from 'react-router-dom'

import UsersService from '../../../services/users.service'
import AuthService from '../../../services/auth.service'
import BookService from '../../../services/books.service'
import PostService from '../../../services/posts.service'

import { Navbar, Nav, Modal, } from 'react-bootstrap'

import RegisterForm from '../../pages/User/Register/RegisterForm'
import Login from '../../pages/User/Login/Login'
import SearchPage from './SearchPage'

import logo from './logo.svg'


class Navigation extends Component {

    constructor() {
        super()
        this.state = {
            users: undefined,
            books: undefined,
            posts: undefined,
            modal: false
        }
        this.usersService = new UsersService()
        this.authService = new AuthService()
        this.bookService = new BookService()
        this.postService = new PostService()
    }

    logout = () => {
        this.authService
            .logout()
            .then(() => {
                this.props.showMessage('Logout successful')
                this.props.storeUser(undefined)
                this.props.history.push('/')
            })
            .catch(err => console.log(err))
    }

    getTimeline = () => {
        const getBooks = this.bookService.bookList()
        const getPosts = this.postService.postList()

        Promise
            .all([getBooks, getPosts])
            .then(response => {
                this.setState({ books: response[0].data, posts: response[1].data, timeline: [...response[0].data, ...response[1].data] })
            })
            .catch(err => console.log(err))
    }


    handleClose = () => { this.setState({ show: false }) }
    handleShow = () => { this.setState({ show: true }) }

    componentDidMount() {
        this.getTimeline()
    }

    render() {

        const { loggedUser, storeUser, history, showMessage } = this.props

        return (
            <Navbar className='navbar' bg="light" variant="light" expand="md">
                <Navbar.Brand href="/"><img className='logo' src={logo} alt=''></img><button className='brand'>forWords</button></Navbar.Brand >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="mr-auto">

                        {!loggedUser
                            ?
                            <>
                                {<button className='navbar-button' onClick={() => this.setState({ modal: true, registerShown: true })}>Register</button>}
                                {<button className='navbar-button' onClick={() => this.setState({ modal: true, registerShown: false })}>Login</button>}

                                <Modal className='login-modal' backdrop="static" keyboard={false} size='lg' show={this.state.modal} onHide={() => this.setState({ modal: false })}>
                                    <Modal.Header closeButton></Modal.Header>
                                    <Modal.Body>
                                        {this.state.registerShown
                                            ? <RegisterForm history={history} closeModal={() => this.setState({ modal: false })} loggedUser={loggedUser} storeUser={storeUser} showMessage={showMessage} />
                                            : <Login history={history} closeModal={() => this.setState({ modal: false })} loggedUser={loggedUser} storeUser={storeUser} showMessage={showMessage} />}
                                    </Modal.Body>
                                </Modal>
                            </>
                            :
                            <>
                                <SearchPage books={this.state.books} posts={this.state.posts} timeline={this.state.timeline} loggedUser={loggedUser} />
                                <Link className="navbar-link" to="/profile"> <button className='navbar-button'>{loggedUser ? loggedUser.firstName : ''}</button></Link>
                                <button className='navbar-button'><span className="navbar-link" onClick={this.logout}>Logout</span></button> 
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        )
    }
}


export default Navigation