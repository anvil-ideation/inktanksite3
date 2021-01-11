import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Button, Modal } from 'react-native';
import { Card, Rating, Icon, Input } from 'react-native-elements';
import { BOOKS } from '../shared/books';
import { COMMENTS } from '../shared/comments';

function RenderComments(props) {
    const {comments} = props;
    const {trueComments} = props;
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
                data={trueComments}
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
                                    size={12}
                                    />
                                <Icon
                                    name={'star'}
                                    type='font-awesome'
                                    color='#FFD300'
                                    raised
                                    reverse
                                    onPress={() => props.onShowRatingModal()}
                                    iconStyle={styles.actionIcon}
                                    size={12}
                                />
                                <Icon
                                    name={'pencil'}
                                    type='font-awesome'
                                    color='#006c80'
                                    raised
                                    reverse
                                    onPress={() => props.onShowCommentModal()}
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
    const {ratingIncrement} = props;
    
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
                                {ratingIncrement} ratings
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
            showRatingModal: false,
            showCommentModal: false,
            rating: 5,
            ratingAuthor: "",
            commentAuthor: "",
            newComments: COMMENTS,
            text: "",
            ratingIncrement: 0,
        };
    }

    markFavorite() {
        this.setState({favorite: true});
    }

    toggleRatingModal() {
        this.setState({showRatingModal: !this.state.showRatingModal});
    }

    toggleCommentModal() {
        this.setState({showCommentModal: !this.state.showCommentModal});
    }

    handleRating (bookId) {
        console.log(JSON.stringify(bookId));
        console.log(JSON.stringify(this.state.ratingAuthor));
        console.log(JSON.stringify(this.state.rating));
        this.setState({
            ratingIncrement: this.state.ratingIncrement + 1,
        });
        this.toggleRatingModal();
    }

    handleComment(bookId) {
        console.log(JSON.stringify(bookId));
        console.log(JSON.stringify(this.state.commentAuthor));
        console.log(JSON.stringify(this.state.text));
        const newComment = {
            id: this.state.comments.length,
            bookId: bookId,
            text: this.state.text,
            author: this.state.commentAuthor,
            date: new Date(),
        }
        this.setState({ 
            newComments: this.state.newComments.concat(newComment)
        });
        this.toggleCommentModal();
    }

    resetRatingForm() {
        this.setState({
            author: "",
            rating: 5,
            showModal: false,
        });
    }

    resetCommentForm() {
        this.setState({
            author: "",
            text: "",
            showModal: false,
        });
    }

    static navigationOptions = {
        title: 'Book Information'
    }

    render() {
        const bookId = this.props.navigation.getParam('bookId');
        const book = this.state.books.filter(book => book.id === bookId)[0];
        const comments = this.state.comments.filter(comment => comment.bookId === bookId);
        const ratingIncrement = ((this.state.books.filter(book => book.id === bookId)[0].ratingCount) + (this.state.ratingIncrement));
        const trueComments = this.state.newComments.filter(comment => comment.bookId === bookId);
        return (
            <ScrollView>
                <RenderBook 
                    book={book}
                    favorite={this.state.favorite}
                    markFavorite={() => this.markFavorite()} 
                    onShowRatingModal={() => this.toggleRatingModal()}
                    onShowCommentModal={() => this.toggleCommentModal()}
                />
                <RenderMoreDetails 
                    book={book}
                    ratingIncrement={ratingIncrement}
                />
                <RenderComments 
                    comments={comments}
                    trueComments={trueComments} 
                />


                <Modal 
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showRatingModal}
                    onRequestClose={() => this.toggleRatingModal}
                >
                    <View style={styles.modal}>
                        <Input
                            placeholder="Author"
                            leftIcon={
                                <Icon
                                    name={'user-o'}
                                    type='font-awesome'
                                    color='#f50'
                                />
                            }
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={ratingAuthor => this.setState({ratingAuthor: ratingAuthor})}
                            value={this.state.ratingAuthor}
                        />
                        <Rating
                            showRating
                            startingValue={this.state.rating}
                            imageSize={40}
                            onFinishRating={rating => this.setState({rating: rating})}
                            style={{paddingVertical: 10}}
                            fractions={1}
                            type={'heart'}
                        />
                        <View style={{margin: 10}}>
                            <Button 
                                onPress={() => {
                                    this.resetRatingForm();
                                    this.handleRating(bookId);
                                }}
                                color='#5637DD'
                                title='Submit'
                            />
                        </View>
                        <View style={{margin: 10}}>
                            <Button 
                                onPress={() => {
                                    this.toggleRatingModal();
                                    this.resetRatingForm();
                                }}
                                color='#808080'
                                title='Cancel'
                            />
                        </View>
                    </View>
                </Modal>


                <Modal 
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showCommentModal}
                    onRequestClose={() => this.toggleCommentModal}
                >
                    <View style={styles.modal}>
                        <Input
                            placeholder="Author"
                            leftIcon={
                                <Icon
                                    name={'user-o'}
                                    type='font-awesome'
                                    color='#f50'
                                />
                            }
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={commentAuthor => this.setState({commentAuthor: commentAuthor})}
                            value={this.state.commentAuthor}
                        />
                        <Input
                            placeholder="Comment"
                            leftIcon={
                                <Icon
                                    name={'comment-o'}
                                    type='font-awesome'
                                    color='#f50'
                                />
                            }
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={text => this.setState({text: text})}
                            value={this.state.text}
                        />
                        <View style={{margin: 10}}>
                            <Button 
                                onPress={() => {
                                    this.resetCommentForm();
                                    this.handleComment(bookId);
                                }}
                                color='#5637DD'
                                title='Submit'
                            />
                        </View>
                        <View style={{margin: 10}}>
                            <Button 
                                onPress={() => {
                                    this.toggleCommentModal();
                                    this.resetCommentForm();
                                }}
                                color='#808080'
                                title='Cancel'
                            />
                        </View>
                    </View>
                </Modal>


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
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
});

export default BookInfo;