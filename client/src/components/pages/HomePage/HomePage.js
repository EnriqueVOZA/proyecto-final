import { Component } from 'react'
import { Modal, Spinner, Row } from 'react-bootstrap'
import UnSplashService from '../../../services/unSplash.service'
import UnSplashApiService from '../../../services/unSplashapi.service'
import BookService from '../../../services/books.service'
import PostService from '../../../services/posts.service'

import RandomImgCard from './RandomImgCard'
import TimelineCard from './TimelineCard'
import Login from '../../pages/User/Login/Login'
import RegisterForm from '../User/Register/RegisterForm'


class HomePage extends Component {

    constructor() {
        super()
        this.state = {
            photos: undefined,
            books: false,
            posts: false,
            timeline: [],
            modal: false,
            loading: false,
            registerShown: false,
        }

        this.unsplashService = new UnSplashService()
        this.unsplashApiService = new UnSplashApiService()
        this.bookService = new BookService()
        this.postService = new PostService()

    }

    queryForImages = response => {

        const randomNum = Math.trunc(Math.random() * 60 - 1)
        const query = 'books'
        const url = `?page=${randomNum}&per_page=12&query=${query}&client_id=${response}`

        this.unsplashService
            .magicSplash(url)
            .then(response => this.setState({ photos: response.data.results }))
            .catch(err => console.log(err))

    }

    loadUnsplash = () => {

        this.unsplashApiService
            .getUnsplash()
            .then(response => this.queryForImages(response.data))
            .then(this.setState({ loading: true }))
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

    // listenScrollEvent() {
    //     this.state.modal === false && this.setState({ modal: true })
    // }

    componentDidMount = () => {
        // window.addEventListener('scroll', this.listenScrollEvent.bind(this));
        this.loadUnsplash()
        this.getTimeline()
    }

    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.listenScrollEvent)
    // }

    render() {

        const { loggedUser, storeUser, history } = this.props


        return (
            !this.state.photos
                ?
                <Spinner className='spinner' animation="grow" variant="info" size="lg" />
                :
                <>
                    {
                        !loggedUser
                            ?
                            <>
                                <h1 className='home-title'>for Words...</h1>
                                <p className='quotes'>“So many books, so little time.”</p>
                                <div className="random-img">
                                    {!this.state.loading
                                        ?
                                        <Spinner className='spinner' animation="grow" variant="info" size="lg" />
                                        :
                                        <> <Row className="timeline">
                                            {this.state.photos.map(elm => <RandomImgCard key={elm.id} {...elm} />)}
                                            {this.state.photos.reverse().map(elm => <RandomImgCard key={elm.id} {...elm} />)}
                                        </Row>
                                            <Modal backdrop="static" keyboard={false} size='lg' className='login-modal' show={this.state.modal} onHide={() => this.setState({ modal: false })}>
                                                <Modal.Header closeButton></Modal.Header>
                                                {!this.state.registerShown
                                                    ?
                                                    <>
                                                        <Login history={history} handleFormSubmit={this.onSubmit} storeUser={storeUser} />
                                                        <button className='navbar-button' onClick={() => this.setState({ modal: true, registerShown: true })}>Register</button>
                                                    </>
                                                    :
                                                    <RegisterForm history={history} closeModal={() => this.setState({ modal: false })} loggedUser={loggedUser} storeUser={storeUser} />
                                                }
                                            </Modal>
                                        </>}
                                </div>
                            </>
                            : <>
                                <h1 className='home-title'>for Words...</h1>
                                <p className='quotes'>“Books are a uniquely portable magic.”</p>
                                <div className="decambiar"></div>
                                {this.state.books.length &&
                                    <Row className="timeline">
                                        {this.state.timeline.map(elm => <TimelineCard key={elm._id} {...elm} />)}
                                    </Row>}
                            </>
                    }
                </>
        )
    }

}


export default HomePage