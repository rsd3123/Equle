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

    async function handleLeaderboardSubmit(){
        var name = (document.getElementById("fname")as HTMLInputElement).value;

        if(name.length > 25){
            alert("Name too long. 24 character limit.");
            (document.getElementById("fname")as HTMLInputElement).value = "";
        }
        else{

            let data = {
                req:"updateLeaderboard", 
                name: (document.getElementById("fname")as HTMLInputElement).value,
                score: props.score
            };

            console.log("String data: " + JSON.stringify(data));
            var fromServer;

            try{
                await fetch('https://0cfinbt23e.execute-api.us-east-1.amazonaws.com/default/equleFunction', {
                method: 'POST',
                body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(response => fromServer = response.affectedRows)

                if(fromServer == 1){
                    changeSubmitButtonSuccess()
                    setTimeout(()=>{
                        changeSubmitButtonDefault()
                        setIsFormHidden(true)
                    },2000);
                }
                else{
                    changeSubmitButtonError()
                    setTimeout(()=>{
                        changeSubmitButtonDefault()
                    },2000);
                } 
            }
            catch(err){
                changeSubmitButtonError()
                setTimeout(()=>{
                    changeSubmitButtonDefault()
                },2000);
            }
        }
    }


    function changeSubmitButtonDefault(){
        (document.getElementById("submit")as HTMLInputElement).style.backgroundColor = "white";
        (document.getElementById("submit")as HTMLInputElement).value = "Submit";
    }

    function changeSubmitButtonSuccess(){
        (document.getElementById("submit")as HTMLInputElement).style.backgroundColor = "green";
        (document.getElementById("submit")as HTMLInputElement).value = "Sent!";
    }

    function changeSubmitButtonError(){
        (document.getElementById("submit")as HTMLInputElement).style.backgroundColor = "Red";
        (document.getElementById("submit")as HTMLInputElement).value = "Error";
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
                    <input type="button" id = "submit" value = "Submit" onClick={handleLeaderboardSubmit}></input>
                </form>
            </div>
        </div>
    );
}

export default GameOverOverlay;