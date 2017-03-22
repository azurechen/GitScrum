import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './Board.css';

import Field from './Field';

const BOARD_NAME = "2017/03/13~2017/03/19";
const BOARD_PERIOD = "13/Mar/17 ~ 19/Mar/17";

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.moveCard = this.moveCard.bind(this);
    this.fieldRefs = [];
  }

  moveCard(ticket, to, order) {
    let from = ticket.status;
    ticket.status = to;
    ticket.order = order;
    this.fieldRefs[from].forceUpdate();
    this.fieldRefs[to].forceUpdate();
  }

  render() {
    return (
      <div className="Board">
        <div>
          <div className="name">{BOARD_NAME}</div>
          <div className="period">{BOARD_PERIOD}</div>
        </div>
        <div className="header">
          <div>
            <div>Todo</div>
            <div>In Progress</div>
            <div>Pull Request</div>
            <div>Done</div>
          </div>
        </div>
        <div className="content">
          <div>
            <Field key={1} status={1} moveCard={this.moveCard} ref={(ref) => this.fieldRefs[1] = ref} />
            <Field key={2} status={2} moveCard={this.moveCard} ref={(ref) => this.fieldRefs[2] = ref} />
            <Field key={3} status={3} moveCard={this.moveCard} ref={(ref) => this.fieldRefs[3] = ref} />
            <Field key={4} status={4} moveCard={this.moveCard} ref={(ref) => this.fieldRefs[4] = ref} />
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Board);
