import { Col } from "react-bootstrap"
import { Link } from "react-router-dom"


const PostCard = ({ image, title, _id }) => {

    return (
        <Col md={3} className='home-col'>
            <Link className="nav-link" to={'/post/details/' + _id} >
                <img className='card-img' variant="top" src={image} alt={title + 'profile image'} />
                <button className="profile-title">{title}</button>
            </Link>
        </Col>
    )
}

export default PostCard