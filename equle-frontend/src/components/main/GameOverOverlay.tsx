import React, { useState } from 'react';
import './GameOverOverlay.css';

function GameOverOverlay(props:any) {
    const [isFormHidden, setIsFormHidden] = useState<boolean>(true);

    function handlePlayAgain(){
        props.resetGame()
        setIsFormHidden(true)
    }

    function handleLeaderboardClick(){
        setIsFormHidden(!isFormHidden);
    }

    function handleLeaderboardSubmit(){
        let data = {
            req:"updateLeaderboard", 
            name: (document.getElementById("fname")as HTMLInputElement).value,
            score: props.score
        };

        console.log("String data: " + JSON.stringify(data));

        fetch('https://0cfinbt23e.execute-api.us-east-1.amazonaws.com/default/equleFunction', {
        method: 'POST',
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => console.log(response))
    
        setIsFormHidden(true)
    }

    return (
        <div className="GameOverOverlay" style = {{display:props.isHidden?'none':'flex'}}>
            <text id = "GameOverText">Game Over</text>
            <text id ="ScoreText">Score: {props.score}</text>
            <div className = "btn-div">
                <button className = "GameOverButton" onClick = {handlePlayAgain}>Play Again</button>
                <button className = "GameOverButton" onClick = {handleLeaderboardClick}>Submit to leaderboard</button>
            </div>

            <div className = "LeaderboardForm" hidden = {isFormHidden}>
                <form className = "Form">
                    <label htmlFor="fname">Name:</label><br></br>
                    <input type="text" id="fname"></input><br></br>
                    <input type="button" value = "Submit" onClick={handleLeaderboardSubmit}></input>
                </form>
            </div>
        </div>
    );
}

export default GameOverOverlay;