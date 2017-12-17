import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import PersonalBoards from './components/PersonalBoards';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <PersonalBoards />
      </div>
    );
  }
}

export default App;
