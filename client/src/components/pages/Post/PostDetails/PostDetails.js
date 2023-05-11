import { Component } from 'react'
import PostService from '../../../../services/posts.service'
import PostDetailsCard from './PostDetailsCard'



class PostDetails extends Component {

    constructor() {
        super()
        this.state = {
            post: undefined,
            modal: false,
        }
        this.postsService = new PostService()
    }

    loadPost = () => {

        const { post_id } = this.props.match.params

        return this.postsService
            .postDetails(post_id)
            .then(response => this.setState({ post: response.data }))
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.loadPost()
    }

    render() {

        const { loggedUser, storeUser, history } = this.props
    

        return (
            <PostDetailsCard loadPost={this.loadPost} {...this.state.post} {...this.props} loggedUser={loggedUser} storeUser={storeUser} history={history}/>
        )
    }
}


export default PostDetails