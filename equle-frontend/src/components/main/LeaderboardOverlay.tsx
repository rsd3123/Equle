import React, { useEffect, useState } from 'react';
import './LeaderboardOverlay.css';

function LeaderboardOverlay(props:any) {

    function getLeaderboardFromLambda(){
        let data = {
            req:"getLeaderboard"
        };

        console.log("String data: " + JSON.stringify(data));

        fetch('https://0cfinbt23e.execute-api.us-east-1.amazonaws.com/default/equleFunction', {
        method: 'POST',
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => console.log(response))
    }

    return (
        <div className="LeaderboardOverlay" style = {{display:(props.isHidden?'none':'flex')}}>
            <div className='Exit-Btn-Div'>
                <button className = 'Exit-Btn' onClick = {props.toggleLeaderboard}>X</button>
            </div>
            <text id = "Title">Leaderboard</text>
            <div className = 'Header'>
                <text>Rank</text>
                <text>Name</text>
                <text>Score</text>
            </div>
            <div className='Rankings'>
                
            </div>
        </div>
    );
}

export default LeaderboardOverlay;
