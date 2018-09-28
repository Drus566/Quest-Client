import React from 'react';
import { Button, RoomView, Quests, FirstIndicators, 
    SecondIndicators, Indicator, Round, RoomRoundText } from '../styles/styles'
import Storage from '../other/Storage'

export default class RoomScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
                        currentRound: "first_round",
                        first_round: {
                            firstUser: {
                                id: 3,
                                answers: {
                                    first: "",
                                    second: "",
                                    third: ""
                                }
                            },
                            secondUser: {
                                id: 2,
                                answers: {
                                    first: "",
                                    second: "",
                                    third: ""
                                }
                            }
                        },
                        second_round: {
                            firstUser: {
                                id: 3,
                                answers: {
                                    first: "",
                                    second: "",
                                    third: ""
                                }
                            },
                            secondUser: {
                                id: 2,
                                answers: {
                                    first: "",
                                    second: "",
                                    third: ""
                                }
                            }
                        },
                        third_round: {
                            firstUser: {
                                id: 3,
                                answers: {
                                    first: "",
                                    second: "",
                                    third: ""
                                }
                            },
                            secondUser: {
                                id: 2,
                                answers: {
                                    first: "",
                                    second: "",
                                    third: ""
                                }
                            }
                        },
                        completed: false,
                        first: null }
    }

    componentWillMount(){
        const { navigation } = this.props;
        this.setState({ enemyId: navigation.getParam('enemyId')})
        this.setState({ myId: navigation.getParam('myId')})
        this.setState({ myName: navigation.getParam('myName')})
        if (this.state.myId == this.state.first_round.firstUser.id){
            this.setState({ first: true })
        }else{
            this.setState({ first: false })
        }
    }

    validAnswerHelper(answers){
        let indicatorList = []
        for(i = 0; i < answers.length; i++){
            indicatorList.push(<Indicator key={i} typeAnswer={answers[i]} />)
        }
        return indicatorList 
    }
    
    render(){
        let oneRoundFirstIndicatorList = this.validAnswerHelper(Object.values(this.state.first_round.firstUser.answers));
        let oneRoundSecondIndicatorList = this.validAnswerHelper(Object.values(this.state.first_round.secondUser.answers));
        let twoRoundFirstIndicatorList = this.validAnswerHelper(Object.values(this.state.second_round.firstUser.answers));
        let twoRoundSecondIndicatorList = this.validAnswerHelper(Object.values(this.state.second_round.secondUser.answers));
        let threeRoundFirstIndicatorList = this.validAnswerHelper(Object.values(this.state.third_round.firstUser.answers));
        let threeRoundSecondIndicatorList = this.validAnswerHelper(Object.values(this.state.third_round.secondUser.answers));
        return(
            <RoomView>
                <RoomView header>
                    <RoomRoundText>Enemy Id: {this.state.enemyId}</RoomRoundText>
                    <RoomRoundText>My Id: {this.state.myId}</RoomRoundText>
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
                        onPress={() => this.props.navigation.navigate('Game', { currentRound: this.state.currentRound,
                                                                                enemyId: this.state.enemyId,
                                                                                myId: this.state.myId})}
                    />
                </RoomView>
            </RoomView>
        )
    }
}
