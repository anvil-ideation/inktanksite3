import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { BOOKS } from '../shared/books';

function RenderBook({book}) {
    if (book) {
        return (
            <Card
                featuredTitle={book.title}
                image={{ uri: book.image }}
                imageStyle={{
                    maxHeight: 150,
                    overflow: 'hidden',
                }}
            >
                <Text style={{
                        marginLeft: 10,
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                    }}>
                    by {book.author}
                </Text>
                <Text style={{
                        marginLeft: 10,
                        fontStyle: 'italic',
                    }}>
                    {book.category}
                </Text>
                <Text style={{margin: 10}}>
                    {book.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class BookInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: BOOKS
        };
    }

    static navigationOptions = {
        title: 'Book Information'
    }

    render() {
        const bookId = this.props.navigation.getParam('bookId');
        const book = this.state.books.filter(book => book.id === bookId)[0];
        return <RenderBook book={book} />;
    }
}

export default BookInfo;