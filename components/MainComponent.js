import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import Readers from './ReadersComponent';
import BookInfo from './BookInfoComponent';
import Home from './HomeComponent';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

const ReadersNavigator = createStackNavigator(
    {
        Readers: { screen: Readers },
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

const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Readers: { screen: ReadersNavigator }
    },
    {
        drawerBackgroundColor: '#006c80'
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

export default Main;