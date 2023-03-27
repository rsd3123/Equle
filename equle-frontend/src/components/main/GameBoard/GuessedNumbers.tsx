import React, { useDebugValue, useEffect, useState } from 'react';
import GuessedNumberBox from './GuessedNumberBox';
import './GuessedNumbers.css';

function GuessedNumbers(props:any) {
    const [colors, setColors] = useState(new Array(14).fill("white"));

    const correctColor = "#66FF99";
    const defaultColor = "white";
    const semiCorrectColor = "yellow";
    const wrongColor = "gray";

    useEffect(() => {
        var temp = [...colors]
        for(let i = 0; i < props.currentGuess.length; i++){
            var j = getKey(props.currentGuess[i]);
            if(props.charCorrect[i] == 2){
                temp[j] = correctColor;
            }
            else if(props.charCorrect[i] == 1 && temp[j] != correctColor){
                temp[j] = semiCorrectColor;
            }
            else if(temp[j] != correctColor && temp[j] != semiCorrectColor){
                temp[j] = wrongColor;
            }
        }
        setColors(temp);

    }, [props.charCorrect]);

    useEffect(() => {
        setColors(new Array(14).fill("white"))
    }, [props.isGameOverHidden, props.score]);

    function getKey(i:any){
        var key = 0;
        switch(i){
            case '0':
                key = 0;
                break;
            case '1':
                key = 1;
                break;
            case '2':
                key = 2;
                break;
            case '3':
                key = 3;
                break;
            case '4':
                key = 4;
                break;
            case '5':
                key = 5;
                break;
            case '6':
                key = 6;
                break;
            case '7':
                key = 7;
                break;
            case '8':
                key = 8;
                break;
            case '9':
                key = 9;
                break;
            case '+':
                key = 10;
                break;
            case '-':
                key = 11;
                break;
            case '*':
                key = 12;
                break;
            case '/':
                key = 13;
                break;
        }

        return key;
    }

    return (
        <div className="GuessedNumbers">
           <GuessedNumberBox value = '0' color = {colors[0]}></GuessedNumberBox>
           <GuessedNumberBox value = '1' color = {colors[1]}></GuessedNumberBox>
           <GuessedNumberBox value = '2' color = {colors[2]}></GuessedNumberBox>
           <GuessedNumberBox value = '3' color = {colors[3]}></GuessedNumberBox>
           <GuessedNumberBox value = '4' color = {colors[4]}></GuessedNumberBox>
           <GuessedNumberBox value = '5' color = {colors[5]}></GuessedNumberBox>
           <GuessedNumberBox value = '6' color = {colors[6]}></GuessedNumberBox>
           <GuessedNumberBox value = '7' color = {colors[7]}></GuessedNumberBox>
           <GuessedNumberBox value = '8' color = {colors[8]}></GuessedNumberBox>
           <GuessedNumberBox value = '9' color = {colors[9]}></GuessedNumberBox>
           <GuessedNumberBox value = '+' color = {colors[10]}></GuessedNumberBox>
           <GuessedNumberBox value = '-' color = {colors[11]}></GuessedNumberBox>
           <GuessedNumberBox value = '*' color = {colors[12]}></GuessedNumberBox>
           <GuessedNumberBox value = '/' color = {colors[13]}></GuessedNumberBox>
        </div>
    );
}

export default GuessedNumbers;