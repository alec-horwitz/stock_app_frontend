import React, { Component } from 'react';
import BarGraph from '../D3/BarGraph';

class Graph extends Component {
  state = {
    interval: null,
    timer: null
  }
  componentDidMount() {
    const updates = BarGraph(this.props.graph)
    this.setState({interval: updates[0], timer: updates[1]})
  }

  componentWillUnmount() {
    this.state.interval && this.state.interval.stop()
    this.state.timer && this.state.timer.stop()
  }
  render() {
    return (
      <div className="Graph">
        <div className="titleButtons">
          <button onClick={()=>this.props.handleOnClick("Menu", "Graph", null)} >Back</button>
          <button onClick={()=>this.props.handleOnClick("Settings", "Graph")} >Settings</button>
        </div>
        <h1>{this.props.graph.name}</h1>
        <div className="D3Graph"></div>
        <button className="SuggestionsButton" onClick={()=>this.props.handleOnClick("Suggestions", "Graph")} >See Suggestions</button>
      </div>
    );
  }
}

export default Graph;
