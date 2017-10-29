import React, {Component} from 'react';
import PropTypes from 'prop-types';

function Book(props) {

    const {book, shelve, onMoveBook} = props;
    const bookIndex = shelve.findIndex((b) => b.id === book.id);
    const shelf = bookIndex != -1 ? shelve[bookIndex].shelf : "none_disabled";
    return <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : "http://via.placeholder.com/128x193?text=No%20Cover"})`
            }}></div>
            <div className="book-shelf-changer">
                <select value={shelf} onChange={(event) => onMoveBook(bookIndex, book, event.target.value)}>
                    <option value="none_disabled" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
    </div>
}


Book.propTypes = {
    shelve: PropTypes.array.isRequired,
    book: PropTypes.object.isRequired,
    onMoveBook: PropTypes.func.isRequired
};


export default Book;