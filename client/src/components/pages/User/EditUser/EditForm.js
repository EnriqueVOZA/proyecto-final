import { Component } from 'react'
import { Container, Form, Row, Col, } from 'react-bootstrap'

import UserService from '../../../../services/users.service'
import UploadsService from '../../../../services/uploads.service'
import { Spinner } from 'react-bootstrap'

class ProfileEdit extends Component {

    constructor() {
        super()
        this.state = {
            user: {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                image: '',
                cover: '',
                bio: '',
            },
                address: {
                    road: '',
                    apartment: '',
                    city: '',
                    state: '',
                    zip: ''
                },
            
            loading: false
        }

        this.userService = new UserService()
        this.uploadsService = new UploadsService()
    }

    componentDidMount() {

        const { user_id } = this.props.match.params

        this.loadFormInfo(user_id)
    }

    loadFormInfo = () => {
        this.userService
            .profile()
            .then(response => this.setState({ user: response.data[0] }))
    }

    handleInputChange = e => {
        const { name, value } = e.target
        console.log(e.target.value)
        this.setState({ user: { ...this.state.user, [name]: value, 
            address: { ...this.state.user.address, [name]: value } 
        } })
    }

    handleFormSubmit = e => {

        const { user_id } = this.props.match.params
        console.log(this.state.user)
        e.preventDefault()

        this.userService
            .editProfile(this.state.user, user_id)

            .then(() => {
                this.props.history.push('/')
                this.props.closeModal()
            })
            .catch(err => console.log(err))
    }

    handleFileUpload = e => {

        this.setState({ loading: true })

        const uploadData = new FormData()
        uploadData.append('image-data', e.target.files[0])


        this.uploadsService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({
                    loading: false,
                    user: { ...this.state.user, [e.target.name]: response.data.cloudinary_url }
                })
            })

            .catch(err => console.log(err))
    }


    render() {

        return (

            <Container>
                {!this.state.user
                    ?
                    <Spinner />
                    :
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>

                            <h1>Edit {this.state.user.firstName} {this.state.user.lastName}</h1>
                            <hr></hr>

                            <Form onSubmit={this.handleFormSubmit}>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="email">
                                        <Form.Label>email</Form.Label>
                                        <Form.Control type="text" value={this.state.user.email} onChange={this.handleInputChange} name="email" placeholder="Username" />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" value={this.state.user.password} onChange={this.handleInputChange} name="password" placeholder="Password" />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="firstName">
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control type="text" value={this.state.user.firstName} onChange={this.handleInputChange} name="firstName" placeholder="First name" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="lastName">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control type="text" value={this.state.user.lastName} onChange={this.handleInputChange} name="lastName" placeholder="Last name" />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="bio">
                                        <Form.Label>Bio</Form.Label>
                                        <Form.Control type="text" value={this.state.user.bio} onChange={this.handleInputChange} name="bio" placeholder="Bio" />
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="road">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" value={this.state.user.address?.road} onChange={this.handleInputChange} name="road" placeholder="Street, number" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="apartment">
                                    <Form.Label>Address 2</Form.Label>
                                    <Form.Control type="text" value={this.state.user.address?.apartment} onChange={this.handleInputChange} name="apartment" placeholder="Apartment, studio, or floor" />
                                </Form.Group>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="city">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="text" value={this.state.user.address?.city} onChange={this.handleInputChange} name="city" placeholder="City" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="state">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control type="text" value={this.state.user.address?.state} onChange={this.handleInputChange} name="state" placeholder="State" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="zip">
                                        <Form.Label>Zip</Form.Label>
                                        <Form.Control type="text" value={this.state.user.address?.zip} onChange={this.handleInputChange} name="zip" placeholder="Zip" />
                                    </Form.Group>
                                </Row>

                                <img style={{ width: "100px" }} src={this.state.user.image} alt="image" />
                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control name="image" type="file" onChange={this.handleFileUpload} />
                                </Form.Group>

                                <img style={{ width: "100px" }} src={this.state.user.cover} alt="cover" />
                                <Form.Group className="mb-3" controlId="cover">
                                    <Form.Label>Cover</Form.Label>
                                    <Form.Control name="cover" type="file" onChange={this.handleFileUpload} />
                                </Form.Group>

                                <button className='btn-form' type="submit">edit</button>
                            </Form>

                        </Col>
                    </Row>
                }
            </Container >
        )
    }
}


export default ProfileEdit