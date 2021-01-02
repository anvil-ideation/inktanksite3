import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { BOOKS } from '../shared/books';

function RenderItem({item}) {

    if (item) {        
        return (
            <Card
                featuredTitle={item.title}
                image={{ uri: item.image }}
                containerStyle={{
                    width: 100,
                }}
            >
                <Text style={{
                        alignSelf: 'center',
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        fontSize: 8,
                    }}>
                    by {item.author}
                </Text>
                <Text style={{
                        alignSelf: 'center',
                        fontStyle: 'italic',
                        fontSize: 8,
                    }}>
                    {item.category} Book
                </Text>
            </Card>
        );
    }
    return <View />;
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: BOOKS,
        };
    }

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <ScrollView>
                <Text style={{
                        marginTop: 5,
                        alignSelf: 'center',
                        fontStyle: 'italic',
                        fontSize: 14,
                    }}>
                    Featured Books This Month:
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <RenderItem
                        item={this.state.books.filter(book => book.featured)[0]}
                    />
                    <RenderItem 
                        item={this.state.books.filter(book => book.featured)[1]}
                    />
                    <RenderItem 
                        item={this.state.books.filter(book => book.featured)[2]}
                    />
                </View>
            </ScrollView>
        );
    }
}

export default Home;