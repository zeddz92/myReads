import React from 'react';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Main from './pages/Main';
import update from 'immutability-helper';
import SearchBooks from './pages/SearchBooks';
import NoMatch from './pages/NoMatch';

class BooksApp extends React.Component {
    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books});
        });
    }

    moveBook = (bookIndex, book, newShelve) => {

        const movedBook = update(book,  {shelf: {$set: newShelve}});
        BooksAPI.update(movedBook, newShelve).then(() => {
            if (bookIndex > 0) {

                this.setState((state) => ({
                    books: state.books.filter( (b, index)=> (index !== bookIndex)).concat([movedBook])
                }));
            } else {
                this.setState((state) => ({
                    books: state.books.filter( (b, index)=> (b.id !== book.id)).concat([movedBook])
                }));
            }
        });
    };

    render() {
        return (
            <div className="app">
                <Switch>
                    <Route exact path="/" render={() => (
                        <Main shelve={this.state.books} onMoveBook={this.moveBook}/>
                    )}/>

                    <Route exact path="/search" render={() => (
                        <SearchBooks shelve={this.state.books} onMoveBook={this.moveBook}/>
                    )}/>
                    <Route  component={NoMatch}/>
                </Switch>

            </div>
        )
    }
}

export default BooksApp
