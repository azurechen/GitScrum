import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import './Ticket.css';

const cardSource = {
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
    const { isDragging, connectDragSource, text } = this.props;
    return connectDragSource(
      <div className="Ticket"
        style={{ opacity: isDragging ? 0.5 : 1 }}>

      </div>
    );
  }
}

export default DragSource("Ticket", cardSource, collect)(Ticket);
