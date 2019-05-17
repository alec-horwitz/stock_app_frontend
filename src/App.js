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
        ticker: "GOOG",
        visible:true
      },
      {
        id:1, 
        ticker: "HOG",
        visible:false
      },
      {
        id:2, 
        ticker: "TXN",
        visible:false
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
        ticker: "HPQ",
        visible:false
      },
      {
        id:1, 
        ticker: "INTC",
        visible:true
      },
      {
        id:2, 
        ticker: "BRK_A",
        visible:false
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
        ticker: "WMT",
        visible:false
      },
      {
        id:1, 
        ticker: "MSFT",
        visible:false
      },
      {
        id:2, 
        ticker: "TGT",
        visible:true
      },
    ]
  }]

class App extends Component {
  state={
    graphs: [],
    graphIndex: null,
    page: "Menu",
    parent: null,
    allowNav: true
  }

  componentDidMount() {
    setTimeout(() => {
      alert("Loading your graphs from our database. This may take a few seconds.");
    })
    setTimeout(() => {
      this.setState({graphs: sampleGraphs, allowNav: !this.state.allowNav})
    }, 5000)
  }

  toggleNavigation = () => {
    this.setState({allowNav: !this.state.allowNav})
  }

  handleOnClick = (page, parent, graphIndex=this.state.graphIndex, graphs=this.state.graphs) => {
    this.setState({page, parent, graphIndex, graphs})
  }

  graphCUD = (newGraph=null, newGraphIndex=this.state.graphIndex) => {
    const graphs = this.state.graphs
    if (newGraph) {  
      if (newGraphIndex !== null) {
        this.setState({
          graphs: [...graphs.slice(0, newGraphIndex), newGraph, ...graphs.slice(newGraphIndex+1)],
          graphIndex: newGraphIndex,
          page: "Graph",
          parent: "Menu"
        })
      } else {
        const len = this.state.graphs.length
        this.setState({
          graphs: [...this.state.graphs, {...newGraph, id:len}],
          graphIndex: len,
          page: "Graph",
          parent: "Menu"
        })
      }
    } else {
      this.setState({
        graphs: newGraphIndex !== null ? [...graphs.slice(0, newGraphIndex), ...graphs.slice(newGraphIndex+1)] : graphs,
        graphIndex: null,
        page: "Menu",
        parent: null
      })
    }

  }

  render() {
    console.log(this.state.graphs)
    let myStocks = []
    const {graphs, graphIndex, allowNav} = this.state
    const stockLists = graphs.map(graph => {return graph.stocks})
    stockLists.forEach(function(stockList) {
        myStocks = [...myStocks, ...stockList]
    });

    return (
      <div className="App">
        {this.state.page === "Menu" ? <Menu allowNav={allowNav} graphs={graphs} handleOnClick={this.handleOnClick} /> : null}
        {this.state.page === "Graph" ? <Graph graphCUD={this.graphCUD} graph={graphs[graphIndex]} graphs={graphs} handleOnClick={this.handleOnClick} /> : null}
        {this.state.page === "Settings" ? <Settings navigation={{toggle: this.toggleNavigation, val: allowNav}} myStocks={myStocks} graph={graphs[graphIndex]} graphIndex={graphIndex} graphCUD={this.graphCUD} parent={this.state.parent} handleOnClick={this.handleOnClick} /> : null}
        {this.state.page === "Suggestions" ? <Suggestions graph={graphs[graphIndex]} handleOnClick={this.handleOnClick} /> : null}

      </div>
    );
  }
}

export default App;