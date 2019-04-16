import React, { Component } from 'react';
import BarGraph from '../D3/BarGraph';

const data = [
  {
    "ticker": "AAPL",
    "price": 19342
  },
  {
    "ticker": "BRK.A",
    "price": 17443
  },
  {
    "ticker": "GOOG",
    "price": 34213
  },
  {
    "ticker": "HOG",
    "price": 50321
  },
  {
    "ticker": "HPQ",
    "price": 54273
  },
  {
    "ticker": "INTC",
    "price": 24739
  },
  {
    "ticker": "MMM",
    "price": 59023
  },
  {
    "ticker": "MSFT",
    "price": 39482
  },
  {
    "ticker": "TGT",
    "price": 18729
  },
  {
    "ticker": "TXN",
    "price": 58362
  },
  {
    "ticker": "WMT",
    "price": 48250
  }
]

class Graph extends Component {
  state = {
    data: data
  }
  componentDidMount() {
    BarGraph(data,this.props.graph)
  }

  componentDidUpdate() {
    BarGraph(data,this.props.graph)
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
