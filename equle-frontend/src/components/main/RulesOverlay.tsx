import React, { useEffect, useState } from 'react';
import './RulesOverlay.css';

function RulesOverlay(props:any) {

    return (
        <div className="RulesOverlay" style = {{display:props.isHidden?'none':'flex'}}>
            <div className='Exit-Btn-Div'>
                <button className = 'Exit-Btn' onClick = {props.toggleLeaderboard}>X</button>
            </div>
            <div className = "Textbox">
                <div className = "Rules">
                    <text className = "Heading"><b>Rules: </b></text>
                    <text>Each game you play you are given a target number between 0-999. Your goal is to guess the formula for that number. Answers include addition subraction, multiplication, and division signs. An example answer is 5+3.<br></br> The games plays like Worlde, where a correct guess in the correct spot turns the square green, and a guess with an number in the wrong spot results in a yellow square.<br></br>  A correct answer gives +1 to your score. You lose if you fail to guess the answer in 6 guesses.</text>
                </div>

                <div className = "Author-section">
                    <text className = "Heading"><b>Author: </b></text><text>Rudy DeSanti</text> 
                    <br></br>
                    <text className = "Heading"><b>Contact Me: </b></text><text>rudolphdesanti@gmail.com</text>
                </div>
            </div>            
        </div>
    );
}

export default RulesOverlay;
