import React, { useState } from 'react';
import './ScoreBoard.css';

function ScoreBoard(props: any) {
    
    return (
        <div className="ScoreBoard">
           <text>Score: {props.score}</text>
        </div>
    );
}

export default ScoreBoard;
