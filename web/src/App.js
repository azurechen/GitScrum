import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Field from './components/Field';

let BOARD_NAME = "No money to buy JIRA";
let LABELS = ["Todo", "In Progress", "Pull Request", "Done"];

class App extends Component {

  getFields() {
    var fields = [];
    for (var i = 0; i < 4; i++) {
      fields.push(<Field key={i} name={LABELS[i]} />);
    }
    return fields;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
        </div>
        <div className="Board">
          <div className="name">{BOARD_NAME}</div>
          <div className="content">
            {this.getFields()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
