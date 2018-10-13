import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import { View } from '../styles/styles'
import AuthApi from '../other/AuthApi'
import Storage from '../other/Storage'

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.login();
    }

    login(){
        return AuthApi.loginRequest('invoker@mail.ru', '123456')
            .then((token) => {
                return AuthApi.checkUserRequest(token.jwt).then(( response ) => 
                { 
                    if (response.ok) {
                        Storage.storeData("jwt", token.jwt);
                        this.props.navigation.navigate('First');
                    }
                })
                .catch(error => {
                    this.props.navigation.navigate('Auth')
                    console.log(error);
                    return error;
                });
            })
            .catch(error => {
                throw(error);
            });
    }
        
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

export default AuthLoadingScreen

