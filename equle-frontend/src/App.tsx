import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main';
import OutsideClickHandler from 'react-outside-click-handler';

function App() {
  
  const [isOverlayHidden, setIsOverlayHidden] = useState(true);

  
 

  return (
    <div className="App">
      <Main></Main>

      <Sidebar isOverlayHidden = {isOverlayHidden} toggleOverlay = {() => {setIsOverlayHidden(!isOverlayHidden)}} setIsOverlayHidden = {setIsOverlayHidden}></Sidebar>
      
    </div>
  );
}

export default App;
