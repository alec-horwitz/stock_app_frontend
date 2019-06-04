import React, { Component } from 'react';
import Nav from './Nav';
import BarGraph from '../D3/BarGraph';
import LineGraph from '../D3/LineGraph';
import ScatterGraph from '../D3/ScatterGraph';
import {API_KEY} from '../Secrets';

class Graph extends Component {
  state = {
    interval: null,
    timer: null
  }
  componentDidMount() {
    let {type} = this.props.graph
    if (type === "Line Graph") {
      this.renderGraph(LineGraph)
    } else if (type === "Scatter Plot") {
      this.renderGraph(ScatterGraph)
    } else {
      this.renderGraph(BarGraph)
    }
  }

  renderGraph = (writeGraph, graph=JSON.parse(JSON.stringify(this.props.graph)), i=0) => {
    if (i < graph.stocks.length) {
      if (graph.stocks[i].visible) {
        fetch("https://www.quandl.com/api/v3/datasets/WIKI/"+graph.stocks[i].ticker+"/data.json?api_key="+API_KEY)
        .then(res => res.json())
        .then(res => {
          graph.stocks[i].dataset = res.dataset_data.data
          this.renderGraph(writeGraph, graph, i+1)
        })
      } else {
        this.renderGraph(writeGraph, graph, i+1)
      }
    } else if (graph.stocks.length) {
      const updates = writeGraph(graph)
      this.setState({interval:updates[0], timer:updates[1]})
    }
  }

  componentWillUnmount() {
    const {interval, timer} = this.state
    if (interval) {
      interval.stop()
      timer.stop()
    }
  }
  render() {
    const {interval} = this.state
    return (
      <div className="Graph">
        <Nav>
          <button className="titleButtons" onClick={()=>this.props.handleOnClick("Menu", "Graph", null)} >Back</button>
          <button className="titleButtons" onClick={()=>this.props.handleOnClick("Settings", "Graph")} >Settings</button>
        </Nav>
        <h1>{this.props.graph.name}</h1>
        {interval ? null : <p>Loading...</p>}
        <div className="D3Graph"></div>
        {interval ? <button className="SuggestionsButton button" onClick={()=>this.props.handleOnClick("Suggestions", "Graph")} >See Suggestions</button> : null} 
      </div>
    );
  }
}

export default Graph;
