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
                                    first: "green",
                                    second: "red",
                                    third: "red"
                                }
                            },
                            secondUser: {
                                id: 2,
                                answers: {
                                    first: "green",
                                    second: "green",
                                    third: "green"
                                }
                            }
                        },
                        second_round: {
                            firstUser: {
                                id: 3,
                                answers: {
                                    first: "green",
                                    second: "red",
                                    third: "red"
                                }
                            },
                            secondUser: {
                                id: 2,
                                answers: {
                                    first: "green",
                                    second: "green",
                                    third: "green"
                                }
                            }
                        },
                        third_round: {
                            firstUser: {
                                id: 3,
                                answers: {
                                    first: "green",
                                    second: "red",
                                    third: "red"
                                }
                            },
                            secondUser: {
                                id: 2,
                                answers: {
                                    first: "green",
                                    second: "green",
                                    third: "green"
                                }
                            }
                        },
                        completed: false,
                        first: null }
    }

    componentWillMount(){
        const { navigation } = this.props;
        this.setState({ enemyId: navigation.getParam('enemyId', 'noId')})
        console.log(navigation.getParam('infoMessage'))
        console.log(this.state.enemyId)
        console.log(Object.values(this.state.first_round.firstUser.answers));
    }   

    // Проверяет какого типа ответы отдает компоненты с соответствующими атрибутами
    validAnswerHelper(answers){
        console.log(answers[i]);
        let indicatorList = []
        for(i = 0; i < answers.length; i++){
            // React.createElement('RoomWindowQuestIndicator', { typeAnswer: {answer[i]}})
            indicatorList.push(<RoomWindowQuestIndicator key={i} typeAnswer={answers[i]} />)
            console.log(answers[i]);
            // if(answers[i] == "successfully"){
            //     indicatorList.push(
            //         <RoomWindowQuestIndicator key={i} successfully/>
            //     )
            // }else if(answers[i] == "unsuccessfully"){
            //     indicatorList.push(
            //         <RoomWindowQuestIndicator key={i} unsuccessfully/>
            //     )
            // }else{
            //     indicatorList.push(
            //         <RoomWindowQuestIndicator key={i}/>
            //     )
            // }
        }
        return indicatorList 
    }

    //проверка ответов для определенного раунда и его возвращение для отрисовки
    validRoundHelper(textRound, round){
        if(round){
            console.log("3AWEL")
            // берем ответы с состояния
            let firstAnswers = Object.values(round.firstUser.answers);
            let secondAnswers = Object.values(round.secondUser.answers);
            console.log("First anwers - ", firstAnswers)
            // отдаем их на проверку и формируем лист ответов
            let firstIndicatorList = this.validAnswerHelper(firstAnswers);
            let secondIndicatorList = this.validAnswerHelper(secondAnswers);
            // проверка для отслеживания с какой стороны рендерить ответы с этого клиента
            if(round.firstUser.id == this.state.myId){
                this.setState({ first : true })
            }

            return (
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
        }
    }
    
    render(){
        var firstRound = this.validRoundHelper("First Round", this.state.first_round);
        var secondRound = this.validRoundHelper("Second Round", this.state.second_round);
        var thirdRound = this.validRoundHelper("Third Round", this.state.third_round);
        return(
            <RoomView>
                <RoomView header>
                    <Text>Enemy Id: {this.state.enemyId}</Text>
                </RoomView>
                <RoomView body>
                    {firstRound}
                    {secondRound}
                    {thirdRound}
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