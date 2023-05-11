import { Col } from "react-bootstrap"
import { Link } from "react-router-dom"


const FriendCard = ({ firstName, lastName, image, _id }) => {

    return (
        <Col md={3} className='home-col'>
            <Link className="nav-link" to={'/profile/' + _id} >
                <img className='card-img' variant="top" src={image} alt={firstName + 'profile'} />
                <button className="profile-title">{firstName} {lastName}</button>
            </Link>
        </Col>
    )
}

export default FriendCard