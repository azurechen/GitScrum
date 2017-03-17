import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import './Field.css';

import Constants from '../Constants.js';
import Card from './Card';

const fieldTarget = {
  hover(props, monitor, component) {
    let ref = component.contentRef;

    // calculate the placeholder index
    let placeholderIndex = 0;
    let dragOffset = monitor.getClientOffset().y - 96 + ref.scrollTop
    let totalOffset = 0;
    for (var i = 0; i < ref.children.length; i++) {
      let height = ref.children[i].offsetHeight + 6;
      totalOffset += height;

      if (dragOffset < totalOffset) {
        break;
      }
      placeholderIndex = i + 1;
    }
    // update state
    component.setState({
      placeholderIndex: placeholderIndex,
    });
  },
  drop(props, monitor, component) {
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
    this.state = {
      placeholderIndex: 0,
    }
  }

  getCards(isOver) {
    var cards = [];
    for (var i = 0; i < 4; i++) {
      cards.push(<Card key={i} text="{ticket.summary}" />);
    }
    if (isOver) {
      // add placeholder
      cards.splice(
        this.state.placeholderIndex, 0,
        <Card key="placeholder" isPlaceholder={true} />);
    }
    return cards;
  }

  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div className="Field">
        <div>
          <div className="name">{this.props.name}</div>
          <div className="content"
            ref={(element) => { this.contentRef = element; }}>
            {this.getCards(isOver)}
          </div>
        </div>
      </div>
    );
  }
}

export default DropTarget(Constants.TYPE_CARD, fieldTarget, collect)(Field);
