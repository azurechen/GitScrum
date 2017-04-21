import React, { Component } from 'react';
import './App.css';

import Board from './components/Board';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="nav">
          <h2>GitScrum</h2>
          <a className="selected"># Backlog</a>
          <a># Sprint</a>
          <a># Chart</a>
        </div>
        <Board />
      </div>
    );
  }
}

export default App;
