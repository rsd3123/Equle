import React, { useState } from 'react';
import './Timer.css';
import timerPNG from './timer_icon.png';

function Timer(props:any) {
    
    return (
        <div className="Timer">
           <img id = "Timer-img" src = {timerPNG}></img> 
           <text>{props.time}</text> 
        </div>
    );
}

export default Timer;