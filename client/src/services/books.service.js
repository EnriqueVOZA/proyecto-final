import axios from 'axios'


class BookService {

    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/book`,
            withCredentials: true
        })
    }

    bookCreate = data => this.app.post('/create', data)
    bookList = () => this.app.get('/list')
    bookToConfirm = ()=> this.app.get('/confirm/list')
    bookConfirmed = (accepted, book_id) => this.app.put(`/confirm/${book_id}`, {accepted})
    bookDetails = book_id => this.app.get(`/details/${book_id}`)
    bookEdit = (data, book_id) => this.app.put(`/${book_id}`, data)
    bookDelete = () => this.app.delete('/:book_id')
}



export default BookService