import React from 'react';
import { View, Button, Info } from '../styles/styles'
import AuthApi from '../other/AuthApi'
import { ActivityIndicator } from 'react-native'
import Storage from '../other/Storage'

export default class FirstScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state =  { infoMessage: null,
                        isLoading: true,
                        roomsCount: 0,
                        enemiesId: null }
        this.getMyData(this.state.numberQuestion);
    }
    
    componentWillMount(){
        const { navigation } = this.props;
        this.setState({infoMessage: navigation.getParam('infoMessage','No-Message')});
        if(navigation.getParam('enemiesId') != undefined && navigation.getParam('enemiesId') != null){
            this.setState({enemiesId: navigation.getParam('enemiesId')});
        } 
    }   

    getMyData = async () => {
        let token = await Storage.retrieveData("jwt");
        return AuthApi.checkUserRequest(token)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    myId: responseJson.id,
                    myName: responseJson.name,
                    isLoading: false,
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }

    render(){
        var buttonList = [];
        if(this.state.enemiesId){
            let enemiesId = this.state.enemiesId + "";
            let enemiesList = enemiesId.split(',');
            console.log(enemiesList);
            for ( i = 0; i < enemiesList.length; i++ )
            {   
                let id = enemiesList[i];
                console.log(enemiesList[i]);
                buttonList.push(
                    <Button key={i} title={"Room " + enemiesList[i]} 
                        onPress={() => {this.props.navigation.navigate('Room', 
                            {   
                                location: "first",
                                enemyId: id, 
                                infoMessage: "GGWP",
                                myId: this.state.myId,
                                myName: this.state.myName })
                        }}
                    />
                )
            }
        }
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20 }}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return(
            <View>
                {/* {this.state.infoMessage ? 
                    <Info text={`Enemies: ${this.state.enemiesId}`}/> : null} */}
                <Button
                    title="New Game"
                    onPress={() => {this.props.navigation.navigate('Second')}}
                />
                {buttonList}
            </View>
        )
    }
}