import React from 'react';
import { Button, RoomView, RoomRoundText, RoomWindowQuestIndicator, RoomWindowQuests,
    RoomWindowQuestsEnemy, RoomWindowQuestsOwn, RoomWindowRound } from '../styles/styles'
import { Text } from 'react-native'
import Storage from '../other/Storage'

export default class RoomScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  enemyId: 2,
                        myId: 3,
                        first_round: {
                            firstUser: {
                                id: 3,
                                answers: {
                                    first: "successfully",
                                    second: "unsuccessfully",
                                    third: "unsuccessfully"
                                }
                            },
                            secondUser: {
                                id: 2,
                                answers: {
                                    first: "successfully",
                                    second: "successfully",
                                    third: "successfully"
                                }
                            }
                        },
                        second_round: {
                            firstUser: {
                                id: 3,
                                answers: {
                                    first: "successfully",
                                    second: "unsuccessfully",
                                    third: "unsuccessfully"
                                }
                            },
                            secondUser: {
                                id: 2,
                                answers: {
                                    first: "successfully",
                                    second: "successfully",
                                    third: "successfully"
                                }
                            }
                        },
                        third_round: {
                            firstUser: {
                                id: 3,
                                answers: {
                                    first: "successfully",
                                    second: "unsuccessfully",
                                    third: "unsuccessfully"
                                }
                            },
                            secondUser: {
                                id: 2,
                                answers: {
                                    first: "successfully",
                                    second: "successfully",
                                    third: "successfully"
                                }
                            }
                        },
                        completed: false,
                        first: null }
                        // first_round: `${this.state.myId},ddd,${this.state.enemyId},ddd`,
                        // second_round: `${this.state.myId},ddd,${this.state.enemyId},ddd`,
                        // third_round: `${this.state.myId},ddd,${this.state.enemyId},ddd`,
    }

    componentWillMount(){
        const { navigation } = this.props;
        this.setState({ enemyId: navigation.getParam('enemyId', 'noId')})
        console.log(navigation.getParam('infoMessage'))
        console.log(this.state.enemyId)
    }   

    validAnswerHelper(answers){
        let indicatorList = []
        for(i = 0; i < answers.length; i++){
            if(answers[i] == "successfully"){
                indicatorList.push(
                    <RoomWindowQuestIndicator key={i} successfully/>
                )
            }else if(answers[i] == "unsuccessfully"){
                indicatorList.push(
                    <RoomWindowQuestIndicator key={i} unsuccessfully/>
                )
            }else{
                indicatorList.push(
                    <RoomWindowQuestIndicator key={i}/>
                )
            }
        }
        //console.log(indicatorList);
        return indicatorList 
    }

    validRoundHelper(textRound, round, roomWindowsList = []){
        if(round){
            let firstAnswers = Object.values(round.firstUser.answers);
            let secondAnswers = Object.values(round.secondUser.answers);
            let firstIndicatorList = this.validAnswerHelper(firstAnswers);
            let secondIndicatorList = this.validAnswerHelper(secondAnswers);
            if(round.firstUser.id == this.state.myId){
                this.setState({ first : true })
            }
            console.log(this.state.first);
            roomWindowsList.push(
                <RoomWindowQuests>
                    <RoomWindowQuestsOwn>
                        {this.state.first ? firstIndicatorList : secondIndicatorList}
                    </RoomWindowQuestsOwn>
                    <RoomWindowRound>
                        <RoomRoundText>{textRound}</RoomRoundText>
                    </RoomWindowRound>
                    <RoomWindowQuestsEnemy>
                        {this.state.first ? secondIndicatorList : firstIndicatorList}
                    </RoomWindowQuestsEnemy>
                </RoomWindowQuests>
            )
            //console.log(roomWindowsList)
            return roomWindowsList
        }
    }
    
    render(){
        var roomWindowList = [];
        roomWindowList.push(this.validAnswerHelper("First Round", this.state.first_round));
        roomWindowList.push(this.validAnswerHelper("Second Round", this.state.second_round, roomWindowList));
        roomWindowList.push(this.validAnswerHelper("Third Round", this.state.third_round, roomWindowList));
        //console.log(roomWindowList);
        return(
            <RoomView>
                <RoomView header>
                    <Text>Enemy Id: {this.state.enemyId}</Text>
                </RoomView>
                <RoomView body>
                    {roomWindowList}
                </RoomView>
                <RoomView footer>
                    <Button 
                        title="Play"
                        onPress={() => this.props.navigation.navigate('Game')}
                    />
                </RoomView>
            </RoomView>
        )
    }
}