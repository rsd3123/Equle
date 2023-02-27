import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main';
import OutsideClickHandler from 'react-outside-click-handler';

function App() {
  
  const [isOverlayHidden, setIsOverlayHidden] = useState(true);
  const [isLeaderboardHidden, setIsLeaderboardHidden] = useState(true);

  return (
    <div className="App">
      

      <Sidebar isOverlayHidden = {isOverlayHidden} toggleOverlay = {() => {setIsOverlayHidden(!isOverlayHidden)}} setIsOverlayHidden = {setIsOverlayHidden} isLeaderboardHidden = {isLeaderboardHidden} toggleLeaderboard = {() => setIsLeaderboardHidden(!isLeaderboardHidden)}></Sidebar>
      <div className = "Spacer"></div>
      <Main isLeaderboardHidden = {isLeaderboardHidden} toggleLeaderboard = {() => setIsLeaderboardHidden(!isLeaderboardHidden)}></Main>
      
    </div>
  );
}

export default App;
