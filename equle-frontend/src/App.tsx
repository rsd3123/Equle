import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main';

function App() {
  return (
    <div className="App">
      <Main></Main>
      <Sidebar></Sidebar>
    </div>
  );
}

export default App;
