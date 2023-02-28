import React, { useState } from 'react';
import './GuessedNumberBox.css';

function GuessedNumberBox(props:any) {
    //pass isCharUsed as prop (derive color, isDisabled from this)
    const handlePress = () =>{
        //currently selected input.value = props.text
        
    }

    return (
        <div className="GuessedNumberBox">
            <button className='BoxButton' onClick={handlePress}>
                <text>{props.value}</text>
           </button>
        </div>
    );
}

export default GuessedNumberBox;