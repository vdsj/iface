import React, { Component } from 'react';
import './card.css';

class Card extends Component{
  render() {
    return(
        <div className='card'>
          <h1>{this.props.children}</h1>
        </div>
    )
  }
}

export default Card;
