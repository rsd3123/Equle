import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main';
import OutsideClickHandler from 'react-outside-click-handler';

function App() {
  
  const [isOverlayHidden, setIsOverlayHidden] = useState(true);
  const [isLeaderboardHidden, setIsLeaderboardHidden] = useState(true);

  useEffect(() => {
    //get session id from server
    fetch('https://0cfinbt23e.execute-api.us-east-1.amazonaws.com/default/equleFunction')
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
  }, []);

  return (
    <div className="App">
      

      <Sidebar isOverlayHidden = {isOverlayHidden} toggleOverlay = {() => {setIsOverlayHidden(!isOverlayHidden)}} setIsOverlayHidden = {setIsOverlayHidden} isLeaderboardHidden = {isLeaderboardHidden} toggleLeaderboard = {() => setIsLeaderboardHidden(!isLeaderboardHidden)}></Sidebar>
      <div className = "Spacer"></div>
      <Main isLeaderboardHidden = {isLeaderboardHidden} toggleLeaderboard = {() => setIsLeaderboardHidden(!isLeaderboardHidden)}></Main>
      
    </div>
  );
}

export default App;
