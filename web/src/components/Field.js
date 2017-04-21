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
    if (component.state.placeholderIndex != placeholderIndex) {
      component.setState({
        placeholderIndex: placeholderIndex,
      });
    }
  },
  drop(props, monitor, component) {
    // calculate the order
    let tickets = component.getTickets();
    let placeholderIndex = component.state.placeholderIndex;

    var prevCardOrder, nextCardOrder, order;
    if (placeholderIndex > 0) {
        prevCardOrder = tickets[placeholderIndex - 1].order;
    }
    if (placeholderIndex < tickets.length) {
        nextCardOrder = tickets[placeholderIndex].order;
    }
    if (prevCardOrder === undefined && nextCardOrder === undefined) {
        order = 0;
    } else if (prevCardOrder === undefined) {
        order = nextCardOrder - 1;
    } else if (nextCardOrder === undefined) {
        order = prevCardOrder + 1;
    } else {
        order = (prevCardOrder + nextCardOrder) / 2;
    }
    // move card
    let ticket = monitor.getItem().ticket;
    props.moveCard(ticket, component.props.status, order);
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
    this.getTickets = this.getTickets.bind(this);
  }

  getTickets() {
    // find tickets and sort
    var tickets = [];
    for (var i = 0; i < Mocks.tickets.length; i++) {
      let ticket = Mocks.tickets[i];
      if (ticket.status === this.props.status) {
        tickets.push(ticket);
        tickets.sort(function(a, b) { return a.order > b.order; });
      }
    }
    return tickets;
  }

  getCards(isOver) {
    let tickets = this.getTickets();
    // create cards array
    var cards = [];
    for (var i = 0; i < tickets.length; i++) {
        let ticket = tickets[i];
        cards.push(<Card key={ticket.id} ticket={ticket} />);
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
