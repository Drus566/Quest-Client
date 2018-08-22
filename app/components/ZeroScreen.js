import React from 'react';
import { View, Button } from '../styles/styles'

export default class ZeroScreen extends React.Component {
    render(){
        return(
            <View>
                <Button
                    title="LogUp"
                    onPress={() => {this.props.navigation.navigate('Logup')}}
                />
                <Button
                    title="LogIn"
                    onPress={() => {this.props.navigation.navigate('Login')}}
                />
            </View>
        )
    }
}