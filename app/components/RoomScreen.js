import React from 'react';
import { Button, RoomView } from '../styles/styles'
import { Text } from 'react-native'
import Storage from '../other/Storage'

export default class RoomScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { enemyId: null }
    }

    componentWillMount(){
        const { navigation } = this.props;
        this.setState({ enemyId: navigation.getParam('enemyId', 'noId')})
        console.log(navigation.getParam('infoMessage'))
        console.log(this.state.enemyId)
    }   
    
    render(){
        return(
            <RoomView>
                <RoomView header>
                    <Text>Enemy Id: {this.state.enemyId}</Text>
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