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

    if (isDragging) {
      return connectDragSource(
        <div className="Card" style={{ display: "none" }}></div>
      );
    } else if (isPlaceholder) {
      return connectDragSource(
        <div className="Card" style={{ opacity: 0.5 }}></div>
      );
    } else {
      var typeColor;
      switch (this.props.ticket.type) {
        case "story": typeColor = "#3C6"; break;
        case "task": typeColor = "#36E"; break;
        case "bug": typeColor = "#E00"; break;
      }
      var name = this.props.ticket.assignee.toUpperCase();
      var charIndex = 0;
      for (var i = 0; i < this.props.ticket.assignee.length; i++) {
        charIndex += name.charCodeAt(i);
      }
      var assigneeColor = Constants.COLORS[charIndex % Constants.COLORS.length];

      return connectDragSource(
        <div className="Card" style={{ borderLeftColor: typeColor }}>
          <div className="content">
            <div className="number">{Mocks.board.prefix}-{this.props.ticket.id}</div>
            <div className="summary">{this.props.ticket.summary}</div>
          </div>
          <div className="info">
            <div className="assignee">
              <div style={{ backgroundColor: assigneeColor }}>
                {this.props.ticket.assignee.charAt(0).toUpperCase()}
              </div>
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
