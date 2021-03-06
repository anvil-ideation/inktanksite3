import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { BOOKS } from '../shared/books';
import CarouselCards from './CarouselCards';

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
        const { navigate } = this.props.navigation; 

        const RenderItem = ({item}) => {

            if (item) {     
                return (
                    <Card
                        featuredTitle={
                        <Text style={{
                            marginLeft: 10,
                            fontWeight: 'bold',
                            fontSize: 15,
                        }}
                        >{item.title}
                        </Text>}
                        image={{ uri: item.image }}
                        containerStyle={{
                            width: 100,
                        }}
                        wrapperStyle={{
                            fontSize: 10,
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
                        <Button
                            title="Learn More"
                            type="solid"
                            titleStyle={{
                                fontSize: 10,
                            }}
                            buttonStyle={{
                                backgroundColor: '#006c80',
                                marginTop: 10,
                            }}
                            onPress={() => navigate('BookInfo', { bookId: item.id })}
                        />
                    </Card>
                );
            }
            return <View />;
        }

        return (
            <ScrollView>
                <View style={{margin: 10}}>
                    <Text style={{
                                marginTop: 15,
                                alignSelf: 'center',
                                fontWeight: 'bold',
                                fontSize: 30,
                            }}>
                            Welcome to inkTank!
                    </Text>
                    <Text style={{
                                marginTop: 2,
                                marginBottom: 10,
                                alignSelf: 'center',
                                fontStyle: 'italic',
                                fontSize: 15,
                            }}>
                            Please swipe to learn more about our services
                    </Text>
                    <CarouselCards />
                </View>
                <View>
                    <Text style={{
                            marginTop: 15,
                            alignSelf: 'center',
                            fontWeight: 'bold',
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
                            item={this.state.books.filter(book => book.featured)[2]}
                        />
                        <RenderItem 
                            item={this.state.books.filter(book => book.featured)[7]}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    featuredTitle: {
        fontSize: 12,
    },
    container: {
        backgroundColor: '#fff',
        padding: 50
    },
});

export default Home;