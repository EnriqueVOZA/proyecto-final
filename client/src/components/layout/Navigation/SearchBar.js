import { Component } from "react"
import { Form, FormControl } from 'react-bootstrap'


class SearchBar extends Component {

    render() {
        return (
            <Form className="d-flex">
                <FormControl
                    className='search-bar' onChange={this.props.search} placeholder="Search"
                    type="search"
                    placeholder="Search"
                />
                <button className='search-button' >Search</button>
            </Form>
        )
    }
}


export default SearchBar