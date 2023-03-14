import React, { useEffect, useState } from 'react';
import Game from './Game';
import LeaderboardOverlay from './LeaderboardOverlay';
import './Main.css';

function Main(props:any) {
    
    

    return (
        <div className="Main">
            
            <div className = 'Main-Div'>
                <text id = 'Title'><b>Equle</b></text>
            </div>

            <LeaderboardOverlay isHidden = {props.isLeaderboardHidden} toggleLeaderboard = {props.toggleLeaderboard}></LeaderboardOverlay>
            
            <div className = 'Main-Div' hidden = {!props.isLeaderboardHidden}>
                <Game></Game>
            </div>
            
    
        </div>
    );
}

export default Main;
