import React, { useEffect, useState } from 'react';
import './Game.css';
import GuessedNumbers from './GameBoard/GuessedNumbers';
import GuessRow from './GameBoard/GuessRow';
import ScoreBoard from './GameHeader/ScoreBoard';
import TargetNumber from './GameHeader/TargetNumber';
import Timer from './GameHeader/Timer';
import GameOverOverlay from './GameOverOverlay';

function Game(props:any) {

    const startTime = 30;

    const [currentRow, setCurrentRow] = useState<number>(-1);
    const [currentGuess, setCurrentGuess] = useState<string>('');
    const [currentNumber, setCurrentNumber] = useState<number>();
    const [currentScore, setCurrentScore] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(startTime);
    const [timerOn, setTimerOn] = useState<boolean>(false);

    const [charCorrect, setCharCorrect] = useState<boolean[]>([]);

    const [isGameOverHidden, setIsGameOverHidden] = useState<boolean>(true);

    const [numBoxes, setNumBoxes] = useState<number>(0); // get init from server- 3 <= length <= 7
    const [numRows, setNumRows] = useState<number>(5); // get init from server

    //Colors to change boxes
    const yellow = 'yellow';
    const green = 'green';

    //on first load after sessionId is made, get puzzle from server
    useEffect(() => {
        
        if(props.sessionID != undefined){
            getPuzzleFromLambda();
        }
    }, [props.sessionID]); //Should trigger twice, only triggers once.

    //When the current guess is updated, get check from server, then change color accordingly, and increment current row.
    //Get isMatch from server: returns [] of length numBoxes. each element in [] is either a 0 (wrong), 1, wrong place, or 2 (corrent num and place)
    useEffect(() => {
        if(currentGuess.length != 0){
            console.log(currentGuess);

            //Send current guess to server, check if match. If not match, change colors accordingly or end game & show end screen. If match, score += 1, timer += 60 seconds, reset squares, reset puzzle.
            sendGuessToLambda(currentGuess)

            
            if(currentRow+1<=numRows){
                setCurrentRow(currentRow+1);
            }
        }
    }, [currentGuess]);

    useEffect(() => {
        //Change color when charCorrect is changed and not undefined.
        if(charCorrect.length != 0){
            for(var i = 0; i < charCorrect.length; i++){

            }
        }
    }, [charCorrect]);
    
    function resetPuzzle(){
        //get new puzzle from server, clear current guess rows, current row = 0, change number
        setCurrentRow(-1);
        setCurrentGuess('');
        setCurrentScore(0);
        setCurrentTime(startTime);
        setTimerOn(false);
        
        getPuzzleFromLambda();
        setIsGameOverHidden(true);
    }
    
    function setPuzzle(number:number,length:number){
        setCurrentNumber(number);
        setNumBoxes(length);
        setCurrentRow(0);
        console.log(length)
    }

    function getPuzzleFromLambda(){
        console.log("Get Puzzle");

        let puzzleData = {
            req:"generatePuzzle", 
            sessionID: props.sessionID
        };

        console.log("String data: " + JSON.stringify(puzzleData));

        fetch('https://0cfinbt23e.execute-api.us-east-1.amazonaws.com/default/equleFunction', {
        method: 'POST',
        body: JSON.stringify(puzzleData)
        })
        .then(response => response.json())
        .then(response => setPuzzle(response.number,response.solutionLength))
    }

    function sendGuessToLambda(guess:any){
        console.log("Get Puzzle");

        let puzzleData = {
            req:"checkAnswer", 
            sessionID: props.sessionID,
            guess:guess
        };

        fetch('https://0cfinbt23e.execute-api.us-east-1.amazonaws.com/default/equleFunction', {
        method: 'POST',
        body: JSON.stringify(puzzleData)
        })
        .then(response => response.json())
        .then(response => setCharCorrect(response.isCharCorrect))
    }

    return (
        <div className="Game">

            <GameOverOverlay isHidden = {isGameOverHidden} score = {currentScore} resetGame = {resetPuzzle}></GameOverOverlay>
           
           <div className = "GameHeader">
                <ScoreBoard score = {0}></ScoreBoard>
                <TargetNumber number = {currentNumber}></TargetNumber>
                {/*Timer doesn't start until first guess*/ }
                <Timer time = {currentTime} setTime = {setCurrentTime} timerOn = {timerOn} setIsGameOverHidden = {setIsGameOverHidden}></Timer>
           </div>
           
           <div className='GameBoard'>
                {Array(numRows).fill(true).map((_, i) => <GuessRow key = {i} id = {i} length = {numBoxes} currentRow = {currentRow} setCurrentGuess = {setCurrentGuess} setTimerOn = {setTimerOn} isGameOverHidden = {isGameOverHidden}/>)}
           </div>
           
           <div className='GuessedNumbersRow'>
                <GuessedNumbers></GuessedNumbers>
           </div>
           
        </div>
    );
}

export default Game;
