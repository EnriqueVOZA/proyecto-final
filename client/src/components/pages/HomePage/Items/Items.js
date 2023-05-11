import { Component } from 'react'
import { Row, Container, Spinner } from "react-bootstrap"

import UserService from '../../../../services/users.service'
import ItemsCard from './ItemsCard'



class Items extends Component {

    constructor() {
        super()
        this.state = {
            users: undefined,
            modal: false
        }

        this.userService = new UserService()
    }



    loadUser = () => {

        this.userService
            .users()
            .then(response => this.setState({ users: response.data }))
            .catch(err => console.log(err))
    }



    componentDidMount = () => {
        this.loadUser()
    }


    render() {

        return (
            !this.state.users
                ? <Spinner className='spinner' animation="grow" variant="info" />
                :
                (
                    <>
                        <Container>
                            <Row>
                                {this.state.users.map((elm, modal) => <ItemsCard key={elm._id} {...elm} />)}
                            </Row>
                        </Container>
                    </>
                )
        )
    }

}


export default Items