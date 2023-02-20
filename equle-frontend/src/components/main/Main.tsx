import React, { useEffect, useState } from 'react';
import Game from './Game';
import LeaderboardOverlay from './LeaderboardOverlay';
import './Main.css';

function Main(props:any) {
    
    useEffect(() => {
        //get session id from server
    }, []);

    return (
        <div className="Main">
            <LeaderboardOverlay isHidden = {props.isLeaderboardHidden}></LeaderboardOverlay>
           <text id = 'Title'><b>Equle</b></text>
           <Game></Game>
        </div>
    );
}

export default Main;
