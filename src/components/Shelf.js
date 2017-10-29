import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';


function Shelf(props) {

    const {title, books, onMoveBook, shelve} = props;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id}>
                            <Book onMoveBook={onMoveBook} shelve={shelve} book={book}/>
                        </li>
                    ))}

                </ol>
            </div>
        </div>
    )
}

Shelf.propTypes = {
    title: PropTypes.string.isRequired,
    shelve: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
};

export default Shelf;
