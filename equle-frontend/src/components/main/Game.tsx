import React, { useEffect, useState } from 'react';
import './Game.css';
import GuessedNumbers from './GameBoard/GuessedNumbers';
import GuessRow from './GameBoard/GuessRow';
import ScoreBoard from './GameHeader/ScoreBoard';
import TargetNumber from './GameHeader/TargetNumber';
import Timer from './GameHeader/Timer';
import GameOverOverlay from './GameOverOverlay';

function Game(props:any) {

    const startTime = 120;

    const [currentRow, setCurrentRow] = useState<number>(-1);
    const [currentGuess, setCurrentGuess] = useState<string>('');
    const [currentNumber, setCurrentNumber] = useState<number>();
    const [currentScore, setCurrentScore] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(startTime);
    const [timerOn, setTimerOn] = useState<boolean>(false);

    const [charCorrect, setCharCorrect] = useState<boolean[]>([]);
    const [solution, setSolution] = useState<String>("");

    const [isGameOverHidden, setIsGameOverHidden] = useState<boolean>(true);

    const [numBoxes, setNumBoxes] = useState<number>(0); // get init from server- 3 <= length <= 7
    const [numRows, setNumRows] = useState<number>(6); // get init from server

    //Colors to change boxes
    const yellow = 'yellow';
    const green = 'green';

    //on first load after sessionId is made, get puzzle from server
    useEffect(() => {  
        
        generatePuzzle()
    
    }, []); //Should trigger twice, only triggers once.

    //When the current guess is updated, get check from server, then change color accordingly, and increment current row.
    //Get isMatch from server: returns [] of length numBoxes. each element in [] is either a 0 (wrong), 1, wrong place, or 2 (corrent num and place)
    useEffect(() => {
        if(currentGuess.length != 0){
            console.log(currentGuess);

            //Send current guess to server, check if match. If not match, change colors accordingly or end game & show end screen. If match, score += 1, timer += 60 seconds, reset squares, reset puzzle.
            //sendGuessToLambda(currentGuess)
            checkAnswer();
            
            //If game is lost due to board full
            if(currentRow+1 > numRows){
                setIsGameOverHidden(false);
            }
            else{
                setCurrentRow(currentRow+1);
            }
        }
    }, [currentGuess]);

    useEffect(() => {
        //Change color when charCorrect is changed and not undefined.
        var allCorrect = true;
        if(charCorrect != undefined && charCorrect.length != 0){
            for(var i = 0; i < charCorrect.length; i++){
                if(!charCorrect[i]){
                    allCorrect = false;
                }
            }
            
            //If game is won
            if(allCorrect){
                var temp = currentScore + 1;
                setCurrentScore(temp);
                
                var time = currentTime + startTime;
                setCurrentTime(time);

                generatePuzzle();
            }
        }
    }, [charCorrect]);
    
    function checkAnswer(){
            
        var length = solution.toString().length;
        
        var isCharCorrect = new Array(length).fill(false);
        
        for(var i = 0; i < length; i++){
            if(currentGuess[i] ==  solution.charAt(i)){
                isCharCorrect[i] = true;
            }
        }
    
        setCharCorrect(isCharCorrect);
    }

    function resetPuzzle(){
        //get new puzzle from server, clear current guess rows, current row = 0, change number
        setCurrentRow(-1);
        setCurrentGuess('');
        setCurrentScore(0);
        setCurrentTime(startTime);
        setTimerOn(false);
        
        //getPuzzleFromLambda();
        generatePuzzle();
        setIsGameOverHidden(true);
    }
    
    const signs = ['+','-','*','/'];

    function generatePuzzle(){
        //Generate random number as puzzle hint
        var number = randomIntFromInterval(1,999);
        
        //Generate random number for sign (0-3)
        var sign = signs[randomIntFromInterval(0,signs.length-1)];
        
        //Find two numbers, X and Y, s.t. (x sign y) = number
        var x:number = 1;
        var y:number = 1;
        switch (sign) {
            case '+':
                // Addition
                x = randomIntFromInterval(0,number);
                y = number - x;
                break;
            case '-':
                // Subtraction
                x = randomIntFromInterval(number,999);
                y = number + x;
                break;
            case '*':
                // Multiplication - Make sure whole number
                while(number%x != 0){
                    x = randomIntFromInterval(0,number);
                }
                y = number/x;
                break;
            case '/':
                // Division - Make sure whole 
                while(number%y != 0){
                    y = randomIntFromInterval(0,number);
                }
                x = number*y;
                break;
            default:
                // code
        }
        
        //Create answer string
        var solution = x.toString() + sign + y.toString();
        console.log(solution);
        setSolution(solution);

        var length = solution.toString().length;
        
        //Return the generated number and the length of the answer
        setPuzzle(number,length);
    }
    
    function randomIntFromInterval(min:number, max:number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
    
    function setPuzzle(number:number,length:number){
        setCurrentNumber(number);
        setNumBoxes(length);
        setCurrentRow(0);
        console.log(length)
    }

    /*
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
        console.log("Send Guess");

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
    */
    return (
        <div className="Game">

            <GameOverOverlay isHidden = {isGameOverHidden} score = {currentScore} resetGame = {resetPuzzle}></GameOverOverlay>
           
           <div className = "GameHeader">
                <ScoreBoard score = {currentScore}></ScoreBoard>
                <TargetNumber number = {currentNumber}></TargetNumber>
                {/*Timer doesn't start until first guess*/ }
                <Timer time = {currentTime} setTime = {setCurrentTime} timerOn = {timerOn} setIsGameOverHidden = {setIsGameOverHidden}></Timer>
           </div>
           
           <div className='GameBoard'>
                {Array(numRows).fill(true).map((_, i) => <GuessRow key = {i} id = {i} length = {numBoxes} currentRow = {currentRow} setCurrentGuess = {setCurrentGuess} setTimerOn = {setTimerOn} isGameOverHidden = {isGameOverHidden} charCorrect = {charCorrect} score = {currentScore}/>)}
           </div>
           
           <div className='GuessedNumbersRow'>
                <GuessedNumbers></GuessedNumbers>
           </div>
           
        </div>
    );
}

export default Game;
