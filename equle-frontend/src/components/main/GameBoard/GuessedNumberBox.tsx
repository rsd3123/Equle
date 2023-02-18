import React, { useState } from 'react';
import './GuessedNumberBox.css';

function GuessedNumberBox(props:any) {
    return (
        <div className="GuessedNumberBox">
           <text>{props.value}</text>
        </div>
    );
}

export default GuessedNumberBox;