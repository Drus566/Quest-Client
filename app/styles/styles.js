import React from 'react'
import styled, { css } from 'styled-components/native'
import { StatusBar } from 'react-native'

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

//---------------------------- ********* -------------------------------

const ButtonText = styled.Text`
    color: #FFFFFF;
    text-align: center;
`;

const ButtonWrapper = styled.View`
    justify-content: center;
    margin-bottom: 24px; 
    background-color: #3C6274;
    width: 150px;
    height: 50px;
    ${({ answer }) => answer && css`
        margin-bottom: 0px; 
        width: 49%;
        height: 49%;
        border: 3px solid black;
        border-radius: 10px;
    `}
`;

const TouchableOpacityMode = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    justify-content:center;
`

export const Button = ({ title, onPress, disabled, ...rest }) => (
    <ButtonWrapper {...rest}>
        <TouchableOpacityMode disabled={disabled} onPress={onPress}>
            <ButtonText>{title}</ButtonText>
        </TouchableOpacityMode>
    </ButtonWrapper>
)

//---------------------------- ********* -------------------------------

export const View = styled.View`
    flex: 1;
    background-color: #7C4A41;
    align-items: center;
    justifyContent: center;
`;

export const RoomView = styled.View`
    flex: 1;
    background-color: #7C4A41;
    ${({ header }) => header && css`
        flex: 1;
        background-color: red;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
    `}
    ${({ footer }) => footer && css`
        flex: 1;
        background-color: blue;
        justify-content: flex-end;
        align-items: center;
        flex-direction: column;
    `}
    ${({ body }) => body && css`
        flex: 5;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    `}
`;

export const Quests = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: #1898;
`

export const FirstIndicators = styled.View`
    flex: 1;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    height: 25%;
`

export const SecondIndicators = styled.View`
    flex: 1;
    justify-content: space-around;
    align-items: center;
    width: 100;
    flex-direction: row;
    height: 25%;
`

export const Indicator = styled.View`
    flex: 0.25;
    height: 100%;
    width: 100;
    justify-content: space-around;
    background-color: ${props => props.typeAnswer || "white"};
    border: 1px solid black;
`

export const Round = styled.View`
    flex: 0.5;
    height: 50%;
    width: 100;
    justify-content: center;
    align-items: center;
    background-color: yellow;
    border: 1px solid black;
    border-radius: 10px;
`

export const RoomRoundText = styled.Text`
    color: black;
    text-align: center;
`

export const GameView = styled.View`
    flex: 1;
    background-color: #7C4A41;
    ${({ header }) => header && css`
        margin-top: ${STATUSBAR_HEIGHT};
        flex: 0.4;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    `}
    ${({ footer }) => footer && css`
        flex: 0.3;
        background-color: blue;
        justify-content: flex-end;
        align-items: center;
        flex-direction: column;
    `}
    ${({ body }) => body && css`
        flex: 5;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    `}
`;
//---------------------------- ********* -------------------------------

const QuestionText = styled.Text`
    color: #FFFFFF;
    text-align: center;
`;

const QuestionView = styled.TouchableOpacity`
    flex: 1;
    width: 98%;
    height: 97%;
    justify-content: center;
    align-content: center;
    border: 3px solid black;
    border-radius: 10px;
`;

export const Question = ({ question, disabled, ...rest }) => (
    <QuestionView disabled={disabled} {...rest}>
        <QuestionText>{question}</QuestionText>
    </QuestionView>
)

//---------------------------- ********* -------------------------------

export const AnswerView = styled.View`
    flex: 1;
    justify-content: space-around;
    align-content: space-around;
    flex-direction: row;
    flex-wrap: wrap;
`;

const TextInput = styled.TextInput`
    width: 98%;
    height: 40;
    border-color: gray;
    font-size: 24;
`;

const Label = styled.Text`
    color: #FFFFFF;
    text-align: left;
    font-size: 28;
    margin-left: 5%;
`;

const InputView = styled.View`
    align-items: flex-start;
    width: 98%;
`;

export const InputElement = ({ maxLength, label, onChangeText, placeholder, value, secureTextEntry, ...rest }) => (
    <InputView {...rest}>
        <Label>{label}</Label>
        <TextInput 
            maxLength={maxLength}
            secureTextEntry={secureTextEntry} 
            placeholder={placeholder} 
            onChangeText={onChangeText} 
            value={value}
        />
    </InputView>
)

//---------------------------- ********* -------------------------------

export const InputWindow = styled.View`
    flex: 1;
    background-color: #7B9B7B;
    align-items: center;
    justify-content: flex-start;
`;

//---------------------------- ********* -------------------------------

const InfoText = styled.Text`
    color: black;
    text-align: center;
`;

const ViewInfoText = styled.View`
    flex: 0.2;
    height: 2%;
    width: 98%;
    background-color: white;
    align-items: center;
    justify-content: flex-start;
`

export const Info = ({text, ...rest}) => (
    <ViewInfoText {...rest}>
        <InfoText>{text}</InfoText>
    </ViewInfoText>
)

//---------------------------- ********* -------------------------------
