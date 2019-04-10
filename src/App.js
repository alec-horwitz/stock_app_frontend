import React, { Component } from 'react';
import Menu from './components/Menu';
import Graph from './components/Graph';
import Settings from './components/Settings';
import Suggestions from './components/Suggestions';
import './App.css';

const graphImg = require('./assets/images/graph.svg')
const stocks = [
  {id:0, name:"stock1", visibile:true},
  {id:1, name:"$†Ô(ßπ", visibile:false},
  {id:2, name:"STCK 3", visibile:true}
]
class App extends Component {
  state={
    graphs: [{id:0, name:"myGraph1", img:graphImg, type:"Value 3", stocks}, {id:1, name:"myGraph2", img:graphImg, type:"Value 1", stocks}, {id:2, name:"myGraph3", img:graphImg, type:"Value 2", stocks}],
    graph: null,
    page: "Menu",
    parent: null
  }
  handleOnClick = (page, parent, graph=this.state.graph, graphs=this.state.graphs) => {
    this.setState({page, parent, graph, graphs})
  }
  render() {
    return (
      <div className="App">
        {this.state.page === "Menu" ? <Menu graphs={this.state.graphs} handleOnClick={this.handleOnClick} /> : null}
        {this.state.page === "Graph" ? <Graph graph={this.state.graph} handleOnClick={this.handleOnClick} /> : null}
        {this.state.page === "Settings" ? <Settings graph={this.state.graph} graphs={this.state.graphs} parent={this.state.parent} handleOnClick={this.handleOnClick} /> : null}
        {this.state.page === "Suggestions" ? <Suggestions graph={this.state.graph} handleOnClick={this.handleOnClick} /> : null}

      </div>
    );
  }
}

export default App;