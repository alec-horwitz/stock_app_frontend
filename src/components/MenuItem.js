import React, { Component } from 'react';

const graphImg = require('../assets/images/graph.svg')

class Menu extends Component {
  render() {
    return (
      <div className="MenuItem">
        <p>{this.props.graph.name}</p>
        <button className="GraphButton" onClick={()=>this.props.handleOnClick("Graph", "Menu", this.props.index)} >
	        <img alt={this.props.graph.name+" thumbnail"} src={graphImg} height="200rem" width="200rem"/>
        </button>
        <br/>
      </div>
    );
  }
}

export default Menu;
