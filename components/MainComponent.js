import React, { Component } from 'react';
import Readers from './ReadersComponent';
import { BOOKS } from '../shared/books';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: BOOKS
        };
    }

    render() {
        return <Readers books={this.state.books} />;
    }
}

export default Main;