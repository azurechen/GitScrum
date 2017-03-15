import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Field from './components/Field';

class App extends Component {

  getFields() {
    var fields = [];
    for (var i = 0; i < 4; i++) {
      fields.push(<Field key={i} />);
    }
    return fields;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
        </div>
        <div className="Board">
          {this.getFields()}
        </div>
      </div>
    );
  }
}

export default App;
