import React, { Component } from 'react';
import BarGraph from '../D3/BarGraph';

const data = [
  {
    "month": "January",
    "revenue": 13432,
    "profit": 8342
  },
  {
    "month": "February",
    "revenue": 19342,
    "profit": 10342
  },
  {
    "month": "March",
    "revenue": 17443,
    "profit": 15423
  },
  {
    "month": "April",
    "revenue": 26342,
    "profit": 18432
  },
  {
    "month": "May",
    "revenue": 34213,
    "profit": 29434
  },
  {
    "month": "June",
    "revenue": 50321,
    "profit": 45343
  },
  {
    "month": "July",
    "revenue": 54273,
    "profit": 47452
  }
]

class Graph extends Component {
  render() {
    return (
      <div className="Graph">
        <div className="titleButtons">
          <button onClick={()=>this.props.handleOnClick("Menu", "Graph", null)} >Back</button>
          <button onClick={()=>this.props.handleOnClick("Settings", "Graph")} >Settings</button>
        </div>
        <h1>{this.props.graph.name}</h1>
        <div className="DDDGraph">
          <BarGraph settings={this.props.graph} data={data} />
        </div>
        <br/>
        <br/>
        <button className="SuggestionsButton" onClick={()=>this.props.handleOnClick("Suggestions", "Graph")} >See Suggestions</button>
      </div>
    );
  }
}

export default Graph;
