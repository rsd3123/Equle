import React, { useEffect, useState } from 'react';
import './GuessRow.css';

function GuessRow(props:any) { //Pass answer length as prop (props.length)
    const [numBoxes, setNumBoxes] = useState(props.length);
    const [boxValues, setBoxValues] = useState<string[]>(new Array(numBoxes).fill(''))

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
    
    //If all boxes have values
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
        for(var i = 0; i < numBoxes; i++){
            (document.getElementById(iToKey(i).toString())as HTMLInputElement).value = "";
        }

    },[props.isGameOverHidden])
    
    function clearRow(){
        setBoxValues(new Array(numBoxes).fill(''))
        //For each input set input vaue to ''
    }

    function iToKey(i:number){
        return i+10+(10*props.id);
    }
    
    return (
        <div className="GuessRow">
            {Array(numBoxes).fill(true).map((_, i) => <input className = "Box" type='text' maxLength={1} key = {iToKey(i)} id = {iToKey(i).toString()} disabled = {(props.id == props.currentRow?false:true)} onChange = {handleChange} autoComplete="off"/>)}
        </div>
    );
}

export default GuessRow;
