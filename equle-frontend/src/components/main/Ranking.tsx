import React, { useEffect, useState } from 'react';
import './Ranking.css';

function Ranking(props:any) {

    return (
        <div className="Ranking" style = {{gridRowStart:props.ranking, gridRowEnd:props.ranking}}>
            <text id = "Rank">{props.ranking}</text>
            <text id = "Name">{props.name}</text>
            <text id = "Score">{props.score}</text>
        </div>
    );
}

export default Ranking;
