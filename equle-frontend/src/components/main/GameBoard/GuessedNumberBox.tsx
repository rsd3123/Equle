import React, { useState } from 'react';
import './GuessedNumberBox.css';

function GuessedNumberBox(props:any) {
    //pass isCharUsed as prop (derive color, isDisabled from this)
    return (
        <div className="GuessedNumberBox">
            <button className='BoxButton'>
                <text>{props.value}</text>
           </button>
        </div>
    );
}

export default GuessedNumberBox;