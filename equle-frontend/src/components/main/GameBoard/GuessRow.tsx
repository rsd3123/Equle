import React, { useState } from 'react';
import './GuessRow.css';

function GuessRow(props:any) { //Pass answer length as prop (props.length)
    var numBoxes = 4 //props.length
    var boxes = [];
    for (let i = 0; i < numBoxes; i++){
        boxes.push(<input className = "Box" type='number' value={1}/>);
    }
    return (
        <div className="GuessRow">
            {boxes}
        </div>
    );
}

export default GuessRow;
