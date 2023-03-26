import React, { useState, useRef, useEffect } from 'react';
import './Sidebar.css';

function Sidebar(props:any){
    const ref = useRef<any>();

    useEffect(() => {
      
        const checkIfClickedOutside = (e:any) => {
        //If overlay is open and clicked target is not part of Sidebar then close overlay
          if (!props.isOverlayHidden && ref.current && !ref.current.contains(e.target)) {
            props.setIsOverlayHidden(true)
          }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [props.isOverlayHidden])

    return (
        <div className="Sidebar-full" ref={ref} style = {{minWidth: (props.isOverlayHidden?'10vh':'40vh')}}>
            <div className = "Sidebar">
                <button className = 'Sidebar-btn' id = 'Sidebar-leaderboard-btn' onClick={props.toggleLeaderboard}></button>
                <button className = 'Sidebar-btn' id = 'Sidebar-overlay-horz-btn' onClick={props.toggleOverlay}></button>
            </div>
            <div className = "Extended" style = {{display: (props.isOverlayHidden?'none':'flex')}}>
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
        </div>
    );
}

export default Sidebar;
