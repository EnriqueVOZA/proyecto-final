import { Component } from "react"
import Item from "./Item"

class SearchResult extends Component {

    render() {

        const { loggedUser } = this.props

        return (
            <div className='border-results'>
                <ul className='search-results'>
                    {this.props.bookList.map((eachBook, idx) => <Item key={idx} book={eachBook} loggedUser={loggedUser} />)}
                </ul>
            </div>
        )
    }
}

export default SearchResult