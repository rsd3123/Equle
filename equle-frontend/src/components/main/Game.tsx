import React, { useState } from 'react';
import './Game.css';
import ScoreBoard from './GameHeader/ScoreBoard';
import TargetNumber from './GameHeader/TargetNumber';
import Timer from './GameHeader/Timer';

function Game() {
    
    return (
        <div className="Game">
           <div className = "GameHeader">
                <ScoreBoard score = {0}></ScoreBoard>
                <TargetNumber number = {9999}></TargetNumber>
                <Timer></Timer>
           </div>
           
        </div>
    );
}

export default Game;
