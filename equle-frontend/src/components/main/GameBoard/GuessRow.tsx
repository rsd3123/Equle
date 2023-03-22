import React, { useEffect, useState } from 'react';
import './GuessRow.css';
import $ from 'jquery';

function GuessRow(props:any) { //Pass answer length as prop (props.length)
    const [numBoxes, setNumBoxes] = useState(props.length);
    const [boxValues, setBoxValues] = useState<string[]>(new Array(props.length).fill(''))
    
    const [row, setRow] = useState(Array(props.length));

    const disabledColor = "gray";
    const defaultColor = "white";
    const correctColor = "#66FF99";
    const semiCorrectColor = "yellow";
    
    const [color, setColor] = useState<string[]>(new Array(props.length).fill((props.id == 0?defaultColor:disabledColor)));
     
    //On new guess, change color of square
    useEffect(() => {
        if(props.id == props.currentRow){
            var temp = [...color];
            for(var i = 0; i < props.length; i++){
                if(props.charCorrect[i] == 2){ //Correct character in correct place
                    temp[i] = correctColor
                }
                else if(props.charCorrect[i] == 1){ //Correct character, wrong place
                    temp[i] = semiCorrectColor;
                }
            }

            setColor(temp);
        }
    }, [props.charCorrect]);
     
    //Handle user input
    const handleChange = (event:any) =>{
        
        const newValues = boxValues.map((value,i) =>{
            console.log("loop")
            if(iToKey(i) == event.target.id){
                console.log("Found")
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
        var temp = [...color]
        for(var i = 0; i < props.length; i++){
            let key = iToKey(i).toString();
            (document.getElementById(key)as HTMLInputElement).value = "";
            
            //Change color of squares back to original colors.
            if(props.id == 0){
                temp[i] = defaultColor;
            }
            else{
                //(document.getElementById(key)as HTMLInputElement).style.backgroundColor = disabledColor;
                temp[i] = disabledColor;
            }
            
            setColor(temp);
        }

    },[props.isGameOverHidden, props.score])
    
    function clearRow(){
        setBoxValues(new Array(props.length).fill(''))
        //For each input set input vaue to ''
    }

    //After complete guess, change color of next row to white
    useEffect(() => {
        if(props.currentRow == props.id){
            var temp = [...color];
            for(var i = 0; i < props.length; i++){    
                temp[i] = defaultColor; 
            }
            setColor(temp);
        }

    }, [props.currentRow]);

    function iToKey(i:number){
        return i+10+(10*props.id);
    }

    //Auto tab function
    function autoTab(e:any){
        const BACKSPACE_KEY = 8;
        const DELETE_KEY = 46;
        const SHIFT_KEY = 16

        let tabindex = $(e.target).attr("tabindex") || 0;
        tabindex = Number(tabindex);
        if (e.keyCode === BACKSPACE_KEY ) {
          tabindex -= 1;
        } else if (e.keyCode !== DELETE_KEY && e.keyCode !== SHIFT_KEY) {
          tabindex += 1;
        }
        const elem = $("[tabindex=" + tabindex + "]");
        if (elem[0]) {
          elem.focus();
        }
        
      };

    useEffect(() => {
        setBoxValues(new Array(props.length).fill(''));
    }, [props.length]);

    return (
        <div className="GuessRow">
            {Array(props.length).fill(true).map((_, i) => <input className = "Box" type='text' maxLength={1} key = {iToKey(i)} id = {iToKey(i).toString()} disabled = {(props.id == props.currentRow?false:true)} onChange = {handleChange} style = {{backgroundColor:color[i]}} autoComplete="off" onKeyUp={autoTab} tabIndex = {iToKey(i)}/>)}
            {}
        </div>
    );
}

export default GuessRow;
