import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './Board.css';

import Field from './Field';

const BOARD_NAME = "No money to buy JIRA";
const LABELS = ["Todo", "In Progress", "Pull Request", "Done"];

class Board extends Component {

  getFields() {
    var fields = [];
    for (var i = 0; i < 4; i++) {
      fields.push(<Field key={i} name={LABELS[i]} />);
    }
    return fields;
  }

  render() {
    return (
      <div className="Board">
        <div className="name">{BOARD_NAME}</div>
        <div className="content">
          {this.getFields()}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Board);
