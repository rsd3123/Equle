import React, { useState } from 'react';
import './Game.css';
import GuessedNumbers from './GameBoard/GuessedNumbers';
import GuessRow from './GameBoard/GuessRow';
import ScoreBoard from './GameHeader/ScoreBoard';
import TargetNumber from './GameHeader/TargetNumber';
import Timer from './GameHeader/Timer';

function Game() {
    var numRows = 4
    var guessRows = [];
    for (let i = 0; i < numRows; i++) {
        guessRows.push(<GuessRow/>);
    }

    return (
        <div className="Game">
           <div className = "GameHeader">
                <ScoreBoard score = {0}></ScoreBoard>
                <TargetNumber number = {9999}></TargetNumber>
                <Timer time = "1:00"></Timer>
           </div>
           <div className='GameBoard'>
                {guessRows}
           </div>
           
           <GuessedNumbers></GuessedNumbers>
        </div>
    );
}

export default Game;
