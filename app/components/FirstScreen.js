import React from 'react';
import { View, Button, Info } from '../styles/styles'

export default class FirstScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state =  { infoMessage: null,
                        isLoading: false,
                        email: 'Input your email',
                        password: 'Input your password (min 6)' }
    }

    // componentWillMount(){
    //     this.setState({infoMessage: this.props.navigation.getParam('infoMessage')})
    // }

    // componentWillUnmount(){
    //     this.setState({infoMessage: null})
    // }

    render(){
        return(
            <View>
                {this.state.infoMessage ? 
                    <Info text={this.state.infoMessage}/> : null}
                <Button
                    title="New Game"
                    onPress={() => {this.props.navigation.navigate('Second')}}
                />
                <Button
                    title="Room"
                    onPress={() => {this.props.navigation.navigate('Room')}}
                />
            </View>
        )
    }
}