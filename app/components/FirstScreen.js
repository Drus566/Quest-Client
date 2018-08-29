import React from 'react';
import { View, Button, Info } from '../styles/styles'

export default class FirstScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state =  { infoMessage: null,
                        isLoading: false,
                        roomsCount: 0,
                        enemiesId: null }
    }
    
    componentWillMount(){
        const { navigation } = this.props;
        this.setState({infoMessage: navigation.getParam('infoMessage','No-Message')});
        if(navigation.getParam('enemiesId') != undefined && navigation.getParam('enemiesId') != null){
            this.setState({enemiesId: navigation.getParam('enemiesId')});
        } 
    }   

    render(){
        var buttonList = [];
        if(this.state.enemiesId){
            let enemiesId = this.state.enemiesId + "";
            let enemiesList = enemiesId.split(',');
            console.log(enemiesList);
            for ( i = 0; i < enemiesList.length; i++ )
            {   
                console.log(enemiesList[i]);
                buttonList.push(
                    <Button key={i} title={"Room " + enemiesList[i]} 
                        onPress={() => {this.props.navigation.navigate('Room', 
                            { enemyId: enemiesList[i], infoMessage: "GGWP" })
                        }}
                    />
                )
            }
        }
        
        return(
            <View>
                {this.state.infoMessage ? 
                    <Info text={`Enemies: ${this.state.enemiesId}`}/> : null}
                <Button
                    title="New Game"
                    onPress={() => {this.props.navigation.navigate('Second')}}
                />
                <Button
                    title="Room"
                    onPress={() => {this.props.navigation.navigate('Room', {infoMessage: "GGWP"})}}
                />
                {buttonList}
            </View>
        )
    }
}