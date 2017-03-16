import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import './Ticket.css';

import Constants from '../Constants.js';

const ticketSource = {
  beginDrag(props) {
    return {
      text: props.text
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Ticket extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { connectDragSource, isDragging, isPlaceholder } = this.props;
    return connectDragSource(
      <div className="Ticket"
        style={{
          opacity: isDragging || isPlaceholder ? 0.5 : 1
        }}>
      </div>
    );
  }
}

Ticket.defaultProps = {
  isPlaceholder: false
};

export default DragSource(Constants.TYPE_TICKET, ticketSource, collect)(Ticket);
