import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import './Card.css';

import Constants from '../Constants.js';

const cardSource = {
  beginDrag(props) {
    return {
      ticket: props.ticket
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { connectDragSource, isDragging, isPlaceholder } = this.props;
    return connectDragSource(
      <div className="Card"
        style={{
          opacity: isDragging || isPlaceholder ? 0.5 : 1
        }}>
      </div>
    );
  }
}

Card.defaultProps = {
  isPlaceholder: false
};

export default DragSource(Constants.TYPE_CARD, cardSource, collect)(Card);
