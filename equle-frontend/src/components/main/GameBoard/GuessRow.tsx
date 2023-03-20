import React, { useEffect, useState } from 'react';
import './GuessRow.css';

function GuessRow(props:any) { //Pass answer length as prop (props.length)
    const [numBoxes, setNumBoxes] = useState(props.length);
    const [boxValues, setBoxValues] = useState<string[]>(new Array(props.length).fill(''))

    const disabledColor = "gray";
    const defaultColor = "white";
    const correctColor = "green";
     
    //On new guess, change color of square
    useEffect(() => {
        if(props.id == props.currentRow){
            for(var i = 0; i < props.length; i++){
                if(props.charCorrect[i]){
                    (document.getElementById((iToKey(i)-10).toString())as HTMLInputElement).style.backgroundColor = correctColor;
                }
            }
        }
    }, [props.charCorrect]);
    
    //Reset boxValues size on props.length change
    useEffect(() => {
        setBoxValues(new Array(props.length).fill(''));
    }, [props.length]);

    //Handle user input
    const handleChange = (event:any) =>{

        props.setTimerOn(true);
        
        const newValues = boxValues.map((value,i) =>{
            if(iToKey(i) == event.target.id){
                return event.target.value;
            }
            else{
                return value;
            }
        });

        setBoxValues(newValues);
    }
    
    //If all boxes have values, update the current guess
    useEffect(() => {
        var filled = true;
        for(let i = 0; i < boxValues.length; i++){
            if(boxValues[i] == ''){
                filled=false;
                break;
            }
        }
        
        if(filled){
            props.setCurrentGuess([...boxValues]);
        }

    }, [boxValues]);

    //Clear row on end game
    useEffect(()=>{

        clearRow();

        //Clear Game Board
        for(var i = 0; i < props.length; i++){
            let key = iToKey(i).toString();
            (document.getElementById(key)as HTMLInputElement).value = "";
            
            //Change color of squares back to original colors.
            if(props.id == 0){
                (document.getElementById(key)as HTMLInputElement).style.backgroundColor = defaultColor;
            }
            else{
                (document.getElementById(key)as HTMLInputElement).style.backgroundColor = disabledColor;
            }
            
        }

    },[props.isGameOverHidden, props.score])
    
    function clearRow(){
        setBoxValues(new Array(props.length).fill(''))
        //For each input set input vaue to ''
    }

    function iToKey(i:number){
        return i+10+(10*props.id);
    }
    
    return (
        <div className="GuessRow">
            {Array(props.length).fill(true).map((_, i) => <input className = "Box" type='text' maxLength={1} key = {iToKey(i)} id = {iToKey(i).toString()} disabled = {(props.id == props.currentRow?false:true)} onChange = {handleChange} style = {{backgroundColor:(props.id == props.currentRow?"white":"gray")}} autoComplete="off"/>)}
        </div>
    );
}

export default GuessRow;
