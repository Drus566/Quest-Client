import React from 'react';
import { Button, RoomView } from '../styles/styles'
import { Text } from 'react-native'

export default class FirstScreen extends React.Component {
    render(){
        return(
            <RoomView>
                <RoomView header>
                    <Text>Header</Text>
                </RoomView>
                <RoomView body>
                    <Text>Body</Text>
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