import { Tabs, Tab, Row, Col } from 'react-bootstrap'
import { useState } from 'react'

import BooksList from "../User/MyProfile/ProfileBar/BooksList/BooksList"

const AdminBar = ({ books }) => {

    const [key, setKey] = useState('friends')

    return (

        <Row>
            <Col className='profile-navbar'>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    <Tab eventKey="books" title="Books To Confirm">
                        <Row>
                            <BooksList books={books} />
                        </Row>
                    </Tab>
                </Tabs>
            </Col>
        </Row>

    )
}

export default AdminBar