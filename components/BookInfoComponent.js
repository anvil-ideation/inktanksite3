import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

function RenderBook({book}) {
    if (book) {
        return (
            <Card 
                featuredTitle={book.title}
                image={{ uri: book.image }}
            >
                <Text style={{margin: 10}}>
                    {book.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

function BookInfo(props) {
    return <RenderBook book={props.book} />;
}

export default BookInfo;