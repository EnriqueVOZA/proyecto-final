import { Col, Card } from "react-bootstrap"

const ItemsCard = ({ email, firstName, lastName, cover, image, bio, _id }) => {

    return (
        <Col md={3}>
            <div className="items-card">
                <Card.Img variant="top" src={cover} alt={firstName + 'profile image'} />
                <Card.Body>
                    <h6 className="text">{firstName} {lastName}</h6>
                </Card.Body>
            </div>
        </Col>
    )
}

export default ItemsCard