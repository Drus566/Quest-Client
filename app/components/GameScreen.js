import React from 'react';
import { Button, GameView, AnswerView, Question } from '../styles/styles'
import { Text, View, ActivityIndicator } from 'react-native'

export default class GameScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = { isLoading: true }
    }

    componentDidMount(){
        fetch('https://zx-drus-zx-quest-api.herokuapp.com/quests/1')
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
                    <Text>РАУНД ПЕРВЫЙ</Text>
                </GameView>
                <GameView body>
                    <Question question={this.state.questApi.question}/>
                    <AnswerView>
                        <Button
                            answer
                            title={this.state.questApi.answer}
                        />
                        <Button 
                            answer
                            title={this.state.questApi.first}
                        />
                        <Button 
                            answer
                            title={this.state.questApi.second}
                        />
                        <Button
                            answer 
                            title={this.state.questApi.third}
                        />
                    </AnswerView>
                </GameView>
                <GameView footer>
                    
                </GameView>
            </GameView>
        )
    }
}