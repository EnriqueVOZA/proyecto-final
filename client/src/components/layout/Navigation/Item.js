import { Component } from "react"
import { Modal, Spinner } from "react-bootstrap"
import BookDetailsCard from '../../pages/Book/BooksDetails/BookDetailsCard'
import PostDetailsCard from '../../pages/Post/PostDetails/PostDetailsCard'
import { negateBook, confirmBook } from '../../../utils/tools'

class Item extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: undefined,
            modal: false
        }
    }



    render() {

        const { loggedUser, storeUser, book } = this.props

        return !book
            ?
            <Spinner />
            :

            <>
                <li className='dropdown'>
                    <button onClick={() => this.setState({ modal: true })}>{this.props.book.title}</button>
                    <Modal
                        backdrop="static"
                        keyboard={false}
                        size='lg' show={this.state.modal} onHide={() => this.setState({ modal: false })}>

                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                            {book.price
                                ? <BookDetailsCard {...book} closeModal={() => this.setState({ modal: false })} negateBook={negateBook} confirmBook={confirmBook}loggedUser={loggedUser} storeUser={storeUser} />
                                : <PostDetailsCard  {...book} closeModal={() => this.setState({ modal: false })} loggedUser={loggedUser} storeUser={storeUser} />}
                        </Modal.Body>

                    </Modal>
                </li>
            </>
    }
}


export default Item