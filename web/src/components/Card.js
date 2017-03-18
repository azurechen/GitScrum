import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import './Card.css';

import Constants from '../Constants.js';
import Mocks from '../Mocks.js';

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

    if (isDragging || isPlaceholder) {
      return connectDragSource(
        <div className="Card" style={{ opacity: 0.5 }}></div>
      );
    } else {
      return connectDragSource(
        <div className="Card">
          <div className="content">
            <div className="number">{Mocks.board.prefix}-{this.props.ticket.id}</div>
            <div className="summary">{this.props.ticket.summary}</div>
          </div>
          <div className="info">
            <div className="image">
              <div>A</div>
              <img />
            </div>
            <div className="estimate">{this.props.ticket.estimate}</div>
          </div>
        </div>
      );
    }
  }
}

Card.defaultProps = {
  isPlaceholder: false
};

export default DragSource(Constants.TYPE_CARD, cardSource, collect)(Card);
