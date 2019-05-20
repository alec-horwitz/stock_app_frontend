import React, { Component } from 'react';
import BarGraph from '../D3/BarGraph';
import LineGraph from '../D3/LineGraph';
import ScatterGraph from '../D3/ScatterGraph';
import {API_KEY} from '../Secrets';

let interval = null
let timer = null

class Graph extends Component {
  componentDidMount() {
    let graph=JSON.parse(JSON.stringify(this.props.graph))
    graph.stocks = graph.stocks.filter(function(stock) { return stock.visible; })
    if (graph.type === "Line Graph") {
      this.renderGraph(LineGraph)
    } else if (graph.type === "Scatter Plot") {
      this.renderGraph(ScatterGraph)
    } else {
      this.renderGraph(BarGraph)
    }
  }

  renderGraph = (writeGraph, graph=JSON.parse(JSON.stringify(this.props.graph)), i=0) => {
    if (i < graph.stocks.length) {
      fetch("https://www.quandl.com/api/v3/datasets/WIKI/"+graph.stocks[i].ticker+"/data.json?api_key="+API_KEY)
      .then(res => res.json())
      .then(res => {
        graph.stocks[i].dataset = res.dataset_data.data
        this.renderGraph(writeGraph, graph, i+1)
      })
    } else if (graph.stocks.length) {
      const updates = writeGraph(graph)
      interval = updates[0]
      timer = updates[1]
      this.props.graphCUD(graph)
    }
  }

  componentWillUnmount() {
    if (interval) {
      interval.stop()
      interval = null
      timer.stop()
      timer = null
    }
  }
  render() {
    return (
      <div className="Graph">
        <div className="titleButtons">
          <button onClick={()=>this.props.handleOnClick("Menu", "Graph", null)} >Back</button>
          <button onClick={()=>this.props.handleOnClick("Settings", "Graph")} >Settings</button>
        </div>
        <h1>{this.props.graph.name}</h1>
        {interval ? null : <p>Loading...</p>}
        <div className="D3Graph"></div>
        {interval ? <button className="SuggestionsButton" onClick={()=>this.props.handleOnClick("Suggestions", "Graph")} >See Suggestions</button> : null} 
      </div>
    );
  }
}

export default Graph;
