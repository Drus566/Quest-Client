import React from 'react'
import { Button, InputElement, InputWindow, Info } from '../styles/styles'
import { KeyboardAvoidingView, View, ActivityIndicator } from 'react-native'
import Api from '../other/Api'


export default class LogupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state =  { infoMessage: null,
                        isLoading: false,
                        name: 'Input your name',
                        email: 'Input your email',
                        password: 'Input your password (min 6)' }
    }
    
    logup(){
        this.setState({isLoading: true})
        return Api.logupRequest(this.state.name, this.state.email, this.state.password)
            .then((token) => {
                console.log('Login Screen ' + token)
                return Api.checkUserRequest(token.jwt).then(( response ) => 
                { 
                    this.setState({isLoading: false});
                    if (response.ok) {
                        this.props.navigation.navigate('App');
                    }
                })
                .catch(error => {
                    this.setState({isLoading: false});
                    return error;
                });
            })
            .catch(error => {
                throw(error);
            });
    }

    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20 }}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return(
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
                {this.state.infoMessage ? 
                    <Info text={this.state.infoMessage}/> : null}
                <InputWindow>
                    <InputElement label={'Name'} placeholder={this.state.name} onChangeText={(name) => this.setState({name})}/> 
                    <InputElement label={'Email'} placeholder={this.state.email} onChangeText={(email) => this.setState({email})}/>
                    <InputElement label={'Password'} placeholder={this.state.password} onChangeText={(password) => this.setState({password})} secureTextEntry={true}/>
                    <Button
                        title="Apply"
                        onPress={() => {this.logup();}}
                    />
                </InputWindow>
            </KeyboardAvoidingView>
        )
    }
}