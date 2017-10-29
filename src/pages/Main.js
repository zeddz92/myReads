import React, {Component} from 'react';
import Shelf from '../components/Shelf';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


function Main(props) {
    const {shelve, onMoveBook} = props;

    var read = shelve.filter((book) => book.shelf === 'read');
    var currentlyReading = shelve.filter((book) => book.shelf === 'currentlyReading');
    var wantToRead = shelve.filter((book) => book.shelf === 'wantToRead');

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <Shelf title={"Currently Reading"} onMoveBook={onMoveBook} shelve={shelve} books={currentlyReading}/>
                    <Shelf title={"Want to Read"} onMoveBook={onMoveBook} shelve={shelve} books={wantToRead}/>
                    <Shelf title={"Read"} onMoveBook={onMoveBook} shelve={shelve} books={read}/>
                </div>
            </div>
            <div className="open-search">
                <Link
                    to="/search"
                >Add a book </Link>

            </div>
        </div>
    );
}

Main.propTypes = {
    shelve: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
};

export default Main;