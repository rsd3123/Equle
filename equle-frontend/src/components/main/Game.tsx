import React, { useEffect, useState } from 'react';
import { setTimeout } from 'timers/promises';
import './Game.css';
import GuessedNumbers from './GameBoard/GuessedNumbers';
import GuessRow from './GameBoard/GuessRow';
import ScoreBoard from './GameHeader/ScoreBoard';
import TargetNumber from './GameHeader/TargetNumber';
import Timer from './GameHeader/Timer';
import GameOverOverlay from './GameOverOverlay';

/* TO DO:   1: Fix multiplication / subtraction (or get rid of them)
            2: Add yellow squares for semi-correct guess
            3: Make sure Guessed Numbers bar is correct color
            5: Change extended sidebar (rules, author info) to overlay popup like leaderboard
            6: Finish Game Over Leaderboard buttons
            7: Leaderboard -> lambda -> RDS connections
            8: Populating leaderboard
            9: Change icons to white
            10: Host on cloudfront under rudolphdesanti.com domain
            11: General Bug fixes 
*/
function Game(props:any) {

    const startTime = 120;

    const [currentRow, setCurrentRow] = useState<number>(-1);
    const [currentGuess, setCurrentGuess] = useState<string>('');
    const [currentNumber, setCurrentNumber] = useState<number>();
    const [currentScore, setCurrentScore] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(startTime);
    const [timerOn, setTimerOn] = useState<boolean>(false);
    const [solved, setSolved] = useState<boolean>(false);

    const [charCorrect, setCharCorrect] = useState<boolean[]>([]);
    const [solution, setSolution] = useState<String>("");

    const [isGameOverHidden, setIsGameOverHidden] = useState<boolean>(true);

    const [numBoxes, setNumBoxes] = useState<number>(0); // get init from server- 3 <= length <= 7
    const [numRows, setNumRows] = useState<number>(6); // get init from server

    //Colors to change boxes
    const yellow = 'yellow';
    const green = 'green';

    //on first load get puzzle 
    useEffect(() => {  
        setTimerOn(false);
        generatePuzzle()
    
    }, []); 

    useEffect(() => {
        console.log("Current Row: " + currentRow);
    }, [currentRow]);
    //When guess is updated, check guess to answer (calls next uef)
    useEffect(() => {
        if(currentGuess.length != 0){
            console.log(currentGuess);
            checkAnswer();
        }
    }, [currentGuess]);

    //On new guess
    useEffect(() => {
        //Change color when charCorrect is changed and not undefined. Color is changed in GuessRow.tsx
        var allCorrect = true;
        if(charCorrect != undefined && charCorrect.length != 0){
            for(var i = 0; i < charCorrect.length; i++){
                if(!charCorrect[i]){
                    allCorrect = false;
                }
            }
            
            if(allCorrect){ //If guess correct
                var temp = currentScore + 1;
                setCurrentScore(temp);
                
                //setTimerOn(false);
                var time = currentTime + startTime;
                setTimerOn(false);
                setCurrentTime(time);
                //setSolved(true);
                generatePuzzle();
            }
            else{ //If guess not correct
                //If game is lost due to board full
                if(currentRow+1 >= numRows){
                    setIsGameOverHidden(false);
                    
                }
                else{
                    setCurrentRow(currentRow+1);
                }
            }
        }
    }, [charCorrect]);
    
    //Check which parts of the guess matches the answer
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

    //Reset puzzle on start new game only
    function resetPuzzle(){
        //get new puzzle from server, clear current guess rows, current row = 0, change number
        setCurrentRow(-1);
        setCurrentGuess('');
        setCurrentScore(0);
        setCurrentTime(startTime);
        
        
        //getPuzzleFromLambda();
        generatePuzzle();
        setIsGameOverHidden(true);
    }
    
    const signs = ['+','-','*','/'];

    //Generate & set new puzzle. Call setTimerOn false before this
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

        if(length > 7){
            generatePuzzle();
        }
        else{
            //Return the generated number and the length of the answer
            setPuzzle(number,length);
        }
    }
        
    //Set new puzzle. Called from generatePuzzle
    function setPuzzle(number:number,length:number){
       
        
            setCurrentNumber(number);
            setNumBoxes(length);
            setCurrentRow(0);
            setTimerOn(true);
        
        console.log(length)
    }

    //Helper function that generates random intergers in the given range.
    function randomIntFromInterval(min:number, max:number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
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
                <TargetNumber number = {currentNumber}></TargetNumber>
                <ScoreBoard score = {currentScore}></ScoreBoard>
                {/*Include Timer? Doesn't make sense. Timer doesn't start until first guess*/ }
                {/*<Timer time = {currentTime} setTime = {setCurrentTime} timerOn = {timerOn} setIsGameOverHidden = {setIsGameOverHidden} setTimerOn = {setTimerOn}></Timer>*/}
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
