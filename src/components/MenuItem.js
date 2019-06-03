import React, { Component } from 'react';

const graphImg = require('../assets/images/graph.svg')

class Menu extends Component {
  render() {
    return (
      <div className="MenuItem">
        <button className="GraphButton" onClick={()=>this.props.handleOnClick("Graph", "Menu", this.props.index)} disabled={this.props.allowNav}>
          <div className="imgTextPos" ><h3 className="imgText">{this.props.graph.name}</h3></div>
	        <img className="graphImg" alt={this.props.graph.name+" thumbnail"} src={graphImg} height="200rem" width="200rem"/>
        </button>
        <br/>
      </div>
    );
  }
}

export default Menu;
