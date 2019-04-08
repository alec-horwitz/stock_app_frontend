import React, { Component } from 'react';
import Menu from './components/Menu';
import Graph from './components/Graph';
import Settings from './components/Settings';
import Suggestions from './components/Suggestions';
import './App.css';

const graphImg = require('./assets/images/graph.svg')

class App extends Component {
  state={
    graphs: [{name:"myGraph1", img:graphImg}, {name:"myGraph2", img:graphImg}, {name:"myGraph3", img:graphImg}],
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
