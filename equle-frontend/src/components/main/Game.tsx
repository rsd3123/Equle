import React, { useEffect, useState } from 'react';
import './Game.css';
import GuessedNumbers from './GameBoard/GuessedNumbers';
import GuessRow from './GameBoard/GuessRow';
import ScoreBoard from './GameHeader/ScoreBoard';
import TargetNumber from './GameHeader/TargetNumber';
import Timer from './GameHeader/Timer';
import GameOverOverlay from './GameOverOverlay';

function Game() {
    const [currentRow, setCurrentRow] = useState<number>(-1);
    const [currentGuess, setCurrentGuess] = useState<string>('');
    const [currentNumber, setCurrentNumber] = useState<number>();
    const [currentScore, setCurrentScore] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(60);
    const [timerOn, setTimerOn] = useState<boolean>(false);

    const [currentSelectedBox, setCurrentSelectedBox] = useState();

    const [isGameOverHidden, setIsGameOverHidden] = useState<boolean>(true);

    const [numBoxes, setNumBoxes] = useState<number>(7); // get init from server- 3 <= length <= 7
    const [numRows, setNumRows] = useState<number>(5); // get init from server

    //Colors to change boxes
    const yellow = 'yellow';
    const green = 'green';

    //on first load, get puzzle from server
    useEffect(() => {
        setCurrentNumber(999);
    }, []);

    //When the current guess is updated, get check from server, then change color accordingly, and increment current row.
    //Get isMatch from server: returns [] of length numBoxes. each element in [] is either a 0 (wrong), 1, wrong place, or 2 (corrent num and place)
    useEffect(() => {
        console.log(currentGuess);

        //Send current guess to server, check if match. If not match, change colors accordingly or end game & show end screen. If match, score += 1, timer += 60 seconds, reset squares, reset puzzle.

        if(currentRow+1<=numRows){
            setCurrentRow(currentRow+1);
        }
    }, [currentGuess]);
    
    function resetPuzzle(){
        //get new puzzle from server, clear current guess rows, current row = 0, change number
    }
    

    return (
        <div className="Game">

            <GameOverOverlay isHidden = {isGameOverHidden} score = {currentScore}></GameOverOverlay>
           
           <div className = "GameHeader">
                <ScoreBoard score = {0}></ScoreBoard>
                <TargetNumber number = {currentNumber}></TargetNumber>
                {/*Timer doesn't start until first guess*/ }
                <Timer time = {currentTime} setTime = {setCurrentTime} timerOn = {timerOn}></Timer>
           </div>
           
           <div className='GameBoard'>
                {Array(numRows).fill(true).map((_, i) => <GuessRow key = {i} id = {i} length = {numBoxes} currentRow = {currentRow} setCurrentGuess = {setCurrentGuess} setTimerOn = {setTimerOn}/>)}
           </div>
           
           <div className='GuessedNumbersRow'>
                <GuessedNumbers></GuessedNumbers>
           </div>
           
        </div>
    );
}

export default Game;
