import React from 'react';
import { Button, GameView, AnswerView, Question } from '../styles/styles'
import { Text, View, ActivityIndicator } from 'react-native'
import QuestApi from '../other/QuestApi'
import Storage from '../other/Storage'

export default class GameScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {  
            numberQuestion: 1,
            counterQuest: 1,
            counterRound: 1,
            isLoading: true,
            disabled: true,
        };
        this.getQuests(this.state.numberQuestion);
    }
    
    componentWillMount(){
        const { navigation } = this.props;
        this.setState({ currentRound: navigation.getParam('currentRound', 'Не подгрузился')})
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
        this.setResultAnswer("green", "ВЕРНО")
    }

    falseAnswer(){
        this.setResultAnswer("red", "НЕВЕРНО")
    }

    setResultAnswer(answer, postAnswerText){

        if (this.state.counterQuest == 1){
            this.setState({
                answers: {
                    first: answer,
                    second: "",
                    third: ""
                }
            })
        }else if (this.state.counterQuest == 2){
            this.setState({
                answers: {
                    first: this.state.answers.first,
                    second: answer,
                    third: ""
                }
            })
        }else if (this.state.counterQuest == 3){
            this.setState({
                answers:{
                    first: this.state.answers.first,
                    second: this.state.answers.second,
                    third: answer,
                }
            })
        }

        if (this.state.counterQuest < 3){
            this.setState({
                counterQuest: this.state.counterQuest + 1,
            })
        }else{
            this.setState({
                counterQuest: 1
            })
        }

        this.setState({
            disabled: false, 
            questApi: {
                question: postAnswerText,
                answer: this.state.questApi.answer,
                first: this.state.questApi.first,
                second: this.state.questApi.second,
                third: this.state.questApi.third,
            }
        })
    }

    preTransmissionData(){
        let round 
        let completed = false
        let curRound

        if(this.state.currentRound == 1){
            round = "firstRound"
            curRound = 2
        }else if(this.state.currentRound == 2){
            round = "secondRound"
            curRound = 3
        }
        else if(this.state.currentRound == 3){
            round = "thirdRound"
            completed = true
        }

        this.props.navigation.push('Room',
            {
                location: "game",
                currentRound: curRound,
                completed: completed,
                round: round,
                first: this.state.answers.first,
                second: this.state.answers.second,
                third: this.state.answers.third
            }    
        )
    }

    questWindow(){
        if(this.state.numberQuestion == 3)
        {
            this.preTransmissionData();
        }
        else{
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