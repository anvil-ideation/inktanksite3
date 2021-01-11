import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet,
    Picker, Switch, Button, Modal } from 'react-native';
    import { Card, Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Font from 'expo-font';

function AuthorInfo () {

    return (
        <ScrollView>
            <Card
                    featuredTitle="inkTank Author"
                    image={require('./images/jumboBG.jpg')}
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
                        Whether you're a "pen to paper" or "finger to keyboard" kind of author, aspiring or established, inkTank for Authors is for you!
                        </Text>
                        <Text style={{margin: 10, marginTop:0}}>
                        Authors can write, design, and create books how they want, and can then distribute them in 2 unique ways:
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                            <View style={{flex: 1}}>
                                <Text style={{
                                    marginLeft: 10,
                                    fontStyle: 'italic',
                                    textDecorationLine: 'underline'
                                }}>
                                    inkTank Books:
                                </Text>
                                <Text style={{margin: 10, marginTop: 0}}>
                                    Subscribe to inkTank Books, where you can design and produce entire virtual books and distribute them for reading. You can make your books available in the inkTank Portal or for mobile reading via a download option.
                                </Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={{
                                    marginLeft: 10,
                                    fontStyle: 'italic',
                                    textDecorationLine: 'underline'
                                }}>
                                    inkTank Magazine:
                                </Text> 
                                <Text style={{margin: 10, marginTop: 0}}>
                                    Apply for inkTank Magazine by submitting a one-shot chapter of an upcoming book. If chosen, inkTank will serialize you and pay by the chapter, featuring your work in the monthly inkTank Magazine!
                                </Text>
                            </View>
                    </View>
                </Card>
        </ScrollView>
    );
};

class Demo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            books: 1,
            published: false,
            date: new Date(),
            time: "8:00 am",
            showCalendar: false,
            showModal: false,
        };
    }

    static navigationOptions = {
        title: ' Become an Author'
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            books: 1,
            published: false,
            date: new Date(),
            showCalendar: false,
            showModal: false
        });
    }

    render() {
        return (
            <ScrollView>
                <AuthorInfo />
                <Card
                    title="Schedule a Demo:"
                >
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>How many books are you working on?</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.books}
                            onValueChange={itemValue => this.setState({books: itemValue})}
                        >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Have you published before?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.published}
                            trackColor={{true: '#006c80', false: null}}
                            onValueChange={value => this.setState({published: value})}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date of Demo?</Text>
                        <Button
                            onPress={() =>
                                this.setState({showCalendar: !this.state.showCalendar})
                            }
                            title={this.state.date.toLocaleDateString('en-US')}
                            color='#006c80'
                            accessibilityLabel='Tap me to select a demo date'
                        />
                    </View>
                    {this.state.showCalendar && (
                        <DateTimePicker
                            value={this.state.date}
                            mode={'date'}
                            display='default'
                            onChange={(event, selectedDate) => {
                                selectedDate && this.setState({date: selectedDate, showCalendar: false});
                            }}
                            style={styles.formItem}
                        />
                    )}
                                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Time of Demo?</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.books}
                            onValueChange={itemValue => this.setState({books: itemValue})}
                        >
                            <Picker.Item label='8am' value='08:00 am' />
                            <Picker.Item label='9am' value='09:00 am' />
                            <Picker.Item label='10am' value='10:00 am' />
                            <Picker.Item label='11am' value='11:00 am' />
                            <Picker.Item label='12pm' value='12:00 pm' />
                            <Picker.Item label='1pm' value='01:00 pm' />
                            <Picker.Item label='2pm' value='02:00 pm' />
                            <Picker.Item label='3pm' value='03:00 pm' />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            onPress={() => this.handleReservation()}
                            title='Schedule'
                            color='#006c80'
                            accessibilityLabel='Tap me to schedule your inkTank Author demo!'
                        />
                    </View>
                </Card>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Demo Scheduling Confirmation:</Text>
                        <Text style={styles.modalText}>
                            Books in the works: {this.state.books}
                        </Text>
                        <Text style={styles.modalText}>
                            Previously published?: {this.state.published ? 'Yes' : 'No'}
                        </Text>
                        <Text style={styles.modalText}>
                            Date: {this.state.date.toLocaleDateString('en-US')}
                        </Text>
                        <Text style={styles.modalText}>
                            Time: {this.state.time}
                        </Text>
                        <View style={styles.formRow}>
                            <Button
                                onPress={() => {
                                    this.toggleModal();
                                    this.resetForm();
                                }}
                                color='#006c80'
                                title='Close'
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1,
    },
    modal: { 
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#006c80',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    },
    cardRow: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
        marginBottom: 5,
    },
});

export default Demo;