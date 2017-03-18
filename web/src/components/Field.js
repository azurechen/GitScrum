import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import './Field.css';

import Constants from '../Constants.js';
import Mocks from '../Mocks.js';
import Card from './Card';

const fieldTarget = {
  hover(props, monitor, component) {
    let ref = component.ref;

    // calculate the placeholder index
    let placeholderIndex = 0;
    let dragOffset = monitor.getClientOffset().y - 115 + ref.scrollTop
    let totalOffset = 0;
    for (var i = 0; i < ref.children.length; i++) {
      let height = ref.children[i].offsetHeight;
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
    let ticket = monitor.getItem().ticket;
    props.moveCard(ticket, component.props.status);
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
    for (var i = 0; i < Mocks.tickets.length; i++) {
      let ticket = Mocks.tickets[i];
      if (ticket.status === this.props.status) {
        cards.push(<Card key={ticket.id} ticket={ticket} />);
      }
    }
    // add placeholder
    if (isOver) {
      cards.splice(
        this.state.placeholderIndex, 0,
        <Card key="placeholder" isPlaceholder={true} />);
    }
    return cards;
  }

  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div className="Field"
        ref={(ref) => { this.ref = ref; }}>
        {this.getCards(isOver)}
      </div>
    );
  }
}

export default DropTarget(Constants.TYPE_CARD, fieldTarget, collect)(Field);
