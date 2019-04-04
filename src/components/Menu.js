import React, { Component } from 'react';

const plus = require('../assets/images/plus.png')
const graph = require('../assets/images/graph.svg')

class Menu extends Component {
  render() {
    return (
      <div className="Menu">
        <h1>Main Menu</h1>
        <br/>
        <p>Graph Name</p>
        <button className="GraphButton" onClick={()=>this.props.handleOnClick("Graph", "Menu")} ><img src={graph} height="200rem" width="200rem"/></button>
        <br/>
        <br/>
        <p>New Graph</p>
        <button className="GraphButton" onClick={()=>this.props.handleOnClick("Settings", "Menu")} ><img src={plus} height="100rem" width="100rem"/></button>
      </div>
    );
  }
}

export default Menu;
