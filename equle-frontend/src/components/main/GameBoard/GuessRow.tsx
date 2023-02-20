import React, { useEffect, useState } from 'react';
import './GuessRow.css';

function GuessRow(props:any) { //Pass answer length as prop (props.length)
    const [numBoxes, setNumBoxes] = useState(props.length);
    const [boxValues, setBoxValues] = useState<string[]>(new Array(numBoxes).fill(''))

    const handleChange = (event:any) =>{
        const newValues = boxValues.map((value,i) =>{
            if(i == event.target.id){
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
    
    
    return (
        <div className="GuessRow">
            {Array(numBoxes).fill(true).map((_, i) => <input className = "Box" type='text' maxLength={1} key = {i+10+(10*props.id)} id = {i.toString()} disabled = {(props.id == props.currentRow?false:true)} onChange = {handleChange}/>)}
        </div>
    );
}

export default GuessRow;
