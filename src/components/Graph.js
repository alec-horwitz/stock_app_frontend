import React, { Component } from 'react';
import BarGraph from '../D3/BarGraph';
import LineGraph from '../D3/LineGraph';
import ScatterGraph from '../D3/ScatterGraph';

class Graph extends Component {
  state = {
    interval: null,
    timer: null
  }
  componentDidMount() {
    if (this.props.graph.type === "Line Graph") {
      console.log("I'm Line")
      const updates = LineGraph(this.props.graph)
      this.setState({interval: updates[0], timer: updates[1]})
    } else if (this.props.graph.type === "Scatter Plot") {
      console.log("I'm Scatter")
      const updates = ScatterGraph(this.props.graph)
      this.setState({interval: updates[0], timer: updates[1]})
    } else {
      console.log("I'm Bar")
      const updates = BarGraph(this.props.graph)
      this.setState({interval: updates[0], timer: updates[1]})
    }
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
