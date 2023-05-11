import { Container, Row } from "react-bootstrap"
import BookCard from "./BookCard"

const BooksList = ({ books }) => {

    return (
        <Container>
            <Row>
                {books ?
                    books.map(elm => <BookCard key={elm._id} {...elm} />) : null}
            </Row>
        </Container>
    )
}

export default BooksList