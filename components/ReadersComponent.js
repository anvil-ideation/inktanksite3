import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { BOOKS } from '../shared/books';

class Readers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: BOOKS,
        };
    }

    static navigationOptions = {
        title: 'Readers'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({item}) => {
            return (
                <ListItem
                    title={item.title}
                    subtitle={`by ${item.author}  /  ${item.category}`}
                    leftAvatar={{ source: { uri: item.image }}}
                    onPress={() => navigate('BookInfo', { bookId: item.id })}
                    bottomDivider
                />
            );
        };

        return (
            <FlatList
                data={this.state.books}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default Readers;