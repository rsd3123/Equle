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
        
        <div className = "Sidebar">
            <button className = 'Sidebar-btn' id = 'Sidebar-leaderboard-btn' onClick={props.toggleLeaderboard}></button>
            <button className = 'Sidebar-btn' id = 'Sidebar-overlay-horz-btn' onClick={props.toggleOverlay}></button>
        </div>
        
    );
}

export default Sidebar;
