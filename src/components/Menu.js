import React, { Component } from 'react';
import Nav from './Nav';
import MenuItem from '../components/MenuItem';
import UUID from 'uuid';

const plus = require('../assets/images/plus.png')

class Menu extends Component {
  getGraphs = () => {
    return this.props.graphs.map((graph, index) => {
      return <MenuItem key={UUID()} handleOnClick={this.props.handleOnClick} graph={graph} index={index} allowNav={this.props.allowNav}/>
    })
  }
  render() {
    return (
      <div className="Menu">
        <Nav/>
        <h1>Main Menu</h1>
        {this.getGraphs()}
        <br/>
        <button className={this.props.allowNav ? "newGraphDisabled" : "newGraphButton"} onClick={()=>this.props.handleOnClick("Settings", "Menu", null)} disabled={this.props.allowNav}>
          <div className="newGraphButtonTextPos" ><h5 class="newGraphButtonText">{this.props.allowNav ? "Loading..." : "New Graph"}</h5></div>
          <img className="newGraphSymbol" alt={"New Graph Button"} src={plus} height="100rem" width="100rem"/>
        </button> 
      </div>
    );
  }
}

export default Menu;
