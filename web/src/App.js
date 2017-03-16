import React, { Component } from 'react';
import './App.css';

import Board from './components/Board';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
        </div>
        <Board />
      </div>
    );
  }
}

export default App;
