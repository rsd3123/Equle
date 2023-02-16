import React, { useState } from 'react';
import Game from './Game';
import './Main.css';

function Main() {
    
    return (
        <div className="Main">
           <text id = 'Title'><b>Equle</b></text>
           <Game></Game>
        </div>
    );
}

export default Main;
