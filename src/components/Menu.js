import React, { Component } from 'react';
import MenuItem from '../components/MenuItem';
import UUID from 'uuid';

const plus = require('../assets/images/plus.png')

class Menu extends Component {
  getGraphs = () => {
    return this.props.graphs.map((graph, index) => {
      return <MenuItem key={UUID()} handleOnClick={this.props.handleOnClick} graph={graph} index={index} navigation={this.props.navigation}/>
    })
  }
  render() {
    console.log(this.props.navigation.val)
    return (
      <div className="Menu">
        <h1>Main Menu</h1>
        {this.getGraphs()}
        <br/>
        <p>New Graph</p>
        <button className="GraphButton" onClick={()=>this.props.handleOnClick("Settings", "Menu", null)} disabled={this.props.navigation.val}>
          <img alt="New Graph Button" src={plus} height="100rem" width="100rem"/>
        </button>
      </div>
    );
  }
}

export default Menu;
