import { Container, Row } from "react-bootstrap"
import FriendCard from "./FriendCard"


const FriendsList = ({ friends }) => {

    return (
        <Container>
            <Row className="timeline">
                {friends ?
                    friends.map(elm => <FriendCard key={elm._id} {...elm} />) : null}
            </Row>
        </Container>
    )
}

export default FriendsList