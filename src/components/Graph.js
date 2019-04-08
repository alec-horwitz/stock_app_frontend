import React, { Component } from 'react';

const graph = require('../assets/images/graph.svg')

class Graph extends Component {
  render() {
    return (
      <div className="Graph">
        <button onClick={()=>this.props.handleOnClick("Menu", "Graph", null)} >Back</button>
        <button onClick={()=>this.props.handleOnClick("Settings", "Graph")} >Settings</button>
        <br/>
        <h1>{this.props.graph.name}</h1>
        <img src={this.props.graph.img} height="400rem" width="300rem"/>
        <br/>
        <br/>
        <button className="SuggestionsButton" onClick={()=>this.props.handleOnClick("Suggestions", "Graph")} >See Suggestions</button>
      </div>
    );
  }
}

export default Graph;
