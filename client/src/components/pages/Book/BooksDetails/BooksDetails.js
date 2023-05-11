import { Component } from 'react'
import BookService from '../../../../services/books.service'
import BookDetailsCard from './BookDetailsCard'


class BookDetails extends Component {

    constructor() {
        super()
        this.state = {
            book: undefined,
            modal: false,
        }
        this.booksService = new BookService()
    }

    bookToConfirm = (bool) => {

        const { book_id } = this.props.match.params

        this.booksService
            .bookConfirmed(bool, book_id)
            .then(res => {
                return res
            })
            .catch(err => console.log(err))
    }

    negateBook = () => {
        this.setState({ book: { ...this.state.book, accepted: false } })
        this.bookToConfirm(this.state.book.accepted)
    }

    confirmBook = () => {
        this.setState({ book: { ...this.state.book, accepted: true } })
        this.bookToConfirm(this.state.book.accepted)

    }

    loadBook = () => {

        const { book_id } = this.props.match.params

        return this.booksService
            .bookDetails(book_id)
            .then(response => this.setState({ book: response.data }))
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.loadBook()
    }

    render() {

        const { loggedUser, storeUser, history } = this.props

        return (
            <BookDetailsCard loadBook={this.loadBook} {...this.props} negateBook={this.negateBook} confirmBook={this.confirmBook} {...this.state.book} loggedUser={loggedUser} storeUser={storeUser} history={history} />
        )
    }
}


export default BookDetails