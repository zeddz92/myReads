import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import Book from '../components/Book';
import {Debounce} from 'react-throttle';

class SearchBooks extends Component {

    static propTypes = {
        shelve: PropTypes.array.isRequired,
        onMoveBook: PropTypes.func.isRequired
    };

    state = {
        booksSearchResult: []
    };


    searchBooks = (query) => {
        if (query === "")
            this.setState({booksSearchResult: []});
        else
            BooksAPI.search(query, 20).then((booksSearchResult) => {
                this.setState({booksSearchResult: booksSearchResult.error ? [] : booksSearchResult});
            });
    };

    render() {
        const {shelve, onMoveBook} = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="400" handler="onChange">
                            <input
                                onChange={(event) => this.searchBooks(event.target.value)}
                                type="text"
                                placeholder="Search by title or author"/>
                        </Debounce>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.booksSearchResult.map((b) => (
                            <li key={b.id}>
                                <Book shelve={shelve} book={b} onMoveBook={onMoveBook}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBooks;