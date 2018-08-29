import FirstScreen from './FirstScreen'
import SecondScreen from './SecondScreen'
import RoomScreen from './RoomScreen'
import GameScreen from './GameScreen'
import ZeroScreen from './ZeroScreen'
import LoginScreen from './LoginScreen'
import LogupScreen from './LogupScreen'
import AuthLoadingScreen from './AuthLoadingScreen'
import React from 'react'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'

const AppStack = createStackNavigator(
{
    First: { screen: FirstScreen },
    Second: { screen: SecondScreen },
    Room: { screen: RoomScreen },
    Game: { 
        screen: GameScreen,
        navigationOptions: {
            header: null,
        },
    }
},
{
    navigationOptions: {
        title: 'Quest App',
        headerStyle: { backgroundColor: '#C0CCDA' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
    },
});

const AuthStack = createStackNavigator(
    { 
        Zero: { screen: ZeroScreen },
        Login: { screen: LoginScreen },
        Logup: { screen: LogupScreen }, 
    },
    {
        initialRouteName: 'Zero',
    }
);

const RootStack = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        Auth: AuthStack,
        App: AppStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

// const RootStack = createStackNavigator(
//     {
//         Zero: { screen: ZeroScreen },
//         Login: { screen: LoginScreen },
//         Logup: { screen: LogupScreen },
//         First: { screen: FirstScreen },
//         Second: { screen: SecondScreen },
//         Room: { screen: RoomScreen },
//         Game: { 
//             screen: GameScreen,
//             navigationOptions: {
//                 header: null,
//             },
//         }
//     },
//     {
//         initialRouteName: 'Zero',
//         navigationOptions: {
//             title: 'Quest App',
//             headerStyle: { backgroundColor: '#C0CCDA' },
//             headerTintColor: '#FFFFFF',
//             headerTitleStyle: { fontWeight: 'bold' },
//         },
//     }
// );

export default class Index extends React.Component{
    render(){
        return(
            <RootStack/>
        )
    }
}