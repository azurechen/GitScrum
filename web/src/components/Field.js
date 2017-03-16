import React, { Component } from 'react';
import './Field.css';

import Ticket from './Ticket';

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
    return (
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

export default Field;
