import { Component } from 'react'
import { Container, Form, Row, Col, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthService from '../../../../services/auth.service'
import UploadsService from '../../../../services/uploads.service'


class RegisterForm extends Component {

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
                road: '',
                apartment: '',
                city: '',
                state: ''
            },
            loading: false
        }

        this.authService = new AuthService()
        this.uploadsService = new UploadsService()
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ user: { ...this.state.user, [name]: value } })
    }


    handleFormSubmit = e => {

        e.preventDefault()

        this.authService
            .signup(this.state.user)
            .then(() => {
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

            .catch(err => this.props.showMessage(err.response.data.message))
    }


    render() {

        return (

            <Container className='modal-form'>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>

                        <h1>Sign Up</h1>
                        <hr></hr>

                        <Form onSubmit={this.handleFormSubmit}>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="email">
                                    <Form.Label>email</Form.Label>
                                    <Form.Control type="text" value={this.state.email} onChange={this.handleInputChange} name="email" placeholder="Username" required />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={this.state.password} onChange={this.handleInputChange} name="password" placeholder="Password" required />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="firstName">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control type="text" value={this.state.firstName} onChange={this.handleInputChange} name="firstName" placeholder="First name" required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="lastName">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text" value={this.state.lastName} onChange={this.handleInputChange} name="lastName" placeholder="Last name" required />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="bio">
                                    <Form.Label>Bio</Form.Label>
                                    <Form.Control type="text" value={this.state.bio} onChange={this.handleInputChange} name="bio" placeholder="Bio" required />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="road">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" value={this.state.road} onChange={this.handleInputChange} name="road" placeholder="Street, number" required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="apartment">
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control type="text" value={this.state.apartment} onChange={this.handleInputChange} name="apartment" placeholder="Apartment, studio, or floor" required />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="city">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" value={this.state.city} onChange={this.handleInputChange} name="city" placeholder="City" required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="state">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control type="text" value={this.state.state} onChange={this.handleInputChange} name="state" placeholder="State" required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="zip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control type="text" value={this.state.zip} onChange={this.handleInputChange} name="zip" placeholder="Zip" required />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control name="image" type="file" onChange={this.handleFileUpload} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="cover">
                                <Form.Label>Cover</Form.Label>
                                <Form.Control name="cover" type="file" onChange={this.handleFileUpload} />
                            </Form.Group>

                            <button className='btn-form' type="submit">join us</button>
                        </Form>

                        <br></br>
                    </Col>
                </Row>
            </Container >
        )
    }
}


export default RegisterForm