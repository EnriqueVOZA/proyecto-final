import { Container, Row } from "react-bootstrap"
import PostCard from "./PostCard"

const PostsList = ({ posts }) => {

    return (
        <Container>
            <Row>
                {posts ?
                    posts.map(elm => <PostCard key={elm._id} {...elm} />) : null}
            </Row>
        </Container >
    )
}

export default PostsList