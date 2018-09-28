import React from 'react';
import { Button, GameView, AnswerView, Question } from '../styles/styles'
import { Text, View, ActivityIndicator } from 'react-native'
import QuestApi from '../other/QuestApi'
import Storage from '../other/Storage'

export default class GameScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {  numberQuestion: 1,
                        isLoading: true,
                        counterRound: "first_round",
                        disabled: true,
                        };
        this.getQuests(this.state.numberQuestion);
    }
    
    componentWillMount(){
        const { navigation } = this.props;
        this.setState({ currentRound: navigation.getParam('currentRound', 'Не подгрузился')})
        this.setState({ enemyId: navigation.getParam('enemyId')})
        this.setState({ myId: navigation.getParam('myId')})
    }

    getQuests = async ( number ) => {
        let token = await Storage.retrieveData("jwt");
        return QuestApi.questsRequest(token, number)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    questApi: {
                        question: responseJson.question,
                        answer: responseJson.answer,
                        first: responseJson.first,
                        second: responseJson.second,
                        third: responseJson.third,
                    },
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }

    trueAnswer(){
        this.setState({ disabled: false,  questApi: {
            question: 'ВЕРНО',
            answer: this.state.questApi.answer,
            first: this.state.questApi.first,
            second: this.state.questApi.second,
            third: this.state.questApi.third,
        } })
    }

    falseAnswer(){
        this.setState({disabled: false, questApi: {
            question: 'НЕВЕРНО',
            answer: this.state.questApi.answer,
            first: this.state.questApi.first,
            second: this.state.questApi.second,
            third: this.state.questApi.third,
        } })
    }

    setRoundState(round){
        this.setState({     
            [round]: {
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
        },})
    }

    questWindow(){
        console.log("QuestWindow");
        if(this.state.numberQuestion == 3)
        {
            this.props.navigation.navigate('Room', {infoMessage: "GGWP"})
            this.setState({     
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
            },})
        }
        else
        {
            this.setState({numberQuestion: this.state.numberQuestion + 1})
        } 
        this.getQuests(this.state.numberQuestion)
        this.setState({ disabled: true })
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
            <GameView>
                <GameView header>
                    <Text>РАУНД {this.state.currentRound}</Text>
                </GameView>
                <GameView body>
                    <Question onPress={()=>{this.questWindow()}} disabled={this.state.disabled} question={this.state.questApi.question}/>
                    <AnswerView>
                        <Button
                            answer
                            title={this.state.questApi.answer}
                            onPress={() => {this.trueAnswer()}}
                            disabled={!this.state.disabled}
                        />
                        <Button 
                            answer
                            title={this.state.questApi.first}
                            onPress={() => {this.falseAnswer()}}
                            disabled={!this.state.disabled}
                        />
                        <Button 
                            answer
                            title={this.state.questApi.second}
                            onPress={() => {this.falseAnswer()}}
                            disabled={!this.state.disabled}
                        />
                        <Button
                            answer 
                            title={this.state.questApi.third}
                            onPress={() => {this.falseAnswer()}}
                            disabled={!this.state.disabled}
                        />
                    </AnswerView>
                </GameView>
                <GameView footer>
                    <Text>ПОТОРОПИСЬ, ВРЕМЯ ИСТЕКАЕТ!</Text>
                </GameView>
            </GameView>
        )
    }
}