import React from 'react';
import { View, Button } from '../styles/styles'
import AuthApi from '../other/AuthApi'
import UserApi from '../other/UserApi'
import { ActivityIndicator } from 'react-native'
import Storage from '../other/Storage'

export default class FirstScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            isLoading: true,
            roomsId: null
        }
        this.getMyData();
    }
    
    componentWillMount(){
        const { navigation } = this.props;
    }   

    getMyData = async () => {
        let token = await Storage.retrieveData("jwt");
        let id 
        return AuthApi.checkUserRequest(token)
            .then((response) => {
                if (response.ok){
                    return response.json().then(responseJson => {
                        id = responseJson.id
                        this.setState({
                            myId: id,
                            myName: responseJson.name,
                        })
                        return UserApi.getUserRooms(token, id)
                            .then((response) => { 
                                if (response){
                                    return response.json().then(responseJson => {
                                        this.filterRooms(responseJson)
                                    })
                                } else {
                                    this.setState({ isLoading: false })
                                }
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    filterRooms(data){
        let roomsId = ''
        data.forEach(room => {
            if(!room.completed){
                if(roomsId.length == 0){
                    roomsId = room.id
                }else{
                    roomsId += ',' + room.id
                }
            }
            this.setState({
                roomsId: roomsId,
                isLoading: false
            })
        });
        console.log(roomsId)
    }

    render(){
        var buttonList = [];
        if(this.state.roomsId){
            let roomsId = this.state.roomsId + "";
            let roomsList = roomsId.split(',');
            for ( i = 0; i < roomsList.length; i++ )
            {   
                let roomId = roomsList[i];
                buttonList.push(
                    <Button key={i} title={"Room " + roomsList[i]} 
                        onPress={() => {this.props.navigation.navigate('Room', 
                            {   
                                location: "first",
                                roomId: roomId,
                                myId: this.state.myId,
                                myName: this.state.myName
                            })
                        }}
                    />
                )
            }
        }
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20 }}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return(
            <View>
                {/* {this.state.infoMessage ? 
                    <Info text={`Enemies: ${this.state.enemiesId}`}/> : null} */}
                <Button
                    title="New Game"
                    onPress={() => {this.props.navigation.navigate('Second',
                        {
                            myId: this.state.myId,
                        })
                    }}
                />
                {buttonList}
            </View>
        )
    }
}