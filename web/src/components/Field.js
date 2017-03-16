import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import './Field.css';

import Constants from '../Constants.js';
import Ticket from './Ticket';

const fieldTarget = {
  drop(props) {
    moveTicket();
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class Field extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  getTickets() {
    var tickets = [];
    for (var i = 0; i < 4; i++) {
      tickets.push(<Ticket key={i} text="test" />);
    }
    return tickets;
  }

  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div className="Field">
        <div>
          <div className="name">{this.props.name}</div>
          <div className="content">
            {this.getTickets()}
          </div>
        </div>
      </div>
    );
  }
}

export default DropTarget(Constants.TYPE_TICKET, fieldTarget, collect)(Field);
