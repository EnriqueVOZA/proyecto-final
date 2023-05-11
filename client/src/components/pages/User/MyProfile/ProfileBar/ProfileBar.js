import { Tabs, Tab, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import FriendsList from './FiendsList/FriendsList'
import BooksList from './BooksList/BooksList'
import PostsList from './PostsList/PostsList'
import { Container } from 'react-bootstrap'

const ProfileBar = ({ friends, books, posts }) => {

    const [key, setKey] = useState('friends')


    return (
        <Row>
            <Col className='profile-navbar'>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    <Tab eventKey="friends" title="Friends">
                        <Container className='container-profilebar'>
                            <Row>
                                <FriendsList friends={friends} />
                            </Row>
                        </Container>
                    </Tab>
                    <Tab eventKey="books" title="Books">
                        <Container className='container-profilebar'>
                            <Row>
                                <BooksList books={books} />
                            </Row>
                        </Container>
                    </Tab>
                    <Tab eventKey="post" title="Post" >
                        <Container className='container-profilebar'>
                            <Row>
                                <PostsList posts={posts} />
                            </Row>
                        </Container>
                    </Tab>
                </Tabs>
            </Col>
        </Row>
    )
}

export default ProfileBar