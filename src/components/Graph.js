import React, { Component } from 'react';

const graphImg = require('../assets/images/graph.svg')

class Graph extends Component {
  render() {
    return (
      <div className="Graph">
        <div className="titleButtons">
          <button onClick={()=>this.props.handleOnClick("Menu", "Graph", null)} >Back</button>
          <button onClick={()=>this.props.handleOnClick("Settings", "Graph")} >Settings</button>
        </div>
        <h1>{this.props.graph.name}</h1>
        <div className="DDDGraph"><img alt={this.props.graph.name+" image"} src={graphImg} height="400rem" width="300rem"/></div>
        <br/>
        <br/>
        <button className="SuggestionsButton" onClick={()=>this.props.handleOnClick("Suggestions", "Graph")} >See Suggestions</button>
      </div>
    );
  }
}

export default Graph;
