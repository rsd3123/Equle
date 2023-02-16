import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar() {
    const [isOverlayHidden, setIsOverlayHidden] = useState(true);

    //Toggle extended menu
    const toggleOverlay = () => {
        setIsOverlayHidden(!isOverlayHidden);
    }

    return (
        <div className="Sidebar-full">
            <div className = "Sidebar">
                <button className = 'Sidebar-btn' id = 'Sidebar-overlay-horz-btn' onClick={toggleOverlay}></button>
                <button className = 'Sidebar-btn' id = 'Sidebar-leaderboard-btn'></button>
            </div>
            <div className = "Extended" hidden = {isOverlayHidden}>
                <div className = "Textbox">
                    <div className = "Rules">
                        <text className = "Heading"><b>Rules: </b></text>
                        <text>Each game you play you are given a target number between 0-9999. Your goal is to guess the formula for that number. Answers include addition subraction, multiplication, and division signs. An example answer is 5+3.<br></br> You are given 5 guesses. The games plays like Worlde, where a correct guess in the correct spot turns the square green, and a guess with an number in the wrong spot results in a yellow square.<br></br> You have 60 seconds to complete each puzzle, and you gain 1 score and 60 more seconds of time for each solved. You lose if you fail to guess the answer in 5 guesses or time runs out.<br></br>Have fun!</text>
                    </div>

                    <div className = "Author-section">
                        <text className = "Heading"><b>Author: </b></text><text>Rudy DeSanti</text> 
                        <br></br>
                        <text className = "Heading"><b>Contact Me: </b></text><text>rudolphdesanti@gmail.com</text>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
