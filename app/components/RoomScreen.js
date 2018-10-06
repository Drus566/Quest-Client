import React from 'react';
import { Button, RoomView, Quests, FirstIndicators, 
    SecondIndicators, Indicator, Round, RoomRoundText } from '../styles/styles'
import Storage from '../other/Storage'

export default class RoomScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
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
        this.initialData();
    }
    
    getFromFirst(navigation){
        let myId = navigation.getParam('myId')
        let enemyId = navigation.getParam('enemyId')

        this.setState({ myName: navigation.getParam('myName')})

        if (myId == this.state.firstUserId){
            this.setState({ first: true, firstUserId: myId, secondUserId: enemyId })
        }else{
            this.setState({ first: false, firstUserId: enemyId, secondUserId: myId })
        }
    }

    initialData(){
        console.log("3AWLA")
        if(this.state.firstRound == undefined){
            this.setState({
                firstRound: {
                    firstUser: {
                        answers: {
                            first: "",
                            second: "",
                            third: ""
                        }
                    },
                    secondUser: {
                        answers: {
                            first: "",
                            second: "",
                            third: ""
                        }
                    }
                },
                secondRound: {
                    firstUser: {
                        answers: {
                            first: "",
                            second: "",
                            third: ""
                        }
                    },
                    secondUser: {
                        answers: {
                            first: "",
                            second: "",
                            third: ""
                        }
                    }
                },
                thirdRound: {
                    firstUser: {
                        answers: {
                            first: "",
                            second: "",
                            third: ""
                        }
                    },
                    secondUser: {
                        answers: {
                            first: "",
                            second: "",
                            third: ""
                        }
                    }
                },
            })
        }
    }

    getFromGame(navigation){
        console.log("Method getFromGame")
        
        let orderUser
        let oppositeUser
        let oppositeAnswers

        let currentRound = navigation.getParam('currentRound')
        let round = navigation.getParam('round')
        let completed = navigation.getParam('completed')
        let firstAnswer = navigation.getParam('first')
        let secondAnswer = navigation.getParam('second')
        let thirdAnswer = navigation.getParam('third')

        if(this.state.first){
            orderUser = "firstUser"
            oppositeUser = "secondUser"
        }else{
            orderUser = "secondUser"
            oppositeUser = "firstUser"
        }

        if(this.state.firstRound == undefined){
            oppositeAnswers = [,,]
        }else{
            if (round == 'firstRound'){
                if (this.state.first){
                    oppositeAnswers = Object.values(this.state.firstRound.firstUser.answers)
                }else{
                    oppositeAnswers = Object.values(this.state.firstRound.secondUser.answers)
                }
            }else if(round == 'secondRound'){
                if (this.state.first){
                    oppositeAnswers = Object.values(this.state.secondRound.firstUser.answers)
                }else{
                    oppositeAnswers = Object.values(this.state.secondRound.secondUser.answers)
                }
            }else if(round == 'thirdRound'){
                if (this.state.first){
                    oppositeAnswers = Object.values(this.state.thirdRound.firstUser.answers)
                }else{
                    oppositeAnswers = Object.values(this.state.thirdRound.secondUser.answers)
                }
            }
        }
        
        
        this.setState({ currentRound: currentRound, completed: completed })
        this.setState({
            [round]: {
                [orderUser]: {
                    answers: {
                        first: firstAnswer,
                        second: secondAnswer,
                        third: thirdAnswer,
                    }
                },
                [oppositeUser]:{
                    answers: {
                        first: oppositeAnswers[0],
                        second: oppositeAnswers[1],
                        third: oppositeAnswers[2],
                    }
                }
            },
        })

        console.log("Round -", round)
        console.log("OrderUser -", orderUser)
        console.log("First Answer -", firstAnswer)
        console.log("Third Answer -", thirdAnswer)
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

    validAnswerHelper(answers){
        let indicatorList = []
        for(i = 0; i < answers.length; i++){
            indicatorList.push(<Indicator key={i} typeAnswer={answers[i]} />)
        }
        return indicatorList 
    }
    
    someMethod(){
        let SomeVar = React.createElement()
    }

    render(){
        let myId = this.getMyId();
        let enemyId = this.getEnemyId();

        let oneRoundFirstIndicatorList = this.validAnswerHelper(Object.values(this.state.firstRound.firstUser.answers));
        let oneRoundSecondIndicatorList = this.validAnswerHelper(Object.values(this.state.firstRound.secondUser.answers));
        let twoRoundFirstIndicatorList = this.validAnswerHelper(Object.values(this.state.secondRound.firstUser.answers));
        let twoRoundSecondIndicatorList = this.validAnswerHelper(Object.values(this.state.secondRound.secondUser.answers));
        let threeRoundFirstIndicatorList = this.validAnswerHelper(Object.values(this.state.thirdRound.firstUser.answers));
        let threeRoundSecondIndicatorList = this.validAnswerHelper(Object.values(this.state.thirdRound.secondUser.answers));

        return(
            <RoomView>
                <RoomView header>
                    <RoomRoundText>My Id: {myId}</RoomRoundText>
                    <RoomRoundText>Enemy Id: {enemyId}</RoomRoundText>
                    <RoomRoundText>My Name: {this.state.myName}</RoomRoundText>
                </RoomView>
                
                {this.state.first ? 
                    (<RoomView body>
                        <Quests>
                            <FirstIndicators>
                                {oneRoundFirstIndicatorList}
                            </FirstIndicators>
                            <Round>
                                <RoomRoundText>Round One</RoomRoundText>
                            </Round>
                            <SecondIndicators>
                                {oneRoundSecondIndicatorList}
                            </SecondIndicators>
                        </Quests>
                        <Quests>
                            <FirstIndicators>
                                {twoRoundFirstIndicatorList}
                            </FirstIndicators>
                            <Round>
                                <RoomRoundText>Round Two</RoomRoundText>
                            </Round>
                            <SecondIndicators>
                                {twoRoundSecondIndicatorList}
                            </SecondIndicators>
                        </Quests>
                        <Quests>
                            <FirstIndicators>
                                {threeRoundFirstIndicatorList}
                            </FirstIndicators>
                            <Round>
                                <RoomRoundText>Round Three</RoomRoundText>
                            </Round>
                            <SecondIndicators>
                                {threeRoundSecondIndicatorList}
                            </SecondIndicators>
                        </Quests>
                    </RoomView>):
                    (<RoomView body>
                        <Quests>
                            <FirstIndicators>
                                {oneRoundSecondIndicatorList}
                            </FirstIndicators>
                            <Round>
                                <RoomRoundText>Round One</RoomRoundText>
                            </Round>
                            <SecondIndicators>
                                {oneRoundFirstIndicatorList}
                            </SecondIndicators>
                        </Quests>
                        <Quests>
                            <FirstIndicators>
                                {twoRoundSecondIndicatorList}
                            </FirstIndicators>
                            <Round>
                                <RoomRoundText>Round Two</RoomRoundText>
                            </Round>
                            <SecondIndicators>
                                {twoRoundFirstIndicatorList}
                            </SecondIndicators>
                        </Quests>
                        <Quests>
                            <FirstIndicators>
                                {threeRoundSecondIndicatorList}
                            </FirstIndicators>
                            <Round>
                                <RoomRoundText>Round Three</RoomRoundText>
                            </Round>
                            <SecondIndicators>
                                {threeRoundFirstIndicatorList}
                            </SecondIndicators>
                        </Quests>
                    </RoomView>
                )}
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
