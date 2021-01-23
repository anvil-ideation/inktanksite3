import React, { Component } from 'react';
import { FlatList, ScrollView, Text, View, StyleSheet,
    Picker, Switch } from 'react-native';
import { ListItem, Card, Icon } from 'react-native-elements';
import { BOOKS } from '../shared/books';
import { createBottomTabNavigator } from 'react-navigation-tabs';


class ReadersTab extends Component {

    static navigationOptions = {
        title: "For Readers",
    }
    render() {
        return (
            <ScrollView>
                <Card
                    featuredTitle="inkTank Reader"
                    image={{ uri: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=841&q=80' }}
                    featuredTitleStyles={{
                        fontFamily: 'Lobster-Regular',
                    }}
                >
                    <View style={{flexDirection: 'row',}}>
                        <View>
                            <Text style={{
                                marginLeft: 10,
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                            }}>
                                How it works:
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{margin: 10}}>
                        Imagine discovering new books and authors before they hit the shelves! 
                        </Text>
                        <Text style={{margin: 10}}>
                        That is the power of inkTank for Readers. Readers can discover great reads 2 different ways (pick one or both great options!):
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                            <View style={{flex: 1}}>
                                <Text style={{
                                    marginLeft: 10,
                                    fontStyle: 'italic',
                                    textDecorationLine: 'underline'
                                }}>
                                    inkTank Magazine:
                                </Text>
                                <Text style={{margin: 10, marginTop: 0}}>
                                Subscribe to inkTank Magazine, which features serialized authors who publish a chapter at a time. These are top-rated authors according to readers like you, and you get to help decide who gets serialized and for how long they are featured!
                                </Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={{
                                    marginLeft: 10,
                                    fontStyle: 'italic',
                                    textDecorationLine: 'underline'
                                }}>
                                    inkTank Portal:
                                </Text> 
                                <Text style={{margin: 10, marginTop: 0}}>
                                Subscribe to inkTank Portal, where you can discover books from established and aspiring before they hit the shelves. Authors produce books and self-publish online through inkTank, allowing you to read otherwise unknown works!
                                </Text>
                            </View>
                    </View>
                </Card>
            </ScrollView>
        );
    };
}

class BooksTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: BOOKS,
        };
    }

    static navigationOptions = {
        title: 'Books'
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

const Readers = createBottomTabNavigator(
    {
        Readers: ReadersTab,
        Books: BooksTab,
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#006c80',
            inactiveBackgroundColor: '#003d50',
            activeTintColor: '#fff',
            inactiveTintColor: '#808080',
            labelStyle: {fontSize: 16, paddingBottom:10}
        }
    }
);

export default Readers;