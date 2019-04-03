import React, { Component } from 'react';

class Menu extends Component {
  render() {
    return (
      <div className="Menu">
        <h1>Main Menu</h1>
        <br/>
        <p>Graph Name</p>
        <button className="GraphButton" onClick={()=>this.props.handleOnClick("Graph", "Menu")} >G</button>
        <br/>
        <br/>
        <p>New Graph</p>
        <button className="GraphButton" onClick={()=>this.props.handleOnClick("Settings", "Menu")} >+</button>
      </div>
    );
  }
}

export default Menu;
