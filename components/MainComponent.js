import React, { Component } from 'react';
import { View } from 'react-native';
import Readers from './ReadersComponent';
import BookInfo from './BookInfoComponent';
import { BOOKS } from '../shared/books';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: BOOKS,
            selectedBook: null,
        };
    }

    onBookSelect(bookId) {
        this.setState({selectedBook: bookId});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Readers
                    books={this.state.books}
                    onPress={bookId => this.onBookSelect(bookId)}
                />
                <BookInfo
                    book={this.state.books.filter(
                        book => book.id === this.state.selectedBook)[0]}
                />
            </View>
        )
    }
}

export default Main;