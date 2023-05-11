import axios from 'axios'


class PostService {

    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/post`,
            withCredentials: true
        })
    }

    postCreate = data => this.app.post('/create', data)
    postList = () => this.app.get('/list')
    postDetails = post_id => this.app.get(`/details/${post_id}`)
    postEdit = (data, post_id) => this.app.put(`/${post_id}`, data)
    postDelete = () => this.app.delete('/:post_id')
}



export default PostService
