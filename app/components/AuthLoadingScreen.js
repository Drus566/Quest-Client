import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import { View } from '../styles/styles'
import Api from '../other/Api'

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.checkToken();
    }

    checkToken(){
        return Api.checkUserRequest()
            .then(( response ) => 
            { 
                if (response.ok) {
                    this.props.navigation.navigate('App');
                }else{
                    this.props.navigation.navigate('Auth');
                }
            })
            .catch(error => {
                return error;
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