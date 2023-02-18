import React, { useEffect, useState } from 'react';
import './Game.css';
import GuessedNumbers from './GameBoard/GuessedNumbers';
import GuessRow from './GameBoard/GuessRow';
import ScoreBoard from './GameHeader/ScoreBoard';
import TargetNumber from './GameHeader/TargetNumber';
import Timer from './GameHeader/Timer';

function Game() {
    const [currentRow, setCurrentRow] = useState<number>(-1);
    const [currentGuess, setCurrentGuess] = useState<string>('');

    const [numBoxes, setNumBoxes] = useState<number>(7); // get init from server- 3 <= length <= 7
    const [numRows, setNumRows] = useState<number>(5); // get init from server

    //When the current guess is updated, get check from server, then change color accordingly, and increment current row.
    //Get isMatch from server: returns [] of length numBoxes. each element in [] is either a 0 (wrong), 1, wrong place, or 2 (corrent num and place)
    useEffect(() => {
        console.log(currentGuess);
        if(currentRow+1<=numRows){
            setCurrentRow(currentRow+1);
        }
    }, [currentGuess]);
    
    return (
        <div className="Game">
           <div className = "GameHeader">
                <ScoreBoard score = {0}></ScoreBoard>
                <TargetNumber number = {9999}></TargetNumber>
                <Timer time = "1:00"></Timer>
           </div>
           <div className='GameBoard'>
                {Array(numRows).fill(true).map((_, i) => <GuessRow key = {i} id = {i} length = {numBoxes} currentRow = {currentRow} setCurrentGuess = {setCurrentGuess}/>)}
           </div>
           <div className='GuessedNumbersRow'>
                <GuessedNumbers></GuessedNumbers>
           </div>
        </div>
    );
}

export default Game;
