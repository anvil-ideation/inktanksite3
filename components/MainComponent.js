import React, { Component } from 'react';
import { View, Platform, StyleSheet, Text, Image, ScrollView, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';
import Readers from './ReadersComponent';
import BookInfo from './BookInfoComponent';
import Home from './HomeComponent';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import SafeAreaView from 'react-native-safe-area-view';

const ReadersNavigator = createStackNavigator(
    {
        Readers: { screen: Readers,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='book'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })   
        },
        BookInfo: { screen: BookInfo }
    }, 
    {
        initialRouteName: 'Readers',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#006c80'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#006c80'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='home'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView 
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <ImageBackground source={require('./images/jumboBG.jpg')} style={styles.bgimage}/>
                    <Image source={require('./images/inktank_logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>inkTank</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Readers: { screen: ReadersNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='book'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        }
    },
    {
        drawerBackgroundColor: '#007d90',
        contentComponent: CustomDrawerContentComponent,
    }
);

const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
            }}>                
                <AppNavigator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        marginLeft: 10,
        marginTop: -25,
        height: 60,
        width: 60,
        position: 'absolute',
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24,
    },
    bgimage: {
        width: 300,
        height: 175,
        opacity: .3,
        position: "absolute",
        marginTop: -100,
    },
});

export default Main;