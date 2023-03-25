import React, { useEffect, useState } from 'react';
import './LeaderboardOverlay.css';
import Ranking from './Ranking';

function LeaderboardOverlay(props:any) {

    const [leaderboard, setLeaderboard] = useState(new Array(10).fill({"name":"placeholder", "score":0}));
    const [numRankings, setNumRankings] = useState(10);

    useEffect(()=>{
        getLeaderboardFromLambda(); 
    },[props.isHidden]);

    useEffect(()=>{
        console.log(leaderboard); 
    },[leaderboard]);

    function getLeaderboardFromLambda(){
        try{
            let data = {
                req:"getLeaderboard"
            };

            console.log("String data: " + JSON.stringify(data));

            fetch('https://0cfinbt23e.execute-api.us-east-1.amazonaws.com/default/equleFunction', {
            method: 'POST',
            body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(response => setLeaderboard(response))
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div className="LeaderboardOverlay" style = {{display:(props.isHidden?'none':'flex')}}>
            <div className='Exit-Btn-Div'>
                <button className = 'Exit-Btn' onClick = {props.toggleLeaderboard}>X</button>
            </div>
            <text className = "Title">Leaderboard</text>
            <div className = 'Header'>
                <text>Rank</text>
                <text>Name</text>
                <text>Score</text>
            </div>
            <div className='RankingList'>
                {Array(numRankings).fill(true).map((_, i) => <Ranking key = {i} ranking = {i+1} name = {leaderboard[i].Name} score = {leaderboard[i].Score}/>)}
            </div>
        </div>
    );
}

export default LeaderboardOverlay;
