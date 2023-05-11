import { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import PostService from '../../../../services/posts.service'

class PostForm extends Component {

    constructor() {
        super()
        this.state = {
            title: '',
            text: '',
        }
        this.postsService = new PostService()
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }


    handleFormSubmit = e => {
        e.preventDefault()

        this.postsService
            .postCreate(this.state)
            // .then(() => {
            //     this.props.closeModal()
            //     this.props.refreshPosts()
            //     this.setState({ title: '', description: '', length: '', inversions: '', imageUrl: '' })
            // })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <Form onSubmit={this.handleFormSubmit}>

                    <Form.Group controlId="title">
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" value={this.state.title} onChange={this.handleInputChange} name="title" />
                    </Form.Group>

                    <Form.Group controlId="text">
                        <Form.Label>Texto</Form.Label>
                        <Form.Control type="text" value={this.state.text} onChange={this.handleInputChange} name="text" />
                    </Form.Group>

                    <Button style={{ marginTop: '20px', width: '100%' }} variant="dark" type="submit">Crear Post</Button>

                </Form>
            </>
        )
    }
}

export default PostForm