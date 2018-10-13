import React from 'react';
import { Button, RoomView, RoomAnswersView, RoomRoundText } from '../styles/styles'
import { ActivityIndicator } from 'react-native'
import { View } from '../styles/styles'
import RoomApi from '../other/RoomApi'
import Storage from '../other/Storage'

export default class RoomScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            isLoading: true,
            firstRound: ",,,,,",
            secondRound: ",,,,,",
            thirdRound: ",,,,,",
            currentRound: 1,
            completed: false,
        }
    }

    componentWillMount(){
        this.getNavParamData()
    }

    getNavParamData(){
        const { navigation } = this.props;
        if (navigation.getParam('location') == 'game'){
            this.getFromGame(navigation)
        }else if(navigation.getParam('location') == 'first'){
            this.getFromFirst(navigation)
        }
    }
    
    getFromFirst(navigation){
        let roomId = navigation.getParam('roomId')
        let myId = navigation.getParam('myId')
        let myName = navigation.getParam('myName')
        let enemyId

        let roomData = this.getRoomData(roomId)

        if(roomData.first_user_id == myId){
            enemyId = roomData.second_user_id    
        }else{
            enemyId = roomData.first_user_id
        }

        if (myId == this.state.firstUserId){
            this.setState({ first: true, firstUserId: myId, secondUserId: enemyId })
        }else{
            this.setState({ first: false, firstUserId: enemyId, secondUserId: myId })
        }

        this.setState({ 
            isLoading: false,
            myName: myName,
            firstRound: roomData.first_round ? roomData.first_round : ",,,,,",
            secondRound: roomData.second_round ? roomData.second_round : ",,,,,",
            thirdRound: roomData.third_round ? roomData.third_round : ",,,,,",
        })
    }

    getFromGame(navigation){

    }

    getRoomData = async (roomId) => {
        let token = await Storage.retrieveData("jwt");
        return RoomApi.getRoom(token, roomId)
            .then((response) => { 
                if (response.ok) {
                    return response.json()
                }
            })
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                console.error(error);
            })
    }

    getMyId(){
        if(this.state.first){
            return this.state.firstUserId
        }else{
            return this.state.secondUserId
        }
    }

    getEnemyId(){
        if(this.state.first){
            return this.state.secondUserId
        }else{
            return this.state.firstUserId
        }
    }
    
    getRoundAnswers(dataRound){
        return dataRound.split(",");
    }

    render(){
        let myId = this.getMyId();
        let enemyId = this.getEnemyId();

        let checkerFirst = this.state.first

        let firstRoundAnswers = this.getRoundAnswers(this.state.firstRound)
        let secondRoundAnswers = this.getRoundAnswers(this.state.secondRound)
        let thirdRoundAnswers = this.getRoundAnswers(this.state.thirdRound)

        let firstIndicators = React.createElement(RoomAnswersView, [answers={firstRoundAnswers}, textRound="Round One", first={checkerFirst}])
        let secondIndicators = React.createElement(RoomAnswersView, [answers={secondRoundAnswers}, textRound="Round Two", first={checkerFirst}])
        let thirdIndicators = React.createElement(RoomAnswersView, [answers={thirdRoundAnswers}, textRound="Round Three", first={checkerFirst}])
        
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20 }}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return(
            <RoomView>
                <RoomView header>
                    <RoomRoundText>My Id: {myId}</RoomRoundText>
                    <RoomRoundText>Enemy Id: {enemyId}</RoomRoundText>
                    <RoomRoundText>My Name: {this.state.myName}</RoomRoundText>
                </RoomView>
                <RoomView body>
                    {firstIndicators}
                    {secondIndicators}
                    {thirdIndicators}
                </RoomView>
                <RoomView footer>
                    <Button 
                        title="Play"
                        onPress={() => this.props.navigation.navigate('Game', 
                        { currentRound: this.state.currentRound })}
                    />
                </RoomView>
            </RoomView>
        )
    }
}
