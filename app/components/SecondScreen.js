import React from 'react'
import { View, Button } from '../styles/styles'
import RoomApi from '../other/RoomApi'
import Storage from '../other/Storage'
import { BackHandler } from 'react-native'

export default class SecondScreen extends React.Component{
    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
        super(props);
        this.state =  { token: null,
                        infoMessage: null,
                        isLoading: false,
                        enemiesId: null
        }
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => 
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    componentDidMount(){
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => 
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    onBackButtonPressAndroid = () => {
        let data;
        if (this.state.enemiesId){
            data = this.state.enemiesId;
        }
        this.props.navigation.push('First', {
            enemiesId: data
        });
        return true;
    }

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    randomPlayer = async () => {
        let token = await Storage.retrieveData("jwt");
        console.log("MAIN: ",token);
        return RoomApi.randomPlayerRequest(token)
            .then(response => {
                if(response.ok){
                    console.log('Success random player');
                    return response.json();
                }else{
                    console.log('...Find player...')
                    console.log(response.status)
                }
            })
            .then(response => {
                if (response){
                    console.log("Enemy Id:", response);
                    if (this.state.enemiesId != null){
                        this.setState({ enemiesId: this.state.enemiesId + "," + response })
                    }else{
                        this.setState({ enemiesId: response })
                    }
                    this.props.navigation.push('First', {
                        enemiesId: this.state.enemiesId
                    });
                }
            })
            .catch(error => {
                console.log('Error random player:', error); 
                return error
            });
    }

    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20 }}>
                    <ActivityIndicator/>
                    <Info text={this.state.infoMessage}/>
                </View>
            )
        }
        return(
            <View>
                <Button title="Random Player" onPress={() => {this.randomPlayer()}}/>
            </View>
        )
    }
}