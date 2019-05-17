import React, { Component } from 'react';
import BarGraph from '../D3/BarGraph';
import LineGraph from '../D3/LineGraph';
import ScatterGraph from '../D3/ScatterGraph';
import {API_KEY} from '../Secrets.js'

class Graph extends Component {
  componentDidMount() {
    if (this.props.graph.type === "Line Graph") {
      console.log("I'm Line")
      this.renderGraph(LineGraph)
    } else if (this.props.graph.type === "Scatter Plot") {
      console.log("I'm Scatter")
      this.renderGraph(ScatterGraph)
    } else {
      console.log("I'm Bar")
      this.renderGraph(BarGraph)
    }
  }

  renderGraph = (writeGraph, graph=JSON.parse(JSON.stringify(this.props.graph)), i=0) => {
    console.log(JSON.parse(JSON.stringify(this.props.graphs)))
    console.log(graph)
    if (i < graph.stocks.length) {
      fetch("https://www.quandl.com/api/v3/datasets/WIKI/"+graph.stocks[i].ticker+"/data.ison?api_key="+API_KEY)
      .then(res => res.json())
      .then(res => {
        graph.stocks[i].dataset = res.dataset_data
        this.renderGraph(writeGraph, graph, i+1)
      })
    } else if (graph.stocks.length) { 
      const updates = writeGraph(graph)
      graph.interval = updates[0]
      graph.timer = updates[1]
      this.props.graphCUD(graph)
    }
  }

  componentWillUnmount() {
    this.props.graph.interval && this.props.graph.interval.stop()
    this.props.graph.timer && this.props.graph.timer.stop()
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
