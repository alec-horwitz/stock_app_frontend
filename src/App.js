import React, { Component } from 'react';
import Menu from './components/Menu';
import Graph from './components/Graph';
import Settings from './components/Settings';
import Suggestions from './components/Suggestions';
import './App.css';

const stocks = [
  {id:0, name:"stock1", visibile:true},
  {id:1, name:"$†Ô(ßπ", visibile:false},
  {id:2, name:"STCK 3", visibile:true}
]

class App extends Component {
  state={
    graphs: [{id:0, name:"myGraph1", type:"Value 3", stocks}, {id:1, name:"myGraph2", type:"Value 1", stocks:[]}, {id:2, name:"myGraph3", type:"Value 2", stocks}],
    graphId: null,
    page: "Menu",
    parent: null
  }
  handleOnClick = (page, parent, graphId=this.state.graphId, graphs=this.state.graphs) => {
    this.setState({page, parent, graphId, graphs})
  }

  render() {
    const {graphs, graphId} = this.state
    return (
      <div className="App">
        {this.state.page === "Menu" ? <Menu graphs={graphs} handleOnClick={this.handleOnClick} /> : null}
        {this.state.page === "Graph" ? <Graph graph={graphs[graphId]} handleOnClick={this.handleOnClick} /> : null}
        {this.state.page === "Settings" ? <Settings graph={graphs[graphId]} parent={this.state.parent} handleOnClick={this.handleOnClick} /> : null}
        {this.state.page === "Suggestions" ? <Suggestions graph={graphs[graphId]} handleOnClick={this.handleOnClick} /> : null}

      </div>
    );
  }
}

export default App;