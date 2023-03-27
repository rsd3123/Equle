import React, { useEffect, useState } from 'react';
import Game from './Game';
import LeaderboardOverlay from './LeaderboardOverlay';
import './Main.css';
import RulesOverlay from './RulesOverlay';

function Main(props:any) {
    useEffect(()=>{
        if(props.isLeaderboardHidden == false){
            props.setIsOverlayHidden(true);
        }
    },[props.isLeaderboardHidden]);

    useEffect(()=>{
        if(props.isOverlayHidden == false){
            props.setIsLeaderboardHidden(true);
        }
    },[props.isOverlayHidden]);
    

    return (
        <div className="Main">
            
            <div className = 'Main-Div'>
                <text id = 'Title'><b>Equle</b></text>
            </div>

            <LeaderboardOverlay isHidden = {props.isLeaderboardHidden} toggleLeaderboard = {props.toggleLeaderboard}></LeaderboardOverlay>

            <RulesOverlay isHidden = {props.isOverlayHidden} toggleOverlay = {props.toggleOverlay}></RulesOverlay>
            
            <div className = 'Main-Div' hidden = {(!props.isLeaderboardHidden || !props.isOverlayHidden)}>
                <Game></Game>
            </div>
            
    
        </div>
    );
}

export default Main;
