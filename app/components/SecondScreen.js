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
        this.state =  { 
            isLoading: false,
        }
    }

    componentWillMount(){
        const { navigation } = this.props;
        this.setState({ myId: navigation.getParam('myId')});
    }

    randomPlayer = async () => {
        let token = await Storage.retrieveData("jwt");
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
                    return RoomApi.createRoom(token, this.state.myId, response)
                        .then(response => {
                            if(response.ok){
                                console.log('...Room Created...')
                                return response.json();
                            }else{
                                console.log('...Room Not Created...')
                                console.log(response.status)
                            }
                        })
                        .then(response => {
                            console.log("Room Id:",response.id)
                            this.props.navigation.push('First')
                        })
                        .catch(error => {
                            console.log('Error create room:', error)
                            return error
                        })
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