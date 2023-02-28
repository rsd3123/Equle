import React, { useEffect, useState } from 'react';
import './LeaderboardOverlay.css';

function LeaderboardOverlay(props:any) {
    console.log(props.isHidden);
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
