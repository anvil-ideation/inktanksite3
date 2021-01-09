import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Rating, Icon } from 'react-native-elements';
import { BOOKS } from '../shared/books';
import { COMMENTS } from '../shared/comments';

function RenderComments({comments}) {
    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Card title='Recent Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

function RenderBook({book}) {
    if (book) {
        return (
            <ScrollView>
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
            </ScrollView>
        );
    }
    return <View />;
};

function RenderMoreDetails(props) {
    
    const {book} = props;
    
    if (book) {
        return (
            <ScrollView>
                <Card
                title={`Further details about ${book.title}:`}
                >
                    <View>
                        <Text style={{
                                marginLeft: 10,
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                            }}>
                            Length:
                        </Text>
                    </View>
                    <View>
                        <Text style={{
                                marginLeft: 10,
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                            }}>
                            Rating:
                        </Text>
                        <Rating 
                            startingValue={book.rating}
                            imageSize={20}
                            readonly
                            style={{alignItems: 'flex-start', padding: 10}}
                            ratingCount={5}
                            type='heart'
                        />
                            <Text style={{
                                marginLeft: 10,
                            }}>
                            ({book.ratingCount} ratings)
                        </Text>
                    </View>
                    <View>
                    <Icon
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        raised
                        reverse
                        onPress={() => props.favorite ? 
                            console.log('Already set as a favorite') : props.markFavorite()}
                    />
                    </View>
                </Card>
            </ScrollView>
        );
    }
    return <View />;
};

class BookInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: BOOKS,
            comments: COMMENTS,
            favorite: false,
        };
    }

    markFavorite() {
        this.setState({favorite: true});
    }

    static navigationOptions = {
        title: 'Book Information'
    }

    render() {
        const bookId = this.props.navigation.getParam('bookId');
        const book = this.state.books.filter(book => book.id === bookId)[0];
        const comments = this.state.comments.filter(comment => comment.bookId === bookId)
        return (
            <ScrollView>
                <RenderBook book={book} />
                <RenderMoreDetails 
                    book={book}
                    favorite={this.state.favorite}
                    markFavorite={() => this.markFavorite()} 
                />
                <RenderComments comments={comments} />
            </ScrollView>
        )
    }
}



export default BookInfo;