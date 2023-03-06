import React, { useState } from 'react';
import './GameOverOverlay.css';

function GameOverOverlay(props:any) {
    
    return (
        <div className="GameOverOverlay" style = {{display:props.isHidden?'none':'flex'}}>
            <text id = "GameOverText">Game Over</text>
            <text id ="ScoreText">Score: {props.score}</text>
            <button className = "GameOverButton" onClick = {props.resetGame}>Play Again</button>
            <button className = "GameOverButton">Submit to leaderboard</button>
        </div>
    );
}

export default GameOverOverlay;