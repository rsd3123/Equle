import React, { useEffect, useState } from 'react';
import './Timer.css';
import timerPNG from './timer_icon.png';

function Timer(props:any) {
    
    //Timer function- if time > 0, every second decrease time by one with setTime(time-1)
   //Timer
   useEffect(() => {
    const interval = setTimeout(() => {
        if(props.time > 0){
            var tempTime = props.time;
            props.setTime(tempTime-1);
        }
    }, 1000);
    
    
}, [props.time]);

    return (
        <div className="Timer">
           <img id = "Timer-img" src = {timerPNG}></img> 
           <text>{props.time}</text> 
        </div>
    );
}

export default Timer;