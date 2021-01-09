import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet } from 'react-native';
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

function RenderBook(props) {
    const {book} = props;
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
                    <View style={{flexDirection: 'row',}}>
                        <View style={{flex: 2}}>
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
                        </View>
                        <View style={{flex: 1}}>
                            <View style={styles.cardRow}>
                                <Icon
                                    name={props.favorite ? 'heart' : 'heart-o'}
                                    type='font-awesome'
                                    color='#f50'
                                    raised
                                    reverse
                                    onPress={() => props.favorite ? 
                                        console.log('Already set as a favorite') : props.markFavorite()}
                                    iconStyle={styles.actionIcon}
                                    size={12}
                                />
                                <Icon
                                    name={'star'}
                                    type='font-awesome'
                                    color='#FFD300'
                                    raised
                                    reverse
                                    onPress={() => props.favorite ? 
                                        console.log('Already set as a favorite') : props.markFavorite()}
                                    iconStyle={styles.actionIcon}
                                    size={12}
                                />
                                <Icon
                                    name={'pencil'}
                                    type='font-awesome'
                                    color='#006c80'
                                    raised
                                    reverse
                                    onPress={() => props.favorite ? 
                                        console.log('Already set as a favorite') : props.markFavorite()}
                                    iconStyle={styles.actionIcon}
                                    size={12}
                                />
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{margin: 10}}>
                            {book.description}
                        </Text>
                    </View>
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
                        <View style={styles.cardRow}>
                            <Text style={{
                                    marginLeft: 10,
                                    fontStyle: 'italic',
                                    fontWeight: 'bold',
                                }}>
                                Publish Date:
                            </Text>
                            <Text style={{
                                    marginLeft: 10,
                                }}>
                                {book.release}
                            </Text>
                        </View>
                        <View style={styles.cardRow}>
                            <Text style={{
                                    marginLeft: 10,
                                    fontStyle: 'italic',
                                    fontWeight: 'bold',
                                }}>
                                Length:
                            </Text>
                            <Text style={{
                                    marginLeft: 10,
                                }}>
                                {book.length} pages
                            </Text>
                        </View>
                        <View style={styles.cardRow}>
                            <Text style={{
                                    marginLeft: 10,
                                    fontStyle: 'italic',
                                    fontWeight: 'bold',
                                }}>
                                Language:
                            </Text>
                            <Text style={{
                                    marginLeft: 10,
                                }}>
                                {book.language}
                            </Text>
                        </View>
                        <View style={styles.cardRow}>
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
                                type= "custom"
                                readonly
                                ratingColor= "#FFD300"
                                style={{alignItems: 'flex-start', marginLeft: 10}}
                                ratingCount={5}
                            />
                                <Text style={{
                                    marginLeft: 10,
                                }}>
                                ({book.ratingCount} ratings)
                            </Text>
                        </View>
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

const styles = StyleSheet.create({
    cardRow: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
        marginBottom: 5,
    },
    actionIcon: {
    },
});

export default BookInfo;