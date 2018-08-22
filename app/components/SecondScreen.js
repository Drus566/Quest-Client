import React from 'react'
import { View, Button } from '../styles/styles'

export default class SecondScreen extends React.Component{
    render(){
        return(
            <View>
                <Button title="Find Enemy" />
                <Button title="Random Player" />
            </View>
        )
    }
}