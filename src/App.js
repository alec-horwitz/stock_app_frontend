import React, { Component } from 'react';
import Menu from './components/Menu';
import Graph from './components/Graph';
import Settings from './components/Settings';
import Suggestions from './components/Suggestions';
import './App.css';

const sampleGraphs = [
  {
    id:0, 
    name:"Graphı", 
    type:"Line Graph", 
    stocks:[
      {
        id:0, 
        name:"stock1", 
        visibile:true
      },
      {
        id:1, 
        name:"STCK 2", 
        visibile:false
      },
      {
        id:2, 
        name:"$†Ô(ßπ", 
        visibile:false
      },
    ]
  },
  {
    id:1, 
    name:"GrÁf 2", 
    type:"Bar Chart", 
    stocks:[
      {
        id:0, 
        name:"stock1", 
        visibile:false
      },
      {
        id:1, 
        name:"STCK 2", 
        visibile:true
      },
      {
        id:2, 
        name:"$†Ô(ßπ", 
        visibile:false
      },
    ]
  },
  {
    id:2, 
    name:"gRAPHπ", 
    type:"Scatter Plot", 
    stocks:[
      {
        id:0, 
        name:"stock1", 
        visibile:false
      },
      {
        id:1, 
        name:"STCK 2", 
        visibile:false
      },
      {
        id:2, 
        name:"$†Ô(ßπ", 
        visibile:true
      },
    ]
  }]

class App extends Component {
  state={
    graphs: sampleGraphs,
    graphIndex: null,
    page: "Menu",
    parent: null
  }

  handleOnClick = (page, parent, graphIndex=this.state.graphIndex, graphs=this.state.graphs) => {
    this.setState({page, parent, graphIndex, graphs})
  }

  graphCUD = (newGraph, newGraphIndex) => {
    const graphs = this.state.graphs
    const len = this.state.graphs.length
    if (newGraph) {  
      if (newGraphIndex !== null) {
        console.log("Update: ",newGraph)
        this.setState({
          graphs: [...graphs.slice(0, newGraphIndex), newGraph, ...graphs.slice(newGraphIndex+1)],
          graphIndex: newGraphIndex,
          page: "Graph",
          parent: "Menu"
        })
      } else {
        console.log("Create: ",newGraph)
        this.setState({
          graphs: [...this.state.graphs, {...newGraph, id:len}],
          graphIndex: len,
          page: "Graph",
          parent: "Menu"
        })
      }
    } else {
      console.log("Destroy: ",newGraph)
      this.setState({
        graphs: newGraphIndex !== null ? [...graphs.slice(0, newGraphIndex), ...graphs.slice(newGraphIndex+1)] : graphs,
        graphIndex: null,
        page: "Menu",
        parent: null
      })
    }

  }

  render() {
    const {graphs, graphIndex} = this.state
    return (
      <div className="App">
        {this.state.page === "Menu" ? <Menu graphs={graphs} handleOnClick={this.handleOnClick} /> : null}
        {this.state.page === "Graph" ? <Graph graph={graphs[graphIndex]} handleOnClick={this.handleOnClick} /> : null}
        {this.state.page === "Settings" ? <Settings graph={graphs[graphIndex]} graphIndex={graphIndex} graphCUD={this.graphCUD} parent={this.state.parent} handleOnClick={this.handleOnClick} /> : null}
        {this.state.page === "Suggestions" ? <Suggestions graph={graphs[graphIndex]} handleOnClick={this.handleOnClick} /> : null}

      </div>
    );
  }
}

export default App;